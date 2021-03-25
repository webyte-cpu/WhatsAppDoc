/**
 * Add routes here
 */

import LoginScreen from '../screens/auth/login'
import ForgotPassword from '../screens/auth/forgotPassword'
import HomeScreen from '../screens/home/home'

const AppRoute = { 
  LOGIN: {
    name: 'Login',
    component: LoginScreen
  },
  FORGOT_PASS: {
    name: 'ForgotPass',
    component: ForgotPassword
  },
  HOME: {
    name: 'Home',
    component: HomeScreen
  }
}

// routes for navigation
const routes = Object.values(AppRoute)

export {AppRoute, routes};