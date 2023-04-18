import React from "react";
import logo from "../../assets/icons/logo.png";
import googleIcon from "../../assets/icons/google.png";
import facebookIcon from "../../assets/icons/facebook.png";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const submitSigIn = (data) => {
        console.log(data);
    };

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
                    <button className="button">
                        <figure>
                            <img src={googleIcon} alt="google icon" />
                        </figure>
                        <p>Iniciar con Google</p>
                    </button>
                    <button className="button">
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
