// Wall panel configuration — ALL entity IDs, rosters, group presets,
// favorites and timings live here. No entity ID may appear inline in a view
// file (handoff rule): this file is what keeps the panel maintainable and
// what keeps it in sync with the mobile dashboard.
//
// The blocks between GENERATED markers are produced by
// tools/gen-wall-panel-config.py from the shared mobile roster modules
// (basement-lights-individual.yaml, outdoor-lights-individual.yaml,
// first-floor-shades-groups.yaml) so mobile and wall panel never drift.
// Re-run that script after editing those YAML files; edit the rest by hand.

export const CONFIG = {
  header: {
    outdoorTemp: 'sensor.bayberry_tempest_temperature',
    guests: 'input_boolean.guest_mode',
    dinnerParty: 'input_boolean.dinner_party',
    notificationCount: 'sensor.notification_center',
  },

  // Power Outage banner + screensaver critical alert. Bound to the real
  // Powerwall grid sensor per the handoff ("not a helper"): 'off' = the
  // house is islanded on battery backup.
  power: {
    gridStatus: 'binary_sensor.bayberry_grid_status',
    gridDownState: 'off',
    powerwallCharge: 'sensor.bayberry_charge',
  },

  // Scene roster — mirrors the basement_wall_panel branch of
  // dashboards/modules/dynamic-scenes.yaml. The evening slot swaps to
  // Basement Entertaining while the Dinner Party helper is on, and the
  // outdoor slot flips between Outdoor / Outdoor Off on the state of
  // binary_sensor.outdoor_lights_on, exactly like the mobile module.
  scenes: {
    dinnerParty: 'input_boolean.dinner_party',
    outdoorLightsOn: 'binary_sensor.outdoor_lights_on',
    roster: [
      { id: 'morning', name: 'Morning', icon: 'mdi-weather-sunset-up', scene: 'scene.good_morning_2' },
      { id: 'working', name: 'Working', icon: 'mdi-desk-lamp', scene: 'scene.basement_work' },
      { id: 'cleaning', name: 'Cleaning', icon: 'mdi-spray-bottle', scene: 'scene.basement_cleaning' },
      { id: 'welcome', name: 'Welcome', icon: 'mdi-human-greeting', scene: 'scene.welcome' },
      {
        id: 'evening', name: 'Basement Evening', icon: 'mdi-moon-waning-crescent', scene: 'scene.basement_evening',
        dinnerVariant: { name: 'Basement Entertaining', icon: 'mdi-party-popper', scene: 'scene.basement_entertaining' },
      },
      { id: 'movie', name: 'Movie', icon: 'mdi-movie-open-play', scene: 'scene.movie' },
      {
        id: 'outdoor', name: 'Outdoor', icon: 'mdi-coach-lamp', scene: 'scene.outdoor_on',
        outdoorOffVariant: { name: 'Outdoor Off', icon: 'mdi-coach-lamp', scene: 'scene.outdoor_off' },
      },
      { id: 'alloff', name: 'All Off', icon: 'mdi-lightbulb-off', scene: 'scene.good_night' },
    ],
    // Both the disarm keypad and the outage banner steal vertical space:
    // scenes shed in this fixed priority order so Home stays one frame.
    shedOrder: ['cleaning', 'working', 'welcome', 'outdoor'],
    shedWhenArmed: 2,
    shedWhenOutage: 2,
    pulseMs: 1600,
  },

  lights: {
    // GENERATED:LIGHTS:BASEMENT (from dashboards/modules/basement-lights-individual.yaml)
    basement: [
      { entity: 'light.gym_main_lights', name: 'Media Room Main Lights', icon: 'mdi-light-recessed' },
      { entity: 'light.media_room_table_lamp', name: 'Media Room Table Lamp', icon: 'mdi-floor-lamp' },
      { entity: 'light.laundry_room_main_lights', name: 'Mud Room Main Lights', icon: 'mdi-light-recessed' },
      { entity: 'light.basement_hallway_main_lights', name: 'Hallway Main Lights', icon: 'mdi-light-recessed' },
      { entity: 'light.media_room_main_lights', name: 'Gym Main Lights', icon: 'mdi-light-recessed' },
      { entity: 'light.stairs_main_lights', name: 'Basement Stairs', icon: 'mdi-light-recessed' },
      { entity: 'light.stairs_spot_lights', name: 'Basement Stairs Accent', icon: 'mdi-spotlight-beam' },
    ],
    // GENERATED:LIGHTS:BASEMENT:END
    // GENERATED:LIGHTS:OUTDOOR (from dashboards/modules/outdoor-lights-individual.yaml)
    outdoor: [
      { entity: 'light.front_porch_overhead_light', name: 'Front Entry', icon: 'mdi-light-recessed' },
      { entity: 'switch.transformer_zone_1', name: 'Front Path', icon: 'mdi-lamp', switch: true },
      { entity: 'switch.transformer_zone_2', name: 'Front Tree Spotlights', icon: 'mdi-light-flood-up', switch: true },
      { entity: 'light.patio_back_porch_lights', name: 'Pool Door', icon: 'mdi-outdoor-lamp' },
      { entity: 'switch.transformer_zone_3', name: 'Pool Retaining Wall', icon: 'mdi-light-flood-up', switch: true },
      { entity: 'light.omnilogic_pool_color_lights', name: 'Pool Lights', icon: 'mdi-pool' },
      { entity: 'light.driveway_sconces', name: 'Deck and Driveway Sconces', icon: 'mdi-outdoor-lamp' },
      { entity: 'switch.driveway_zone_2_2', name: 'Driveway Path', icon: 'mdi-lamp', switch: true },
      { entity: 'switch.driveway_zone_1_2', name: 'Driveway Tree Spotlights', icon: 'mdi-light-flood-up', switch: true },
      { entity: 'switch.driveway_zone_3_2', name: 'Firepit Path', icon: 'mdi-lamp', switch: true },
    ],
    // GENERATED:LIGHTS:OUTDOOR:END
    defaultBrightnessPct: 60, // on turn-on with no remembered brightness
    dragThresholdPx: 6,
  },

  shades: {
    openCount: 'sensor.shades_open_count',
    // "Whole House / All Shades": no single all-house cover group exists in
    // HA, so the buttons target every shade group (the mobile Close All
    // list + the office group).
    wholeHouse: {
      name: 'All Shades',
      targets: [
        'cover.first_floor_all',
        'cover.bedroom_side_shades',
        'cover.bedroom_back',
        'cover.office_shades',
        'cover.front_guest_bedroom_shades',
        'cover.back_guest_bedroom_shades',
      ],
    },
    // Media Room Shades: the handoff group exists in the design, but the
    // repo has no media-room / basement cover entity yet. Set this to the
    // cover's entity_id when the shade is installed and the group appears.
    mediaRoom: null, // e.g. { entity: 'cover.media_room_shades', name: 'Media Room' }
    // GENERATED:SHADES:FIRSTFLOOR (from dashboards/modules/first-floor-shades-groups.yaml)
    firstFloor: [
      { entity: 'cover.first_floor_all', name: 'All Shades' },
      { entity: 'cover.first_floor_front', name: 'Front Shades' },
      { entity: 'cover.living_room_side_shades', name: 'Living Room Side Shades' },
      { entity: 'cover.dining_room_side', name: 'Dining Room Side Shades' },
    ],
    // GENERATED:SHADES:FIRSTFLOOR:END
  },

  climate: {
    entity: 'climate.basement_thermostat',
    currentTemp: 'sensor.basement_thermostat_homekit_current_temperature',
    humidity: 'sensor.basement_thermostat_homekit_current_humidity',
    min: 55,
    max: 85,
    // Wall-panel fan labels → HA fan_mode values (see
    // dashboards/modules/basement-climate.yaml: Circulate is 'diffuse').
    fanModes: [
      { label: 'Auto', value: 'auto', icon: 'mdi-fan-auto' },
      { label: 'On', value: 'on', icon: 'mdi-fan' },
      { label: 'Circulate', value: 'diffuse', icon: 'mdi-fan-clock' },
    ],
    toggles: [
      {
        entity: 'switch.basement_thermostat_family_room_priority', name: 'Media Room Priority', icon: 'mdi-star-outline',
        chipTemp: 'sensor.family_room_air_sensor_01_temperature_sensor',
        chipHumidity: 'sensor.family_room_air_sensor_01_humidity_sensor',
      },
      {
        entity: 'switch.basement_thermostat_basement_priority', name: 'Basement Hallway Priority', icon: 'mdi-star-outline',
        chipTemp: 'sensor.basement_thermostat_homekit_current_temperature',
        chipHumidity: 'sensor.basement_thermostat_homekit_current_humidity',
      },
      { entity: 'switch.utility_room_ventilation_damper', name: 'Ventilation', icon: 'mdi-air-filter' },
      { entity: 'switch.basement_bathroom_exhaust_fan', name: 'Basement Bathroom Exhaust Fan', icon: 'mdi-fan' },
    ],
  },

  sonos: {
    // The room the panel controls by default (it lives in the media room).
    primary: 'media_player.media_room',
    // Handoff rooms "Patio" and "Firepit" have no media_player in HA —
    // the real outdoor players are Pool and Deck ("repo wins for entity
    // IDs"). Office rounds out the eight real Sonos rooms.
    rooms: [
      { entity: 'media_player.media_room', name: 'Media Room' },
      { entity: 'media_player.gym', name: 'Gym' },
      { entity: 'media_player.mud_room', name: 'Mud Room' },
      { entity: 'media_player.living_room', name: 'Living Room' },
      { entity: 'media_player.kitchen', name: 'Kitchen' },
      { entity: 'media_player.pool', name: 'Pool' },
      { entity: 'media_player.deck', name: 'Deck' },
      { entity: 'media_player.office', name: 'Office' },
    ],
    groups: [
      { name: 'Basement', players: ['media_player.media_room', 'media_player.gym', 'media_player.mud_room'] },
      { name: 'Main Floor', players: ['media_player.living_room', 'media_player.kitchen'] },
      { name: 'Outside', players: ['media_player.pool', 'media_player.deck'] },
      {
        name: 'Whole House',
        players: [
          'media_player.media_room', 'media_player.gym', 'media_player.mud_room',
          'media_player.living_room', 'media_player.kitchen', 'media_player.pool',
          'media_player.deck', 'media_player.office',
        ],
      },
    ],
    maxVolume: 40, // percent — same cap as the mobile Sonos card
    // Six favorites from the handoff; media_content_ids are the canonical
    // ones from dashboards/mobile/music-view.yaml (v2.2.3).
    favorites: [
      {
        id: 'ms_now', name: 'MS NOW', type: 'music',
        contentId: 'x-sonosapi-hls:channel-linear%3a95bffee3-e903-ca28-6332-1b94f41a8962?sid=37&flags=8200&sn=5',
        art: 'linear-gradient(135deg,#c8102e,#1a1c1f)',
      },
      {
        id: 'pool_2026', name: 'Pool Mix - 2026', type: 'playlist',
        contentId: 'spotify:playlist:0KkRPLBW2cciKaSkNIdyO3',
        art: 'linear-gradient(135deg,#00b3a4,#f4d35e)',
      },
      {
        id: 'hotel_costes_radio', name: 'Hotel Costes Radio', type: 'playlist',
        contentId: 'spotify:playlist:37i9dQZF1E4mWbHqaowOUP',
        art: 'linear-gradient(135deg,#1a1a1a,#6a4a2c)',
      },
      {
        id: 'chill_mix', name: 'Chill Mix', type: 'playlist',
        contentId: 'spotify:playlist:37i9dQZF1EVHGWrwldPRtj',
        art: 'linear-gradient(135deg,#2a3540,#6a4ec8)',
      },
      {
        id: 'pop_dance_mix', name: 'Pop & Dance Mix', type: 'music',
        contentId: 'x-sonosapi-hls-static:channel-xtra%3adc93524a-aa6d-b0c4-0d53-caabac97500c%3a15ebc9ab-82ba-0dd1-0276-d408113397df?sid=37&flags=32768&sn=5',
        art: 'linear-gradient(135deg,#ff006e,#8338ec)',
      },
      {
        id: 'ella_and_louis', name: 'Ella & Louis', type: 'playlist',
        contentId: 'spotify:playlist:502ADPBCxITjzQZOlnAjQQ',
        art: 'linear-gradient(135deg,#3d2914,#d4a574)',
      },
    ],
  },

  alarm: {
    entity: 'alarm_control_panel.alarmo',
    // Fallback arming countdown when Alarmo doesn't report a delay
    // attribute; the live countdown always prefers the entity's value.
    exitDelaySeconds: 60,
    codeLength: 4,
    // Doors the panel names when one is open before arming. Same roster the
    // mobile security view uses. This is read live from the sensors, NOT
    // from Alarmo's `open_sensors` attribute (that one lingers after a
    // failed arm and would make the panel report stale blockers).
    doorSensors: [
      { entity: 'binary_sensor.front_door', name: 'Front Door' },
      { entity: 'binary_sensor.kitchen_french_doors', name: 'Kitchen French Doors' },
      { entity: 'binary_sensor.living_room_french_doors', name: 'Living Room French Doors' },
      { entity: 'binary_sensor.mudroom_entry_door', name: 'Mudroom Door' },
      { entity: 'binary_sensor.mudroom_garage_door', name: 'Garage Entry' },
      { entity: 'cover.garage_door_garage', name: 'Garage Door' },
    ],
    // How long a refused-arm notice stays on screen before clearing.
    failureNoticeSeconds: 20,
  },

  settings: {
    toggles: [
      { entity: 'input_boolean.guest_mode', name: 'Overnight Guests', icon: 'mdi-bed' },
      { entity: 'input_boolean.cleaners_mode', name: 'Cleaners Mode', icon: 'mdi-spray-bottle' },
      { entity: 'input_boolean.dinner_party', name: 'Dinner Party', icon: 'mdi-party-popper' },
      { entity: 'switch.bayberry_off_grid_operation', name: 'Go Off Grid', icon: 'mdi-transmission-tower-off' },
    ],
    // Navigation rows: visual parity with the mobile settings sections.
    // The mobile pop-ups can't open inside the panel, so these are inert
    // until the panel grows its own sub-views.
    sections: [
      { name: 'Home Modes', icon: 'mdi-home-heart' },
      { name: 'Climate', icon: 'mdi-thermostat' },
      { name: 'Alarm', icon: 'mdi-shield-home' },
      { name: 'Motion & Lights', icon: 'mdi-motion-sensor' },
      { name: 'Energy & Grid', icon: 'mdi-transmission-tower' },
      { name: 'Shades', icon: 'mdi-roller-shade' },
      { name: 'Vacuum', icon: 'mdi-robot-vacuum' },
    ],
    maintenance: {
      powerwallReserve: 'number.bayberry_backup_reserve',
      upperFilterHours: 'input_number.upper_floor_hvac_filter_hours',
      lowerFilterHours: 'input_number.lower_floors_hvac_filter_hours',
      waterHeaterFlushed: 'input_datetime.water_heater_last_flushed',
      dryerVentCleaned: 'input_datetime.dryer_vent_last_cleaned',
      filterAttentionHours: 1500,
      maintenanceAttentionDays: 180,
    },
    releaseVersion: 'Wall Panel v0.1 · basement',
    releaseNotes: [
      'Vue 3 kiosk panel for the 720×1280 Pi Touch Display 2 — same Dune Mist tokens and entity rosters as the mobile dashboard',
      'Adaptive Home: Now Playing while disarmed, disarm keypad while armed; scenes shed under the keypad and outage banner',
      'Nest-style climate dial with upward mode/fan dropdowns; per-pixel contrast light rows with drag-to-dim',
      'Notification Center, Speaker Grouping and Screensaver overlays; optimistic state on every control',
    ],
  },

  notifications: {
    countSensor: 'sensor.notification_center',
    // The Notification Center integration's item list is read from the
    // count sensor's attributes; the first of these keys that holds an
    // array wins. Adjust once the integration's attribute shape is pinned.
    itemAttrCandidates: ['items', 'notifications', 'active'],
    // Optional services for dismissing items. Left null, the per-row
    // dismiss and Clear all buttons are hidden (read-only center).
    dismissService: null, // e.g. { domain: 'notification_center', service: 'dismiss', idField: 'id' }
    clearAllService: null, // e.g. { domain: 'notification_center', service: 'clear_all' }
  },

  display: {
    idleAfterSeconds: 120,       // enter screensaver
    deepIdleAfterSeconds: 300,   // backlight to minimum; wake past this returns Home
    // DSI backlight exposed HA-side (rpi_backlight or a number template) —
    // the one dependency outside the panel. null = skip backlight calls.
    backlightEntity: null,       // e.g. 'light.wall_panel_backlight' or 'number.wall_panel_backlight'
    dimPct: 30,
    minPct: 1,
    clockTickSeconds: 30,
  },

  optimistic: {
    expireMs: 3000, // a failed call may not lie on screen longer than this
  },

  footerLabels: false,
};
