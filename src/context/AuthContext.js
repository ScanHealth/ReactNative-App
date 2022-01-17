import React, {createContext, useState, useEffect} from 'react';
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
    };

    const logout = () => {
        setIsLoading(true);
         axios.post(`${BASE_URL}/users/logout`, 
            {}, 
            {
                headers: {Authorization: `Bearer ${userInfo.token}`},
            },
         ).then(res => {
            console.log(res.data);
            AsyncStorage.removeItem('userInfo')
            setUserInfo({});
            setIsLoading(false);
        }).catch(e => {
            console.log(`Logout error ${e}`)
            setIsLoading(false);
        })
    };

    const isLoggedIn = async () => {
        try {
            let userInfo = await AsyncStorage.getItem('userInfo');
            userInfo = JSON.parse(userInfo);

            if(userInfo) {
                setUserInfo(userInfo)
            }

        } catch(e) {
            console.log(`is logged in error ${e}`)
        }
    };

    useEffect(() => {
        isLoggedIn();
    }, []);
    
    return (
        <AuthContext.Provider value={{isLoading, userInfo, register, login, logout}}>{children}</AuthContext.Provider>
    );
};