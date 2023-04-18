import React, { useEffect } from "react";
import logo from "../../assets/icons/logo.png";
import googleIcon from "../../assets/icons/google.png";
import facebookIcon from "../../assets/icons/facebook.png";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { fileUpload } from "../../services/fileUpload";
import { userLoginEmail, userRegisterAsync } from "../../redux/actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { addDocument } from "../../services/filterCollection";

//const que valida que el numero telefonico sea numero y que tenga 10 digitos
const numberRegex = /^[0-9]{10}$/;

const schema = yup
    .object({
        name: yup.string().required("Nombre requerido"),
        email: yup.string().required("Email requerido"),
        city: yup.string().required("Ciudad requerida"),
        address: yup.string().required("Dirección requerida"),
        phone: yup
            .string()
            .required("Celular requerido")
            .matches(numberRegex, "El número de celular debe tener 10 digitos"),
        photoURL: yup.mixed().required("Foto de perfil requerida"),
        password: yup
            .string()
            .required("Contraseña requerida")
            .min(6, "La contraseña debe tener mínimo 6 caracteres"),
    })
    .required();

const Register = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

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
        setValue("phone", `+57${data.phone}`);
        console.log(data);
        // dispatch(userRegisterAsync(data));

        if (!user.isLogged) {
            dispatch(userRegisterAsync(data));
        } else {
            const newUser = {
                ...data,
                uid: user.uid,
            };
            addDocument("users", newUser)
                .then(() => {
                    console.log("Documento agregado con éxito");
                    dispatch(
                        userLoginEmail({
                            ...newUser,
                            error: false,
                            isLogged: true,
                            register: true,
                        })
                    );
                    Swal.fire({
                        icon: "success",
                        title: "¡Bienvenido!",
                        confirmButtonText: "Ok",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            navigate("/");
                        }
                    });
                })
                .catch((error) => {
                    Swal.fire({
                        icon: "error",
                        title: "Uups...",
                        text: "Hubo un error al realizar la solictud",
                    });
                });
        }
    };

    //Use effect para redirija al usuario a home si ya está loggueado y tiene documento en la colección users
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

    //Use effect para validar si se tiene o no coleccion del usuario que se logue con el provedor google o facebook
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
    }, [user.register]);

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
                                className="input"
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
                                className="input"
                            />
                            {errors.email ? (
                                <span>{errors.email.message}</span>
                            ) : (
                                <></>
                            )}
                        </div>
                        <div>
                            <label>
                                Ingrese su número de celular.
                                <span>
                                    Para realizar donaciones, es necesario que
                                    el número de celular ingresado tenga
                                    WhatsApp.
                                </span>
                            </label>
                            <div className="phoneContainer">
                                +57
                                <input
                                    type="number"
                                    placeholder="31234567894"
                                    {...register("phone")}
                                />
                            </div>
                            {errors.phone ? (
                                <span>{errors.phone.message}</span>
                            ) : (
                                <></>
                            )}
                        </div>
                        <div>
                            <label>Ingrese su ciudad</label>
                            <input
                                type="text"
                                placeholder="Medellín Antioquia"
                                {...register("city")}
                                className="input"
                            />
                            {errors.city ? (
                                <span>{errors.city.message}</span>
                            ) : (
                                <></>
                            )}
                        </div>
                        <div>
                            <label>Ingrese su dirección</label>
                            <input
                                type="text"
                                placeholder="Calle 100 #46-54"
                                {...register("address")}
                                className="input"
                            />
                            {errors.address ? (
                                <span>{errors.address.message}</span>
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
                                className="register__form__photo input"
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
                                className="input"
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
