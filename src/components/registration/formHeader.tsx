import React from 'react'
import { useHistory } from 'react-router'

export const FormHeader = (props: any) => {
  const history = useHistory()
  return (
    <div className="form-header">
      <div>
        <a href="#back" onClick={() => history.push("/")}><i className="fas fa-chevron-left"></i>Back</a>
      </div>
      <div>
        <a href="#step"> STEP {props.pageCount}</a>
        <p>{props.pageInfo}</p>
      </div>
    </div>
  )
}
export default FormHeader