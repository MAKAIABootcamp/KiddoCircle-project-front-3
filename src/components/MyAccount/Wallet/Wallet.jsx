import React,  { useState, useEffect  } from "react";
import { Button} from 'reactstrap';
import plus from '../../../assets/icons/icon plus.png'
import product from '../../../assets/icons/shop.png'
import recharge from '../../../assets/recarga.jpg';
import FormRecharge from "./Form/FormRecharge";
import FormWithdraw from "./Form/FormWithdraw";
import { useDispatch, useSelector } from "react-redux";
import {getTransactionsActionAsync} from '../../../redux/actions/walletActions'
import { DateTime } from "luxon";
import {getTotalTransactions} from '../../../utils/general'

const Wallet = () => {
    const [modalRecharge, setModalRecharge] = useState(false);
    const [modalWithdrawal, setModalWithdrawal] = useState(false);
    const [total, setTotal] = useState('0');
    const toggleRecharge = () => setModalRecharge(!modalRecharge);
    const toggleWithdrawal = () => setModalWithdrawal(!modalWithdrawal);
    const dispatch = useDispatch();
    const { transactions } = useSelector((store) => store.wallet);
    const user = useSelector((store) => store.user);


    useEffect(()=>{
        if(user){
            dispatch(getTransactionsActionAsync(user.id))
        }
    },[user])

    useEffect(()=>{
        if(transactions){
            const sumTotal= getTotalTransactions(transactions)
            setTotal(sumTotal)
        }
    },[transactions])

    const getDate = (date) =>{
        let day='';
        if(DateTime.local().toISODate() == DateTime.fromISO(date).toISODate()){
            day='Hoy';
        } else if(DateTime.local().minus({ days: 1 }).toISODate() == DateTime.fromISO(date).toISODate()){
            day='Ayer'
        } else if(DateTime.fromISO(date).toISODate() > DateTime.local().minus({ days: 7 }).toISODate()){
            day=DateTime.fromISO(date).toLocaleString({ weekday: 'long' })
        } else {
            day=DateTime.fromISO(date).toLocaleString({month:'long', day: 'numeric',...(new Date().getFullYear() > DateTime.fromISO(date).toFormat("yyyy") && { year:'numeric'}) })
        }
        return day
    }

    return (
        <section className="wallet">
            <div className="d-flex justify-content-between">
                <div>
                    <Button className="rounded-pill px-4" onClick={toggleRecharge}>
                        <img className="me-2" src={plus} alt="plus" />
                        Recargar
                    </Button>
                    <FormRecharge  toggleWallet={toggleRecharge} modalWallet={modalRecharge}/>
                    <Button className="rounded-pill px-4 mx-4" onClick={toggleWithdrawal}>
                        <img className="me-2" src={plus} alt="plus" />
                        Retirar
                    </Button>
                    <FormWithdraw  toggleWallet={toggleWithdrawal} modalWallet={modalWithdrawal}/>
                </div>
                <span>KiddoCoins:  $ {total}</span>
            </div>
            <p className="fw-semibold mt-4 mx-4">Transacciones</p>
            <div className="mx-4">
                {transactions && transactions.length>0 &&
                    transactions.map(transaction=>(
                        <div className="d-flex mx-4 card-wallet mb-2 align-items-center" key={transaction.id}>
                            <div className="flex-shrink-0">
                                <img className="product" src={transaction.type==="Compra" ?product:recharge} alt="product" />
                            </div>
                            <div className="flex-grow-1 ms-5 data-product d-flex justify-content-between align-items-center">
                                <div>
                                    <span className="status fw-semibold">{transaction.type}</span>
                                    <p>
                                        {
                                            getDate(transaction.date)
                                        }
                                    </p>
                                </div>
                                <span className={transaction.type==="Depósito"?"pay fw-semibold":"withdrawal fw-semibold"}>{`${transaction.type==="Depósito"?"+":"-"} $ ${transaction.amount}`}</span>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    );
};

export default Wallet;
