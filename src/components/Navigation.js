import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../Splash';
import HomeScreen from '../Home';
import LoginSreen from '../Login';
import ScannerScreen from '../Scanner';
import LoginRegister from '../LoginRegister';
import React, {Component, useContext} from 'react';
import { Button, Center, NativeBaseProvider } from "native-base";
import {AuthContext} from '../context/AuthContext';

const Stack = createNativeStackNavigator();

const Navigation = () => {
    const {userInfo} = useContext(AuthContext);

    return (
        <NavigationContainer> 
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
            {userInfo.token ? (
                <Stack.Screen name="Scanner" component={ScannerScreen}/>
             ) : (
                 <>
                <Stack.Screen name="Splash" component={Splash}/>
                <Stack.Screen name="LoginRegister" component={LoginRegister} />
                </>
             )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Navigation;