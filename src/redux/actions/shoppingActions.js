import { shoppingTypes } from "../types/shoppingTypes";
import { getItemsFilterSubCollectionActionAsync, createItemActionAsync } from '../../services/crudColection';
import Swal from "sweetalert2";

export const getShoppingsActionAsync = (userId) => {
    return async (dispatch) => {
      try {
        const shoppings = await getItemsFilterSubCollectionActionAsync("shopping", ['userId', '==', userId]);
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


export const currentShopAction = (shop) => {
  return {
    type: shoppingTypes.CURRENT_SHOPPING,
    payload: shop,
  };
};


export const createShoppingActionAsync = (shopping) => {
  return async (dispatch) => {
    try {
      const shoppingDoc = await createItemActionAsync(shopping,`users/${shopping.userId}/shopping`);
      dispatch(createShoppingAction(shoppingDoc));
      dispatch(currentShopAction({}));
      return shoppingDoc
    } catch (error) {
      console.log(error);
      dispatch(
        createShoppingAction({
          shoppings: {},
          status: "error",
        })
      );
    }
  };
};

const createShoppingAction = (shopping) => {
  return {
    type: shoppingTypes.CREATE_SHOPPING,
    payload: { ...shopping },
  };
};