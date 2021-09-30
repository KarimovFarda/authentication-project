import React from 'react'
import SignUpImage from "../../images/Frame18.png"
import logo from '../../images/Group101.png'
import spinner from '../../images/Vector15.png'
export const RegistrationImage = () => {
  return (
    <div className="col-6">
      <img src={SignUpImage} alt="banner">
      </img>
      <img src={logo} alt="logo" className="logo">
      </img>
      <img src={spinner} alt="spinner" className="spinner"></img>
    </div>
  )
}
export default RegistrationImage