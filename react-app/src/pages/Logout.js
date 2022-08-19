import { Navigate} from 'react-router-dom';
import {useContext, useEffect} from 'react';
import userContext from '../UserContext';

export default function Logout(){

    const {setUser, unsetUser} = useContext(userContext);

    unsetUser();

    useEffect(() => {
        setUser({
            id: null,
            isAdmin: null
        })
    })


    return(
        <Navigate to="/login" />
    )
};