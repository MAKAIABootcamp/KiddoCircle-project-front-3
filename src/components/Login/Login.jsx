import React, { useEffect } from "react";
import logo from "../../assets/icons/logo.png";
import googleIcon from "../../assets/icons/google.png";
import facebookIcon from "../../assets/icons/facebook.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { userLoginEmailAsync, userLoginProvider } from "../../redux/actions/userActions";
import Swal from "sweetalert2";
import { google, facebook } from "../../firebase/firebaseConfig";

const schema = yup
    .object({
        email: yup.string().required("Email requerido"),
        password: yup
            .string()
            .required("Contraseña requerida")
            .min(6, "La contraseña debe tener mínimo 6 caracteres"),
    })
    .required();

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const submitSigIn = (data) => {
        console.log(data);
        dispatch(userLoginEmailAsync(data));
    };

    const sesionProvider = (provider) => {
        dispatch(userLoginProvider(provider));
    };

    //Use effect para mostrarle al usuario si pudo inicar sesión correctamente
    useEffect(() => {
        if (user.isLogged && user.register) {
            Swal.fire({
                icon: "success",
                title: "¡Bienvenido!",
                confirmButtonText: "Ok",
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/");
                }
            });
        }
    }, [user.isLogged]);

    useEffect(() => {
        if (user.error) {
            Swal.fire({
                icon: "error",
                title: "Uups...",
                text: "Hubo un error al realizar la solictud",
            });
        }
    }, [user.error]);

    //Use effect para validar si se tiene o no coleccion del usuario que se logue con el provedor google o facebook
    useEffect(() => {
        if (!user.register && user.isLogged) {
            Swal.fire({
                icon: "success",
                title: "Por favor diligencie el siguiente formulario.",
                confirmButtonText: "Ok",
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/registro");
                }
            });
        }
    }, [user.register]);

    return (
        <section className="login">
            <aside>¡Bienvenido!</aside>
            <main>
                <figure className="logo">
                    <img src={logo} alt="logo img" />
                </figure>
                <h1>Inicia sesión</h1>
                <p className="parrafo">
                    ¡Bienvenido de nuevo a KiddoCircle! Ingresa tus datos de
                    inicio de sesión y comencemos a explorar juntos todo lo que
                    tenemos para ofrecerte!
                </p>
                <div className="formContainer">
                    <form className="form" onSubmit={handleSubmit(submitSigIn)}>
                        <input
                            type="email"
                            placeholder="Ingresa tu correo"
                            {...register("email")}
                        />
                        {errors.email ? (
                            <span>{errors.email.message}</span>
                        ) : (
                            <></>
                        )}
                        <input
                            type="password"
                            placeholder="Ingresa tu contraseña"
                            {...register("password")}
                        />
                        {errors.password ? (
                            <span>{errors.password.message}</span>
                        ) : (
                            <></>
                        )}
                        <button>Iniciar sesión</button>
                    </form>
                    <button
                        className="button"
                        onClick={() => sesionProvider(google)}
                    >
                        <figure>
                            <img src={googleIcon} alt="google icon" />
                        </figure>
                        <p>Iniciar con Google</p>
                    </button>
                    <button
                        className="button"
                        // onClick={() => sesionProvider(facebook)}
                    >
                        <figure>
                            <img src={facebookIcon} alt="facebook icon" />
                        </figure>
                        <p>Iniciar con Facebook</p>
                    </button>
                </div>

                <Link to="/registro" className="link">
                    ¿No tienes una cuenta? ¡Regístrate!
                </Link>
            </main>
        </section>
    );
};

export default Login;
