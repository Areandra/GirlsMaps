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
  return (
    <Marker
      position={pin.koordinat}
      icon={icon}
      eventHandlers={{
        click: () => setCurrentPin(pin),
      }}
    ></Marker>
  );
};

const Maps = ({
  lastPage,
  queryResult,
  setCurrentPin,
  windowSize,
  currentPin,
}) => {
  const mapRef = useRef();
  const RecenterMap = ({ position }) => {
    const map = useMap();
    useMapEvent("click", () => {
      setCurrentPin(null);
    });

    useEffect(() => {
      if (lastPage !== "map") {
        map.flyTo(position, 14);
      } else if (currentPin) {
        map.flyTo(
          [
            currentPin.koordinat[0] - (windowSize.width < 700 ? 0.00065 : 0),
            currentPin.koordinat[1],
          ],
          18
        );
      }
    }, [lastPage, position, currentPin]);
  };

  const mapStyle = {
    container: {
      width: "100vw",
      height: "100dvh",
      position: "absolute",
      transform: "translateX(-50%) translateY(-50%)",
      zIndex: 1,
      backgroundColor: "black",
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
        subdomains={["a", "b", "c", "d"]}
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
          attribution='&copy; <a style={{backgroundColor: transparent}} href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
        />
        {queryResult?.map((pin, index) => (
          <FlyToMarker
            key={index}
            pin={pin}
            setCurrentPin={setCurrentPin}
            position={[
              pin.koordinat[0] - (windowSize.width < 700 ? 0.00065 : 0),
              pin.koordinat[1],
            ]}
          />
        ))}
      </MapContainer>
    </div>
  );
};

export default Maps;
