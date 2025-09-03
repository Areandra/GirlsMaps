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
        {text}{" "}
        {icon && (
          <IconComponent
            size={18}
            color={hover ? ColorPallate.background : ColorPallate.primary}
          />
        )}
      </button>
    );
  }
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
    active: {
      backgroundColor: ColorPallate.secondary,
    },
    hover: {
      backgroundColor: "transparent",
      color: ColorPallate.primary,
      scale: 1.05,
      boxShadow: `inset 0 0 0 2px ${ColorPallate.primary}, inset 0 4px 8px rgba(0, 0, 0, 0.2)`,
    },
  };
  const IconComponent = FiArrowRight || icon;
  return (
    <button
      id={id}
      style={{
        ...buttonResetstyles.button,
        ...normalButtonStyles.button,
        ...(active ? normalButtonStyles.active : {}),
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
      {text}{" "}
      <IconComponent
        size={18}
        color={!hover ? ColorPallate.background : ColorPallate.primary}
      />
    </button>
  );
};

export default ButtonCostum;
