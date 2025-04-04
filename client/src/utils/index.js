import { toast } from "sonner";
import { app } from "./firebase";
import { 
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable
 } from "@firebase/storage";

export function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

export const saveUserInfo = (user, signIn) => {
  localStorage.setItem(
    "userInfo",
    JSON.stringify({ user: user?.user, token: user?.token })
  );

  signIn({ user: user?.user, token: user?.token });

  toast.success(user?.message);

  setTimeout(() => {
    window.history.back();
  }, 1500);
};

export const uploadFile = (setFileURL, file) => {
  const storage = getStorage(app);

  const name = new Date().getTime() + file.name;
  const storageRef = ref(storage, name);

  const uploadTask = uploadBytesResumable(storageRef, file);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log("Upload is " + progress + "% done");

      switch (snapshot.state) {
        case "paused":
          console.log("Upload is paused");
          break;
        case "running":
          console.log("Upload is running");
          break;
      }
    },
    (error) => {
      console.log(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log("Successfully uploaded");
        setFileURL(downloadURL);
      });
    }
  );
};

export const updateURL = ({ page, navigate, location, cat }) => {
  const params = new URLSearchParams();

  if (cat) {
    params.set("cat", cat);
  }

  if (page && page > 1) {
    params.set("page", page);
  }

  const newUrl = `${location.pathname}?${params.toString()}`;
  navigate(newUrl, { replace: true });

  return newUrl;
};