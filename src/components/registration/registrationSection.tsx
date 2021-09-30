import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import FormHeader from './formHeader';
import { toast } from 'react-toastify';
import RegistrationToastify from './registrationToastify'
import 'react-toastify/dist/ReactToastify.css';

export const RegisterInfo = (props: any) => {
  const [checkboxState, setCheckboxState] = useState<boolean>(false)
  const [displayState,setDisplayState] = useState<string>("Show")
  let SignupSchema;
  if (props.InputValues && props.InputValues?.fullname) {
    SignupSchema = Yup.object().shape({
      fullName: Yup.string()
        .min(7, 'Too Short!')
        .max(50, 'Too Long!'),
      password: Yup.string()
        .min(7, 'Too Short!')
        .max(50, 'Too Long!'),
      email: Yup.string()
        .min(7, 'Too Short!')
        .email('Invalid email')
    });
  } else {
    SignupSchema = Yup.object().shape({
      fullName: Yup.string()
        .min(7, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
      password: Yup.string()
        .min(7, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
      email: Yup.string()
        .email('Invalid email')
        .required('Required'),
    });
  }
  /* Toastify */
  const notify = () => toast.error('You should agree to terms!', {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
  return (
    <div className="col-12 col-lg-6">
      <FormHeader pageCount="01/03" pageInfo="Personal Info" />
      <div className="form">
        <div>
          <h1> Register Individual Account! </h1>
          <p> For the purpose of industry regulation, your details are required. </p>
          <hr />
          <Formik
            initialValues={{
              fullName: '',
              password: '',
              email: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={values => {
              if (checkboxState) {
                const checkInputValues = () => {
                  props.Clicked(true, values.fullName, values.email, values.password)
                }
                checkInputValues()
              } else {
                notify()
              }
            }}>
            {({ errors, touched }) => (
              <Form style={{ width: '100%' }}>
                <RegistrationToastify />
                <div className="form-group">
                  <label htmlFor="FullnameInfo">Your fullname*</label>
                  <Field name="fullName"
                    value={props.InputValues ? props.InputValues?.fullname : null}
                    className={errors.fullName && touched.fullName ? 'form-control error-message' : 'form-control'}
                    placeholder={errors.fullName && touched.fullName ? errors.fullName :
                      props.InputValues ? props.InputValues?.fullname : "Invictus Innocent"} />

                </div>
                <div className="form-group">
                  <label htmlFor="emailAddressInfo">Email address*</label>
                  <Field name="email"
                    value={props.InputValues ? props.InputValues?.email : null}
                    type="email" className={errors.email && touched.email ?
                      'form-control error-message' : 'form-control'}
                    placeholder={errors.email && touched.email ?
                      errors.email : props.InputValues ? props.InputValues?.email : "Enter Email Address"} />
                </div>
                <div className="form-group form-group-password">
                  <label htmlFor="passwordInfo">Create password*</label>
                  <Field name="password" type={displayState === "Show" ? 'password' : 'text'}
                    value={props.InputValues ? props.InputValues?.password : null}
                    className={errors.password && touched.password ? 'form-control error-message' : 'form-control'}
                    placeholder={errors.password && touched.password ? errors.password :
                      props.InputValues ? props.InputValues?.password : "Enter Valid Password"} />
                      <a href="#show" className="showPassword" onClick={() => displayState === "Show" ? setDisplayState("Hide") : setDisplayState("Show")}>{displayState}</a>
                </div>
                <div className="form-check">
                  <input type="checkbox" checked={checkboxState} onChange={() => { checkboxState === false ? setCheckboxState(true) : setCheckboxState(false) }} className="form-check-input" id="exampleCheck1" />
                  <label className="form-check-label" htmlFor="termsInfo">I agree to terms & conditions</label>
                </div>
                <button type="submit" className="btn btn-primary" >Register Account</button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default RegisterInfo