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
        return true;
    } catch (error) {
        return false;
    }
};

//Función para obtener los usuarios de la colleción usuarios
const collectionName = "users";
const usersCollection = collection(dataBase, collectionName);

export const getUserCollection = async (uid) => {
    const arrayUsers = [];

    try {
        const q = query(usersCollection, where("uid", "==", uid));
        const userDocs = await getDocs(q);
        userDocs.forEach((doc) => {
            arrayUsers.push({
                id: doc.id,
                ...doc.data(),
            });
        });
        return arrayUsers[0];
    } catch (error) {
        console.log(error);
    }
};

const initialData2 = {
    key1: "",
    value1: null,
    key2: "",
    value2: null,
    collectionName: "",
};

//Funcion para obtener un docuemnto de una colección en base a dos filtros
export const filterCollectionMiltiple = async (data = initialData2) => {
    const collectionName = data.collectionName;
    const collections = collection(dataBase, collectionName);
    const dataArray = [];
    try {
        const q = data.key1 
            ? query(
                  collections,
                  where(data.key1, "==", data.value1),
                  where(data.key2, "==", data.value2)
              )
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
