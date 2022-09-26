import React from 'react'
import {
    CButton, CForm, CFormInput, CFormLabel, CFormTextarea, CDatePicker, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem, CInputGroup, CInputGroupText
} from '@coreui/react'

const ChangePassword = () => {
    return (
        <div style={{ width: "600px", margin: "0 auto", background: "white", padding: "40px" }}>
            <h5 style={{ marginBottom: "20px" }} >Change Password</h5>
            <CForm>
                <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlTextarea1">Old Password</CFormLabel>
                    <CFormInput
                        type="old password"
                        placeholder="Password"
                        autoComplete="current-password"
                    />
                </div>
                <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlInput1">New Password</CFormLabel>
                    <CFormInput
                        type="password"
                        placeholder="new Password"
                        autoComplete="current-password"
                    />
                </div>
                <div className="mb-3">
                    <CFormLabel htmlFor="exampleFormControlInput1">Confirm Password</CFormLabel>
                    <CFormInput
                        type="password"
                        placeholder="confirm Password"
                        autoComplete="current-password"
                    />
                </div>
            </CForm>
            <CButton color="primary" style={{ marginRight: "6px" }} >Save</CButton>
            <CButton color="secondary" >
                Cancel
            </CButton>
        </div>
    )
}

export default ChangePassword