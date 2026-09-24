# wall-panel-sonos-card

The Music view card. It came from github.com/carmenvetere/custom-media-card
and now lives in this repo, so a git pull is the whole update. HACS isn't
involved.

## Deploy

The built file is committed at `www/wall-panel-sonos-card/wall-panel-sonos-card.js`.
Home Assistant serves `www/` at `/local/`, and `configuration.yaml` loads it:

```yaml
lovelace:
  resources:
    - url: /local/wall-panel-sonos-card/wall-panel-sonos-card.js?v=0.3.0
      type: module
```

After a pull, restart Home Assistant if the resource line changed, then
refresh the app. Bump `?v=` whenever the built file changes so phones don't
keep a cached copy.

## Build (only when changing the source)

```bash
cd cards/wall-panel-sonos-card
npm install
npm run build   # writes ../../www/wall-panel-sonos-card/wall-panel-sonos-card.js
```

Bump `version` in `package.json`, `CARD_VERSION` in `src/const.ts` and the
`?v=` in `configuration.yaml` together, then commit the source and the
built file.

## Changes since custom-media-card 0.2.0

- Music Assistant favorites play through the `music_assistant` media_player
  with the same friendly name as the Sonos room, the same match the basement
  wall panel uses. `ma_entities` is now only an override.
- Favorites are the hearted playlists, then albums, then radio, sorted by
  name, like the wall panel. The fallback to the whole library when nothing
  is hearted is gone.
- The visual editor's Options and Favorites sections are back. A merge in
  the original repo had dropped them, which broke the editor.

The config options are unchanged from the original card; see the Music view
(`dashboards/mobile/music-view.yaml`) for the config in use.
