import { useEffect, useState, useRef } from "react";
import { Card } from "../components/Card";
import ColorPallate from "../theme/Color";

export const AutoSlideCard = ({ cardContentList }) => {
  const [activeIndex, setActiveIndex] = useState(null);
  const serviceContainerRef = useRef();

  useEffect(() => {
    if (activeIndex === null) setActiveIndex(0);
  }, [activeIndex]);

  useEffect(() => {
    const container = serviceContainerRef.current;

    const handleScroll = () => {
      const itemWidth = container.children[0].offsetWidth;
      const index = Math.round(container.scrollLeft / itemWidth);
      setActiveIndex(index);
    };

    container.addEventListener("scroll", handleScroll);

    const interval = setInterval(() => {
      container.scrollBy({
        left:
          activeIndex === 0
            ? container.children[0].offsetWidth
            : -container.children[0].offsetWidth,
        behavior: "smooth",
      });
    }, 5000);

    return () => {
      clearInterval(interval);
      container.removeEventListener("scroll", handleScroll);
    };
  }, [activeIndex]);

  return (
    <>
      <div
        ref={serviceContainerRef}
        style={{
          display: "flex",
          flexDirection: "row",
          alignContent: "center",
          width: 200,
          justifyContent: "flex-start",
          overflow: "auto",
          padding: "10px 14px 10px 14px",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          gap: 8,
        }}
      >
        {cardContentList.map((i, index) => (
          <Card
            key={index}
            text={i.text}
            id={i.id}
            imageUrl={i.imageUrl}
            onClick={() => i.onClick()}
            styles={{
              scrollSnapAlign: "start",
            }}
          />
        ))}
      </div>
      <div
        style={{
          width: 228,
          justifyContent: "center",
          display: "flex",
        }}
      >
        <div style={{ display: "flex", flexDirection: "row", gap: 4 }}>
          <div
            style={{
              transition: "width 5s linear",
              width: activeIndex === 0 ? 50 : 10,
              height: 6,
              borderRadius: 20,
              background: ColorPallate.primaryGradient,
            }}
          ></div>
          <div
            style={{
              transition: "width 5s linear",
              width: activeIndex === 1 ? 50 : 10,
              height: 6,
              borderRadius: 20,
              background: ColorPallate.primaryGradient,
            }}
          ></div>
        </div>
      </div>
    </>
  );
};
