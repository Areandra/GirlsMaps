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
      backgroundColor: ColorPallate.primary,
      borderRadius: "30px",
      justifyContent: "center",
      color: "white",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      boxShadow: `inset 0 0 0 3px ${ColorPallate.secondary}, inset 0 4px 8px rgba(0, 0, 0, 0.2),  0px 4px 4px rgba(0, 0, 0, 0.25)`,
    },
    hover: {
      backgroundColor: "transparent",
      color: ColorPallate.primary,
      scale: 1.05,
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
        testShadow:
          "0 0 15px rgba(248, 187, 208, 0.7), 0 0 30px rgba(248, 187, 208, 0.5), 0 0 45px rgba(248, 187, 208, 0.3)",
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
        borderRadius: "40px",
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
        transition:
          "top 0.3s ease, left 0.3s ease, transform 0.3s ease, width 0.3s ease",
        position: "fixed",
        top: "3vh",
        right: "0%",
        transform: "translateX(-25%)",
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        padding: "8px 14px",
        backgroundColor: ColorPallate.background,
      },
    };
    const IconComponent = icon || FiArrowRight;
    return (
      <div style={floatingButtonStyles.container}>
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
          }}
        >
          {text}
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
      }}
    >
      {text}
      <IconComponent
        size={18}
        color={!hover ? ColorPallate.background : ColorPallate.primary}
      />
    </button>
  );
};

export default ButtonCostum;
