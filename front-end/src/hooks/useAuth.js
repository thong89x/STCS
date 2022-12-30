import { useSelector } from 'react-redux'
import jwtDecode from 'jwt-decode'

const useAuth = () => {
    const {token} = useSelector(state=> state.auth)

    if (token) {
        const decoded = jwtDecode(token)
        const { username, role } = decoded.UserInfo

        return { username, role }
    }
    const userInfo = localStorage.getItem("userInfo");
    if(userInfo)
        return JSON.parse(userInfo)
    return {role: 'viewer'}
}
export default useAuth