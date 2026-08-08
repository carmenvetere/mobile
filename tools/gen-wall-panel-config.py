#!/usr/bin/env python3
"""Regenerate the GENERATED roster blocks in www/wall-panel/config.js from
the shared mobile dashboard modules, so the wall panel and mobile never
drift:

  lights.basement   <- dashboards/modules/basement-lights-individual.yaml
  lights.outdoor    <- dashboards/modules/outdoor-lights-individual.yaml
  shades.firstFloor <- dashboards/modules/first-floor-shades-groups.yaml

Run from the repo root after editing those YAML files:
  python3 tools/gen-wall-panel-config.py        # rewrite config.js
  python3 tools/gen-wall-panel-config.py --check  # exit 1 if out of date
"""
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONFIG = ROOT / "www" / "wall-panel" / "config.js"


def parse_cards(path):
    """Minimal parse of a lovelace_gen roster module: collect each bubble
    button card's entity / name / icon / button_type in order. Good enough
    for the flat roster files; not a general YAML parser (they contain
    Jinja, so a real YAML load would need rendering anyway)."""
    cards = []
    cur = None
    for raw in path.read_text().splitlines():
        line = raw.strip()
        if line.startswith("- type: custom:bubble-card"):
            cur = {}
            cards.append(cur)
            continue
        if cur is None:
            continue
        m = re.match(r"^(entity|name|icon|button_type|card_type):\s*(.+?)\s*$", line)
        if m and m.group(1) not in cur:
            cur[m.group(1)] = m.group(2)
    # keep entity-bearing button cards only (separators have no entity)
    return [c for c in cards if c.get("entity") and c.get("card_type", "button") == "button"]


def js_light(c):
    icon = c["icon"].replace("mdi:", "mdi-")
    sw = ", switch: true" if c["entity"].startswith("switch.") or c.get("button_type") == "switch" else ""
    return f"      {{ entity: '{c['entity']}', name: '{c['name']}', icon: '{icon}'{sw} }},"


def js_shade(c):
    return f"      {{ entity: '{c['entity']}', name: '{c['name']}' }},"


def block(marker, opener, lines):
    body = "\n".join(lines)
    return f"    // {marker}\n    {opener}\n{body}\n    ],\n    // {marker}:END"


def main():
    basement = parse_cards(ROOT / "dashboards/modules/basement-lights-individual.yaml")
    outdoor = parse_cards(ROOT / "dashboards/modules/outdoor-lights-individual.yaml")
    shades = parse_cards(ROOT / "dashboards/modules/first-floor-shades-groups.yaml")
    if not (basement and outdoor and shades):
        sys.exit("roster parse came up empty — did the module files move?")

    src = CONFIG.read_text()
    out = src
    replacements = [
        ("GENERATED:LIGHTS:BASEMENT (from dashboards/modules/basement-lights-individual.yaml)",
         "GENERATED:LIGHTS:BASEMENT:END", "basement: [", [js_light(c) for c in basement]),
        ("GENERATED:LIGHTS:OUTDOOR (from dashboards/modules/outdoor-lights-individual.yaml)",
         "GENERATED:LIGHTS:OUTDOOR:END", "outdoor: [", [js_light(c) for c in outdoor]),
        ("GENERATED:SHADES:FIRSTFLOOR (from dashboards/modules/first-floor-shades-groups.yaml)",
         "GENERATED:SHADES:FIRSTFLOOR:END", "firstFloor: [", [js_shade(c) for c in shades]),
    ]
    for start, end, opener, lines in replacements:
        pattern = re.compile(
            re.escape(f"// {start}") + r".*?" + re.escape(f"// {end}"), re.S)
        if not pattern.search(out):
            sys.exit(f"marker not found in config.js: {start}")
        body = "\n".join(lines)
        out = pattern.sub(f"// {start}\n    {opener}\n{body}\n    ],\n    // {end}", out)

    if "--check" in sys.argv:
        if out != src:
            sys.exit("config.js rosters are out of date — run tools/gen-wall-panel-config.py")
        print("config.js rosters match the YAML modules")
        return
    if out != src:
        CONFIG.write_text(out)
        print("config.js rosters regenerated")
    else:
        print("config.js rosters already up to date")


if __name__ == "__main__":
    main()
