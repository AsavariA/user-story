import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { AuthContext } from '../App'
import eosLogoWhite from '../assets/images/logo-white.png'
import eosLogoColoured from '../assets/images/logo-coloured.png'
import eosLock from '../assets/images/authentication-lock.png'
import Button from '../components/Button'

export const Register = () => {
  const { dispatch } = React.useContext(AuthContext)
  const initialState = {
    username: '',
    email: '',
    password: '',
    isSubmitting: false,
    errorMessage: null
  }
  const [data, setData] = React.useState(initialState)
  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value
    })
  }
  const handleFormSubmit = (event) => {
    event.preventDefault()
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null
    })
    axios
      .post('http://localhost:1337/auth/local/register', {
        username: data.username,
        email: data.email,
        password: data.password
      })
      .then((response) => {
        dispatch({
          type: 'SIGNUP',
          payload: response.data
        })
      })
      .catch((error) => {
        setData({
          ...data,
          isSubmitting: false,
          errorMessage: error.message || error.statusText
        })
      })
  }

  return (
    <div className='authentication'>
      <div className='container-left'>
        <div className='image image-logo'>
          <img src={eosLogoWhite} alt='EOS Logo' />
        </div>
        <div className='image image-center'>
          <img src={eosLock} alt='EOS Logo' />
        </div>
        <div>
          <div className='header header-left'>Feature Request</div>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s
          </p>
        </div>
        <div className='footer'>
          This site saves some information in cookies but only when strictly
          necessary
          {/* <a href='#'>Learn More</a> */}
        </div>
      </div>
      <div className='container-right'>
        <div className='image image-logo eos-logo-resize'>
          <img src={eosLogoColoured} alt='EOS Logo' />
        </div>
        <form className='form' onSubmit={handleFormSubmit}>
          <div className='header'>Sign up</div>
          <div className='form-group'>
            <label htmlFor='username'>Username</label>
            <input type='text' name='username' onChange={handleInputChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input type='text' name='email' onChange={handleInputChange} />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              name='password'
              onChange={handleInputChange}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Confirm Password</label>
            <input
              type='password'
              name='password'
              onChange={handleInputChange}
            />
          </div>
          <Button
            type='submit'
            className='btn btn-default'
            disabled={data.isSubmitting}
          >
            {data.isSubmitting ? 'Loading...' : 'Register'}
          </Button>
        </form>
        <Link className='link link-redirect' to='/'>
          Existing User?
        </Link>
        <div className='footer'>
          <span> Copyright 2020 EOS </span>
        </div>
        {data.errorMessage && (
          <span className='form-error'>{data.errorMessage}</span>
        )}
      </div>
    </div>
  )
}

export default Register
