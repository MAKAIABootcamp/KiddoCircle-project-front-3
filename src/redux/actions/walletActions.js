import { walletTypes } from "../types/walletTypes";
import { getItemsFilterSubCollectionActionAsync, createItemActionAsync } from '../../services/crudColection';
import Swal from "sweetalert2";

export const getTransactionsActionAsync = (userId) => {
    return async (dispatch) => {
      try {
        const transactions = await getItemsFilterSubCollectionActionAsync("wallet",['userId', '==', userId]);
        const shoppings = await getItemsFilterSubCollectionActionAsync("shopping", ['userId', '==', userId]);
        const allTransations= [...shoppings,...transactions];
        allTransations.sort(function(a, b) {
          return (a.date > b.date) ? -1 : ((a.date < b.date) ? 1 : 0);
        });
        dispatch(getTransactionsAction(allTransations));
      } catch (error) {
        dispatch(getTransactionsAction([]));
        Swal.fire({
            icon: "error",
            title: "Uups...",
            text: "Hubo un error al consultar las transacciones",
        });
      }
    };
};

const getTransactionsAction = (transactions) => {
    return {
      type: walletTypes.GET_TRANSACTIONS,
      payload: [...transactions],
    };
};

export const createTransactionActionAsync = (transaction) => {
  return async (dispatch) => {
    try {
      const transactionDoc = await createItemActionAsync(transaction,`users/${transaction.userId}/wallet`);
      dispatch(createTransactionAction(transactionDoc));
      return transactionDoc
    } catch (error) {
      console.log(error);
      dispatch(
        createTransactionAction({
          transactions: {},
          status: "error",
        })
      );
      Swal.fire({
        icon: "error",
        title: "Uups...",
        text: "No se pudo realizar la transacción",
      })
    }
  };
};

const createTransactionAction = (transaction) => {
  return {
    type: walletTypes.CREATE_TRANSACTIONS,
    payload: { ...transaction },
  };
};


