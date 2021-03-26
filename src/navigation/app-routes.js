/**
 * Add routes here
 */

import LoginScreen from '../screens/auth/login'
import ForgotPassword from '../screens/auth/forgotPassword'
import HomeScreen from '../screens/home/home'
import SignupScreen from '../screens/auth/signup'

const AppRoute = { 
  LOGIN: {
    name: 'Login',
    component: LoginScreen
  },
  SIGNUP: {
    name: 'Signup',
    component: SignupScreen
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