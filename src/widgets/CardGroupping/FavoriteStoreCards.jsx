import ColorPallate from "../../theme/Color";
import { useRef, useState } from "react";
import { PiNavigationArrow } from "react-icons/pi";
import Button from "../../components/Button/PrimaryButton";
import { FiTrash } from "react-icons/fi";
import { BsFillStarFill } from "react-icons/bs";

const FavoriteStoreCards = ({ favoriteStoreList, onClick }) => {
  const [hoverFS, setHoverFS] = useState(false);
  const favoriteCardRef = useRef();

  return (
    <div
      style={{
        background: ColorPallate.background,
        padding: "30px 10px",
        borderRadius: 20,
      }}
    >
      <h1
        style={{
          color: ColorPallate.primary,
          fontSize: "1rem",
          fontWeight: 600,
          textAlign: "left",
          display: "inline",
        }}
      >
        Favorite Store
      </h1>
      <div
        style={{
          gap: 20,
          width: "100%",
          display: "grid",
          marginBlockStart: 10,
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        }}
      >
        {!favoriteStoreList.length && (
          <p
            style={{
              fontSize: 12,
              width: "100%",
              fontStyle: "italic",
              color: ColorPallate.secondaryText,
            }}
          >
            Your Favorite Store Is Currently Empty Explore Ours Maps and Save
            Our Favorite Location
          </p>
        )}
        {favoriteStoreList.map((i, idx) => (
          <div
            ref={favoriteCardRef}
            onMouseEnter={() => setHoverFS(idx + 1)}
            onMouseLeave={() => setHoverFS(0)}
            key={idx}
            style={{
              transition: "0.3s ease",
              overflow: "hidden",
              position: "relative",
              marginInline: "auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              padding: "6px 6px",
              width: "90%",
              background: ColorPallate.background,
              boxShadow: `0px 4px 4px rgba(0, 0, 0, 0.25), inset 0px 0px 0px 2px ${ColorPallate.background}`,
              borderRadius: "16px",
              height: "280px",
              backgroundSize: "cover",
              ...(hoverFS === idx + 1
                ? {
                    boxShadow: ` inset 0 0 0 3px ${ColorPallate.primary}`,
                  }
                : {}),
            }}
          >
            <Button
              icon={FiTrash}
              onclick={() => onClick.delFavStore(i.id)}
              style={{
                width: 46,
                padding: 12,
                scale: 0.75,
                position: "absolute",
                right: hoverFS === idx + 1 ? 10 : 0,
                ...(hoverFS === idx + 1
                  ? {}
                  : { transform: "translateX(200%)" }),
                top: 10,
                zIndex: 2,
                transition: "0.3s ease",
              }}
            />{" "}
            <Button
              onclick={() => onClick.navToStore(i)}
              icon={PiNavigationArrow}
              style={{
                width: 46,
                padding: 12,
                scale: 0.75,
                position: "absolute",
                right: hoverFS === idx + 1 ? 10 : 0,
                ...(hoverFS === idx + 1
                  ? {}
                  : { transform: "translateX(200%)" }),
                top: 50,
                zIndex: 2,
                transition: "0.3s ease",
              }}
            />
            <div
              style={{
                padding: "4px 12px",
                position: "relative",
                zIndex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              {" "}
              <p
                style={{
                  fontWeight: "bold",
                  textAlign: "left",
                  color: ColorPallate.text,
                }}
              >
                {i.namaToko}
              </p>
              <p
                style={{
                  fontSize: 12,
                  width: "100%",
                  textAlign: "left",
                  fontStyle: "italic",
                  color: ColorPallate.secondaryText,
                }}
              >
                {i.alamat}
              </p>
              <span
                style={{
                  width: "100%",
                  textAlign: "left",
                  color: ColorPallate.secondaryText,
                  fontSize: "12px",
                  marginBlock: "-6px",
                  padding: 0,
                }}
              >
                {i?.rate && <BsFillStarFill size={16} color="gold" />}
                {i?.rate ||
                  "Information of This Store Rating Currently Not Available"}{" "}
                {i?.rater || ""}
              </span>
              <p style={{}}>{i.description}</p>
            </div>
            {i.urlImage && (
              <img
                style={{
                  position: "absolute",
                  width:
                    favoriteCardRef?.current?.getBoundingClientRect().width -
                    12,
                  height: "280px",
                  maxHeight: "400px",
                  borderRadius: 12,
                  WebkitMaskImage:
                    "linear-gradient(to bottom, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 60%)",
                  maskImage:
                    "linear-gradient(to bottom, rgba(0,0,0,1) 30%, rgba(0,0,0,0) 60%)",
                }}
                src={i.urlImage}
                alt=""
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoriteStoreCards;
