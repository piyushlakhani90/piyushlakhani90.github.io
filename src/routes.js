import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard'))
const DashboardData = React.lazy(() => import('./views/Dashboard/index'))
const Bill = React.lazy(() => import('./views/Bill/index'))
const AddBill = React.lazy(() => import('./views/Bill/AddBill/AddBill'))
const EditBill = React.lazy(() => import('./views/Bill/AddBill/AddBill'))
const EditProfile = React.lazy(() => import('./authantication/EditProfile'))
const ChangePassword = React.lazy(() => import('./authantication/ChangePassword'))

const routes = [
  { path: '/', exact: true, name: 'Bill',element: Bill },
  // { path: '/editProfile', name: 'EditProfile', element: EditProfile },
  // { path: '/changePassword', name: 'ChangePassword', element: ChangePassword },
  { path: '/dashboard', name: 'Dashboard', element: DashboardData },
  { path: '/bill', name: 'Bill', element: Bill },
  { path: '/addBill', name: 'AddBill', element: AddBill },
  { path: '/addBill/:id', name: 'EditBill', element: EditBill },
]

export default routes
