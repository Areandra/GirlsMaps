import ColorPallate from "../theme/Color";
import logo from "../assets/logo.png";
import {
  FiChevronDown,
  FiFilter,
  FiGlobe,
  FiMapPin,
  FiPlus,
  FiShoppingCart,
  FiUploadCloud,
} from "react-icons/fi";
import ButtonCostum from "../components/Button";
import { InputForm } from "../components/InputForm";
import { BsClockFill } from "react-icons/bs";
import { LuMapPin, LuMapPinHouse } from "react-icons/lu";
import { FaShop } from "react-icons/fa6";
import { PiShoppingCartFill } from "react-icons/pi";
import { useState } from "react";

const buttonList = [
  { icon: FiMapPin, onClick: () => {} },
  { icon: FiGlobe, onClick: () => {} },
];

const tableList = [
  { icon: FaShop, value: "Nama Toko" },
  { icon: LuMapPinHouse, value: "Alamat" },
  { icon: BsClockFill, value: "Jam Buka" },
  { icon: LuMapPin, value: "Koordinat" },
  { icon: PiShoppingCartFill, value: "Product" },
];

const hari = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

const storeData = [
  {
    namaToko: "Toko Sejahtera",
    alamat: "Jl. Merdeka No.1, Jakarta",
    value: [
      "08.00 - 17.00",
      "08.00 - 17.00",
      "08.00 - 17.00",
      "08.00 - 17.00",
      "08.00 - 17.00",
      "09.00 - 14.00",
      "Closed",
    ],
    koordinat: [-6.2, 106.816666],
    product: [
      {
        merek: "Le Minerale",
        namaProduk: ["Air Mineral 600ml", "Air Mineral 1500ml"],
      },
      { merek: "Indomie", namaProduk: ["Goreng", "Soto", "Ayam Bawang"] },
    ],
  },
  {
    namaToko: "Toko Maju",
    alamat: "Jl. Sudirman No.5, Bandung",
    value: [
      "09.00 - 18.00",
      "09.00 - 18.00",
      "09.00 - 18.00",
      "09.00 - 18.00",
      "09.00 - 18.00",
      "10.00 - 15.00",
      "Closed",
    ],
    koordinat: [-6.914744, 107.60981],
    product: [
      { merek: "Coca-Cola", namaProduk: ["Coke 330ml", "Coke 600ml"] },
      { merek: "Sprite", namaProduk: ["Sprite 330ml", "Sprite 600ml"] },
    ],
  },
  {
    namaToko: "Toko Lestari",
    alamat: "Jl. Diponegoro No.12, Surabaya",
    value: [
      "07.00 - 16.00",
      "07.00 - 16.00",
      "07.00 - 16.00",
      "07.00 - 16.00",
      "07.00 - 16.00",
      "08.00 - 12.00",
      "Closed",
    ],
    koordinat: [-7.257472, 112.752088],
    product: [
      {
        merek: "Teh Pucuk",
        namaProduk: ["Teh Pucuk 350ml", "Teh Pucuk 600ml"],
      },
      { merek: "Good Day", namaProduk: ["Cappuccino", "Vanilla"] },
    ],
  },
  {
    namaToko: "Toko Makmur",
    alamat: "Jl. Ahmad Yani No.22, Medan",
    value: [
      "08.00 - 17.00",
      "08.00 - 17.00",
      "08.00 - 17.00",
      "08.00 - 17.00",
      "08.00 - 17.00",
      "09.00 - 13.00",
      "Closed",
    ],
    koordinat: [3.595196, 98.672223],
    product: [
      { merek: "Indomie", namaProduk: ["Rendang", "Soto", "Mie Goreng"] },
      { merek: "Aqua", namaProduk: ["Aqua 330ml", "Aqua 600ml"] },
    ],
  },
  {
    namaToko: "Toko Berkah",
    alamat: "Jl. Pemuda No.7, Semarang",
    value: [
      "08.00 - 16.00",
      "08.00 - 16.00",
      "08.00 - 16.00",
      "08.00 - 16.00",
      "08.00 - 16.00",
      "09.00 - 12.00",
      "Closed",
    ],
    koordinat: [-7.005145, 110.438125],
    product: [
      { merek: "Mizone", namaProduk: ["Mizone 500ml"] },
      { merek: "Teh Botol Sosro", namaProduk: ["Teh Botol 450ml"] },
    ],
  },
  {
    namaToko: "Toko Sinar Jaya",
    alamat: "Jl. Veteran No.3, Yogyakarta",
    value: [
      "09.00 - 18.00",
      "09.00 - 18.00",
      "09.00 - 18.00",
      "09.00 - 18.00",
      "09.00 - 18.00",
      "10.00 - 14.00",
      "Closed",
    ],
    koordinat: [-7.797068, 110.370529],
    product: [
      { merek: "Coca-Cola", namaProduk: ["Coke 500ml"] },
      { merek: "Pepsi", namaProduk: ["Pepsi 330ml", "Pepsi 600ml"] },
    ],
  },
  {
    namaToko: "Toko Prima",
    alamat: "Jl. Pattimura No.9, Makassar",
    value: [
      "07.00 - 15.00",
      "07.00 - 15.00",
      "07.00 - 15.00",
      "07.00 - 15.00",
      "07.00 - 15.00",
      "08.00 - 12.00",
      "Closed",
    ],
    koordinat: [-5.147665, 119.432731],
    product: [
      { merek: "Fanta", namaProduk: ["Fanta 330ml", "Fanta 600ml"] },
      { merek: "Sprite", namaProduk: ["Sprite 330ml"] },
    ],
  },
  {
    namaToko: "Toko Harmoni",
    alamat: "Jl. Pahlawan No.10, Balikpapan",
    value: [
      "08.00 - 17.00",
      "08.00 - 17.00",
      "08.00 - 17.00",
      "08.00 - 17.00",
      "08.00 - 17.00",
      "09.00 - 13.00",
      "Closed",
    ],
    koordinat: [1.267066, 116.831482],
    product: [
      { merek: "Aqua", namaProduk: ["Aqua 330ml", "Aqua 600ml"] },
      {
        merek: "Teh Botol Sosro",
        namaProduk: ["Teh Botol 450ml", "Teh Botol 600ml"],
      },
    ],
  },
];

