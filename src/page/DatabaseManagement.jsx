import ColorPallate from "../theme/Color";
import logo from "../assets/logo.png";
import {
  FiDelete,
  FiEdit,
  FiFilter,
  FiGlobe,
  FiMapPin,
  FiPlus,
  FiSend,
  FiUploadCloud,
} from "react-icons/fi";
import ButtonCostum from "../components/Button";
import { InputForm } from "../components/InputForm";
import { BsClockFill } from "react-icons/bs";
import { LuMapPin, LuMapPinHouse } from "react-icons/lu";
import { FaShop } from "react-icons/fa6";
import { PiShoppingCartFill } from "react-icons/pi";
import { useEffect, useState } from "react";
import GlobalModal from "../components/Modal";
import { useRef } from "react";
import { handleUploadImage } from "../service/uploadImage";
import { delStoreData, getStoreData, sendStoreData } from "../service/crudDB";

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

const EditStoreModal = ({
  isOpen,
  onClose,
  initialData,
  onSave,
  setUpdate,
  onDel,
}) => {
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleJadwalChange = (e, index) => {
    const newValue = [...formData.openTime];
    newValue[index] = e.target.value;
    setFormData((prev) => ({ ...prev, openTime: newValue }));
  };
  const handleKoordinatChange = (e, index) => {
    const newKoordinat = [...formData.koordinat];
    newKoordinat[index] = parseFloat(e.target.value) || 0;
    setFormData((prev) => ({ ...prev, koordinat: newKoordinat }));
  };
  const handleMerekChange = (e, productIndex) => {
    const newProducts = [...formData.product];
    newProducts[productIndex].merek = e.target.value;
    setFormData((prev) => ({ ...prev, product: newProducts }));
  };
  const handleNamaProdukChange = (e, productIndex, namaIndex) => {
    const newProducts = [...formData.product];
    newProducts[productIndex].namaProduk[namaIndex] = e.target.value;
    setFormData((prev) => ({ ...prev, product: newProducts }));
  };
  const addMerek = () => {
    setFormData((prev) => ({
      ...prev,
      product: [...prev.product, { merek: "", namaProduk: [""] }],
    }));
  };
  const removeMerek = (productIndex) => {
    const newProducts = formData.product.filter(
      (_, index) => index !== productIndex
    );
    setFormData((prev) => ({ ...prev, product: newProducts }));
  };
  const addNamaProduk = (productIndex) => {
    const newProducts = [...formData.product];
    newProducts[productIndex].namaProduk.push("");
    setFormData((prev) => ({ ...prev, product: newProducts }));
  };
  const removeNamaProduk = (productIndex, namaIndex) => {
    const newProducts = [...formData.product];
    newProducts[productIndex].namaProduk = newProducts[
      productIndex
    ].namaProduk.filter((_, index) => index !== namaIndex);
    setFormData((prev) => ({ ...prev, product: newProducts }));
  };

  const handleSubmit = () => {
    console.log(formData);
    onSave?.(formData);
    setUpdate(true);
    onClose();
  };

  if (!isOpen) return null;

  const days = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(0,0,0,0.6)",
      backdropFilter: "blur(5px)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 1000,
    },
    formGroup: {
      display: "flex",
      flexDirection: "column",
      gap: "18px",
      marginBottom: "24px",
    },
    label: { color: ColorPallate.secondaryText, fontSize: "0.8rem" },
    scheduleItem: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
      flex: 1,
      width: "100%",
    },
    dayLabel: { color: ColorPallate.text, width: "80px", flexShrink: 0 },
    productGroup: {
      border: `1px solid ${ColorPallate.inputBorder || "#555"}`,
      padding: "16px",
      borderRadius: "12px",
      display: "flex",
      flexDirection: "column",
      gap: "12px",
    },
    merekContainer: { display: "flex", gap: "10px" },
    namaProdukContainer: {
      display: "flex",
      gap: "8px",
      alignItems: "center",
      marginLeft: "20px",
    },
    buttonContainer: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "16px",
      marginTop: "24px",
    },
  };

  return (
    <div style={styles.overlay}>
      <GlobalModal
        visible={isOpen}
        styles={{
          position: "absolute",
          left: "50%",
          top: "50%",
          padding: "20px",
          transform: "translateX(-50%) translateY(-50%)",
          height: "80vh",
          width: "70vw",
          overflow: "auto",
          zIndex: 10,
        }}
        onDissmis={() => onClose()}
      >
        <h2 style={{ marginTop: 0, color: ColorPallate.text }}>
          Edit Data Toko
        </h2>
        <div style={{ margin: 0, padding: 0 }}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Nama Toko</label>
            <InputForm
              type="text"
              name="namaToko"
              value={formData.namaToko}
              onChange={handleChange}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Alamat</label>
            <InputForm
              name="alamat"
              value={formData.alamat}
              onChange={handleChange}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Koordinat</label>
            <div
              style={{
                display: "flex",
                width: "100%",
                gap: "12px",
              }}
            >
              <InputForm
                type="number"
                step="any"
                value={formData.koordinat[0]}
                onChange={(e) => handleKoordinatChange(e, 0)}
                style={{ container: { flex: 1 } }}
                placeholder="Latitude"
              />
              <InputForm
                type="number"
                step="any"
                value={formData.koordinat[1]}
                onChange={(e) => handleKoordinatChange(e, 1)}
                style={{ container: { flex: 1 } }}
                placeholder="Longitude"
              />
            </div>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Jadwal Buka</label>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "16px",
              }}
            >
              {formData.openTime.map((jam, index) => (
                <div key={index} style={styles.scheduleItem}>
                  <span style={styles.dayLabel}>{days[index]}</span>
                  <InputForm
                    type="text"
                    value={jam}
                    style={{ container: { flex: 1 } }}
                    onChange={(e) => handleJadwalChange(e, index)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Produk</label>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "16px",
              }}
            >
              {formData.product.map((prod, productIndex) => (
                <div key={productIndex} style={styles.productGroup}>
                  <div style={styles.merekContainer}>
                    <InputForm
                      type="text"
                      value={prod.merek}
                      onChange={(e) => handleMerekChange(e, productIndex)}
                      placeholder="Nama Merek"
                      style={{ container: { flex: 1 } }}
                    />
                    <ButtonCostum
                      text="Hapus"
                      onclick={() => removeMerek(productIndex)}
                    />
                  </div>
                  {prod.namaProduk.map((nama, namaIndex) => (
                    <div key={namaIndex} style={styles.namaProdukContainer}>
                      <InputForm
                        type="text"
                        value={nama}
                        onChange={(e) =>
                          handleNamaProdukChange(e, productIndex, namaIndex)
                        }
                        placeholder="Nama Produk"
                      />
                      <ButtonCostum
                        text="X"
                        type="textButton"
                        onclick={() =>
                          removeNamaProduk(productIndex, namaIndex)
                        }
                      />
                    </div>
                  ))}
                  <ButtonCostum
                    text="+ Tambah Produk"
                    type="textButton"
                    onclick={() => addNamaProduk(productIndex)}
                  />
                </div>
              ))}
            </div>
            <ButtonCostum
              text="+ Tambah Merek"
              type="primary"
              onclick={addMerek}
              styles={{ marginTop: "16px" }}
            />
          </div>

          <div style={styles.buttonContainer}>
            <ButtonCostum text="Batal" type="textButton" onclick={onClose} />
            {onDel && (
              <ButtonCostum
                text="Hapus"
                type="primary"
                onclick={() => {
                  onDel(formData.namaToko.trim());
                  onClose();
                  setUpdate(true);
                }}
                icon={FiDelete}
              />
            )}
            <ButtonCostum
              text="Simpan"
              type="primary"
              onclick={() => handleSubmit()}
              icon={FiSend}
            />
          </div>
        </div>
      </GlobalModal>
    </div>
  );
};

