import { productsTypes } from "../types/productsTypes";
import { getItemsActionAsync, updateItemActionAsync } from "../../services/crudColection";
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

export const updateProductActionAsync = (product) => {
  return async (dispatch) => {
    try {
      const id = product.id;
      delete product.id;
      const prod= await updateItemActionAsync(`products`,product,id);
      dispatch(
        updateProductAction({
          product: {...prod},
          status: "success",
        })
      );
      return prod
    } catch (error) {
      dispatch(
        updateProductAction({
          product: {},
          status: "error",
        })
      );
    }
  };
};

const updateProductAction = (product) => {
  return {
    type: productsTypes.UPDATE_PRODUCT,
    payload: {...product},
  };
};