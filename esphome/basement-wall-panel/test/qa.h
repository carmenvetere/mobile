// QA helpers for the headless simulator build.
//
// Taps are injected with lv_obj_send_event(LV_EVENT_CLICKED), which runs the
// same on_click automations a finger would. Outgoing Home Assistant actions
// and events are captured (never sent: the harness has no HA connection) so
// the walk can assert on exactly what each tap would ask HA to do.
//
// The capture hook wraps APIServer::send_homeassistant_action and is only
// compiled when the build defines PANEL_QA_WRAP and links with
//   -Wl,--wrap=_ZN7esphome3api9APIServer25send_homeassistant_actionERKNS0_26HomeassistantActionRequestE
// Without it (a plain `esphome run` of the test config) the action checks
// report SKIP instead of PASS/FAIL; the UI-state checks still run.
#pragma once
#include <cstdio>
#include <cstdlib>
#include <string>
#include <utility>
#include <vector>
#include "lvgl.h"

namespace paneltest {

struct Call {
  std::string service;
  std::vector<std::pair<std::string, std::string>> data;
  bool is_event{false};
};
inline std::vector<Call> &calls() { static std::vector<Call> c; return c; }
inline bool &trace_active() { static bool a = false; return a; }
inline int &fails() { static int f = 0; return f; }
inline int &passes() { static int p = 0; return p; }
inline int &skips() { static int s = 0; return s; }
inline std::string &section() { static std::string s; return s; }

inline void begin(const char *name) { section() = name; fprintf(stderr, "QA -- %s\n", name); }
inline void ok(const std::string &what) { passes()++; fprintf(stderr, "QA pass  [%s] %s\n", section().c_str(), what.c_str()); }
inline void fail(const std::string &what, const std::string &detail = "") {
  fails()++;
  fprintf(stderr, "QA FAIL  [%s] %s%s%s\n", section().c_str(), what.c_str(), detail.empty() ? "" : " -- ", detail.c_str());
}
inline void check(bool cond, const std::string &what, const std::string &detail = "") { if (cond) ok(what); else fail(what, detail); }

inline std::string fmt(const Call &c) {
  std::string s = (c.is_event ? "event " : "action ") + c.service + " {";
  for (size_t i = 0; i < c.data.size(); i++) s += (i ? ", " : "") + c.data[i].first + "=" + c.data[i].second;
  return s + "}";
}
inline std::string dump_calls() {
  std::string s;
  for (auto &c : calls()) s += "\n      " + fmt(c);
  return s.empty() ? " (none)" : s;
}
inline void clear_calls() { calls().clear(); }
inline void tap(lv_obj_t *obj) { lv_obj_send_event(obj, LV_EVENT_CLICKED, nullptr); }

using KV = std::vector<std::pair<std::string, std::string>>;
inline bool has_pairs(const Call &c, const KV &kv) {
  for (auto &want : kv) {
    bool found = false;
    for (auto &d : c.data) if (d.first == want.first && d.second == want.second) found = true;
    if (!found) return false;
  }
  return true;
}
// A call to `service` carrying every key/value in `kv` was recorded since the last clear.
inline void expect_call(const std::string &service, const KV &kv, const std::string &what) {
  if (!trace_active()) { skips()++; fprintf(stderr, "QA skip  [%s] %s (no action trace)\n", section().c_str(), what.c_str()); return; }
  for (auto &c : calls()) if (c.service == service && has_pairs(c, kv)) { ok(what); return; }
  Call want; want.service = service; want.data = kv;
  fail(what, "expected " + fmt(want) + "; recorded:" + dump_calls());
}
inline void expect_no_call(const std::string &service, const std::string &what) {
  if (!trace_active()) { skips()++; fprintf(stderr, "QA skip  [%s] %s (no action trace)\n", section().c_str(), what.c_str()); return; }
  for (auto &c : calls()) if (c.service == service) { fail(what, "recorded " + fmt(c)); return; }
  ok(what);
}
inline int count_calls(const std::string &service) {
  int n = 0;
  for (auto &c : calls()) if (c.service == service) n++;
  return n;
}
inline void expect_text(lv_obj_t *label, const std::string &want, const std::string &what) {
  std::string got = lv_label_get_text(label);
  check(got == want, what, "text is \"" + got + "\", wanted \"" + want + "\"");
}
inline void expect_text_has(lv_obj_t *label, const std::string &part, const std::string &what) {
  std::string got = lv_label_get_text(label);
  check(got.find(part) != std::string::npos, what, "text is \"" + got + "\", wanted it to contain \"" + part + "\"");
}
inline void expect_visible(lv_obj_t *obj, bool want, const std::string &what) {
  bool vis = !lv_obj_has_flag(obj, LV_OBJ_FLAG_HIDDEN);
  check(vis == want, what, std::string("widget is ") + (vis ? "visible" : "hidden"));
}
inline void expect_eq(long got, long want, const std::string &what) {
  check(got == want, what, "got " + std::to_string(got) + ", wanted " + std::to_string(want));
}
inline void expect_eq(const std::string &got, const std::string &want, const std::string &what) {
  check(got == want, what, "got \"" + got + "\", wanted \"" + want + "\"");
}
inline void finish() {
  fprintf(stderr, "QA ==== %d passed, %d failed, %d skipped ====\n", passes(), fails(), skips());
  fflush(stderr);
  exit(fails() ? 1 : 0);
}

}  // namespace paneltest

#ifdef PANEL_QA_WRAP
#include "esphome/components/api/api_pb2.h"
static bool panel_qa_trace_init_ = (paneltest::trace_active() = true);
extern "C" void __wrap__ZN7esphome3api9APIServer25send_homeassistant_actionERKNS0_26HomeassistantActionRequestE(
    void *self, const esphome::api::HomeassistantActionRequest &call) {
  (void) self;
  paneltest::Call c;
  c.service = std::string(call.service.c_str(), call.service.size());
  c.is_event = call.is_event;
  for (auto &m : call.data) c.data.emplace_back(std::string(m.key.c_str(), m.key.size()), std::string(m.value.c_str(), m.value.size()));
  for (auto &m : call.data_template) c.data.emplace_back(std::string(m.key.c_str(), m.key.size()), std::string(m.value.c_str(), m.value.size()));
  fprintf(stderr, "QA call  %s\n", paneltest::fmt(c).c_str());
  paneltest::calls().push_back(std::move(c));
}
#endif
