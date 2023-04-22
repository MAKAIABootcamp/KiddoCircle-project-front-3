import { shoppingTypes } from "../types/shoppingTypes";
import { getItemsSubCollectionActionAsync } from '../../services/crudColection';
import Swal from "sweetalert2";

export const getShoppingsActionAsync = () => {
    return async (dispatch) => {
      try {
        const shoppings = await getItemsSubCollectionActionAsync("shopping", true);
        dispatch(getShoppingsAction(shoppings));
      } catch (error) {
        dispatch(getShoppingsAction([]));
        Swal.fire({
            icon: "error",
            title: "Uups...",
            text: "Hubo un error al consultar las compras",
        });
      }
    };
};

const getShoppingsAction = (shoppings) => {
    return {
      type: shoppingTypes.GET_SHOPPING,
      payload: [...shoppings],
    };
};
