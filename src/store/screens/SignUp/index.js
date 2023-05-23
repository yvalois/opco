import React, { useCallback, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import './signup.css'
import { fetchSignUp } from '../../../redux/store/actions/userAction';
import Swal from 'sweetalert2';

function Index() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');


  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const user = useSelector(state => state.user);
  const { userDetails, loginSuccess, loading } = user;

  useEffect(() => {
    setFullName(name + ' ' + surname);
  }, [name, surname])


  const _handleSubmit = () => {
    if (fullName.length > 2 && email.length > 2 && password.length > 2 && confirmPassword.length > 2) {
      if (password === confirmPassword) {
        dispatch(fetchSignUp(fullName, email.toLowerCase(), password));
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Passwords do not match',
        })
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill all fields',
      })
    }

  }

  useEffect(() => {
    if (loginSuccess) {
      Swal.fire({
        title: 'success !',
        text: 'You have successfully signed up',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {navigate('/store/code')})
    }
  }, [loginSuccess, navigate])


  if (loading) return <h1>Loading...</h1>
  return (
<div className="w-full flex items-center justify-center h-full mt-8">
  <div className="w-full max-w-md">
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={_handleSubmit}>
      <div className="flex items-center justify-between">
        <button onClick={() => navigate('/store')} className="text-3xl text-gray-700">
          <i className="fas fa-arrow-circle-left"></i>
        </button>
        <div className="mb-4">
          <h1 className="text-2xl text-center font-bold">Sign Up</h1>
        </div>
      </div>
      <div className="flex flex-wrap -mx-3">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="fname">
            Name
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="fname"
            type="text"
            placeholder="First Name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="lname">
            Surname
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="lname"
            type="text"
            placeholder="Surname"
            value={surname}
            onChange={e => setSurname(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full px-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="password"
            type="password"
            placeholder="********"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="confirmPassword">
              Verify Password
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              id="confirmPassword"
              type="password"
              placeholder="********"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign Up
          </button>
          <Link to="/store/signin" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
            Already have an account ?
          </Link>
        </div>
    </form>
  </div>
</div>


  )
}

export default Index