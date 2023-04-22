import { userTypes } from "../types/userTypes";

const initialState = {
    name: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    photoURL: "",
    uid: "",
    error: false,
    isLogged: false,
    register: true,
    cards:[],
    id: ""
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case userTypes.CREATE_USER:
            return {
                ...state,
                // ...action.payload,
                name: action.payload.name,
                email: action.payload.email,
                phone: action.payload.phone,
                city: action.payload.city,
                address: action.payload.address,
                photoURL: action.payload.photoURL,
                uid: action.payload.uid,
                error: action.payload.error,
                isLogged: action.payload.isLogged,
                register: action.payload.register,
                id: action.payload.id
            };
        case userTypes.TOGGLE_LOGIN:
            return {
                ...state,
                isLogged: !state.isLogged,
            };
        case userTypes.LOGIN_USER_EMAIL_AND_PASSWORD:
            return {
                ...state,
                name: action.payload.name,
                email: action.payload.email,
                phone: action.payload.phone,
                city: action.payload.city,
                address: action.payload.address,
                photoURL: action.payload.photoURL,
                uid: action.payload.uid,
                error: action.payload.error,
                isLogged: action.payload.isLogged,
                register: action.payload.register,
                cards:action.payload.cards,
                id:action.payload.id
            };
        case userTypes.DO_LOGOUT:
            return {
                initialState,
            };
        case userTypes.UPDATE_USER:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};
