import { useRef, useState } from "react";
import ColorPallate from "../theme/Color";
import { FiSearch } from "react-icons/fi";

export const InputForm = ({
  icon,
  placeholder,
  id,
  style,
  type,
  value,
  onChange,
}) => {
  const [hover, setHover] = useState(false);
  const inputRef = useRef();

  const searchForm = {
    form: {
      backgroundColor: ColorPallate.secondaryText,
      border: "none",
      outline: "none",
      cursor: "text",
      fontSize: "12px",
      flex: 1,
      alignItems: "center",
      gap: "8px",
      borderRadius: "8px",
      justifyContent: "space-between",
      display: "flex",
      boxShadow: `inset 0 4px 8px rgba(0, 0, 0, 0.2),  0px 4px 4px rgba(0, 0, 0, 0.25)`,
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
      className="input"
      id={id}
      style={{
        ...searchForm.form,
        ...(!hover ? searchForm.hover : {}),
        ...style?.container,
      }}
      onMouseEnter={() => {
        setHover(true);
        inputRef.current.hover().placeholder;
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
        style={{
          ...{ color: ColorPallate.text },
          ...style?.input,
        }}
      />
      <IconComponent
        size={18}
        color={hover ? ColorPallate.background : ColorPallate.primary}
      />
    </div>
  );
};
