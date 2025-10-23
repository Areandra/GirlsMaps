import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvent,
  AttributionControl,
  Tooltip,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import React, { useEffect, useRef, useState } from "react";
import logo from "../assets/pin.svg";

const icon = new L.Icon({
  iconUrl: logo,
  iconRetinaUrl: logo,
  iconSize: [20, 20],
  iconAnchor: [10, 20],
});

const FlyToMarker = ({ pin, setCurrentPin, currentPin }) => {
  const [hover, setHover] = useState([]);
  return (
    <Marker
      position={pin.koordinat}
      icon={icon}
      eventHandlers={{
        mouseover: () => setHover(pin.koordinat),
        mouseout: () => setHover([]),
        click: () => setCurrentPin(pin),
      }}
    >
      {(currentPin?.namaToko == pin.namaToko || hover === pin.koordinat) && (
        <Tooltip
          key={pin.namaToko}
          permanent
          direction="top"
          offset={[0, -20]}
          className="custom-tooltip"
        >
          {pin.namaToko}
        </Tooltip>
      )}
    </Marker>
  );
};

const Maps = React.memo(
  ({ lastPage, queryResult, setCurrentPin, windowSize, currentPin }) => {
    const mapRef = useRef();

    const RecenterMap = ({ position }) => {
      const map = useMap();
      useMapEvent("click", () => {
        setCurrentPin(null);
      });

      useEffect(() => {}, [lastPage, currentPin]);

      useEffect(() => {
        if (lastPage !== "map") {
          map.flyTo(position, 14);
        } else if (currentPin) {
          map.flyTo(
            [
              currentPin.koordinat[0] - (windowSize.width < 700 ? 0.0026 : 0),
              currentPin.koordinat[1] -
                (windowSize.width > 700 ? windowSize.width * 0.000004 : 0),
            ],
            16
          );
        }
      }, [lastPage, currentPin]);
    };

    const mapStyle = {
      container: {
        width: "100vw",
        height: "100dvh",
        position: "absolute",
        transform: "translateX(-50%) translateY(-50%)",
        zIndex: 1,
        backgroundColor: "#232226",
      },
      disbleMap: {
        pointerEvents: "auto",
        position: "fixed",
        left: 0,
        top: 0,
        width: "100vw",
        height: "100dvh",
        zIndex: 5,
      },
    };
    return (
      <div
        style={{
          transition: "0.3s ease",
          ...(lastPage === "about"
            ? {
                position: "relative",
                width: "100vw",
                height: "200vh",
                overflowX: "hidden",
                overflowY: "auto",
              }
            : {}),
        }}
      >
        {lastPage != "map" && <div style={mapStyle.disbleMap}></div>}
        <div
          style={{
            transition: lastPage === "about" ? "0.3s ease" : "",
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
            key={lastPage === "about" ? "about" : ""}
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
                    height: "120vh",
                    borderRadius: 18,
                    WebkitMaskImage:
                      "radial-gradient(circle at center, rgba(0,0,0,1), rgba(0,0,0,0))",
                    maskImage:
                      "radial-gradient(circle at center, rgba(0,0,0,1), rgba(0,0,0,0))",
                  }
                : {}),
            }}
            maxBounds={[
              [-0.95, 119.74],
              [-0.62, 120.05],
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
            <TileLayer
              url="/BasedMap/{z}/{x}/{y}.png"
              attribution="| Tiles &copy; GirlsMap"
            />
            {queryResult?.map((pin, index) => (
              <FlyToMarker
                key={pin.namaToko}
                pin={pin}
                setCurrentPin={setCurrentPin}
                currentPin={currentPin}
              />
            ))}
            <AttributionControl
              prefix='<a href="https://leafletjs.com">Leaflet</a>'
              position="bottomleft"
            />
          </MapContainer>
        </div>
      </div>
    );
  }
);

export default Maps;
