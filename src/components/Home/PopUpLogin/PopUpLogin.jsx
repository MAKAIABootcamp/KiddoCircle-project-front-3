import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import face from "../../../assets/icons/smile_face.svg"
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "reactstrap";
import { Link } from "react-router-dom";

const PopUpLogin = () => {

    const [showModal, setShowModal] = useState(false);
    const user = useSelector((state) => state.user);

    const toggleTypes = () => setShowModal(!showModal);

    useEffect(() => {
        if (!user.isLogged) {
            setShowModal(true);
        }
        if (user.isLogged) {
            setShowModal(false);
        }
    }, [user.isLogged]);

    return (
        <section>
            <Modal isOpen={showModal} centered className="loginModal">
                <ModalHeader
                    className="border-0"
                    toggle={toggleTypes}
                ></ModalHeader>
                <ModalBody className="d-flex flex-wrap gap-2 justify-content-between loginModal__body">
                    <span>¡HOLA!</span>
                    Gracias por visitarnos. Queremos invitarte a unirte a
                    nuestra comunidad y disfrutar de todos los servicios que
                    tenemos para ofrecerte. ¡Únete ahora y accede a contenido
                    exclusivo!
                </ModalBody>
                <ModalFooter className="border-0 loginModal__footer">
                    <Link className="loginModal__footer__link" to="/login">
                        <Button className="loginModal__button">
                            Inicia sesión
                        </Button>
                    </Link>
                </ModalFooter>
                <figure className="loginModal__face">
                    <img src={face} alt="icono carita" />
                </figure>
            </Modal>
        </section>
    );
};

export default PopUpLogin;
