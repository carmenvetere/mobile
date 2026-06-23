"""Support for Honeywell Lyric ventilation control."""
from __future__ import annotations

import logging
from typing import Any

import voluptuous as vol

from aiolyric import Lyric
from aiolyric.objects.device import LyricDevice
from aiolyric.objects.location import LyricLocation

from homeassistant.components.fan import (
    FanEntity,
    FanEntityDescription,
    FanEntityFeature,
)
from homeassistant.config_entries import ConfigEntry
from homeassistant.core import HomeAssistant
from homeassistant.helpers import entity_platform
from homeassistant.helpers.entity_platform import AddEntitiesCallback
from homeassistant.helpers.update_coordinator import DataUpdateCoordinator

from . import LyricDeviceEntity
from .const import DOMAIN

_LOGGER = logging.getLogger(__name__)

# Ventilation modes
PRESET_ON = "On"
PRESET_OFF = "Off"
PRESET_AUTO = "Auto"

async def async_setup_entry(
    hass: HomeAssistant, entry: ConfigEntry, async_add_entities: AddEntitiesCallback
) -> None:
    """Set up Honeywell Lyric ventilation platform."""
    coordinator: DataUpdateCoordinator[Lyric] = hass.data[DOMAIN][entry.entry_id]

    entities = []
    for location in coordinator.data.locations:
        for device in location.devices:
            if device.device_class == "Thermostat":
                vent_settings = device.settings.attributes.get("ventilationModeSettings")
                if vent_settings is not None:
                    _LOGGER.debug(
                        "Found ventilation settings for device %s: %s",
                        device.name,
                        vent_settings
                    )
                    entities.append(
                        LyricVentilationFan(
                            coordinator,
                            location,
                            device,
                        )
                    )

    if entities:
        _LOGGER.debug("Adding %s ventilation fan entities", len(entities))
        async_add_entities(entities)


class LyricVentilationFan(LyricDeviceEntity, FanEntity):
    """Representation of a Lyric ventilation fan."""

    _attr_supported_features = (
        FanEntityFeature.PRESET_MODE
        | FanEntityFeature.TURN_ON
        | FanEntityFeature.TURN_OFF
    )

    def __init__(
        self,
        coordinator: DataUpdateCoordinator[Lyric],
        location: LyricLocation,
        device: LyricDevice,
    ) -> None:
        """Initialize the ventilation fan."""
        super().__init__(
            coordinator,
            location,
            device,
            f"{device.mac_id}_ventilation",
        )
        self._attr_unique_id = f"{device.mac_id}_ventilation"
        self._attr_name = f"{device.name} Ventilation"
        self._attr_preset_modes = [PRESET_ON, PRESET_OFF, PRESET_AUTO]
        _LOGGER.debug(
            "Initialized ventilation fan entity %s with unique_id %s",
            self.name,
            self.unique_id
        )

    @property
    def is_on(self) -> bool:
        """Return true if ventilation is on."""
        mode = self.device.settings.attributes.get("ventilationModeSettings", {}).get("changeableValues")
        is_active = mode in ["On", "Auto"]
        _LOGGER.debug(
            "%s ventilation is_on check: mode=%s, is_active=%s",
            self.name,
            mode,
            is_active
        )
        return is_active

    @property
    def preset_mode(self) -> str | None:
        """Return the current preset mode."""
        vent_settings = self.device.settings.attributes.get("ventilationModeSettings", {})
        mode = vent_settings.get("changeableValues", "Off")
        
        _LOGGER.debug(
            "%s ventilation preset mode: %s (settings: %s)",
            self.name,
            mode,
            vent_settings
        )
        return mode

    async def async_turn_on(
        self,
        percentage: int | None = None,
        preset_mode: str | None = None,
        **kwargs: Any,
    ) -> None:
        """Turn on the fan."""
        _LOGGER.debug("Turning on %s ventilation (preset=%s)", self.name, preset_mode)
        try:
            if preset_mode is not None:
                await self.async_set_preset_mode(preset_mode)
            else:
                await self._async_update_ventilation(mode="On")
            await self.coordinator.async_request_refresh()
        except Exception as err:
            _LOGGER.error("Error turning on ventilation: %s", err)
            raise

    async def async_turn_off(self, **kwargs: Any) -> None:
        """Turn off the fan."""
        _LOGGER.debug("Turning off %s ventilation", self.name)
        try:
            await self._async_update_ventilation(mode="Off")
            await self.coordinator.async_request_refresh()
        except Exception as err:
            _LOGGER.error("Error turning off ventilation: %s", err)
            raise

    async def async_set_preset_mode(self, preset_mode: str) -> None:
        """Set the preset mode."""
        _LOGGER.debug("Setting %s ventilation preset mode to %s", self.name, preset_mode)
        try:
            await self._async_update_ventilation(mode=preset_mode)
            await self.coordinator.async_request_refresh()
        except Exception as err:
            _LOGGER.error("Error setting ventilation preset mode: %s", err)
            raise

    async def _async_update_ventilation(
        self,
        mode: str,
    ) -> None:
        """Update ventilation mode by updating thermostat settings."""
        try:
            _LOGGER.debug(
                "Updating %s ventilation mode to: %s",
                self.name,
                mode
            )

            # Get current device settings
            current_settings = self.device.settings.attributes
            
            _LOGGER.debug("Current settings before update: %s", current_settings)

            # Use correct parameter names for update_thermostat
            await self._update_thermostat(
                self.location,
                self.device,
                mode=self.device.changeable_values.mode,
                heat_setpoint=self.device.changeable_values.heat_setpoint,
                cool_setpoint=self.device.changeable_values.cool_setpoint,
                settings=current_settings | {
                    "ventilationModeSettings": {
                        **current_settings.get("ventilationModeSettings", {}),
                        "changeableValues": mode
                    }
                }
            )
            
        except Exception as err:
            _LOGGER.error("Error in ventilation update: %s", err, exc_info=True)
            _LOGGER.error("Current device settings: %s", self.device.settings.attributes)
            raise

    @property
    def extra_state_attributes(self) -> dict[str, Any]:
        """Return additional state attributes."""
        vent_settings = self.device.settings.attributes.get("ventilationModeSettings", {})
        return {
            "mode": vent_settings.get("changeableValues"),
            "fan_requested": vent_settings.get("ventilationFanRequested"),
            "ventilation_timer": vent_settings.get("ventilationTimer", 0),
            "boost_timer": vent_settings.get("ventilationBoostTimer", 0),
            "core_timer": vent_settings.get("ventilationCoreTimer", 0),
        }