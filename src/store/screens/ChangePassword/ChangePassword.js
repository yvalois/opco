import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import { requestChangePassword } from '../../../redux/store/actions/userAction';
import { ConfirmPassword } from './ConfirmPassword';

export const ChangePassword = () => {
    const dispatch = useDispatch();
 
    const [email, setEMail] = useState('');
    const [emailSended, setEmailSended] = useState(false);

    const _handleSubmit = () => {
        dispatch(requestChangePassword(email));
        setTimeout(() => {
            setEmailSended(true);
        } , 1000);
        
    }





    return (
        <>
        {!emailSended ? (
        <div className="w-full h-full">
            <div className="signinscreen">
            <br/>
                <div className="container-login">
           
                    <div className="innerContainer">
       

                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="lname"
                            name="email"
                            placeholder="Your email.."
                            value={email}
                            onChange={e => setEMail(e.target.value)}
   
                        />
                        {/* <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="lname"
                            name="password"
                            placeholder="Your Password.."
                  
                       
                        /> */}
                        <input type='submit' onClick={(e)=>{e.preventDefault(); _handleSubmit()}} value="Sent code"  />
                        <br />
                        <br />

                    </div>
                </div>
            </div>
        </div>
        ) : (
            <ConfirmPassword email={email}/>
        )}
        </>
    )
}
