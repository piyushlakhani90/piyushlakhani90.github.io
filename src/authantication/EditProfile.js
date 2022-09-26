import React from 'react'
import {
    CButton, CForm, CFormInput, CFormLabel, CFormTextarea, CDatePicker, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem, CInputGroup, CInputGroupText
} from '@coreui/react'

const EditProfile = () => {
    return (
        <div style={{ width: "600px", margin: "0 auto", background: "white", padding: "40px" }}>
            <h5 style={{ marginBottom: "20px" }} >Edit Profile</h5>
            <CForm>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlTextarea1">Name</CFormLabel>
              <CFormInput type="text" id="exampleFormControlInput1" placeholder="jones" />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Contact No</CFormLabel>
              <CFormInput type="text" id="exampleFormControlInput1" placeholder="1234567895" />
            </div>
            <div className="mb-3">
              <CFormLabel htmlFor="exampleFormControlInput1">Email address</CFormLabel>
              <CFormInput type="email" id="exampleFormControlInput1" placeholder="abc@example.com" />
            </div>
          </CForm>
            <CButton color="primary" style={{ marginRight: "6px" }} >Save</CButton>
            <CButton color="secondary" >
                Cancel
            </CButton>
        </div>
    )
}

export default EditProfile