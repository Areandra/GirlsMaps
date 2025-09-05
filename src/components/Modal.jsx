import { useRef } from "react";

const GlobalModal = ({ visible, onDissmis, children, styles }) => {
  const eRef = useRef();
  return (
    <div
      ref={eRef}
      style={{
        pointerEvents: visible ? "all" : "none",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.3s ease",
        backgroundColor: "#fff",
        borderRadius: "16px",
        padding: "1.4vw",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
        overflowY: "auto",
        scrollbarWidth: "none",
        ...styles
      }}
    >
      {children}
    </div>
  );
};

export default GlobalModal