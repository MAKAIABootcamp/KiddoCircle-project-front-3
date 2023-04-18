import React from "react";
import logo from "../../assets/icons/logo.png";
import googleIcon from "../../assets/icons/google.png";
import facebookIcon from "../../assets/icons/facebook.png";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { fileUpload } from "../../services/fileUpload";

const schema = yup
    .object({
        name: yup.string().required("Nombre requerido"),
        email: yup.string().required("Email requerido"),
        ubication: yup.string().required("Ubicación requerida"),
        photoURL: yup.mixed().required("Foto de perfil requerida"),
        password: yup
            .string()
            .required("Contraseña requerida")
            .min(6, "La contraseña debe tener mínimo 6 caracteres"),
    })
    .required();

const Register = () => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema) });

    const submitRegister = async (data) => {
        //obtengo la url de la foto subida por el usuario
        const photoURLCloudinary = await fileUpload(data.photoURL[0]);
        //cambio el valor de picture por la URL de la foto obtenida por cloudinary
        setValue("photoURL", photoURLCloudinary);
        console.log(data);
    };

    return (
        <section className="login">
            <aside>¡Bienvenido!</aside>
            <main>
                <figure className="logo">
                    <img src={logo} alt="logo img" />
                </figure>
                <h1>Regístrate</h1>
                <p className="parrafo">
                    ¡Bienvenido a KiddoCircle! Ingresa tus datos y comencemos a
                    explorar juntos todo lo que tenemos para ofrecerte!
                </p>
                <div className="formContainer">
                    <form
                        onSubmit={handleSubmit(submitRegister)}
                        className="register__form"
                    >
                        <div>
                            <label>Ingrese su nombre</label>
                            <input
                                type="text"
                                placeholder="Nombre Apellido"
                                {...register("name")}
                            />
                            {errors.name ? (
                                <span>{errors.name.message}</span>
                            ) : (
                                <></>
                            )}
                        </div>
                        <div>
                            <label>Ingrese su correo</label>
                            <input
                                type="email"
                                placeholder="ejemplo@gmail.com"
                                {...register("email")}
                            />
                            {errors.email ? (
                                <span>{errors.email.message}</span>
                            ) : (
                                <></>
                            )}
                        </div>
                        <div>
                            <label>Ingrese su ubicación</label>
                            <input
                                type="text"
                                placeholder="Medellín Antioquia"
                                {...register("ubication")}
                            />
                            {errors.ubication ? (
                                <span>{errors.ubication.message}</span>
                            ) : (
                                <></>
                            )}
                        </div>
                        <div>
                            <label>Elija una foto de perfil</label>
                            <input
                                type="file"
                                accept=".png,.jpg,.jpeg"
                                {...register("photoURL")}
                                className="register__form__photo"
                            />
                            {errors.photoURL ? (
                                <span>{errors.photoURL.message}</span>
                            ) : (
                                <></>
                            )}
                        </div>
                        <div>
                            <label>Ingrese una contraseña</label>
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
                        </div>
                        <button>Registrarme</button>
                    </form>
                </div>
                <Link to="/login" className="link">
                    ¿Ya tienes una cuenta? Inicia sesión!
                </Link>
            </main>
        </section>
    );
};

export default Register;
