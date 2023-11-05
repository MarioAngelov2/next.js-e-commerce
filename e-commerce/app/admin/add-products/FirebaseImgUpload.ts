import firebaseApp from "@/libs/firebase";
import { ImageType, UploadedImageType } from "@/types/product";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytes,
    uploadBytesResumable,
} from "firebase/storage";
import toast from "react-hot-toast";

type DataType = {
    brand: string;
    category: string;
    description: string;
    images: ImageType[];
    inStock: number;
    name: string;
    price: number;
};

type UploadImageType = {
    color: string;
    colorCode: string;
    image: string;
};

export const handleImageUploadsToFirebase = async (
    data: DataType,
    uploadedImages: UploadImageType[]
) => {
    toast("Creating product. Please wait...");

    try {
        for (const item of data.images) {
            if (item.image) {
                const fileName = new Date().getTime() + "-" + item.image.name;
                const storage = getStorage(firebaseApp);
                const storageRef = ref(storage, `products/${fileName}`);
                const uploadTask = uploadBytesResumable(storageRef, item.image);

                await new Promise<void>((resolve, reject) => {
                    uploadTask.on(
                        "state_changed",
                        (snapshot) => {
                            const progress =
                                (snapshot.bytesTransferred /
                                    snapshot.totalBytes) *
                                100;
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
                            console.log("Error uploading image: ", error);
                            reject(error);
                        },
                        () => {
                            getDownloadURL(uploadTask.snapshot.ref)
                                .then((downloadURL) => {
                                    uploadedImages.push({
                                        ...item,
                                        image: downloadURL,
                                    });
                                    console.log(
                                        "File available at",
                                        downloadURL
                                    );
                                    resolve();
                                })
                                .catch((error) => {
                                    console.log(
                                        "Error getting download URL: ",
                                        error
                                    );
                                    reject(error);
                                });
                        }
                    );
                });
            }
        }
    } catch (error) {
        console.log("Error uploading images: ", error);
        toast.error("Error uploading images");
    }
};
