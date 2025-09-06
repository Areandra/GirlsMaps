import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useRef, useState } from "react";
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

const FlyToMarker = ({ pin, setCurrentPin }) => {
  const map = useMap();

  const handleClick = () => {
    setCurrentPin(pin);
    map.flyTo([pin.Latitude, pin.Longitude], 18);
  };

  return (
    <Marker
      position={[pin.Latitude, pin.Longitude]}
      icon={icon}
      eventHandlers={{
        click: handleClick,
        mouseover: (e) => e.target.openPopup(),
        mouseout: (e) => e.target.closePopup(),
      }}
    >
      <Popup>
        <div style={{ padding: "8px", minWidth: "150px" }}>
          <h3 style={{ margin: 0, color: "#333" }}>Produk A</h3>
          <p style={{ margin: "4px 0", fontSize: "14px" }}>
            Deskripsi singkat produk
          </p>
          <button
            style={{
              background: "#007bff",
              color: "#fff",
              border: "none",
              padding: "6px 10px",
              borderRadius: "6px",
              cursor: "pointer",
            }}
          >
            Detail
          </button>
        </div>
      </Popup>
    </Marker>
  );
};

const Maps = ({ lastPage, queryResult, setCurrentPin }) => {
  const mapRef = useRef();
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
      width: "100vw",
      height: "100dvh",
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
        whenCreated={(mapInstance) => {
          mapRef.current = mapInstance;
        }}
      >
        <RecenterMap position={[-0.8975593, 119.8606656]} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        />
        {queryResult?.map((pin, index) => (
          <FlyToMarker key={index} pin={pin} setCurrentPin={setCurrentPin} />
        ))}
      </MapContainer>
    </div>
  );
};

export default Maps;
