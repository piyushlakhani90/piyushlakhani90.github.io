import React, { Suspense } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMenu } from '@coreui/icons'

import { AppHeaderDropdown } from './header/index'
import { logo } from './../assets/brand/logo'

const AppHeader = (props) => {
  console.log('first----->')
  console.log('props', props)
  const dispatch = useDispatch()
  const app = useSelector((state) => state.app)
  
  return (
    
      <CHeader position="sticky" className="mb-4">
        <CContainer fluid>
          <CHeaderToggler
            className="ps-1"
            onClick={() => dispatch({ type: 'set', sidebarShow: !app.sidebarShow })}
          >
            <CIcon icon={cilMenu} size="lg" />
          </CHeaderToggler>
          <CHeaderBrand className="mx-auto d-md-none" to="/">
            <CIcon icon={logo} height={48} alt="Logo" />
          </CHeaderBrand>
          <CHeaderNav className="d-none d-md-flex me-auto">
            <CNavItem>
              {/* <CNavLink to="/dashboard" component={NavLink}> */}
              <CNavLink>
                Bill
              </CNavLink>
            </CNavItem>
          </CHeaderNav>
          {/* <CHeaderNav className="ms-3">
            <AppHeaderDropdown />
          </CHeaderNav> */}
        </CContainer>
      </CHeader>
    

  )
}

export default AppHeader
