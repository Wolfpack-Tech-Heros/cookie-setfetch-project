import React, {useContext,useEffect, useState} from 'react'
import AuthApi from './AuthApi'
import Cookies from 'js-cookie'

import UsersList from '../components/UsersList';
import ErrorModal from '../UIElements/ErrorModal';
import LoadingSpinner from '../UIElements/LoadingSpinner';
import { useHttpClient } from '../hooks/http-hook';
import Button from "@salesforce/design-system-react/lib/components/button";
import './UserItem.css';

function Dashboard() {
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const Auth = useContext(AuthApi);

    const [loadedUsers, setLoadedUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const responseData = await sendRequest(
          process.env.REACT_APP_BACKEND_URL+'/getUser'
        );
        setLoadedUsers(responseData);
        //console.log(responseData);
      } catch (err) {
      }
    };
    fetchUsers();
  }, [sendRequest]);

    const handleOnClick = ()=>{
        Auth.setAuth(false)
        Cookies.remove('user')
    }

    return (
        <React.Fragment>
          <ErrorModal error={error} onClear={clearError} />
          {isLoading && (
            <div className="center">
              <LoadingSpinner />
            </div>
          )}
          {!isLoading && loadedUsers && <UsersList items={loadedUsers} />}
          {Auth.auth&& (
            
            <Button label="LOGOUT" variant="brand" className="btn-logout" onClick={handleOnClick} />
           
        )}
        </React.Fragment>
      );
}

export default Dashboard
