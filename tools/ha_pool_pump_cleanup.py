#!/usr/bin/env python3
"""Clean up the pool-pump energy helpers through Home Assistant's own API.

Does, in order, each only after verifying what it is about to touch:
  1. delete the duplicate Riemann helper ("Pool Pump Energy", the config entry
     behind sensor.pool_pump_energy_2)
  2. remove the orphaned registry entries sensor.pool_pump_daily_energy and
     sensor.well_pump_daily_energy (restored, no integration behind them)
  3. set max_sub_interval = 60 s on the surviving helper ("Omnilogic Pool Pool
     Pump Energy", sensor.pool_pump_energy) via its options flow

Nothing here edits .storage: every change goes through the same API the UI
uses. Dry run by default; add --apply to make changes.

Usage:
  python3 tools/ha_pool_pump_cleanup.py --url http://192.168.10.120:8123 --token XXXX [--apply]

Needs Python 3.9+ and `pip install websockets` (the entity registry is only
reachable over the websocket API). Create the token under your profile →
Security → Long-lived access tokens.
"""
import argparse
import asyncio
import json
import sys
import urllib.error
import urllib.request

try:
    import websockets  # type: ignore
except ImportError:  # pragma: no cover
    sys.exit("pip install websockets   (needed for the entity registry)")

DUPLICATE_ENTITY = "sensor.pool_pump_energy_2"
KEEPER_ENTITY = "sensor.pool_pump_energy"
ORPHANS = ["sensor.pool_pump_daily_energy", "sensor.well_pump_daily_energy"]
MAX_SUB_INTERVAL = {"hours": 0, "minutes": 1, "seconds": 0}


def rest(url, token, method, path, body=None):
    req = urllib.request.Request(url.rstrip("/") + path, method=method,
                                 data=json.dumps(body).encode() if body is not None else None,
                                 headers={"Authorization": f"Bearer {token}", "Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            raw = r.read()
            return json.loads(raw) if raw else None
    except urllib.error.HTTPError as e:
        raise SystemExit(f"{method} {path} -> HTTP {e.code}: {e.read().decode()[:300]}")


async def ws_session(url, token):
    ws_url = url.rstrip("/").replace("http://", "ws://").replace("https://", "wss://") + "/api/websocket"
    ws = await websockets.connect(ws_url, max_size=50_000_000)
    assert json.loads(await ws.recv())["type"] == "auth_required"
    await ws.send(json.dumps({"type": "auth", "access_token": token}))
    reply = json.loads(await ws.recv())
    if reply["type"] != "auth_ok":
        raise SystemExit(f"websocket auth failed: {reply}")
    counter = {"id": 0}

    async def call(msg):
        counter["id"] += 1
        msg = dict(msg, id=counter["id"])
        await ws.send(json.dumps(msg))
        while True:
            r = json.loads(await ws.recv())
            if r.get("id") == counter["id"]:
                if not r.get("success", False):
                    raise SystemExit(f"{msg['type']} failed: {r.get('error')}")
                return r.get("result")

    return ws, call


async def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--url", required=True)
    ap.add_argument("--token", required=True)
    ap.add_argument("--apply", action="store_true", help="make the changes (default: dry run)")
    a = ap.parse_args()
    mode = "APPLY" if a.apply else "DRY RUN"
    print(f"== {mode} against {a.url}")

    ws, call = await ws_session(a.url, a.token)
    registry = {e["entity_id"]: e for e in await call({"type": "config/entity_registry/list"})}
    entries = {e["entry_id"]: e for e in await call({"type": "config_entries/get", "domain": "integration"})}
    states = {s["entity_id"]: s for s in rest(a.url, a.token, "GET", "/api/states")}

    def describe(eid):
        r = registry.get(eid)
        s = states.get(eid)
        return (f"{eid}: state={s['state'] if s else 'NOT IN STATES'}, "
                f"registry={'yes' if r else 'no'}, config_entry={r.get('config_entry_id') if r else None}, "
                f"name={r.get('name') or r.get('original_name') if r else None}")

    # ---- 1. duplicate helper
    print("\n-- 1. duplicate helper")
    print("  ", describe(DUPLICATE_ENTITY))
    print("  ", describe(KEEPER_ENTITY))
    dup = registry.get(DUPLICATE_ENTITY)
    keep = registry.get(KEEPER_ENTITY)
    dup_entry = entries.get(dup["config_entry_id"]) if dup and dup.get("config_entry_id") else None
    keep_entry = entries.get(keep["config_entry_id"]) if keep and keep.get("config_entry_id") else None
    ok_dup = (dup_entry is not None and keep_entry is not None and dup_entry["entry_id"] != keep_entry["entry_id"]
              and dup_entry["domain"] == "integration")
    if ok_dup:
        print(f"   duplicate config entry: {dup_entry['entry_id']} \"{dup_entry['title']}\"")
        print(f"   keeper config entry:    {keep_entry['entry_id']} \"{keep_entry['title']}\"")
        if a.apply:
            rest(a.url, a.token, "DELETE", f"/api/config/config_entries/entry/{dup_entry['entry_id']}")
            print("   deleted the duplicate config entry (its sensor goes with it)")
        else:
            print("   would delete the duplicate config entry")
    else:
        print("   SKIP: could not prove the duplicate maps to its own integration entry distinct from the keeper")

    # ---- 2. orphans
    print("\n-- 2. orphaned registry entries")
    for eid in ORPHANS:
        print("  ", describe(eid))
        r = registry.get(eid)
        s = states.get(eid)
        orphan = r is not None and not r.get("config_entry_id") and (s is None or s["state"] == "unavailable")
        if not r:
            print("   already gone")
        elif not orphan:
            print("   SKIP: has a config entry or a live state, not an orphan")
        elif a.apply:
            await call({"type": "config/entity_registry/remove", "entity_id": eid})
            print("   removed from the entity registry")
        else:
            print("   would remove from the entity registry")

    # ---- 3. harden the keeper
    print("\n-- 3. max_sub_interval on the keeper")
    if keep_entry is None:
        print("   SKIP: keeper has no config entry")
    else:
        opts = keep_entry.get("options") or {}
        print(f"   current options: {json.dumps(opts)}")
        flow = rest(a.url, a.token, "POST", "/api/config/config_entries/options/flow", {"handler": keep_entry["entry_id"]})
        fields = [f["name"] for f in flow.get("data_schema", []) if "name" in f]
        print(f"   options form fields: {fields}")
        if "max_sub_interval" not in fields:
            print("   SKIP: this HA version's options flow has no max_sub_interval; set the method to trapezoidal instead")
            rest(a.url, a.token, "DELETE", f"/api/config/config_entries/options/flow/{flow['flow_id']}")
        else:
            user_input = {k: v for k, v in opts.items() if k in fields}
            user_input["max_sub_interval"] = MAX_SUB_INTERVAL
            if a.apply:
                done = rest(a.url, a.token, "POST", f"/api/config/config_entries/options/flow/{flow['flow_id']}", user_input)
                print(f"   options flow result: {done.get('type')} -> {json.dumps(done.get('data') or done.get('result') or {})}")
            else:
                print(f"   would submit: {json.dumps(user_input)}")
                rest(a.url, a.token, "DELETE", f"/api/config/config_entries/options/flow/{flow['flow_id']}")

    await ws.close()
    print("\ndone" if a.apply else "\ndry run only; re-run with --apply to make the changes")


if __name__ == "__main__":
    asyncio.run(main())
