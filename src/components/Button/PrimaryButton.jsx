import { useState } from "react";
import ColorPallate from "../../theme/Color";

const Button = ({ onclick, style, id, icon, children, text }) => {
  const IconComponent = icon;
  const [active, setActive] = useState(false);
  const [hover, setHover] = useState(false);
  return (
    <button
      id={id}
      style={{
        ...ButtonStyles.button,
        ...style,
        ...(hover ? { ...ButtonStyles.hover, ...style?.hover } : {}),
        ...(text
          ? {
              boxShadow: "",
              background: "transparent",
              color: ColorPallate.primary,
              border: "none",
              cursor: "pointer",
            }
          : {}),
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => {
        onclick?.();
        setActive(!active);
        setHover(!hover);
      }}
    >
      <>
        {children}
        {icon && (
          <IconComponent
            size={18}
            color={!hover ? "rgba(22, 27, 34, 1)" : ColorPallate.primary}
          />
        )}
      </>
    </button>
  );
};

const ButtonStyles = {
  button: {
    borderRadius: 12,
    fontSize: "12px",
    cursor: "pointer",
    border: "none",
    transition: "0.1s ease",
    padding: "10px 16px",
    background: ColorPallate.primaryGradient,
    justifyContent: "center",
    color: "black",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    boxShadow: `inset 0 0 0 3px ${ColorPallate.secondary}, inset 0 4px 8px rgba(0, 0, 0, 0.2),  0px 4px 4px rgba(0, 0, 0, 0.1)`,
  },
  hover: {
    boxShadow: `inset 0 0 0 2px ${ColorPallate.primary}, inset 0 4px 8px rgba(0, 0, 0, 0.2)`,
    color: ColorPallate.secondary,
    scale: 1.05,
  },
};

export default Button;
