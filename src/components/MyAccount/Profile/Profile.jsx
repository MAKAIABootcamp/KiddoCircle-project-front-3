import React, { useState, useRef, useEffect } from "react";
//import { Button, Form, Input, InputGroup, Row } from "reactstrap";
import avatarImg from "../../../assets/avatar.png";
import cameraIcon from "../../../assets/icons/icon camera.png";
import pencilIcon from "../../../assets/icons/pencil-icon.png";
import { useDispatch, useSelector } from "react-redux";
//import { doLogoutAsync } from "../../../redux/actions/userActions";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { updateUserInformationAsync } from "../../../redux/actions/userActions";
import { fileUpload } from "../../../services/fileUpload";
import Swal from "sweetalert2";

const Profile = () => {
  const [photoFile, setPhotoFile] = useState("");
  const [isInputDisabled, setIsInputDisabled] = useState("");
  const inputFile = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //const [dataForm, setDataForm] = useState({});

  //Traer el usuario desde el store
  const user = useSelector((store) => store.user);
  console.log(user);

  useEffect(() => {
    setValue("name", user?.name);
    setValue("email", user?.email);
    setValue("city", user?.city);
    setValue("address", user?.address);
    setValue("phone", user?.phone);
  }, [user]);

  const { register, handleSubmit, setValue } = useForm();

  const onUploadFile = () => {
    inputFile.current.click();
  };

  const canEdit = (item) => {
    if (isInputDisabled !== item) {
      setIsInputDisabled(item);
    } else {
      setIsInputDisabled("");
    }
  };

  const onEditItem = (event) => {
    setPhotoFile(event.target.files[0]);
  };

  // const handleLogout = () => {
  //   dispatch(doLogoutAsync());
  // };

  const errorSwal = () => {
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Hay campos vacíos",
    });
  };

  const onSubmit = async (data) => {
    const photoCloud = photoFile ? await fileUpload(photoFile) : user.photoURL;
    if (data.name === "") {
      errorSwal();
    } else if (data.email === "") {
      errorSwal();
    } else if (data.address === "") {
      errorSwal();
    } else if (data.city === "") {
      errorSwal();
    } else if (data.phone === "") {
      errorSwal();
    } else {
      //console.log({ ...data, photoURL: photoCloud });
      dispatch(updateUserInformationAsync({ ...data, photoURL: photoCloud }));
    }
  };

  return (
    <section className="profile">
      {user.name !== "" ? (
        <>
          <figure className="d-flex justify-content-center mt-0 mb-2 flex-column align-items-center">
            <img
              src={photoFile ? URL.createObjectURL(photoFile) : user?.photoURL}
              //src={user ? user.photoURL : avatarImg}
              alt="profile"
            />
            <div className="camera" onClick={onUploadFile}>
              <img src={cameraIcon} alt="camera" />
              <input
                name="photoURL"
                className="d-none"
                type="file"
                ref={inputFile}
                onChange={onEditItem}
              />
            </div>
          </figure>
          <form className="details" onSubmit={handleSubmit(onSubmit)}>
            <div className="input-container">
              <input
                className="input"
                name="name"
                placeholder={user ? user.name : "Nombre y Apellido"}
                type="text"
                // disabled={isInputDisabled === "name" ? false : true}
                {...register("name")}
              />
              <div className="btn-edit">
                <img src={pencilIcon} alt="edit" />
              </div>
            </div>

            <div className="input-container">
              <input
                className="input"
                name="email"
                placeholder={user ? user.email : "email@gmail.com"}
                type="text"
                //disabled={isInputDisabled === "email" ? false : true}
                {...register("email")}
              />
              <div className="btn-edit">
                <img src={pencilIcon} alt="edit" />
              </div>
            </div>

            <div className="input-container">
              <input
                className="input"
                name="city"
                placeholder={user ? user.city : "Mi ubicación"}
                type="text"
                //disabled={isInputDisabled === "city" ? false : true}
                {...register("city")}
              />
              <div className="btn-edit">
                <img src={pencilIcon} alt="edit" />
              </div>
            </div>

            <div className="input-container">
              <input
                className="input"
                name="address"
                placeholder={user ? user.address : "Crr 111 # 1b11"}
                type="text"
                // disabled={isInputDisabled === "address" ? false : true}
                {...register("address")}
              />
              <div className="btn-edit">
                <img src={pencilIcon} alt="edit" />
              </div>
            </div>

            <div className="input-container">
              <input
                className="input"
                name="phone"
                placeholder={user ? user.phone : "333333333"}
                type="text"
                //disabled={isInputDisabled === "phone" ? false : true}
                {...register("phone")}
              />
              <div className="btn-edit">
                <img src={pencilIcon} alt="edit" />
              </div>
            </div>
            <button className="btn-save">Guardar</button>
            {/* <Button
                className="btn-logout mt-4 rounded-pill mb-4"
                size="lg"
                onClick={handleLogout}
              >
                Cerrar sesión
              </Button> */}
          </form>
        </>
      ) : (
        <section className="section-no-user">
          <p className="section-no-user__p">
            ¡Regístrate y accede a todo el contenido que tenemos para ofrecerte!
          </p>
          <button
            className="section-no-user__button"
            onClick={() => navigate("/registro")}
          >
            Registrarme
          </button>
        </section>
      )}
    </section>
  );
};

export default Profile;
