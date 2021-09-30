import React, { useState } from 'react'

import './verificationStyle.scss'

import { toast } from 'react-toastify';
import VerificationToastift from './verificationToastify'
import FormHeader from '../registration/formHeader';
import RegistrationImage from './verificationImage'
import 'react-toastify/dist/ReactToastify.css';

export const VerificationPage = () => {
  const notify = () => toast.success('Registered Successfully!', {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  const [verifiedCode, setVerifiedCode] = useState<string>("")
  const [inputValue, setInputValues] = useState<string>("")
  function checkValidation(e: any) {
    e.preventDefault()
    if (Number(inputValue) === Number(sessionStorage.getItem("code"))) {
      setVerifiedCode("fa-check-circle")
      notify()
    } else {
      setVerifiedCode("fa-times-circle")
    }
  }
  return (
    <div className="container-fluid">
      <div className="row">
        <RegistrationImage />
        <div className="col-12 col-lg-6">
          <FormHeader pageCount="03/03" pageInfo="Email Verification" />
          <div className="form verification-form">
            <div>
              <h1> Complete Your Profile! </h1>
              <p> For the purpose of industry regulation, your details are required. </p>
              <hr />

              <form style={{ width: '100%' }}>
                <div className="form-group">
                  <label htmlFor="verificationInfo">Email verification code</label>
                  <div className="verified-value">
                    <input value={inputValue} name="verificationCode" className="form-control" 
                      onChange={(e) => setInputValues(e.target.value)} placeholder="Your Verification Code" />
                    <i className={`fas ${verifiedCode}`}></i>
                    <i className={`fas ${verifiedCode}`}></i>
                  </div>
                </div>

                <button type="submit" className="btn btn-primary verification-button"
                  onClick={checkValidation}>Save & Continue</button>
                <p className="security-info"><i className="fas fa-lock"></i> Your Info is safely secured</p>
                <VerificationToastift />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default VerificationPage