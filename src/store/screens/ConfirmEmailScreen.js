import React, { useEffect, useState } from 'react';
import "./ConfirmEmailScreen.css";
import { useDispatch, useSelector } from 'react-redux';
import { verifyEmail } from '../../redux/store/actions/userAction';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Api } from '../utils/Api';
import LoaderFullScreen from '../../components/loaderFullScreen';

export default function ConfirmEmailScreen() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    const { userDetails, loginSuccess, error, errorMsg } = user;

    const [code, setCode] = useState('');

    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = () => {
        if (code.length > 0) {
            try {
                setLoading(true);

                setSuccess(false);
                dispatch(verifyEmail(code.toString()));
                setSuccess(false);

            } catch (error) {

                setLoading(false);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.message,
                })
            }
        } else {

            setLoading(false);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please enter code',
            })
        }
    }

    const handleNewCode = async () => {
        try {
            setLoading(true);

            const data = await Api.newCode();
            setLoading(false);
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'New code has been sent to your email',
            })
        } catch (error) {

            setLoading(false);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message,
            })
        }
    }

    useEffect(() => {
        if (error) {
            console.log(errorMsg);
            setLoading(false);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: "Invalid code",
            })
        }
    }, [error, errorMsg])


    useEffect(() => {
        if (loginSuccess) {
            if (userDetails.emailVerified) {
                setSuccess(true);
                setLoading(false);
            }
        }
    }, [loginSuccess, userDetails]);

    useEffect(() => {
        if (success) {
            Swal.fire({
                title: 'success !',
                text: 'You have successfully confirmed your email',
                icon: 'success',
                confirmButtonText: 'OK'
            }).
                then(() => {
                    navigate('/store');
                })
        }
    }, [success, navigate]);


    return (
        <>
            <LoaderFullScreen isLoading={loading} />
            <div className="w-full h-full">
                <div className='code-screen'>
                    <div className='code-screen-inner'>

                        <h3>Please enter code received in your email</h3><br />
                        <input type="text"
                            value={code}
                            onChange={e => setCode(e.target.value)}
                        />
                        <br />
                        <button
                            onClick={handleSubmit}
                            className='btn btn-dark'
                        >Confirm</button><br />

                        <button
                            className='new-code'
                            onClick={handleNewCode}
                        >send new code</button>
                    </div>
                </div>
            </div>
        </>
    )
}
