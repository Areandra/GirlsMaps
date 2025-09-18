import { ref, update } from "firebase/database";
import { db } from "./firebaseConfig";

const sendUrlImage = async (id, url) => {
  try {
    await update(ref(db, `/girlsMapsDB/features/${id}/properties`), {
      urlImage: url,
    });
    return;
  } catch (error) {
    console.error(error);
  }
};

const handleUploadImage = async (e, id) => {
  const img = e.target.files[0];
  const form = new FormData();
  form.append("file", img);
  form.append("upload_preset", "anivone");

  const respone = await fetch(
    "https://api.cloudinary.com/v1_1/dpvcu9q88/image/upload",
    {
      method: "POST",
      body: form,
    }
  );
  const data = await respone.json();

  sendUrlImage(id, data.secure_url);
};

export { handleUploadImage };
