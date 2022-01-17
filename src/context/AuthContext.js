import React, {createContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const register = (email, username, password, password_confirmation) => {
        setIsLoading(true);

        axios.post(`${BASE_URL}/users/`, {
            username, email, password, password_confirmation
        }).then(res => {
            let userInfo = res.data;
            setUserInfo(userInfo);
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            setIsLoading(false);
            console.log(userInfo);
        }).catch(e => {
            console.log(`Register error ${e}`)
            setIsLoading(false);
        });
    };

    const login = (email, password) => {
        setIsLoading(true);

        axios.post(`${BASE_URL}/users/login`, {
            email, password
        }).then(res => {
            let userInfo = res.data;
            setUserInfo(userInfo);
            AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            setIsLoading(false);
            console.log(userInfo);
        }).catch(e => {
            console.log(`Login error ${e}`)
            setIsLoading(false);
        })
    }
    
    return (
        <AuthContext.Provider value={{isLoading, userInfo, register, login}}>{children}</AuthContext.Provider>
    );
};