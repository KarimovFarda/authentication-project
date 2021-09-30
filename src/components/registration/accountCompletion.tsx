import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useHistory } from 'react-router';
import emailjs from 'emailjs-com'
import axios from 'axios'
import ReactFlagsSelect from 'react-flags-select';
import { toast } from 'react-toastify';
import RegistrationToastify from './registrationToastify'
import CompleteFormHeader from "./completionFormHeader"
import 'react-toastify/dist/ReactToastify.css';

/* Form Validation */
const SignupSchema = Yup.object().shape({
  phoneNumber: Yup.string()
    .min(2, 'Too Short!')
    .max(100, 'Too Long!')
    .required('Required'),
  address: Yup.string()
    .min(2, 'Too Short!')
    .max(100, 'Too Long!')
    .required('Required')
});

export const ComplementaryPage = (props: any) => {
  const history = useHistory()
  const [selected, setSelected] = useState<string>('');

  /* Toastify */
  const notify = () => toast.error('Email was used before!', {
    position: "top-right",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
  /* Random Number for Verification Code */
  const randomVerificationNumber: string = String(Math.floor(100000 + Math.random() * 899999))
  /* Sending Email - Emailjs*/
  function sendEmail() {
    emailjs.send('service_b0e2t75', 'template_g2m8p4r', { randomVerificationNumber: randomVerificationNumber, email: props.InputValues?.email, fullname: props.InputValues?.fullname }, 'user_lAkX2HsdSj38sk2vEKtXB')
      .then((response) => {
        console.log('SUCCESS!', response.status, response.text);
        sessionStorage.setItem("code", randomVerificationNumber)
        history.push("/verification")
      }, (err) => {
        console.log('FAILED...', err);
      });
  }
  return (
    <div className="col-12 col-lg-6">
      <CompleteFormHeader CompletionInfo={props} />
      <div className="form">
        <div>
          <div>
          </div>
          <h1> Complete Your Profile! </h1>
          <p> For the purpose of industry regulation, your details are required. </p>

          <Formik
            initialValues={{
              phoneNumber: '',
              address: '',
              gender: '',
            }}
            validationSchema={SignupSchema}
            onSubmit={(values) => {
              values.phoneNumber = String(values.phoneNumber)
              axios.post("http://localhost:8805/register", {
                fullname: props.InputValues?.fullname,
                address: values.address,
                email: props.InputValues?.email,
                phonenumber: values.phoneNumber,
                password: props.InputValues?.password,
                gender: String((document.getElementById("selected-value") as HTMLInputElement)?.value)
              }).then((response) => {
                sendEmail()
                document.cookie = `token=${response.data.token}`
              }).catch(error => {
                notify()
              })
            }}
          >
            {({ errors, touched }) => (

              <Form style={{ width: '100%' }}>
                <div className="form-group form-group-tel">
                  <label htmlFor="phoneNumberInfo">Phone Number</label>
                  <Field name="phoneNumber"
                    type="number"
                    className={errors.phoneNumber && touched.phoneNumber ? 'form-control error-message' : 'form-control'}
                    placeholder={errors.phoneNumber && touched.phoneNumber ? errors.phoneNumber : "+994551234565"} />
                  <ReactFlagsSelect
                    selected={selected}
                    className="flags-selection"
                    onSelect={code => setSelected(code)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="addressInfo">Your address</label>
                  <Field name="address" type="text"
                    className={errors.address && touched.address ? 'form-control error-message' : 'form-control'}
                    placeholder={errors.address && touched.address ? errors.address : "Enter address"} />
                </div>
                <div className="form-group">
                  <label htmlFor="genderInfo">Gender</label>
                  <Field as="select" name="gender"
                    className={errors.gender && touched.gender ?
                      'form-control selected-input error-message' : 'form-control selected-input'}>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="nottosay"> Prefer not to say</option>
                  </Field>
                </div>
                <RegistrationToastify />
                <button type="submit" className="btn btn-primary">Save & Continue</button>
                <p className="security-info"><i className="fas fa-lock"></i> Your Info is safely secured</p>
              </Form>

            )}
          </Formik>
        </div>
      </div>
    </div>
  )
}

export default ComplementaryPage

