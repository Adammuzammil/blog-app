import { app } from "../firebase";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";
 
export const uploadImage = async(img) => {
    try {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + '-' + img;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, img);
        uploadTask.on
    } catch (error) {
        
    }
}