import { get, ref, remove, set } from "firebase/database";
import { db } from "./firebaseConfig";

export const sendStoreData = async (data, id) => {
  if (
    !data &&
    !data.namaToko &&
    !data.alamat &&
    !data.openTime &&
    !data.koordinat &&
    !data.product
  )
    return;
  try {
    await set(ref(db, `/storeData/${id}`), {
      ...data,
    });
    console.log("Berhasil");
    return;
  } catch (error) {
    console.error(error);
  }
};

export const getStoreData = async () => {
  try {
    const snaps = await get(ref(db, "/storeData"));
    if (snaps.exists()) {
      console.log("snap:", snaps.val());
      const data = Object.values(snaps.val());
      console.log("data:", data);
      const cleanData = data.map((i) => ({
        namaToko: i.namaToko,
        alamat: i.alamat,
        openTime: Object.values(i.openTime),
        koordinat: Object.values(i.koordinat),
        product: Object.values(i.product).map((j) => ({
          merek: j.merek,
          namaProduk: Object.values(j.namaProduk),
        })),
        contact: i.contact,
        urlImage: i.urlImage,
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
    await remove(ref(db, `/storeData/${id}`));
  } catch (error) {
    console.error(error);
  }
};
