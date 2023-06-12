import Cookies from 'js-cookie';
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const PrivateRoutePegawai = ({ children }) => {
    const { user } = useSelector((state) => state.auth)

    if (user) {
        Cookies.set('isLoggedIn', 'true', { expires: 7 });
        return children;
    }

    const isLoggedIn = Cookies.get('isLoggedIn');
    if (isLoggedIn === 'true') {
        return children;
    }

    return <Navigate to='/login' />;
}

export default PrivateRoutePegawai;