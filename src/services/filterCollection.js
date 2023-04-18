import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { dataBase } from "../firebase/firebaseConfig";

const initialData = {
    key: "",
    value: null,
    collectionName: "",
};

//Funcion para obtener un docuemnto de una colección
export const filterCollection = async (data = initialData) => {
    const collectionName = data.collectionName;
    const collections = collection(dataBase, collectionName);
    const dataArray = [];
    try {
        const q = data.key
            ? query(collections, where(data.key, "==", data.value))
            : collections;
        const refDocs = await getDocs(q);
        console.log(refDocs);
        refDocs.forEach((doc) => {
            dataArray.push({
                id: doc.id,
                ...doc.data(),
            });
        });
        return dataArray;
    } catch (error) {
        console.log(error);
        return [];
    }
};

//Funcion para agregar un documento a una colección
export const addDocument = async (collectionName, obj) => {
    try {
        await addDoc(collection(dataBase, collectionName), obj);
        return true
    } catch (error) {
        return false
    }
}