const DatabaseManagement = () => {
  const [showFull, setShowFull] = useState(null);

  return (
    <div
      style={{
        backgroundColor: "rgba(18,18,18,1)",
        height: "100dvh",
        width: "100vw",
        left: 0,
        display: "flex",
        flexDirection: "row",
      }}
    >
      <nav
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          padding: 8,
          left: 0,
          borderRight: `2px solid ${ColorPallate.background}`,
          gap: 12,
          alignItems: "center",
        }}
      >
        <img
          src={logo}
          style={{
            width: 32,
            border: `2px solid ${ColorPallate.background}`,
            borderRadius: 12,
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            gap: 8,
          }}
        >
          {buttonList.map((i, index) => (
            <ButtonCostum key={index} type={"navbarButton"} icon={i.icon} />
          ))}
        </div>
      </nav>
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div
          style={{
            padding: "10px 0px 10px 40px",
            borderBottom: `2px solid ${ColorPallate.background}`,
          }}
        >
          <p
            style={{
              color: "grey",
              fontSize: 16,
              textAlign: "left",
              fontWeight: 500,
            }}
          >
            Database
          </p>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            color: ColorPallate.text,
            justifyContent: "space-between",
            backgroundColor: ColorPallate.background,
            alignItems: "center",
            paddingInline: 40,
          }}
        >
          <h2>Store Data</h2>
          <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            <InputForm />
            <ButtonCostum icon={FiFilter} />
            <ButtonCostum text={"Tambah Pin"} icon={FiPlus} />
            <ButtonCostum text={"Set Image"} icon={FiUploadCloud} />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            paddingInline: 40,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              border: `2px solid ${ColorPallate.secondaryText}`,
              borderBlockEnd: "0px",
              padding: 8,
              borderRadius: "10px 10px 0px 0px",
              justifyContent: "space-between",
            }}
          >
            {tableList.map((i, index) => {
              const IconComponent = i.icon;
              return (
                <p
                  key={index}
                  style={{
                    display: "flex",
                    color: "grey",
                    fontSize: 12,
                    textAlign: "left",
                    flex: 1,
                    alignItems: "center",
                    gap: 4,
                    transform: `translateX(${3.5 * index}px)`,
                  }}
                >
                  <IconComponent size={14} color={"grey"} />
                  {i.value}
                </p>
              );
            })}
          </div>
          <div
            style={{
              overflow: "auto",
              height: "70vh",
              scrollbarWidth: "none",
              borderBlockEnd: "2px solid " + ColorPallate.secondaryText,
            }}
          >
            {storeData.map((i, indexG) => (
              <div
                key={indexG}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <p
                  style={{
                    display: "flex",
                    color: "grey",
                    fontSize: 12,
                    textAlign: "left",
                    flex: 1,
                    alignItems: "center",
                    padding: 8,
                    gap: 4,
                    border: `2px solid ${ColorPallate.secondaryText}`,
                    borderInlineEnd: "0px solid",
                    borderBlockEnd: indexG < storeData.length - 1 ? "0px" : "",
                  }}
                >
                  {i.namaToko}
                </p>
                <p
                  style={{
                    display: "flex",
                    color: "grey",
                    fontSize: 12,
                    textAlign: "left",
                    flex: 1,
                    alignItems: "center",
                    padding: 8,
                    gap: 4,
                    border: `2px solid ${ColorPallate.secondaryText}`,
                    borderInlineEnd: "0px solid",
                    borderBlockEnd: indexG < storeData.length - 1 ? "0px" : "",
                  }}
                >
                  {i.alamat}
                </p>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    color: "grey",
                    fontSize: 12,
                    textAlign: "left",
                    flex: 1,
                    padding: 8,
                    gap: 4,
                    border: `2px solid ${ColorPallate.secondaryText}`,
                    borderInlineEnd: "0px solid",
                    borderBlockEnd: indexG < storeData.length - 1 ? "0px" : "",
                  }}
                >
                  {i.value
                    .slice(0, indexG + 1 === showFull ? i.value.length - 1 : 1)
                    .map((i, indexChild) => (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <p style={{ textAlign: "left" }} key={indexChild}>
                          {hari[indexChild]} :
                        </p>
                        <p style={{ textAlign: "left" }} key={indexChild}>
                          {i}
                        </p>
                      </div>
                    ))}
                  {indexG + 1 !== showFull && (
                    <p
                      onClick={() => setShowFull(indexG + 1)}
                      style={{ textAlign: "right" }}
                      key={indexG}
                    >
                      ...tampilkan lebih banyak
                    </p>
                  )}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    color: "grey",
                    fontSize: 12,
                    textAlign: "left",
                    flex: 1,
                    padding: 8,
                    gap: 4,
                    border: `2px solid ${ColorPallate.secondaryText}`,
                    borderInlineEnd: "0px solid",
                    borderBlockEnd: indexG < storeData.length - 1 ? "0px" : "",
                  }}
                >
                  {i.koordinat.map((i, index) => (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <p style={{ textAlign: "left" }} key={index}>
                        {index ? "Langitude" : "Longitude"}{" "}
                      </p>
                      <p style={{ textAlign: "left" }} key={index}>
                        {i}
                      </p>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    color: "grey",
                    fontSize: 12,
                    textAlign: "left",
                    flex: 1,
                    padding: 8,
                    gap: 4,
                    border: `2px solid ${ColorPallate.secondaryText}`,
                    borderBlockEnd: indexG < storeData.length - 1 ? "0px" : "",
                  }}
                >
                  {i.product
                    .slice(0, indexG + 1 === showFull ? i.product.length : 1)
                    .map((i, indexChild) => (
                      <div
                        key={indexChild}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <p style={{ textAlign: "left", flex: 1 }}>{i.merek}</p>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            flex: 1,
                          }}
                        >
                          {i.namaProduk
                            .slice(
                              0,
                              indexG + 1 === showFull ? i.namaProduk.length : 1
                            )
                            .map((i, index) => (
                              <p style={{ textAlign: "left" }} key={index}>
                                {i}
                              </p>
                            ))}
                        </div>
                      </div>
                    ))}

                  {indexG + 1 !== showFull && (
                    <p
                      onClick={() => setShowFull(indexG + 1)}
                      style={{ textAlign: "right" }}
                      key={indexG}
                    >
                      ...tampilkan lebih banyak
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseManagement;
