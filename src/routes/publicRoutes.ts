import LoginPage from '../Page/auth/LoginPage'
import RegisterPage from '../Page/auth/RegisterPage'
const PublicRoutes = {
  login: {
    path: '/login',
    component: LoginPage,
  },
  register: {
    path: '/register',
    component: RegisterPage,
  },

}
export default PublicRoutes;
