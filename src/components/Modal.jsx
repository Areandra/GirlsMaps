import { useRef } from "react";
import ColorPallate from "../theme/Color";

const GlobalModal = ({ visible, onDissmis, children, styles, ref }) => {
  return (
    <div
      ref={ref}
      style={{
        pointerEvents: visible ? "all" : "none",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.3s ease, transform 0.3s ease",
        backgroundColor: ColorPallate.background,
        borderRadius: "16px",
        padding: 5,
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.25)",
        scrollbarWidth: "none",
        zIndex: 999,
        backdropFilter: "blur(8px)",
        ...styles,
      }}
    >
      {children}
    </div>
  );
};

export default GlobalModal;
