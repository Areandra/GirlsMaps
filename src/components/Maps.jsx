import {
  MapContainer,
  TileLayer,
  Marker,
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
  iconAnchor: [12, 12],
  popupAnchor: [0, -30],
});

const FlyToMarker = ({ pin, setCurrentPin }) => {
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
    <div
      style={{
        ...(lastPage === "about"
          ? {
              position: "relative",
              width: "100vw",
              height: "200dvh",
              overflowX: "hidden",
              overflowY: "auto",
            }
          : {}),
      }}
    >
      {lastPage != "map" && <div style={mapStyle.disbleMap}></div>}
      <div
        style={{
          ...(lastPage === "about"
            ? {
                position: "absolute",
                transform:
                  "rotate(-10deg) rotateX(-50deg) rotateY(-20deg) rotateZ(-20deg)",
                left: "68vw",
                bottom: "43%",
              }
            : {}),
        }}
      >
        <MapContainer
          center={
            lastPage !== "about"
              ? [-0.8975593, 119.8606656]
              : [-0.8784625032694423, 119.87812283714719]
          }
          zoom={14}
          subdomains={["a", "b", "c", "d"]}
          style={{
            ...mapStyle.container,
            ...(lastPage === "about"
              ? {
                  width: "120vw",
                  height: "120dvh",
                  borderRadius: 18,
                  WebkitMaskImage:
                    "radial-gradient(circle at center, rgba(0,0,0,1), rgba(0,0,0,0))",
                  maskImage:
                    "radial-gradient(circle at center, rgba(0,0,0,1), rgba(0,0,0,0))",
                }
              : {}),
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
          <RecenterMap
            position={
              lastPage !== "about"
                ? [-0.8975593, 119.8606656]
                : [-0.913625032694423, 119.87812283714719]
            }
          />
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a style={{backgroundColor: transparent}} href="https://www.openstreetmap.org/copyright">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>'
          />
          {queryResult?.map((pin, index) => (
            <FlyToMarker key={index} pin={pin} setCurrentPin={setCurrentPin} />
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default Maps;
