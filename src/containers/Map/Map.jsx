import React, { useEffect, useRef, useContext, useCallback } from "react";
import { Context } from "../../contexts/CountriesContext";
import { TileLayer, MapContainer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

import "leaflet/dist/leaflet.css";
import "./Map.css";

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});

L.Marker.prototype.options.icon = DefaultIcon;

L.Icon.Default.imagePath = "/";

const OPEN_STREET_MAP_URL =
  "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";

const Map = ({ country }) => {
  const { selectedCountry } = useContext(Context);
  const mapRef = useRef();

  const updateMarkers = useCallback(() => {
    if (country != null) {
      const map = mapRef.current;
      if (map) {
        map.setView(country.latlng, 6, {
          duration: 2,
        });
      }
    }
  }, [country]);

  useEffect(() => {
    updateMarkers();
  }, [updateMarkers]);

  return (
    <MapContainer ref={mapRef} center={selectedCountry.latlng} zoom={3} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        url={OPEN_STREET_MAP_URL}
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {selectedCountry && (
        <Marker position={selectedCountry.latlng}>
          <Popup>
            Hey, you are here
            <span role="img" aria-label="hey">
              👋
            </span>
          </Popup>
        </Marker>
      )}
      {country && <Marker position={country.latlng} />}
    </MapContainer>
  );
};

export default Map;
