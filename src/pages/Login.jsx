import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CustomBtn from '../components/CustomBtn';
import Input from '../components/Input';
import userService from '../services/userService';
import { login } from '../stores/reducers/auth';
import './Login.css';
import { useTranslation } from 'react-i18next';

const Login = (props) => {
  const [message, setMessage] = useState('');
  const usernameRef = React.useRef();
  const passwordRef = React.useRef();
  const dispatch = useDispatch();

  const [isWaiting, setIsWaiting] = useState(false)
  const navigate = useNavigate();
  const {t} = useTranslation();

  const handleSubmit = (e) => {
  e.preventDefault();
    const userName = usernameRef.current.value;
    const password = passwordRef.current.value;
    console.log(userName, password);
    setIsWaiting(true);

    userService.login(userName, password).then((res) => {
      setIsWaiting(false);
      if (res.errorCode === 0) {
        setMessage('')
        dispatch(login({
          token: res.data.accessToken,
          userInfo: res.data.userInfo
        }))
        navigate('/home')
      } else {
        setMessage(t(`message:${res.errorCode}`));
      }
    });
  }

  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  return (
    <div className='container vh-100  '>
      <div className='row justify-content-center h-100 align-items-center'>
        <div className='col-sm-8 col-lg-5'>
          <div className='card bg-primary'>
            <div className='card-header text-white'>
              <h4 className='card-title mb-0'>
                <i className='bi-grid-3x3-gap-fill me-1' /> {t('login')}
              </h4>
            </div>
            <div className='card-body bg-white rounded-bottom'>
              <form onSubmit={handleSubmit}>
                <p className='text-danger text-center'>{message}</p>
                <Input
                  inputRef={usernameRef}
                  id='txtUserName'
                  label={t('username')}
                  type='text'
                  maxLength='50'
                  autoComplete='off'
                  placeholder={t('enterUsername')}
                />
                <Input
                  inputRef={passwordRef}
                  id='txtPassword'
                  label={t('password')}
                  type='password'
                  maxLength='100'
                  autoComplete='off'
                  placeholder={t('enterPassword')}
                />
                <div className='row'>
                  <div className='offset-sm-3 col-auto'>
                    <CustomBtn type='submit' className='btn btn-primary' disabled={isWaiting} isLoading={isWaiting} icon="bi bi-box-arrow-in-right">
                    {t('signIn')}
                    </CustomBtn>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
