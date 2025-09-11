import { useState, useEffect } from "react";
import ColorPallate from "../theme/Color";
import { FiArrowRight } from "react-icons/fi";

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
}) => {
  const [active, setActive] = useState(false);
  const [hover, setHover] = useState(false);
  const buttonResetstyles = {
    button: {
      border: "none",
      outline: "none",
      boxShadow: "none",
      transition: "none",
      cursor: "pointer",
      fontSize: "12px",
      justifyContent: "center",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
  };
  const normalButtonStyles = {
    button: {
      padding: "10px 18px",
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
        color: ColorPallate.background,
      },
      hover: {
        color: ColorPallate.background,
        border: "none",
      },
    };

    useEffect(() => {
      console.log("Last Page: ", currentPage, id);
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
            color={hover ? ColorPallate.background : ColorPallate.primary}
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
  } else if (type === "floatingButton") {
    const floatingButtonStyles = {
      container: {
        borderRadius: "8px",
        transition:
          "top 0.3s ease, left 0.3s ease, transform 0.3s ease, width 0.3s ease",
        position: "fixed",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        padding: "10px 10px",
        backgroundColor: ColorPallate.background,
        gap: 18,
      },
    };
    const IconComponent = icon || FiArrowRight;
    return (
      <div style={{ ...floatingButtonStyles.container, ...style }}>
        <p
          style={{
            color: ColorPallate.text,
            fontSize: 12,
            fontWeight: 500,
            transform: "translateX(6px)",
          }}
        >
          {text}
        </p>
        <button
          id={id}
          style={{
            ...buttonResetstyles.button,
            ...normalButtonStyles.button,
            ...(hover ? normalButtonStyles.hover : {}),
          }}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          onClick={() => {
            onclick?.();
            setActive(!active);
          }}
        >
          <IconComponent
            size={18}
            color={!hover ? ColorPallate.background : ColorPallate.primary}
          />
        </button>
      </div>
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
            color={!hover ? ColorPallate.background : ColorPallate.primary}
          />
        </>
      )}
    </button>
  );
};

export default ButtonCostum;
