import React, { useCallback, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './signIn.css';
import { fetchSignIn } from '../../../redux/store/actions/userAction';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';

function Index() {
  const navigate = useNavigate()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const { loading, loginSuccess, error, errorMsg, userDetails } = user;

  const _handleSubmit = () => {
    // callback
    if (email.length > 2 && password.length > 2) {
      dispatch(fetchSignIn({ email, password }));
    }
  }

  useEffect(() => {
    if (loginSuccess) {
      if (userDetails.emailVerified) {
        navigate('/store')
  
      } else {
        navigate('/store/code')
      }
    }
  }, [loginSuccess, navigate])

  useEffect(() => {
    if (error) {
      Swal.fire({
        title: 'Error',
        text: 'Invalid email or password',
        icon: 'error',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'OK',
      })
    }
  }, [error, errorMsg])




  if (loading) return <h1>Loading.....</h1>
  return (
<div className="flex flex-col items-center h-full w-full">
  <div className="flex items-center h-full w-full flex-col">
    <div className="w-full h-full justify-center mt-8 flex items-center flex-grow">
    <div className="w-full sm:w-4/5 md:w-3/4 lg:w-2/3 xl:w-1/2 2xl:w-1/3 mx-auto rounded-lg bg-white p-5 border-2 border-gray-300">
    <div className="flex flex-col items-center justify-between space-y-5">

        <div className="w-full flex justify-start cursor-pointer" onClick={() => navigate('/store')}>
            <i className="fas fa-arrow-left fa-2x"></i>
        </div>

        <div className="text-center">
            <p className="font-bold text-lg text-gray-700">Sign In</p>
        </div>

    </div>

    <form className="space-y-4">
        <label htmlFor="email" className="block">Email</label>
        <input
            className="w-full px-3 py-2 border-1 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            id="lname"
            name="email"
            placeholder="Correo"
            value={email}
            onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="password" className="block">Password</label>
        <input
            className="w-full px-3 py-2 border-1 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            id="lname"
            name="password"
            placeholder="Contraseña"
            value={password}
            onChange={e => setPassword(e.target.value)}
        />
        <div className='flex justify-center'> 
            <button 
                className="bg-yellow-300 text-gray-700 px-5 py-3 w-full border-none rounded-md cursor-pointer mt-5 border-blue-700 font-bold hover:bg-yellow-200 focus:outline-none" 
                type="submit"
                onClick={() => _handleSubmit()} 
            >
                Sign in
            </button>
        </div>
    </form>

    <div className="flex flex-col space-y-2 mt-5">
        <Link to="/store/signup" className='flex justify-center'>
            <span className="text-sm underline text-blue-500 hover:text-blue-700">Create a new account</span>
        </Link>
        <Link to="/store/reset" className='flex justify-center'>
            <span className="text-sm underline text-blue-500 hover:text-blue-700">Forget password</span>
        </Link>
    </div>

</div>


    </div>
  </div>
</div>
  )
}

export default Index
