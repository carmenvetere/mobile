"""Switch platform for Honeywell Lyric room priorities."""
from __future__ import annotations

import logging
from typing import Any

from aiolyric import Lyric
from aiolyric.objects.device import LyricDevice
from aiolyric.objects.location import LyricLocation
from aiolyric.objects.priority import LyricRoom

from homeassistant.components.switch import SwitchEntity, SwitchEntityDescription
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator

from . import LyricDeviceEntity
from .const import DOMAIN

_LOGGER = logging.getLogger(__name__)

PRIORITY_TYPE_PICKROOM = "PickARoom"
PRIORITY_TYPE_FOLLOWME = "FollowMe"
PRIORITY_TYPE_WHOLEHOUSE = "WholeHouse"

async def async_setup_entry(
    hass: HomeAssistant, entry: ConfigEntry, async_add_entities: AddEntitiesCallback
) -> None:
    """Set up Honeywell Lyric switch platform."""
    coordinator: DataUpdateCoordinator[Lyric] = hass.data[DOMAIN][entry.entry_id]

    entities = []
    for location in coordinator.data.locations:
        for device in location.devices:
            if device.device_class == "Thermostat" and device.device_id.startswith("LCC"):
                rooms = coordinator.data.rooms_dict.get(device.mac_id, {})
                for room_id, room in rooms.items():
                    _LOGGER.debug(
                        "Creating priority switch for room %s (%s) on device %s", 
                        room.room_name, room_id, device.device_id
                    )
                    entities.append(
                        LyricRoomPrioritySwitch(
                            coordinator,
                            location,
                            device,
                            room_id,
                            room,
                        )
                    )

    async_add_entities(entities)


class LyricRoomPrioritySwitch(LyricDeviceEntity, SwitchEntity):
    """Representation of a Lyric room priority switch."""

    _attr_has_entity_name = True

    def __init__(
        self,
        coordinator: DataUpdateCoordinator[Lyric],
        location: LyricLocation,
        device: LyricDevice,
        room_id: str,
        room: LyricRoom,
    ) -> None:
        """Initialize the room priority switch."""
        super().__init__(
            coordinator,
            location,
            device,
            f"{device.mac_id}_room_{room_id}_priority",
        )
        self._room_id = room_id
        self._room = room
        self._attr_name = f"{room.room_name} Priority"
        self._attr_unique_id = f"{device.mac_id}_room_{room_id}_priority"

    @property
    def room(self) -> LyricRoom:
        """Get the current room object."""
        return self.coordinator.data.rooms_dict.get(self._mac_id, {}).get(self._room_id)

    @property
    def is_on(self) -> bool:
        """Return true if the room is prioritized."""
        try:
            room = self.room
            if not room:
                return False

            # Get priority data from room attributes
            priority_data = room.attributes.get("priority_data", {})
            selected_rooms = priority_data.get("selected_rooms", [])
            priority_type = priority_data.get("type")
            
            is_selected = str(self._room_id) in map(str, selected_rooms)
            _LOGGER.debug(
                "Room %s priority check: id=%s, selected_rooms=%s, priority_type=%s, is_selected=%s",
                room.room_name, 
                self._room_id, 
                selected_rooms,
                priority_type,
                is_selected
            )
            
            return is_selected

        except Exception as e:
            _LOGGER.error("Error checking priority status: %s", str(e))
            return False

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        """Return additional state attributes."""
        data = {}
        room = self.room

        if room:
            data = {
                "room_name": room.room_name,
                "room_id": self._room_id,
                "temperature": room.room_avg_temp,
                "humidity": room.room_avg_humidity,
                "accessories": [
                    {
                        "id": acc.id,
                        "type": acc.type,
                    }
                    for acc in room.accessories
                ],
                "priority_data": room.attributes.get("priority_data", {})
            }

        return data

    async def async_turn_on(self, **kwargs: Any) -> None:
        """Turn on room priority."""
        try:
            device = self.device
            location = self.location
            
            # Get current priority data and append room
            priority_data = self.room.attributes.get("priority_data", {})
            current_rooms = list(priority_data.get("selected_rooms", []))
            if str(self._room_id) not in map(str, current_rooms):
                current_rooms.append(self._room_id)

            _LOGGER.debug(
                "Setting priority ON for %s with rooms %s",
                self._room.room_name,
                current_rooms
            )

            await self.coordinator.data.set_room_priority(
                location.location_id,
                device.device_id,
                priority_type=PRIORITY_TYPE_PICKROOM,
                selected_rooms=current_rooms
            )
            
            await self.coordinator.async_request_refresh()

        except Exception as exception:
            _LOGGER.error("Failed to set room priority: %s", str(exception))
            _LOGGER.exception("Detailed error information:")

    async def async_turn_off(self, **kwargs: Any) -> None:
        """Turn off room priority."""
        try:
            device = self.device
            location = self.location

            # Get current priority data and remove room
            priority_data = self.room.attributes.get("priority_data", {})
            current_rooms = list(priority_data.get("selected_rooms", []))
            current_rooms = [r for r in current_rooms if str(r) != str(self._room_id)]

            _LOGGER.debug(
                "Setting priority OFF for %s with remaining rooms %s",
                self._room.room_name,
                current_rooms
            )

            priority_type = PRIORITY_TYPE_WHOLEHOUSE if not current_rooms else PRIORITY_TYPE_PICKROOM
            
            await self.coordinator.data.set_room_priority(
                location.location_id,
                device.device_id,
                priority_type=priority_type,
                selected_rooms=current_rooms
            )
            
            await self.coordinator.async_request_refresh()

        except Exception as exception:
            _LOGGER.error("Failed to clear room priority: %s", str(exception))
            _LOGGER.exception("Detailed error information:")