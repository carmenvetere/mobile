// Screenshot helper for the headless simulator build: renders the active
// screen with lv_snapshot and writes a binary PPM.
#pragma once
#include <cstdio>
#include <string>
#include "lvgl.h"

namespace paneltest {
inline void snap(const std::string &name) {
  lv_draw_buf_t *buf = lv_snapshot_take(lv_screen_active(), LV_COLOR_FORMAT_RGB888);
  if (!buf) { fprintf(stderr, "snap %s: failed\n", name.c_str()); return; }
  int w = buf->header.w, h = buf->header.h, stride = buf->header.stride;
  std::string path = std::string(getenv("SNAP_DIR") ? getenv("SNAP_DIR") : ".") + "/" + name + ".ppm";
  FILE *f = fopen(path.c_str(), "wb");
  fprintf(f, "P6\n%d %d\n255\n", w, h);
  for (int y = 0; y < h; y++) {
    const uint8_t *row = (const uint8_t *) buf->data + y * stride;
    for (int x = 0; x < w; x++) { uint8_t px[3] = {row[x * 3 + 2], row[x * 3 + 1], row[x * 3 + 0]}; fwrite(px, 1, 3, f); }
  }
  fclose(f);
  lv_draw_buf_destroy(buf);
  fprintf(stderr, "snap %s written\n", name.c_str());
}
}  // namespace paneltest
