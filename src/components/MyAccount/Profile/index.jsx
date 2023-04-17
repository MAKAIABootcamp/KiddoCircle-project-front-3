import React from 'react';

import avatarImg from '../../../assets/avatar.png';
import cameraIcon from '../../../assets/icons/camera-icon.png';
import pencilIcon from '../../../assets/icons/pencil-icon.png';

import './styles.scss';

const Profile = () => {
  return (
    <section className='profile'>
      <div className='profile-heading'>
        <img src={avatarImg} alt='avatar' className='avatar' />
        <img src={cameraIcon} alt='camera' className='camera' />
      </div>

      <div className='details'>
        <div className='details__card'>
          <span>Daniela Paez</span>
          <img src={pencilIcon} alt='pencil icon' />
        </div>

        <div className='details__card'>
          <span>danielapaez01@gmail.com</span>
          <img src={pencilIcon} alt='pencil icon' />
        </div>

        <div className='details__card'>
          <span>Barranquilla</span>
          <img src={pencilIcon} alt='pencil icon' />
        </div>

        <div className='details__card'>
          <span>Calle 11 b #34 - 60</span>
          <img src={pencilIcon} alt='pencil icon' />
        </div>

        <div className='details__card'>
          <span>+57 322 222 222</span>
          <img src={pencilIcon} alt='pencil icon' />
        </div>
      </div>
    </section>
  );
};

export default Profile;