const DataTable = ({ tableList, storeData, selectedItem, setSelectedItem }) => {
  const [showFull, setShowFull] = useState(null);
  const [hover, setHover] = useState(false);

  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      paddingInline: 40,
    },
    header: {
      display: "flex",
      flexDirection: "row",
      border: `2px solid ${ColorPallate.inputBorder}`,
      borderBlockEnd: "0px",
      padding: 8,
      borderRadius: "10px 10px 0px 0px",
      justifyContent: "space-between",
    },
    headerCell: {
      display: "flex",
      color: ColorPallate.text,
      fontSize: 12,
      textAlign: "left",
      flex: 1,
      alignItems: "center",
      gap: 4,
    },
    scrollContainer: {
      overflow: "auto",
      height: "70vh",
      scrollbarWidth: "none",
      msOverflowStyle: "none",
      boxShadow: `inset 0px -5px 15px ${ColorPallate.buttonShadow}`,
    },
    tableRow: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    tableCell: {
      display: "flex",
      color: ColorPallate.text,
      fontSize: 12,
      textAlign: "left",
      flex: 1,
      padding: 8,
      gap: 4,
      border: `2px solid ${ColorPallate.inputBorder}`,
      borderInlineEnd: "0px solid",
    },
    tableCellColumn: {
      flexDirection: "column",
    },
    tableCellCentered: {
      justifyContent: "center",
    },
    listItemContainer: {
      display: "flex",
      justifyContent: "space-between",
    },
    showMoreText: {
      textAlign: "right",
      cursor: "pointer",
      color: ColorPallate.primary,
      marginTop: 4,
    },
  };

  return (
    <div style={styles.container}>
      {/* HEADER */}
      <div style={styles.header}>
        {tableList.map((i, index) => {
          const IconComponent = i.icon;
          return (
            <p
              key={index}
              style={{
                ...styles.headerCell,
                transform: `translateX(${3.5 * index}px)`, // Style dinamis tetap di sini
              }}
            >
              <IconComponent size={14} color={"grey"} />
              {i.openTime}
            </p>
          );
        })}
      </div>

      <div style={styles.scrollContainer}>
        {storeData.map((i, indexG) => {
          const dynamicBorderStyle = {
            borderBlockEnd:
              indexG < storeData.length - 1
                ? "0px"
                : `2px solid ${ColorPallate.inputBorder}`,
          };

          return (
            <div
              key={indexG}
              style={{
                ...styles.tableRow,
                ...(hover === indexG + 1
                  ? { boxShadow: ` inset 0 0 0 3px ${ColorPallate.primary}` }
                  : {}),
                ...(selectedItem === i
                  ? { background: ColorPallate.primaryGradient }
                  : {}),
              }}
              onMouseEnter={() => setHover(indexG + 1)}
              onMouseLeave={() => setHover(indexG + 1)}
              onClick={() => setSelectedItem(selectedItem === i ? null : i)}
            >
              <p
                style={{
                  ...styles.tableCell,
                  alignItems: "center",
                  ...dynamicBorderStyle,
                }}
              >
                {i.namaToko}
              </p>

              <p
                style={{
                  ...styles.tableCell,
                  alignItems: "center",
                  ...dynamicBorderStyle,
                }}
              >
                {i.alamat}
              </p>

              <div
                style={{
                  ...styles.tableCell,
                  ...styles.tableCellColumn,
                  ...dynamicBorderStyle,
                }}
              >
                {i.openTime
                  .slice(0, indexG + 1 === showFull ? i.openTime.length : 1)
                  .map((val, indexChild) => (
                    <div key={indexChild} style={styles.listItemContainer}>
                      <p style={{ textAlign: "left" }}>{hari[indexChild]} :</p>
                      <p style={{ textAlign: "left" }}>{val}</p>
                    </div>
                  ))}
                {i.openTime.length > 1 && indexG + 1 !== showFull && (
                  <p
                    onClick={() => {
                      setShowFull(indexG + 1);
                    }}
                    style={styles.showMoreText}
                  >
                    ...tampilkan lebih banyak
                  </p>
                )}
              </div>
              <div
                style={{
                  ...styles.tableCell,
                  ...styles.tableCellColumn,
                  ...styles.tableCellCentered,
                  ...dynamicBorderStyle,
                }}
              >
                {i.koordinat.map((coord, index) => (
                  <div key={index} style={styles.listItemContainer}>
                    <p style={{ textAlign: "left" }}>
                      {index === 0 ? "Longitude" : "Latitude"} :
                    </p>
                    <p style={{ textAlign: "left" }}>{coord}</p>
                  </div>
                ))}
              </div>

              {/* Kolom Produk */}
              <div
                style={{
                  ...styles.tableCell,
                  ...styles.tableCellColumn,
                  ...styles.tableCellCentered,
                  ...dynamicBorderStyle,
                  borderInlineEnd: `2px solid ${ColorPallate.inputBorder}`,
                }}
              >
                {i.product
                  .slice(0, indexG + 1 === showFull ? i.product.length : 1)
                  .map((prod, indexChild) => (
                    <div key={indexChild} style={styles.listItemContainer}>
                      <p style={{ textAlign: "left", flex: 1 }}>{prod.merek}</p>
                      <div style={{ ...styles.tableCellColumn, flex: 1 }}>
                        {prod.namaProduk
                          .slice(
                            0,
                            indexG + 1 === showFull ? i.product.length : 1
                          )
                          .map((nama, index) => (
                            <p style={{ textAlign: "left" }} key={index}>
                              {nama}
                            </p>
                          ))}
                      </div>
                    </div>
                  ))}
                {i.product.length > 1 && indexG + 1 !== showFull && (
                  <p
                    onClick={() => setShowFull(indexG + 1)}
                    style={styles.showMoreText}
                  >
                    ...tampilkan lebih banyak
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const SideBar = ({ buttonList }) => {
  return (
    <nav
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        padding: 8,
        left: 0,
        borderRight: `2px solid ${ColorPallate.inputBorder}`,
        gap: 12,
        alignItems: "center",
        backgroundColor: ColorPallate.background,
      }}
    >
      <img
        src={logo}
        style={{
          width: 32,
          border: `2px solid ${ColorPallate.inputBorder}`,
          borderRadius: 12,
          background: ColorPallate.primaryGradient,
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
  );
};

const DatabaseManagement = ({ setUrlParams, urlParams, dismiss }) => {
  if (dismiss) return <></>;
  const [selectedItem, setSelectedItem] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showNewModal, setShowNewModal] = useState(false);
  const fileInputRef = useRef();
  const [loading, setLoading] = useState(true);
  const [storeData, setStoreData] = useState(null);
  const [updateData, setUpdateData] = useState(false);

  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const snaps = await getStoreData();
        setStoreData(snaps || []);
        setLoading(false);
        setUpdateData(false);
        return;
      } catch (error) {
        console.error(error);
      }
    };
    if (!storeData) {
      fetchStoreData();
    } else if (storeData && updateData) fetchStoreData();
  }, [loading, storeData, updateData]);

  useEffect(() => {
    if (loading) return;
    const editId = urlParams.get("edit");
    setShowEditModal(
      storeData.some(
        (i) => i.koordinat.toString() === decodeURIComponent(editId)
      )
    );
  }, [urlParams]);

  if (loading) return <></>;

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
      <EditStoreModal
        isOpen={showEditModal}
        initialData={selectedItem}
        onClose={() => setUrlParams({})}
        onSave={sendStoreData}
        setUpdate={setUpdateData}
        onDel={delStoreData}
      />
      <EditStoreModal
        isOpen={showNewModal}
        initialData={{
          namaToko: "",
          alamat: "",
          openTime: [
            "00.00 - 00.00",
            "Closed",
            "00.00 - 00.00",
            "00.00 - 00.00",
            "00.00 - 00.00",
            "00.00 - 00.00",
            "Closed",
          ],
          koordinat: [0, 0],
          product: [
            { merek: "", namaProduk: [""] },
          ],
        }}
        onClose={() => {
          setShowNewModal(false);
          setUrlParams({});
        }}
        onSave={sendStoreData}
        setUpdate={setUpdateData}
      />
      <SideBar buttonList={buttonList} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <div
          style={{
            padding: "10px 0px 10px 40px",
            borderBottom: `2px solid ${ColorPallate.inputBorder}`,
            backgroundColor: ColorPallate.background,
          }}
        >
          <p
            style={{
              color: ColorPallate.text,
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
            backgroundColor: "rgba(18,18,18,1)",
            alignItems: "center",
            paddingInline: 40,
          }}
        >
          <h2>Store Data</h2>
          <div style={{ display: "flex", flexDirection: "row", gap: 10 }}>
            <InputForm />
            <ButtonCostum
              icon={FiEdit}
              onclick={() =>
                setUrlParams({ edit: selectedItem.koordinat.toString() })
              }
            />
            <ButtonCostum
              text={"Tambah Pin"}
              icon={FiPlus}
              onclick={() => setShowNewModal(true)}
            />
            <ButtonCostum
              onclick={() => {
                if (selectedItem) fileInputRef.current.click();
              }}
              text={"Set Image"}
              icon={FiUploadCloud}
            />
            <input
              onChange={(e) =>
                handleUploadImage(e, selectedItem.namaToko.trim())
              }
              ref={fileInputRef}
              type="file"
              hidden
            ></input>
          </div>
        </div>
        <DataTable
          tableList={tableList}
          storeData={storeData}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      </div>
    </div>
  );
};

export default DatabaseManagement;
