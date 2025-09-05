import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect } from "react";
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

const Maps = ({ lastPage }) => {
  const RecenterMap = ({ position }) => {
    const map = useMap();

    useEffect(() => {
      if (lastPage !== "map") {
        map.flyTo([-0.8975593, 119.8606656], 14);
      }
    }, [lastPage, position]);
  };

  const storeLocation = [
    { Latitude: -0.8888343, Longitude: 119.877946, NamaTempat: "BNS Zone" },
    { Latitude: -0.8931146, Longitude: 119.8768305, NamaTempat: "Central" },
    {
      Latitude: -0.892791,
      Longitude: 119.876481,
      NamaTempat: "Miracle of beauty (jl.tadulako)",
    },
    {
      Latitude: -0.894745,
      Longitude: 119.873842,
      NamaTempat: "Miracle of Beauty (jl.Sedap Malam)",
    },
    { Latitude: -0.89541, Longitude: 119.876661, NamaTempat: "Mutiara" },
    { Latitude: -0.904135, Longitude: 119.899824, NamaTempat: "Elza" },
    {
      Latitude: -0.921445,
      Longitude: 119.894108,
      NamaTempat: "Ratu Kosmetik",
    },
    {
      Latitude: -0.9081902,
      Longitude: 119.8699379,
      NamaTempat: "Palu Make Up",
    },
    {
      Latitude: -0.9097084,
      Longitude: 119.8699488,
      NamaTempat: "Ulzzang Beauty Shop",
    },
    {
      Latitude: -0.9064716,
      Longitude: 119.8817745,
      NamaTempat: "Store Beauty Palu",
    },
    { Latitude: -0.9003111, Longitude: 119.8738284, NamaTempat: "Nims" },
    {
      Latitude: -0.9001559,
      Longitude: 119.8746103,
      NamaTempat: "Palu Mitra Utama (Latulipe)",
    },
    {
      Latitude: -0.924577,
      Longitude: 119.895209,
      NamaTempat: "Dobe (jl Dewi Sartika)",
    },
    { Latitude: -0.938144, Longitude: 119.900659, NamaTempat: "Di’Shop" },
    { Latitude: -0.938801, Longitude: 119.900634, NamaTempat: "Gauri Shop" },
    { Latitude: -0.931415, Longitude: 119.884736, NamaTempat: "Beauty Box" },
    { Latitude: -0.923439, Longitude: 119.879338, NamaTempat: "Suso Beauty" },
    {
      Latitude: -0.891926,
      Longitude: 119.855257,
      NamaTempat: "Dobe (jl. Diponegoro)",
    },
    { Latitude: -0.883634, Longitude: 119.842511, NamaTempat: "Sociolla" },
    { Latitude: -0.883521, Longitude: 119.842823, NamaTempat: "Oh Some" },
    { Latitude: -0.883789, Longitude: 119.842419, NamaTempat: "Hypermart" },
    { Latitude: -0.847277, Longitude: 119.882566, NamaTempat: "Mikha Shop" },
    {
      Latitude: -0.880195,
      Longitude: 119.872596,
      NamaTempat: "MS Glow Talise",
    },
    { Latitude: -0.85377, Longitude: 119.88379, NamaTempat: "Ce Arra" },
    {
      Latitude: -0.887125,
      Longitude: 119.884175,
      NamaTempat: "HN Beauty Store",
    },
    {
      Latitude: -0.847973,
      Longitude: 119.891954,
      NamaTempat: "Guzel Cosmetics",
    },
    {
      Latitude: -0.88571,
      Longitude: 119.881915,
      NamaTempat: "Lins Beauty Skin",
    },
  ];

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
        <RecenterMap position={[-0.8975593, 119.8686656]} />
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        />
        {storeLocation.map((pin) => (
          <Marker position={[pin.Latitude, pin.Longitude]} icon={icon}>
            <Popup>{pin.NamaTempat}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Maps;
