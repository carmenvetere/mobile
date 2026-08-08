// Offline fake `hass`: the real entity roster with hardcoded states, plus
// a callService stub that logs and mutates the fake states so taps behave.
// Mirrors config.js exactly — the adaptive Home, armed keypad, outage
// banner and both screensaver modes are all reachable without arming
// anything or dropping the grid: window.__test.set(...) drives scenarios.

const mk = (id, state, attributes = {}) => [id, { entity_id: id, state, attributes }];

export const states = Object.fromEntries([
  // header + modes
  mk('sensor.bayberry_tempest_temperature', '72.4'),
  mk('input_boolean.guest_mode', 'on'),
  mk('input_boolean.dinner_party', 'off'),
  mk('input_boolean.cleaners_mode', 'off'),
  mk('sensor.notification_center', '2', {
    items: [
      { id: 'garage', icon: 'mdi:garage-open-variant', color: '#E0A75E', title: 'Garage door open', detail: 'Open for 42 minutes' },
      { id: 'filter', icon: 'mdi:air-filter', color: '#8EB1BF', title: 'Media Room filter due', detail: 'Replace within 5 days' },
    ],
  }),

  // power
  mk('binary_sensor.bayberry_grid_status', 'on'), // on = grid up
  mk('sensor.bayberry_charge', '62'),
  mk('switch.bayberry_off_grid_operation', 'off'),

  // scenes
  mk('binary_sensor.outdoor_lights_on', 'off'),

  // alarm
  mk('alarm_control_panel.alarmo', 'disarmed', {}),
  // blockers Alarmo can report via open_sensors (names come from here)
  mk('binary_sensor.front_door', 'off', { friendly_name: 'Front Door' }),
  mk('binary_sensor.mudroom_garage_door', 'off', { friendly_name: 'Garage Entry' }),

  // basement lights
  mk('light.gym_main_lights', 'on', { brightness: 178 }),
  mk('light.media_room_table_lamp', 'off', {}),
  mk('light.laundry_room_main_lights', 'off', {}),
  mk('light.basement_hallway_main_lights', 'on', { brightness: 115 }),
  mk('light.media_room_main_lights', 'off', {}),
  mk('light.stairs_main_lights', 'off', {}),
  mk('light.stairs_spot_lights', 'on', { brightness: 77 }),

  // outdoor lights
  mk('light.front_porch_overhead_light', 'off', {}),
  mk('switch.transformer_zone_1', 'on'),
  mk('switch.transformer_zone_2', 'on'),
  mk('light.patio_back_porch_lights', 'off', {}),
  mk('switch.transformer_zone_3', 'off'),
  mk('light.omnilogic_pool_color_lights', 'off', {}),
  mk('light.driveway_sconces', 'on', { brightness: 153 }),
  mk('switch.driveway_zone_2_2', 'on'),
  mk('switch.driveway_zone_1_2', 'off'),
  mk('switch.driveway_zone_3_2', 'off'),

  // shades
  mk('sensor.shades_open_count', '4', { total: 29 }),
  mk('cover.first_floor_all', 'open', { current_position: 75 }),
  mk('cover.first_floor_front', 'open', { current_position: 75 }),
  mk('cover.living_room_side_shades', 'closed', { current_position: 0 }),
  mk('cover.dining_room_side', 'open', { current_position: 100 }),
  mk('cover.bedroom_side_shades', 'open', { current_position: 100 }),
  mk('cover.bedroom_back', 'closed', { current_position: 0 }),
  mk('cover.office_shades', 'closed', { current_position: 0 }),
  mk('cover.front_guest_bedroom_shades', 'closed', { current_position: 0 }),
  mk('cover.back_guest_bedroom_shades', 'closed', { current_position: 0 }),

  // climate
  mk('climate.basement_thermostat', 'heat', {
    temperature: 68, fan_mode: 'auto', hvac_modes: ['heat', 'cool', 'off'],
  }),
  mk('sensor.basement_thermostat_homekit_current_temperature', '66.2'),
  mk('sensor.basement_thermostat_homekit_current_humidity', '45'),
  mk('sensor.family_room_air_sensor_01_temperature_sensor', '68.1'),
  mk('sensor.family_room_air_sensor_01_humidity_sensor', '45'),
  mk('switch.basement_thermostat_family_room_priority', 'on'),
  mk('switch.basement_thermostat_basement_priority', 'off'),
  mk('switch.utility_room_ventilation_damper', 'off'),
  mk('switch.basement_bathroom_exhaust_fan', 'off'),

  // sonos — media room grouped with gym + mud room ("Basement")
  mk('media_player.media_room', 'playing', {
    media_title: 'Harvest Moon', media_artist: 'Neil Young', volume_level: 0.35,
    group_members: ['media_player.media_room', 'media_player.gym', 'media_player.mud_room'],
  }),
  mk('media_player.gym', 'playing', {
    volume_level: 0.3,
    group_members: ['media_player.media_room', 'media_player.gym', 'media_player.mud_room'],
  }),
  mk('media_player.mud_room', 'playing', {
    volume_level: 0.3,
    group_members: ['media_player.media_room', 'media_player.gym', 'media_player.mud_room'],
  }),
  mk('media_player.living_room', 'idle', { volume_level: 0.2, group_members: ['media_player.living_room'] }),
  mk('media_player.kitchen', 'idle', { volume_level: 0.2, group_members: ['media_player.kitchen'] }),
  mk('media_player.pool', 'idle', { volume_level: 0.25, group_members: ['media_player.pool'] }),
  mk('media_player.deck', 'idle', { volume_level: 0.25, group_members: ['media_player.deck'] }),
  mk('media_player.office', 'idle', { volume_level: 0.2, group_members: ['media_player.office'] }),

  // settings maintenance
  mk('number.bayberry_backup_reserve', '25'),
  mk('input_number.upper_floor_hvac_filter_hours', '1200'),
  mk('input_number.lower_floors_hvac_filter_hours', '1950'),
  mk('input_datetime.water_heater_last_flushed', new Date(Date.now() - 84 * 86400000).toISOString()),
  mk('input_datetime.dryer_vent_last_cleaned', new Date(Date.now() - 210 * 86400000).toISOString()),
]);

