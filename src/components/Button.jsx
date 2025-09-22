import { useState, useEffect } from "react";
import ColorPallate from "../theme/Color";
import { FiArrowRight } from "react-icons/fi";
import { BiBorderRadius } from "react-icons/bi";

const ButtonCostum = ({
  onclick,
  text,
  style,
  id,
  type,
  currentPage,
  onHoverEnter,
  onHoverExit,
  icon,
  content,
  hoverScale,
  hoverColor,
  activeColor,
}) => {
  const [active, setActive] = useState(false);
  const [hover, setHover] = useState(false);
  const buttonResetstyles = {
    button: {
      border: "none",
      outline: "none",
      boxShadow: "none",
      transition: "0.1s ease",
      cursor: "pointer",
      fontSize: "12px",
      justifyContent: "center",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      borderRadius: 12,
    },
  };
  const normalButtonStyles = {
    button: {
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
      backgroundColor: ColorPallate.background,
      color: ColorPallate.secondary,
      scale: hoverScale || 1.05,
      boxShadow: `inset 0 0 0 2px ${ColorPallate.primary}, inset 0 4px 8px rgba(0, 0, 0, 0.2)`,
    },
  };
  if (type === "navbarButton") {
    const navbarbuttonStyles = {
      button: {
        backgroundColor: "transparent",
        color: ColorPallate.text,
      },
      active: {
        color: activeColor || "rgba(22, 27, 34, 1)",
      },
      hover: {
        color: hoverColor || "rgba(22, 27, 34, 1)",
        border: "none",
      },
    };

    useEffect(() => {
      if (currentPage === id) {
        setActive(true);
      } else {
        setActive(false);
      }
    }, [currentPage, id]);
    const IconComponent = icon;

    return (
      <button
        id={id}
        style={{
          ...buttonResetstyles.button,
          ...navbarbuttonStyles.button,
          ...(active ? navbarbuttonStyles.active : {}),
          ...(hover ? navbarbuttonStyles.hover : {}),
          ...style,
        }}
        onMouseEnter={() => {
          setHover(true);
          onHoverEnter?.();
        }}
        onMouseLeave={() => {
          setHover(false);
          onHoverExit?.();
        }}
        onClick={() => {
          setActive(true);
          onclick?.();
        }}
      >
        {text}{" "}
        {icon && (
          <IconComponent
            size={18}
            color={hover ? "rgba(22, 27, 34, 1)" : ColorPallate.primary}
          />
        )}
      </button>
    );
  } else if (type === "textButton") {
    const textButtonStyles = {
      button: {
        background: "transparent",
        color: ColorPallate.primary,
        border: "none",
        cursor: "pointer",
      },
      hover: {
        fontWeight: "bold",
        scale: 1.05,
        boxShadow: `0px 4px 4px rgba(0, 0, 0, 0.25), 0 0 10px ${ColorPallate.buttonShadow}`,
      },
    };
    const IconComponent = icon;
    return (
      <button
        id={id}
        style={{
          ...textButtonStyles.button,
          ...style,
          ...buttonResetstyles.button,
          ...(hover ? textButtonStyles.hover : {}),
        }}
        onClick={onclick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        {text}
        {icon && <IconComponent size={18} color={ColorPallate.primary} />}
      </button>
    );
  }
  const IconComponent = icon || FiArrowRight;
  return (
    <button
      id={id}
      style={{
        ...buttonResetstyles.button,
        ...normalButtonStyles.button,
        ...(hover ? normalButtonStyles.hover : {}),
        ...style,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => {
        onclick?.();
        setActive(!active);
        setHover(!hover);
      }}
    >
      {content || (
        <>
          {text}
          <IconComponent
            size={18}
            color={!hover ? "rgba(22, 27, 34, 1)" : ColorPallate.primary}
          />
        </>
      )}
    </button>
  );
};

export default ButtonCostum;
