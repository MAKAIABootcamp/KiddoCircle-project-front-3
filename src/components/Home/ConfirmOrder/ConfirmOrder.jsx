import React, {useState} from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


const ConfirmOrder = () => {
    const [modalOrder, setModalOrder] = useState(false);

    const toggleOrder = () => setModalOrder(!modalOrder);

    return (
        <Modal isOpen={modalOrder} toggle={toggleOrder} centered className="confirm-order">
            <ModalHeader className="border-0" toggle={toggleOrder}></ModalHeader>
            <ModalBody className="text-center">
                <h4 className="title">¡Queremos saber tu opinión!</h4>
                <div className="mt-5">
                    <p>Hola  <b>Usuario</b></p>
                    <p>¿podrías confirmarnos si recibiste tu compra?</p>
                </div>
            </ModalBody>
            <ModalFooter className="border-0 justify-content-evenly">
                <Button className="btn-confirm" size="lg" onClick={toggleOrder}>
                    No
                </Button>
                <Button className="btn-confirm" size="lg"  onClick={toggleOrder}>
                    Si
                </Button>
            </ModalFooter>
        </Modal>
    );
};

export default ConfirmOrder;
