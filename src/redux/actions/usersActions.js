import { usersTypes } from "../types/usersTypes";
import { getItemsActionAsync } from '../../services/crudColection';
import Swal from "sweetalert2";

export const getUsersActionAsync = () => {
    return async (dispatch) => {
      try {
        const users = await getItemsActionAsync("users");
        dispatch(getUsersAction(users));
      } catch (error) {
        dispatch(getUsersAction([]));
        Swal.fire({
          icon: "error",
          title: "Uups...",
          text: "Hubo un error al consultar los usuarios",
      });
      }
    };
};

const getUsersAction = (users) => {
    return {
      type: usersTypes.GET_USERS,
      payload: [...users],
    };
};