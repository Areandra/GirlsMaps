import { ref, update } from "firebase/database";
import { db } from "./firebaseConfig";

const sendUrlImage = async (id, url) => {
  try {
    await update(ref(db, `/girlsMapsDB/features/${id}/properties`), {
      urlImage: url,
    });
    return "✅ Image Is Succsesfuly Uploaded";
  } catch (error) {
    console.error(error);

    let userMessage = "❌ An unexpected error occurred. Please try again later.";

    if (error.message.includes("permission_denied")) {
      userMessage =
        "❌ You don't have permission to perform this action. Please ensure you're logged in and have the necessary access rights.";
    } else if (error.message.includes("network-request-failed")) {
      userMessage =
        "❌ We couldn't upload your image due to a network issue. Please check your internet connection and try again.";
    }

    return userMessage;
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

  const messege = await sendUrlImage(id, data.secure_url);

  return messege;
};

export { handleUploadImage };
