import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useRef } from "react";
import logo from "../assets/pin.svg";
import ColorPallate from "../theme/Color";

const icon = new L.Icon({
  iconUrl: logo,
  iconRetinaUrl: logo,
  iconSize: [24, 24],
  iconAnchor: [12, 24],
  popupAnchor: [0, -30],
});

const FlyToMarker = ({ pin, setCurrentPin, position }) => {
  const map = useMap();

  const handleClick = () => {
    setCurrentPin(pin);
    map.flyTo(position, 18);
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
        <div>
          <h3 style={{ margin: 0, color: ColorPallate.text, textAlign: "center", fontSize: 12}}>{pin.NamaTempat}</h3>
        </div>
      </Popup>
    </Marker>
  );
};

const Maps = ({ lastPage, queryResult, setCurrentPin, windowSize }) => {
  const mapRef = useRef();
  const RecenterMap = ({ position }) => {
    const map = useMap();
    useMapEvent("click", () => {
      setCurrentPin(null);
    });

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
      pointerEvents: "auto",
      position: "fixed",
      left: 0,
      top: 0,
      width: "100vw",
      height: "100dvh",
      zIndex: 10,
    },
  };
  return (
    <div>
      {lastPage != "map" && <div style={mapStyle.disbleMap}></div>}
      <MapContainer
        center={[-0.8975593, 119.8606656]}
        zoom={14}
        subdomains= {["a", "b", "c", "d"]}
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
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
        />
        {queryResult?.map((pin, index) => (
          <FlyToMarker
            key={index}
            pin={pin}
            setCurrentPin={setCurrentPin}
            position={[
              pin.Latitude - (windowSize.width < 700 ? 0.00065 : 0),
              pin.Longitude,
            ]}
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default Maps;
