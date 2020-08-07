import React, {useContext} from 'react'
import AuthApi from './AuthApi'
import Cookies from 'js-cookie'

function Dashboard() {
    const Auth = useContext(AuthApi);

    const handleOnClick = ()=>{
        Auth.setAuth(false)
        Cookies.remove('user')
    }

    return (
        <div>
            <h1>Dashboard</h1>
            <button onClick={handleOnClick}>Logout</button>
        </div>
    )
}

export default Dashboard
