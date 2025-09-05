import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";

const icon = new L.Icon({
  iconUrl: logo,
  iconRetinaUrl: logo,
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [54, 54],
  iconAnchor: [27, 54],
  popupAnchor: [0, -47],
  shadowSize: [41, 41],
});

const Maps = ({ lastPage, queryResult }) => {
  const RecenterMap = ({ position }) => {
    const map = useMap();

    useEffect(() => {
      if (lastPage !== "map") {
        map.flyTo(position, 14);
      }
    }, [lastPage, position]);
  };

  const mapStyle = {
    container: {
      width: "100%",
      height: "100vh",
      position: "absolute",
      transform: "translateX(-50%) translateY(-50%)",
      zIndex: 1,
    },
    disbleMap: {
      pointerEvents: "none",
    },
  };
  return (
    <div style={{ ...(lastPage != "map" ? mapStyle.disbleMap : {}) }}>
      <MapContainer
        center={[-0.8975593, 119.8606656]}
        zoom={14}
        style={{
          ...mapStyle.container,
        }}
        maxBounds={[
          [-1.05, 119.75],
          [-0.75, 120.0],
        ]}
        zoomControl={false}
        maxBoundsViscosity={1.0}
        minZoom={14}
      >
        <RecenterMap position={[-0.8975593, 119.8606656]} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        />
        {queryResult?.map((pin, index) => (
          <Marker key={index} position={[pin.Latitude, pin.Longitude]} icon={icon}>
            <Popup>{pin.NamaTempat}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Maps;
