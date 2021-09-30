import React from 'react'
export const CompleteFormHeader = (props: any) => {

  const PreviousSection = () => {
    props.CompletionInfo.Clicked(false, props.CompletionInfo.InputValues?.fullname, props.CompletionInfo.InputValues?.email, props.CompletionInfo.InputValues?.password)
  }
  return (
    <div className="form-header">
      <div>
        <a href="#back" onClick={PreviousSection}><i className="fas fa-chevron-left"></i>Back</a>
      </div>
      <div>
        <a href="#step"> STEP 02/03</a>
        <p>Residency Info</p>
      </div>
    </div>
  )
}

export default CompleteFormHeader