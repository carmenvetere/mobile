# Sonos and Music Assistant: players, groups and announcements

How the Sonos speakers, the Music Assistant (MA) players and the speaker
groups fit together in this config, and the steps to move the speaker
groups and text-to-speech (TTS) announcements onto Music Assistant.

## 1. Keep both integrations

Keep the Sonos integration enabled. Music Assistant sits beside it.

| Entities | From | Used for |
| --- | --- | --- |
| `media_player.living_room`, `media_player.pool`, … | Sonos integration | Room state, transport, volume, grouping, Pico remote, alarm chime, wall panel |
| `media_player.living_room_2`, … (same friendly name) | Music Assistant | Playing Music Assistant favorites and library items |

The Music view and the basement wall panel find a room's MA player by
**friendly name**, not entity ID. Keep each MA player's name identical to its
Sonos room (for example both "Living Room"). If you rename a speaker, rename
it in both places.

Optional tidy-up that changes nothing functionally:

- Hide the MA room players (`…_2`) under Settings > Devices & services >
  Entities. Hidden entities still work in scripts and the card.
- In Music Assistant, disable players you never use under Settings > Players.

## 2. Recreate the speaker groups in Music Assistant

Groups are created in the Music Assistant UI; there is no YAML for them.

In Music Assistant, open **Settings > Players** and choose **Add group
player**. Pick the **Sonos sync group** type, so Music Assistant uses Sonos's
own grouping and the speakers stay in sync. Use the universal group type only
to mix Sonos with non-Sonos players. Name the group, tick its members, and
save. Home Assistant adds a `media_player` for each group. Reload the Music
Assistant integration if it does not show up.

Groups to create, taken from how this config groups the speakers today:

| MA group name | Members | Replaces |
| --- | --- | --- |
| Announcement Speakers | Same members as the current helper (see step 3) | The `media_player.announcement_speakers` helper, used by every TTS announcement |
| Alarm Speakers | Living Room, Kitchen, Office, Mud Room, Primary Bedroom | The join in the **Alarm - Triggered** automation |
| Living Room + Kitchen | Living Room, Kitchen | The join in the **Living Room Pico Audio** automations |

Add any other combination you group often, such as Pool + Deck. The Music
card's Speakers view and its Outdoor and First Floor buttons still group
through Sonos. A group started from Music Assistant shows up there as a
normal Sonos group.

The alarm and Pico automations keep grouping with Sonos `media_player.join`.
That still works with Music Assistant installed. The Pico buttons also play
Sonos favorites, which only the Sonos entities can play. The two MA groups
above are for playing to those rooms from Music Assistant or the MA app.

## 3. Move announcements to the Music Assistant group

Every TTS announcement in this config targets one entity:

| Where | What it announces |
| --- | --- |
| `automations.yaml`, **Storm Watch Announcement** | Storm watch, Powerwall charging |
| `automations.yaml`, **Power Outage V2** | Running on backup battery |
| `notification_center/rules.yaml`, **Power Outage** | Power outage alert |
| `notification_center/rules.yaml`, **Powerwall Charge Low** | Powerwall at 25 % |

All four use `media_player.announcement_speakers`. It is a UI helper, not
YAML. Give that entity ID to the Music Assistant group, and every
announcement plays through Music Assistant with no config change:

1. In Home Assistant, go to **Settings > Devices & services > Helpers** and
   open **Announcement Speakers**. Write down its members. Then delete the
   helper, which frees the entity ID.
2. In Music Assistant, create the **Announcement Speakers** sync group with
   those members (step 2).
3. Back in Home Assistant, reload the Music Assistant integration and open
   the new group's entity. If its ID is not exactly
   `media_player.announcement_speakers` (for example it came out as
   `…_2`), open its settings (the gear icon) and change the entity ID to
   `media_player.announcement_speakers`.
4. Set the announcement volume. In Music Assistant, open each member under
   **Settings > Players**, go to the announcement settings, and set a fixed
   announcement volume. 30 % stays under the dashboard's 40 % cap. Turn the
   pre-announce chime on or off to taste.
5. Test from **Developer tools > Actions**:

   ```yaml
   action: tts.speak
   target:
     entity_id: tts.home_assistant_cloud
   data:
     media_player_entity_id: media_player.announcement_speakers
     message: This is a test of the announcement speakers.
   ```

   The announcement should play on every member. Any music Music Assistant
   was playing should dip and then continue.

Between steps 1 and 3 announcements have no target, so do the three steps
back to back. To undo, delete the MA group and recreate the helper with the
same name.

### Why this works

`tts.speak` sends the audio to the media player as an announcement.
Music Assistant plays announcements on a group by sending them to each
member. On Sonos it uses the speaker's own announcement feature, which
overlays the voice on the music instead of stopping it.

## 4. Quick checks after the move

- The Music card's Favorites still play. They go through the MA player with
  the room's name.
- The basement wall panel still browses and plays, using the same name match.
- Trigger a Notification Center test for one of the rules above, or wait for
  the next storm watch, and confirm the speakers announce.
