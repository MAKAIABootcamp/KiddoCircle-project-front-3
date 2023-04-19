import React, {useState, useRef } from 'react';
import { Button, Form, Input, InputGroup, Row } from 'reactstrap';
import avatarImg from '../../../assets/avatar.png';
import cameraIcon from '../../../assets/icons/icon camera.png';
import pencilIcon from '../../../assets/icons/pencil-icon.png';

const Profile = () => {
  const [photo,setPhoto] = useState()
  const [isInputDisabled, setIsInputDisabled]= useState('')
  const inputFile = useRef(null) 

  const onUploadFile = () => {
    inputFile.current.click();
  };

  const canEdit = (item) => {
    if(isInputDisabled !== item){
      setIsInputDisabled(item)
    } else{
      setIsInputDisabled('')
    }
  };

  const onEditItem=(event)=>{
    setPhoto(event.target.files[0])
  }

  return (
    <section className='profile'>
      <figure className='d-flex justify-content-center mt-0 mb-2 flex-column align-items-center'>
          <img src={photo?URL.createObjectURL(photo):avatarImg} alt="profile" />
          <div className="camera" onClick={onUploadFile}>
              <img src={cameraIcon} alt="camera" />
              <input name="photo" className="d-none" type="file" ref={inputFile} onChange={onEditItem}/>
          </div> 
      </figure>
      <Form className='details'>
        <InputGroup className='justify-content-center mb-3'>
          <Input
            className='rounded-pill rounded-end'
            name="name"
            placeholder="Daniela Paez"
            type="text"
            disabled={isInputDisabled==="name"?false:true}
          />
          <Button className='btn-edit rounded-pill rounded-start' onClick={()=>canEdit('name')}>
            <img src={pencilIcon} alt="edit" />
          </Button>
        </InputGroup>

        <InputGroup className='justify-content-center mb-3'>
          <Input
            className='rounded-pill rounded-end'
            name="email"
            placeholder="usuario@email.com"
            type="text"
            disabled={isInputDisabled==="email"?false:true}
          />
          <Button className='btn-edit rounded-pill rounded-start' onClick={()=>canEdit('email')}>
            <img src={pencilIcon} alt="edit" />
          </Button>
        </InputGroup>

        <InputGroup className='justify-content-center mb-3'>
          <Input
            className='rounded-pill rounded-end'
            name="city"
            placeholder="Barranquilla"
            type="text"
            disabled={isInputDisabled==="city"?false:true}
          />
          <Button className='btn-edit rounded-pill rounded-start' onClick={()=>canEdit('city')}>
            <img src={pencilIcon} alt="edit" />
          </Button>
        </InputGroup>

        <InputGroup className='justify-content-center mb-3'>
          <Input
            className='rounded-pill rounded-end'
            name="address"
            placeholder="Calle 11 b # 34 - 60"
            type="text"
            disabled={isInputDisabled==="address"?false:true}
          />
          <Button className='btn-edit rounded-pill rounded-start' onClick={()=>canEdit('address')}>
            <img src={pencilIcon} alt="edit" />
          </Button>
        </InputGroup>

        <InputGroup className='justify-content-center mb-3'>
          <Input
            className='rounded-pill rounded-end'
            name="phone"
            placeholder="+57 322 222 22 22"
            type="text"
            disabled={isInputDisabled==="phone"?false:true}
          />
          <Button className='btn-edit rounded-pill rounded-start' onClick={()=>canEdit('phone')}>
            <img src={pencilIcon} alt="edit" />
          </Button>
        </InputGroup>
        <InputGroup className='justify-content-center mb-3'>
          <Button className="btn-save mt-4 rounded-pill mb-4" size='lg'>
            Guardar
          </Button>
        </InputGroup>
      </Form>
    </section>
  );
};

export default Profile;
