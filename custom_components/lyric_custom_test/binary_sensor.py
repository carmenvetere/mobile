"""Support for Honeywell Lyric motion sensors."""
from __future__ import annotations

import logging
from typing import Any

from aiolyric import Lyric
from aiolyric.objects.device import LyricDevice
from aiolyric.objects.location import LyricLocation
from aiolyric.objects.priority import LyricRoom, LyricAccessory

from homeassistant.components.binary_sensor import (
    BinarySensorDeviceClass,
    BinarySensorEntity,
)
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator

from . import LyricAccessoryEntity
from .const import DOMAIN

_LOGGER = logging.getLogger(__name__)

async def async_setup_entry(
    hass: HomeAssistant, entry: ConfigEntry, async_add_entities: AddEntitiesCallback
) -> None:
    """Set up Lyric binary sensors based on a config entry."""
    coordinator: DataUpdateCoordinator[Lyric] = hass.data[DOMAIN][entry.entry_id]

    entities = []

    for location in coordinator.data.locations:
        for device in location.devices:
            if device.device_class == "Thermostat" and device.device_id.startswith("LCC"):
                rooms = coordinator.data.rooms_dict.get(device.mac_id, {})
                for room_id, room in rooms.items():
                    for accessory in room.accessories:
                        if (
                            accessory.type == "IndoorAirSensor" 
                            and not accessory.exclude_motion
                        ):
                            _LOGGER.debug(
                                "Creating motion sensor for room %s accessory %s",
                                room.room_name,
                                accessory.id,
                            )
                            entities.append(
                                LyricMotionSensor(
                                    coordinator,
                                    location,
                                    device,
                                    room,
                                    accessory,
                                )
                            )

    async_add_entities(entities)


class LyricMotionSensor(LyricAccessoryEntity, BinarySensorEntity):
    """Representation of a Lyric motion sensor."""

    _attr_device_class = BinarySensorDeviceClass.MOTION

    def __init__(
        self,
        coordinator: DataUpdateCoordinator[Lyric],
        location: LyricLocation,
        device: LyricDevice,
        room: LyricRoom,
        accessory: LyricAccessory,
    ) -> None:
        """Initialize the motion sensor."""
        super().__init__(
            coordinator,
            location,
            device,
            room,
            accessory,
            f"{device.mac_id}_room{room.id}_acc{accessory.id}_motion",
        )
        self._attr_name = f"{room.room_name} Motion"
        self._attr_unique_id = f"{device.mac_id}_room{room.id}_acc{accessory.id}_motion"

    @property
    def is_on(self) -> bool:
        """Return true if motion is detected."""
        return self.accessory.detect_motion

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        """Return entity specific state attributes."""
        data = super().extra_state_attributes or {}
        data["status"] = self.accessory.status
        return data