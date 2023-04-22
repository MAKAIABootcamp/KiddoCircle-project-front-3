import { productsTypes } from "../types/productsTypes";
import { getItemsActionAsync } from '../../services/crudColection';
import Swal from "sweetalert2";

export const getProductsActionAsync = () => {
    return async (dispatch) => {
      try {
        const products = await getItemsActionAsync("products");
        dispatch(getProductsAction(products));
      } catch (error) {
        dispatch(getProductsAction([]));
        Swal.fire({
          icon: "error",
          title: "Uups...",
          text: "Hubo un error al consultar los productos",
      });
      }
    };
};

const getProductsAction = (products) => {
    return {
      type: productsTypes.GET_PRODUCTS,
      payload: [...products],
    };
};