export function makeFakeHass(onChange) {
  // Fake event bus so the panel's alarmo_failed_to_arm subscription works
  // offline; window.__test.fireEvent drives it from the screenshot script.
  const listeners = {};
  const hass = {
    states,
    connection: {
      subscribeEvents(cb, type) {
        (listeners[type] = listeners[type] || []).push(cb);
        return Promise.resolve(() => {
          listeners[type] = (listeners[type] || []).filter((c) => c !== cb);
        });
      },
    },
    fireEvent(type, data) {
      for (const cb of listeners[type] || []) cb({ data });
    },
    callWS: async () => ({}),
    callService(domain, service, data) {
      console.log('[TEST] callService', domain, service, JSON.stringify(data));
      const ids = Array.isArray(data?.entity_id) ? data.entity_id : data?.entity_id ? [data.entity_id] : [];
      const patch = (id, state, attrs = {}) => {
        const s = states[id];
        if (!s) return;
        states[id] = { ...s, state: state ?? s.state, attributes: { ...s.attributes, ...attrs } };
      };
      for (const id of ids) {
        if (service === 'toggle') patch(id, states[id]?.state === 'on' ? 'off' : 'on');
        if (service === 'turn_on') patch(id, 'on', data.brightness_pct !== undefined ? { brightness: Math.round((data.brightness_pct / 100) * 255) } : {});
        if (service === 'turn_off') patch(id, 'off');
        if (service === 'open_cover') patch(id, 'open', { current_position: 100 });
        if (service === 'close_cover') patch(id, 'closed', { current_position: 0 });
        if (service === 'set_temperature') patch(id, null, { temperature: data.temperature });
        if (service === 'set_hvac_mode') patch(id, data.hvac_mode);
        if (service === 'set_fan_mode') patch(id, null, { fan_mode: data.fan_mode });
        if (service === 'volume_set') patch(id, null, { volume_level: data.volume_level });
        if (service === 'media_pause') patch(id, 'paused');
        if (service === 'media_play') patch(id, 'playing');
        if (service === 'play_media') patch(id, 'playing', { media_title: 'Favorite', media_artist: '' });
        if (service === 'alarm_arm_away') patch(id, 'arming', { arm_mode: 'armed_away', delay: 5 });
        if (service === 'alarm_arm_home') patch(id, 'arming', { arm_mode: 'armed_home', delay: 5 });
        if (service === 'alarm_disarm') patch(id, 'disarmed', { arm_mode: null });
        if (service === 'unjoin') patch(id, null, { group_members: [id] });
        if (service === 'join') {
          const leader = id;
          const current = states[leader]?.attributes?.group_members || [leader];
          const next = [...new Set([...current, ...(data.group_members || [])])];
          for (const m of next) patch(m, null, { group_members: next });
        }
      }
      onChange();
      return Promise.resolve();
    },
  };
  return hass;
}
