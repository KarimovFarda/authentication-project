import React, { useState } from 'react'
import './style.scss'
import RegisterInfo from './registrationSection'
import ComplementaryPage from './accountCompletion'
import RegistrationImage from '../verification/verificationImage'
export const SignUpPage = () => {
  const [clicked, setClicked] = useState<boolean>(false)
  const [value, setValue] = useState<object>()
  function checkClicked(clickState: boolean, fullname: string, email: string, password: string) {
    setClicked(clickState)
    setValue({ "fullname": fullname, "email": email, "password": password })
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <RegistrationImage />
        {clicked === true ?
          <ComplementaryPage InputValues={value} Clicked={checkClicked} /> :
          <RegisterInfo InputValues={value} Clicked={checkClicked} />}
      </div>
    </div>
  )
}
export default SignUpPage