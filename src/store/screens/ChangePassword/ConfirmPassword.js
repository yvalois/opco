import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import { changePassword, requestChangePassword } from '../../../redux/store/actions/userAction'
import "./password.css"

export const ConfirmPassword = ({ email }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [code, setCode] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
  

    const user = useSelector(state => state.user)
    const { loading, userDetails, loginSuccess, passChanged, error } = user

    const _handleSubmit = () => {
        if (password !== confirmPassword) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Password not match',
            })
        } else {
            try {
                
                dispatch(changePassword(code, password, email))
            } catch (error) {
                console.log(error)
            }
        }
    }

    const resendCode = () => {
        dispatch(requestChangePassword(email))
    }

    useEffect(() => {
        if (passChanged) {
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Password changed',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'OK',
                preConfirm : () => {
                    navigate('/store/signin')
                }
            })
        }
    } , [passChanged, navigate])

    useEffect(() => {
        if (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Invalid code',
            })
        }
    } , [error])




    return (
        <div className="home-screen">
            <div className="signinscreen">
                <br />
                <div className="container-login">

                    <div className="innerContainer">
                        <p>{email}</p>

                        <label htmlFor="email">code</label>
                        <input
                            type="text"
                            id="lname"
                            name="code from email"
                            placeholder="code"
                            value={code}
                            onChange={e => setCode(e.target.value)}

                        />
                        <label htmlFor="password">New Password</label>
                        <input
                            type="password"
                            id="lname"
                            name="password"
                            placeholder="Your Password.."
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                        <label htmlFor="password">Confirm password</label>
                        <input
                            type="password"
                            id="lname"
                            name="password"
                            placeholder="Your Password.."
                            value={confirmPassword}
                            onChange={e => setConfirmPassword(e.target.value)}
                        />


                        <button onClick={_handleSubmit} className='submit'>Change password</button>
                        <br />
                        <br />
                        <button className="newCode"
                         onClick={resendCode}   
                        >send new code</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
