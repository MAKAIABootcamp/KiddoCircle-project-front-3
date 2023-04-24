import { userTypes } from "../types/userTypes";
import { auth, dataBase } from "../../firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateEmail,
  updateProfile,
} from "firebase/auth";
import { updateItemActionAsync } from "../../services/crudColection";
import {
  addDoc,
  collection,
  getDoc,
  query,
  where,
  getDocs,
  doc,
  Firestore,
  updateDoc,
} from "firebase/firestore";
import { filterCollection } from "../../services/filterCollection";
import Swal from "sweetalert2";
import { toggleLoading } from "./LoadingActions";
const userCollectionFirebase = collection(dataBase, "users");

export const userRegister = (obj) => {
  return {
    type: userTypes.CREATE_USER,
    payload: obj,
  };
};

export const userRegisterAsync = ({
  name,
  email,
  password,
  phone,
  city,
  address,
  photoURL,
}) => {
  return async (dispatch) => {
    try {
      //Crear usuario en firebase
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      //actualizar datos del usuario creado en firebase
      updateProfile(auth.currentUser, {
        displayName: name,
        phoneNumber: phone,
        photoURL: photoURL,
      });
      //crear el objeto newUser para subirlo a la coleccion de usuarios
      const newUser = {
        name: name,
        email: user.email,
        phone: phone,
        city: city,
        address: address,
        photoURL: photoURL,
        uid: user.uid,
      };
      //Agregar usario(newUser) a la coleccion users
      const userDoc = await addDoc(collection(dataBase, "users"), newUser);
      //Ejecutar la funcion sincrona
      dispatch(
        userRegister({
          ...newUser,
          error: false,
          isLogged: true,
          register: true,
        })
      );
    } catch (error) {
      dispatch(
        userRegister({
          name,
          email,
          error: true,
          isLogged: false,
          register: false,
        })
      );
    }
  };
};

export const userLoginEmail = (user) => {
  return {
    type: userTypes.LOGIN_USER_EMAIL_AND_PASSWORD,
    payload: user,
  };
};

export const userLoginEmailAsync = ({ email, password }) => {
  return async (dispatch) => {
    try {
      // signInWithEmailAndPassword metodo de Firebase que permite loguear
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      // Obtener el documento del usurio en la coleccion users con su info
      const userCollection = await filterCollection({
        key: "uid",
        value: user.uid,
        collectionName: "users",
      });
      // Se ejecuta la funcion sincrona pasandole name, email y error en false
      dispatch(
        userLoginEmail({
          ...userCollection[0],
          error: false,
          isLogged: true,
          register: true,
        })
      );
    } catch (error) {
      // Se ejecuta la funcion sincrona pasandole name, email y error en true
      dispatch(
        userLoginEmail({
          name: "",
          email: "",
          phone: "",
          city: "",
          address: "",
          photoURL: "",
          uid: "",
          error: true,
          isLogged: false,
          register: false,
        })
      );
      Swal.fire({
        icon: "error",
        title: "Uups...",
        text: "Hubo un error al realizar la solictud",
      });
    }
  };
};

export const userLoginProvider = (provider) => {
  return async (dispatch) => {
    try {
      const { user } = await signInWithPopup(auth, provider);
      const userCollection = await filterCollection({
        key: "uid",
        value: user.uid,
        collectionName: "users",
      });
      if (userCollection.length == 0) {
        dispatch(
          userLoginEmail({
            uid: user.uid,
            error: false,
            isLogged: true,
            register: false,
          })
        );
      } else {
        dispatch(
          userLoginEmail({
            ...userCollection[0],
            error: false,
            isLogged: true,
            register: true,
          })
        );
      }
    } catch (error) {
      dispatch(
        userLoginEmail({
          name: "",
          email: "",
          error: true,
          isLogged: false,
        })
      );
      Swal.fire({
        icon: "error",
        title: "Uups...",
        text: "Hubo un error al realizar la solictud",
      });
    }
  };
};

const doLogout = () => {
  return {
    type: userTypes.DO_LOGOUT,
  };
};

export const doLogoutAsync = () => {
  return async (dispatch) => {
    dispatch(toggleLoading());
    try {
      await signOut(auth);
      dispatch(doLogout());
    } catch (error) {
      dispatch(doLogout());
      dispatch(toggleLoading());
      Swal.fire({
        icon: "error",
        title: "Uups...",
        text: "Hubo un error al realizar la solictud",
      });
    }
  };
};

//uodate data user

export const updateDataUserActionAsync = (user) => {
  return async (dispatch) => {
    try {
      const id = user.id;
      delete user.id;
      delete user.isLogged;
      delete user.error;
      delete user.register;
      const userData = await updateItemActionAsync("users", user, id);

      dispatch(
        updateProfileSync({
          ...userData,
          error: false,
        })
      );
      return userData;
    } catch (error) {
      dispatch(
        updateProfileSync({
          name: "",
          email: "",
          error: true,
          isLogged: false,
        })
      );
    }
  };
};

const updateProfileSync = (user) => {
  return {
    type: userTypes.UPDATE_USER,
    payload: user,
  };
};

//Función para editar usuario
const updateUserInformation = (user) => {
  return {
    type: userTypes.UPDATE_USER,
    payload: user,
  };
};

export const updateUserInformationAsync = (user) => {
  return async (dispatch) => {
    dispatch(toggleLoading());

    try {
      const userAuth = auth.currentUser;
      console.log(userAuth);
      let id;
      const q = query(userCollectionFirebase, where("uid", "==", userAuth.uid));
      const userDoc = await getDocs(q);
      userDoc.forEach((user) => {
        id = user.id;
      });
      console.log(id);
      console.log(userDoc);
      const userRef = doc(dataBase, "users", id);

      // await updateProfile(userAuth, {
      //   displayName: user.name,
      //   photoURL: user.photoURL,
      //   phoneNumber: user.phone,
      // });
      const emailProfile = await updateEmail(userAuth, user.email);

      const newUser = {
        uid: userAuth.uid,
        name: user.name,
        email: user.email,
        photoURL: user.photoURL,
        address: user.address,
        city: user.city,
        phone: user.phone,
      };

      console.log(newUser);
      await updateDoc(userRef, newUser);
      dispatch(updateUserInformation(newUser));
      dispatch(toggleLoading());
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Se editó tu información de perfil",
        showConfirmButton: false,
        timer: 4000,
      });
    } catch (error) {
      dispatch(updateUserInformation({}));
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ha ocurrido un error!",
      });
    }
  };
};
