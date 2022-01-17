import React, { Component, component, useContext } from 'react'
import {View} from 'react-native';
import LottieView from 'lottie-react-native';
import {AuthContext} from './context/AuthContext';
import { useNavigation } from '@react-navigation/native';



const Splash = () => {
    const {userInfo, isLoading, splashLoading} = useContext(AuthContext);
    const navigation = useNavigation();

    return(
        <View style={{
            flex:1,
            backgroundColor: '#fff'
        }}
        >
            <LottieView
                source={require('../assets/splash.json')}
                autoPlay
                speed = {2}
                loop = {false}
                onAnimationFinish = {() =>{
                    console.log("Animation Finished.")
                    if(userInfo.token){
                        navigation.replace('Scanner');
                    }else {
                        navigation.replace('LoginRegister');
                    }
                }}
            />
        </View>
    )
}

export default Splash;