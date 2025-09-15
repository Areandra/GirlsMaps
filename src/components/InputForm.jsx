import { useRef, useState } from "react";
import ColorPallate from "../theme/Color";
import { FiSearch, FiX, FiXCircle } from "react-icons/fi";

export const InputForm = ({
  icon,
  placeholder,
  id,
  style,
  type,
  value,
  onChange,
  clearQuery,
  name,
  ref,
}) => {
  const [hover, setHover] = useState(false);
  const inputRef = useRef();
  
  const changeValue = () => {
    if (onChange) {
      onChange({ target: { value: "" } });
    }
    inputRef.current.focus();
  };

  const searchForm = {
    form: {
      backgroundColor: ColorPallate.inputBackground,
      border: "none",
      outline: "none",
      padding: "8px 18px",
      cursor: "text",
      fontSize: "12px",
      alignItems: "center",
      gap: "8px",
      borderRadius: "6px",
      justifyContent: "space-between",
      display: "flex",
      boxShadow: `inset 0 0 0 2px ${ColorPallate.inputBorder}, 0 4px 8px ${ColorPallate.buttonShadow}`,
    },
    hover: {
      backgroundColor: "transparent",
      color: ColorPallate.primary,
      boxShadow: `inset 0 0 0 2px ${ColorPallate.secondaryText}, inset 0 4px 8px rgba(0, 0, 0, 0.2)`,
    },
  };
  const IconComponent = icon || FiSearch;
  return (
    <div
      ref={ref}
      className="input"
      id={id}
      style={{
        ...searchForm.form,
        ...(hover ? searchForm.hover : {}),
        ...style?.container,
      }}
      onMouseEnter={() => {
        setHover(true);
      }}
      onMouseLeave={() => setHover(false)}
      onClick={() => {
        setHover(!hover);
        inputRef.current.focus();
      }}
    >
      <input
        ref={inputRef}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        style={{
          ...{ color: ColorPallate.text },
          ...style?.input,
        }}
      />
      {!value ? (
        <IconComponent
          size={18}
          color={hover ? ColorPallate.background : ColorPallate.primary}
        />
      ) : (
        <div
          onClick={() => changeValue()}
          style={{
            alignContent: "center",
            justifyContent: "center",
            display: "flex",
            cursor: "pointer",
          }}
        >
          <FiX
            size={18}
            color={hover ? ColorPallate.secondaryText : ColorPallate.background}
          />
        </div>
      )}
    </div>
  );
};
