// Basement Wall Panel — small C++ helpers shared by the LVGL lambdas.
//
// Included from the device configs via `esphome: includes:`. Everything here is
// header-only and deliberately dependency-free (LVGL + the standard library).
#pragma once

#include <cctype>
#include <cmath>
#include <cstdint>
#include <cstdio>
#include <cstdlib>
#include <string>
#include <vector>

#include "lvgl.h"
#include "esphome/core/time.h"

namespace panel {

// ---------------------------------------------------------------- colors
constexpr uint32_t BG = 0x121417, SHEET = 0x17191d, HAIRLINE = 0x2a2e35, HAIRLINE_DIM = 0x22252b,
                   ROW_SELECTED = 0x1c2024, HANDLE = 0x3d434c, TEXT = 0xffffff, TEXT2 = 0xc3c7cc,
                   TEXT3 = 0x8a9099, TEXT4 = 0x5b616a, SLATE = 0x8EB1BF, SLATE_BRIGHT = 0xB6D2DC,
                   ON_SLATE = 0x16202a, SAGE = 0x8BA680, GOLD = 0xE2C168, AMBER = 0xE0A75E,
                   RED = 0xE0695B, PENDING = 0x625a43, GREEN = 0x7FB58A;

inline lv_color_t C(uint32_t hex) { return lv_color_hex(hex); }

// ---------------------------------------------------------------- widget helpers
inline void show(lv_obj_t *o, bool visible) {
  if (visible)
    lv_obj_remove_flag(o, LV_OBJ_FLAG_HIDDEN);
  else
    lv_obj_add_flag(o, LV_OBJ_FLAG_HIDDEN);
}
inline void set_checked(lv_obj_t *o, bool on) {
  if (on)
    lv_obj_add_state(o, LV_STATE_CHECKED);
  else
    lv_obj_remove_state(o, LV_STATE_CHECKED);
}
inline bool is_checked(lv_obj_t *o) { return lv_obj_has_state(o, LV_STATE_CHECKED); }
inline void text_color(lv_obj_t *o, uint32_t hex) { lv_obj_set_style_text_color(o, C(hex), LV_PART_MAIN); }
inline void bg(lv_obj_t *o, uint32_t hex, lv_opa_t opa = LV_OPA_COVER) {
  lv_obj_set_style_bg_color(o, C(hex), LV_PART_MAIN);
  lv_obj_set_style_bg_opa(o, opa, LV_PART_MAIN);
}
inline void border(lv_obj_t *o, uint32_t hex) { lv_obj_set_style_border_color(o, C(hex), LV_PART_MAIN); }
inline void text(lv_obj_t *o, const std::string &s) { lv_label_set_text(o, s.c_str()); }
// Fill / outline / text color in one go: the "active pill" pattern used for
// mode buttons, chips, tiles and the heater pill.
inline void pill(lv_obj_t *o, lv_obj_t *icon, lv_obj_t *label, bool active, uint32_t fill = SLATE) {
  if (active) {
    bg(o, fill);
    border(o, fill);
    if (icon) text_color(icon, ON_SLATE);
    if (label) text_color(label, ON_SLATE);
  } else {
    bg(o, BG, LV_OPA_TRANSP);
    border(o, HAIRLINE);
    if (icon) text_color(icon, SLATE);
    if (label) text_color(label, TEXT);
  }
}
inline void slider_fill(lv_obj_t *s, uint32_t hex) { lv_obj_set_style_bg_color(s, C(hex), LV_PART_INDICATOR); }
// Toggle track color (switch indicator in the checked state is styled in YAML;
// this only recolors the "off" track so disabled/dim variants are possible).
inline void slider_value(lv_obj_t *s, int v) { lv_slider_set_value(s, v, LV_ANIM_ON); }

// ---------------------------------------------------------------- strings
inline std::string utf8(uint32_t cp) {
  std::string out;
  if (cp < 0x80) {
    out += (char) cp;
  } else if (cp < 0x800) {
    out += (char) (0xC0 | (cp >> 6));
    out += (char) (0x80 | (cp & 0x3F));
  } else if (cp < 0x10000) {
    out += (char) (0xE0 | (cp >> 12));
    out += (char) (0x80 | ((cp >> 6) & 0x3F));
    out += (char) (0x80 | (cp & 0x3F));
  } else {
    out += (char) (0xF0 | (cp >> 18));
    out += (char) (0x80 | ((cp >> 12) & 0x3F));
    out += (char) (0x80 | ((cp >> 6) & 0x3F));
    out += (char) (0x80 | (cp & 0x3F));
  }
  return out;
}
inline std::vector<std::string> split(const std::string &s, char sep) {
  std::vector<std::string> out;
  std::string cur;
  for (char c : s) {
    if (c == sep) {
      out.push_back(cur);
      cur.clear();
    } else {
      cur += c;
    }
  }
  out.push_back(cur);
  return out;
}
inline std::string field(const std::vector<std::string> &v, size_t i, const std::string &def = "") {
  return i < v.size() ? v[i] : def;
}
inline float to_f(const std::string &s, float def = 0.0f) {
  if (s.empty() || s == "unknown" || s == "unavailable" || s == "None") return def;
  char *end = nullptr;
  float f = strtof(s.c_str(), &end);
  return end == s.c_str() ? def : f;
}
inline int to_i(const std::string &s, int def = 0) { return (int) lroundf(to_f(s, (float) def)); }
inline bool valid(const std::string &s) { return !(s.empty() || s == "unknown" || s == "unavailable" || s == "None"); }
inline std::string fmt(const char *f, double v) {
  char buf[48];
  snprintf(buf, sizeof(buf), f, v);
  return buf;
}
inline std::string fmt_int(const char *f, int v) {
  char buf[48];
  snprintf(buf, sizeof(buf), f, v);
  return buf;
}
// 1234 -> "1,234"
inline std::string thousands(long v) {
  std::string s = std::to_string(std::labs(v));
  for (int i = (int) s.size() - 3; i > 0; i -= 3) s.insert(i, ",");
  return (v < 0 ? "-" : "") + s;
}
// Powerwall power sensors already report kilowatts -> "4.2 kW"
inline std::string kw(float kw) { return fmt("%.1f kW", fabsf(kw)); }
// Turn off scrollbars everywhere and scrolling on everything except `keep`
// (the tileview and the sheet bodies). scrollbar_mode/scrollable are object
// properties, not styles, so the YAML theme cannot set them.
inline void tidy(lv_obj_t *o, const std::vector<lv_obj_t *> &keep) {
  lv_obj_set_scrollbar_mode(o, LV_SCROLLBAR_MODE_OFF);
  bool k = false;
  for (auto *x : keep) if (x == o) k = true;
  if (!k) lv_obj_remove_flag(o, LV_OBJ_FLAG_SCROLLABLE);
  // Buttons, switches and sliders default to SCROLL_ON_FOCUS; a focus event on
  // one inside a hidden sheet would scroll the whole screen to "reveal" it.
  lv_obj_remove_flag(o, LV_OBJ_FLAG_SCROLL_ON_FOCUS);
  uint32_t n = lv_obj_get_child_count(o);
  for (uint32_t i = 0; i < n; i++) tidy(lv_obj_get_child(o, i), keep);
}
inline std::string pct(float v) { return fmt_int("%d%%", (int) lroundf(v)); }
inline std::string deg(float v) { return fmt_int("%d°", (int) lroundf(v)); }
inline std::string lower(std::string s) {
  for (auto &c : s) c = (char) tolower(c);
  return s;
}
inline std::string replace_all(std::string s, const std::string &from, const std::string &to) {
  size_t p = 0;
  while ((p = s.find(from, p)) != std::string::npos) {
    s.replace(p, from.size(), to);
    p += to.size();
  }
  return s;
}

// ---------------------------------------------------------------- weather
// Home Assistant weather condition -> MDI glyph / human text.
inline std::string wx_icon(const std::string &cond) {
  static const struct { const char *c; uint32_t cp; } M[] = {
      {"clear-night", 0xF0594},     {"cloudy", 0xF0590},      {"exceptional", 0xF002A},
      {"fog", 0xF0591},             {"hail", 0xF0592},        {"lightning", 0xF0593},
      {"lightning-rainy", 0xF067E}, {"partlycloudy", 0xF0595}, {"pouring", 0xF0596},
      {"rainy", 0xF0597},           {"snowy", 0xF0598},       {"snowy-rainy", 0xF067F},
      {"sunny", 0xF0599},           {"windy", 0xF059D},       {"windy-variant", 0xF059D},
  };
  for (auto &m : M)
    if (cond == m.c) return utf8(m.cp);
  return utf8(0xF0595);
}
inline std::string wx_text(const std::string &cond) {
  static const struct { const char *c; const char *t; } M[] = {
      {"clear-night", "Clear"},          {"cloudy", "Cloudy"},          {"exceptional", "Severe"},
      {"fog", "Fog"},                    {"hail", "Hail"},              {"lightning", "Thunderstorms"},
      {"lightning-rainy", "Storms, rain"}, {"partlycloudy", "Partly cloudy"}, {"pouring", "Heavy rain"},
      {"rainy", "Rain"},                 {"snowy", "Snow"},             {"snowy-rainy", "Snow and rain"},
      {"sunny", "Sunny"},                {"windy", "Windy"},            {"windy-variant", "Windy"},
  };
  for (auto &m : M)
    if (cond == m.c) return m.t;
  return cond;
}

// Powerwall charge % -> battery glyph (charging variants when charging).
inline std::string battery_icon(float charge, bool charging) {
  if (charging) {
    if (charge < 30) return utf8(0xF0086);
    if (charge < 50) return utf8(0xF0088);
    if (charge < 70) return utf8(0xF0089);
    if (charge < 90) return utf8(0xF008A);
    return utf8(0xF0085);
  }
  if (charge < 30) return utf8(0xF007B);
  if (charge < 50) return utf8(0xF007D);
  if (charge < 70) return utf8(0xF007F);
  if (charge < 90) return utf8(0xF0081);
  return utf8(0xF0079);
}

// ---------------------------------------------------------------- dates
// "YYYY-MM-DD[ HH:MM:SS]" -> months elapsed until `now` (fractional months by days).
inline float months_since(const std::string &ymd, const esphome::ESPTime &now) {
  if (ymd.size() < 10 || !now.is_valid()) return 0.0f;
  int y = atoi(ymd.substr(0, 4).c_str()), m = atoi(ymd.substr(5, 2).c_str()), d = atoi(ymd.substr(8, 2).c_str());
  float months = (now.year - y) * 12.0f + (now.month - m) + (now.day_of_month - d) / 30.4f;
  return months < 0 ? 0 : months;
}
inline std::string short_date(const std::string &ymd) {
  static const char *MON[] = {"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"};
  if (ymd.size() < 10) return "—";
  int m = atoi(ymd.substr(5, 2).c_str()), d = atoi(ymd.substr(8, 2).c_str());
  if (m < 1 || m > 12) return "—";
  return std::string(MON[m - 1]) + " " + std::to_string(d);
}

// ---------------------------------------------------------------- music
// Parsed from the HA-side `sensor.basement_panel_music` attribute `players`:
//   id|state|volume|title|artist|leader|members,csv|entity_picture;...
struct Player {
  std::string id, state, title, artist, leader, picture;
  int volume{0};
  std::vector<std::string> members;
  bool playing() const { return state == "playing"; }
  bool grouped() const { return members.size() > 1; }
};
inline std::vector<Player> parse_players(const std::string &s) {
  std::vector<Player> out;
  if (!valid(s)) return out;
  for (auto &row : split(s, ';')) {
    if (row.empty()) continue;
    auto f = split(row, '|');
    Player p;
    p.id = field(f, 0);
    p.state = field(f, 1);
    p.volume = to_i(field(f, 2));
    p.title = field(f, 3);
    p.artist = field(f, 4);
    p.leader = field(f, 5);
    for (auto &m : split(field(f, 6), ',')) if (!m.empty()) p.members.push_back(m);
    p.picture = field(f, 7);
    out.push_back(p);
  }
  return out;
}
inline const Player *find_player(const std::vector<Player> &v, const std::string &id) {
  for (auto &p : v)
    if (p.id == id) return &p;
  return nullptr;
}
// Friendly name + icon for the nine speakers, in the design's priority order.
struct SpeakerDef { const char *id; const char *name; uint32_t icon; };
inline const SpeakerDef *speakers(size_t &n) {
  static const SpeakerDef S[] = {
      {"media_player.media_room", "Media Room", 0xF04B9}, {"media_player.pool", "Pool", 0xF0606},
      {"media_player.mud_room", "Mud Room", 0xF109E},     {"media_player.gym", "Gym", 0xF01E6},
      {"media_player.living_room", "Living Room", 0xF156D}, {"media_player.kitchen", "Kitchen", 0xF181C},
      {"media_player.office", "Office", 0xF1239},         {"media_player.deck", "Deck", 0xF1061},
      {"media_player.shop", "Shop", 0xF1323},
  };
  n = sizeof(S) / sizeof(S[0]);
  return S;
}
inline std::string speaker_name(const std::string &id) {
  size_t n;
  auto *S = speakers(n);
  for (size_t i = 0; i < n; i++)
    if (id == S[i].id) return S[i].name;
  return id;
}
inline std::string speaker_icon(const std::string &id) {
  size_t n;
  auto *S = speakers(n);
  for (size_t i = 0; i < n; i++)
    if (id == S[i].id) return utf8(S[i].icon);
  return utf8(0xF071F);
}

// Library browse rows: name|sub|content_type|content_id|can_expand;...
struct BrowseItem {
  std::string name, sub, type, id;
  bool expandable{false};
};
inline std::vector<BrowseItem> parse_browse(const std::string &s) {
  std::vector<BrowseItem> out;
  if (!valid(s)) return out;
  for (auto &row : split(s, ';')) {
    if (row.empty()) continue;
    auto f = split(row, '|');
    BrowseItem b;
    b.name = field(f, 0);
    b.sub = field(f, 1);
    b.type = field(f, 2);
    b.id = field(f, 3);
    b.expandable = field(f, 4) == "1";
    out.push_back(b);
  }
  return out;
}
inline std::string browse_icon(const std::string &type) {
  std::string t = lower(type);
  if (t.find("playlist") != std::string::npos) return utf8(0xF0CB8);
  if (t.find("radio") != std::string::npos || t.find("station") != std::string::npos || t.find("channel") != std::string::npos) return utf8(0xF0439);
  if (t.find("album") != std::string::npos) return utf8(0xF0025);
  if (t.find("artist") != std::string::npos) return utf8(0xF0803);
  if (t.find("favorite") != std::string::npos) return utf8(0xF02D1);
  if (t.find("track") != std::string::npos || t.find("music") != std::string::npos) return utf8(0xF0387);
  return utf8(0xF1359);
}

// ---------------------------------------------------------------- notifications
// id|level|title|body|time;...
struct Notif {
  std::string id, level, title, body, time;
  bool dismissable{true};
};
inline std::vector<Notif> parse_notifs(const std::string &s) {
  std::vector<Notif> out;
  if (!valid(s)) return out;
  for (auto &row : split(s, ';')) {
    if (row.empty()) continue;
    auto f = split(row, '|');
    Notif n;
    n.id = field(f, 0);
    n.level = lower(field(f, 1));
    n.title = field(f, 2);
    n.body = field(f, 3);
    n.time = field(f, 4);
    n.dismissable = field(f, 5, "1") != "0";
    out.push_back(n);
  }
  return out;
}

// ---------------------------------------------------------------- parsed state
// Kept here (not in ESPHome globals) because globals are declared before the
// user includes in main.cpp, so they cannot use these types.
struct State {
  std::vector<Player> players;
  std::vector<BrowseItem> browse_items, recents;
  std::vector<Notif> notifs;
};
inline State &state() {
  static State s;
  return s;
}

// ---------------------------------------------------------------- energy flow
// Power-flow diagram (spec Page 2 · Energy → Flow diagram): six possible flows,
// each a path on the 656×430 canvas, drawn in the SOURCE colour when the power
// on it exceeds 0.05 kW, with two 14px dots travelling source→sink at a speed
// proportional to kW. The rails (idle hairlines) and the coloured lines are
// LVGL `line` widgets declared in pages/energy.yaml; this module owns the dot
// animations (lv_anim with a custom exec callback walking an arc-length
// point table) so dots move at constant speed along the curves.
namespace flow {

enum Id { SOLAR_BATT = 0, SOLAR_HOME, BATT_HOME, GRID_BATT, SOLAR_GRID, GRID_HOME, COUNT };
constexpr float ACTIVE_KW = 0.05f;
constexpr int DOTS_PER_FLOW = 2, DOT_R = 7;

struct Path {
  std::vector<float> x, y, cum;
  float len = 0;
  void finish() {
    cum.assign(x.size(), 0);
    for (size_t i = 1; i < x.size(); i++) cum[i] = cum[i - 1] + hypotf(x[i] - x[i - 1], y[i] - y[i - 1]);
    len = cum.empty() ? 0 : cum.back();
  }
  void at(float s, float &px, float &py) const {
    if (x.size() < 2) { px = py = 0; return; }
    if (s <= 0) { px = x.front(); py = y.front(); return; }
    if (s >= len) { px = x.back(); py = y.back(); return; }
    size_t i = 1;
    while (i < cum.size() - 1 && cum[i] < s) i++;
    float seg = cum[i] - cum[i - 1], t = seg > 0 ? (s - cum[i - 1]) / seg : 0;
    px = x[i - 1] + (x[i] - x[i - 1]) * t;
    py = y[i - 1] + (y[i] - y[i - 1]) * t;
  }
};

inline Path straight(float x0, float y0, float x1, float y1) {
  Path p; p.x = {x0, x1}; p.y = {y0, y1}; p.finish(); return p;
}
// Cubic bezier sampled into a polyline; same control points as the SVG in the design.
inline Path bezier(float x0, float y0, float x1, float y1, float x2, float y2, float x3, float y3, int n = 48) {
  Path p;
  for (int i = 0; i <= n; i++) {
    float t = (float) i / n, u = 1 - t;
    p.x.push_back(u * u * u * x0 + 3 * u * u * t * x1 + 3 * u * t * t * x2 + t * t * t * x3);
    p.y.push_back(u * u * u * y0 + 3 * u * u * t * y1 + 3 * u * t * t * y2 + t * t * t * y3);
  }
  p.finish();
  return p;
}

struct Flow;
struct Dot { lv_obj_t *obj = nullptr; Flow *flow = nullptr; };
struct Flow {
  Path path;
  uint32_t color = SLATE;
  lv_obj_t *line = nullptr;
  Dot dots[DOTS_PER_FLOW];
  bool active = false;
  int period = 0;
};

struct State { Flow f[COUNT]; bool built = false, paused = false; };
inline State &st() { static State s; return s; }

// Period = 2600 − min(|kW|, 5) × 360 ms  (0.5 kW → 2.4 s, 5 kW → 0.8 s)
inline int period_ms(float kw) { return (int) lroundf(2600.0f - fminf(fabsf(kw), 5.0f) * 360.0f); }

// v runs 0..1000 along the path; fade in over the first 12 %, out over the last 12 %
inline void dot_exec(void *var, int32_t v) {
  Dot *d = (Dot *) var;
  float px, py;
  d->flow->path.at(v / 1000.0f * d->flow->path.len, px, py);
  lv_obj_set_pos(d->obj, (int32_t) lroundf(px) - DOT_R, (int32_t) lroundf(py) - DOT_R);
  int32_t opa = v < 120 ? v * 255 / 120 : v > 880 ? (1000 - v) * 255 / 120 : 255;
  lv_obj_set_style_opa(d->obj, (lv_opa_t) opa, LV_PART_MAIN);
}

inline void stop(Flow &f) {
  for (auto &d : f.dots) {
    lv_anim_delete(&d, dot_exec);
    lv_obj_add_flag(d.obj, LV_OBJ_FLAG_HIDDEN);
  }
  f.active = false;
}

inline void start(Flow &f) {
  for (int i = 0; i < DOTS_PER_FLOW; i++) {
    Dot &d = f.dots[i];
    lv_anim_delete(&d, dot_exec);
    lv_obj_set_style_bg_color(d.obj, C(f.color), LV_PART_MAIN);
    lv_obj_set_style_shadow_color(d.obj, C(f.color), LV_PART_MAIN);
    lv_obj_set_style_opa(d.obj, LV_OPA_TRANSP, LV_PART_MAIN);
    lv_obj_remove_flag(d.obj, LV_OBJ_FLAG_HIDDEN);
    lv_anim_t a;
    lv_anim_init(&a);
    lv_anim_set_var(&a, &d);
    lv_anim_set_exec_cb(&a, dot_exec);
    lv_anim_set_values(&a, 0, 1000);
    lv_anim_set_duration(&a, f.period);
    lv_anim_set_delay(&a, i * f.period / DOTS_PER_FLOW);  // second dot half a period behind
    lv_anim_set_repeat_count(&a, LV_ANIM_REPEAT_INFINITE);
    lv_anim_start(&a);
  }
  f.active = true;
}

// lines[]: the six coloured line widgets, dots[]: the twelve dot objects, both in Id order.
inline void build(lv_obj_t *const lines[COUNT], lv_obj_t *const dots[COUNT * DOTS_PER_FLOW]) {
  State &s = st();
  s.f[SOLAR_BATT].path = straight(328, 122, 328, 308);
  s.f[SOLAR_HOME].path = bezier(328, 122, 328, 215, 400, 215, 544, 215);
  s.f[BATT_HOME].path  = bezier(328, 308, 328, 215, 400, 215, 544, 215);
  s.f[GRID_BATT].path  = bezier(112, 215, 256, 215, 328, 215, 328, 308);
  s.f[SOLAR_GRID].path = bezier(328, 122, 328, 215, 256, 215, 112, 215);
  s.f[GRID_HOME].path  = straight(112, 215, 544, 215);
  const uint32_t colors[COUNT] = {AMBER, AMBER, GREEN, SLATE, AMBER, SLATE};
  for (int i = 0; i < COUNT; i++) {
    s.f[i].color = colors[i];
    s.f[i].line = lines[i];
    for (int k = 0; k < DOTS_PER_FLOW; k++) { s.f[i].dots[k].obj = dots[i * DOTS_PER_FLOW + k]; s.f[i].dots[k].flow = &s.f[i]; }
  }
  s.built = true;
}

// kw[]: power on each flow in Id order. Restarts a flow's dots only when it
// becomes active or its speed changes noticeably, so steady updates don't jump.
inline void update(const float kw[COUNT], lv_obj_t *const lines[COUNT], lv_obj_t *const dots[COUNT * DOTS_PER_FLOW]) {
  State &s = st();
  if (!s.built) build(lines, dots);
  for (int i = 0; i < COUNT; i++) {
    Flow &f = s.f[i];
    bool on = !std::isnan(kw[i]) && kw[i] > ACTIVE_KW;
    if (on) {
      lv_obj_set_style_line_color(f.line, C(f.color), LV_PART_MAIN);
      lv_obj_remove_flag(f.line, LV_OBJ_FLAG_HIDDEN);
      int per = period_ms(kw[i]);
      bool speed_changed = abs(per - f.period) > f.period / 8;
      if (!s.paused && (!f.active || speed_changed)) { f.period = per; start(f); }
    } else {
      lv_obj_add_flag(f.line, LV_OBJ_FLAG_HIDDEN);
      if (f.active) stop(f);
    }
  }
}

// Screen dimmed / asleep: no dots moving. resume() only lifts the flag; the
// caller re-runs render_energy so the dots restart from the live values.
inline void pause() { State &s = st(); s.paused = true; for (auto &f : s.f) if (f.active) stop(f); }
inline void resume() { st().paused = false; }

}  // namespace flow

}  // namespace panel
