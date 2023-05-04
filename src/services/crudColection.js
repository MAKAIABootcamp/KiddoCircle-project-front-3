import { dataBase } from "../firebase/firebaseConfig";
import { getDocs,  collectionGroup, query, where, collection, addDoc, doc, getDoc, updateDoc } from "firebase/firestore";

export const getFilterItemsActionAsync = async (collectionName, filter) => {
    try {
        const toDoCollection = collection(dataBase, collectionName);
        const queryCollection = query(toDoCollection, where(...filter))
        const itemDoc = await getDocs(queryCollection);
        const item = [];
        itemDoc.forEach((doc) => {
            item.push({
                id: doc.id,
                ...doc.data(),
            });
        });
        return item
    } catch (error) {
        console.error(error)
    }
};

export const getItemsByIdActionAsync = async (collectionName, id) => {
    try {
        const toDoCollection = doc(dataBase, collectionName,id);
        const itemDoc = await getDoc(toDoCollection);
        const item = itemDoc.data();
        return item
    } catch (error) {
        console.error(error)
    }
};

export const createItemActionAsync = async (item,collectionName) => {
    try {
        const toDoCollection = collection(dataBase, collectionName);
        const doc = await addDoc(toDoCollection, item);
        const itemDoc = {
            item: { id: doc.id, ...item },
            status: "success",
        };
        return itemDoc;
    } catch (error) {
        console.log(error);
    }
};

export const getItemsActionAsync = async (collectionName) => {
    try {
        const toDoCollection = collection(dataBase, collectionName);
        const querySnapshot = await getDocs(toDoCollection);
        const items = [];
        querySnapshot.forEach((doc) => {
            items.push({
                id: doc.id,
                ...doc.data(),
            });
        });
        return items
    } catch (error) {
        console.log(error);
    }
};

export const getItemsSubCollectionActionAsync = async (subCollectionName, getDataParent) => {
    try {
        const querySnapshot = query(collectionGroup(dataBase, subCollectionName))
        const itemDoc = await getDocs(querySnapshot);
        const items = [];
        for (const doc of itemDoc.docs) {
            const documentReference = doc.ref
            let parentDoc;
            if(getDataParent){
                parentDoc = await getDoc(doc.ref.parent.parent);
            }
            items.push({
                idParent:documentReference?.parent?.parent?.id?documentReference.parent.parent.id:doc.id,
                id: doc.id,
                ...doc.data(),
                ...(getDataParent && parentDoc.data())
            });
        };
        return items
    } catch (error) {
        console.log(error);
    }
};

export const getItemsFilterSubCollectionActionAsync = async (subCollectionName, filter, getDataParent) => {
    try {
        const querySnapshot = query(collectionGroup(dataBase, subCollectionName), where(...filter))
        const itemDoc = await getDocs(querySnapshot);
        const items = [];
        for (const doc of itemDoc.docs) {
            let parentDoc;
            if(getDataParent){
                const documentReference = doc.ref
                parentDoc = await getDoc(documentReference.parent.parent);
            }
            items.push({
                id: doc.id,
                ...doc.data(),
                ...(getDataParent && parentDoc.data())
            });
        };
        return items
    } catch (error) {
        console.log(error);
    }
};

export const updateItemActionAsync = async (collectionName,item, itemId) => {
    try {
        const docRef = doc(dataBase, collectionName, itemId);
        const data = {...item};
        await updateDoc(docRef, data);
        return {id: itemId,...item}
    } catch (error) {
        console.log(error)
    }

};



