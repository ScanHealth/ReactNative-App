import React, {Component, useState, useContext} from 'react';
import {View, Text, StyleSheet, Dimensions } from 'react-native';
import CustomInput from './components/CustomInput';
import CustomButton from './components/CustomButton';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from './context/AuthContext';


const Login = () => {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPassword_confirmation] = useState('');
    const {isLoading, register, login, userInfo} = useContext(AuthContext);

    return(
        <View style={styles.root}>
            <Spinner visible={isLoading}/>
            <CustomInput placeholder="Username" value={username} setValue={setUsername} invisibled={false}/>
            <CustomInput placeholder="Email" value={email} setValue={setEmail} invisibled={false}/>
            <CustomInput placeholder="Password" value={password} setValue={setPassword} invisibled={true}/>
            <CustomInput placeholder="Confirm Password" value={password_confirmation} setValue={setPassword_confirmation} invisibled={true}/>
            <View style={styles.btn}>
                <CustomButton text="S'enregistrer" onPress={() => {
                    register(email, username, password, password_confirmation);
                }}/>
            </View>

            <CustomInput placeholder="Email" value={email} setValue={setEmail} invisibled={false}/>
            <CustomInput placeholder="Password" value={password} setValue={setPassword} invisibled={true}/>
            <View style={styles.btn}>
                <CustomButton text="Connexion" onPress={() => {
                    login(email, password);
                }}/>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    root: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: "#F9FBFC",
        height: Dimensions.get("window").height,
    },
    btn: {
      width: '60%',
    }
})

export default Login;