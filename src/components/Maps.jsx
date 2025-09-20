import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvent,
  AttributionControl,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useRef } from "react";
import logo from "../assets/pin.svg";

const icon = new L.Icon({
  iconUrl: logo,
  iconRetinaUrl: logo,
  iconSize: [20, 20],
  iconAnchor: [10, 20],
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
            currentPin.koordinat[0] - (windowSize.width < 700 ? 0.0026 : 0),
            currentPin.koordinat[1],
          ],
          16
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
      backgroundColor: "rgba(71, 71, 73, 1)",
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
        transition:
          "height 0.3s ease, width 0.2s ease, left 0.3s ease, right 0.3s ease,bottom 0.3s ease",
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
          transition: "transform 0.5s ease, left 0.5s ease, bottom 0.5s ease",
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
          key={lastPage}
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
          minZoom={13}
          maxZoom={16}
          whenCreated={(mapInstance) => {
            mapRef.current = mapInstance;
          }}
          attributionControl={false}
        >
          <RecenterMap
            position={
              lastPage !== "about"
                ? [-0.8975593, 119.8606656]
                : [-0.913625032694423, 119.87812283714719]
            }
          />
          <TileLayer
            url="https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}"
            attribution="Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ"
          />
          {queryResult?.map((pin, index) => (
            <FlyToMarker key={index} pin={pin} setCurrentPin={setCurrentPin} />
          ))}
          <AttributionControl
            prefix='<a href="https://leafletjs.com">Leaflet</a>'
            position="bottomleft"
          />
        </MapContainer>
      </div>
    </div>
  );
};

export default Maps;
