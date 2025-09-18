import { get, ref, remove, set } from "firebase/database";
import { db } from "./firebaseConfig";

export const sendStoreData = async (data) => {
  const errorType = [];

  if (!data.namaToko || data.namaToko === "") errorType.push("namaToko");
  if (!data.alamat || data.alamat === "") errorType.push("alamat");
  if (!data.koordinat || data.koordinat.every((c) => isNaN(c)))
    errorType.push("koordinat");
  if (errorType.length > 0) {
    return {
      success: false,
      errorType,
      message: "There are some invalid forms.",
    };
  }

  try {
    await set(ref(db, `/girlsMapsDB/features/${data.id}`), {
      geometry: {
        coordinates: [data.koordinat[1], data.koordinat[0]],
        type: "Point"
      },
      properties: {
        namaToko: data.namaToko,
        alamat: data.alamat,
        openTime: data.openTime,
        product: data.product,
        contact: data.contact || "",
        urlImage: data.urlImage || "",
      },
      type: "Feature"
    });
    console.log("Berhasil");
    return {
      success: true,
      errorType: [],
      message: "Store Data Uploaded Successfully",
    };
  } catch (error) {
    console.error(error);

    let userMessage = "An unexpected error occurred. Please try again later.";

    if (error.message.includes("permission_denied")) {
      userMessage =
        "You don't have permission to perform this action. Please ensure you're logged in and have the necessary access rights.";
    } else if (error.message.includes("network-request-failed")) {
      userMessage =
        "We couldn't upload your data due to a network issue. Please check your internet connection and try again.";
    }

    return {
      success: false,
      errorType: [],
      message: userMessage,
    };
  }
};

export const getStoreData = async () => {
  try {
    const snaps = await get(ref(db, "/girlsMapsDB/features"));
    if (snaps.exists()) {
      console.log("snap:", JSON.stringify(snaps.val()));
      const data = Object.values(snaps.val());
      console.log("data:", data);
      const cleanData = data.map((i, index) => ({
        id: index,
        namaToko: i.properties.namaToko,
        alamat: i.properties.alamat,
        openTime: Object.values(i.properties.openTime),
        koordinat: [
          Object.values(i.geometry.coordinates)[1],
          Object.values(i.geometry.coordinates)[0],
        ],
        product: Object.values(i.properties.product).map((j) => ({
          merek: j.merek,
          namaProduk: Object.values(j.namaProduk),
        })),
        contact: i.properties.contact || "",
        urlImage: i.properties.urlImage || "",
      }));
      console.log("cek bang", cleanData);
      return cleanData;
    }
  } catch (error) {
    console.error(error);
  }
};

export const delStoreData = async (id) => {
  try {
    await remove(ref(db, `/girlsMapsDB/features/${id}`));
  } catch (error) {
    console.error(error);
  }
};
