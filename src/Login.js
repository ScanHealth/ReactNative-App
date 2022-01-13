import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import CustomInput from './components/CustomInput';
import CustomButton from './components/CustomButton';


const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    let data = {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'same-origin',
        body: JSON.stringify({
            email: username,
            password: password,
        }),
        headers: {
            'Accept':       'application/json',
            'Content-Type': 'application/json',
        }
    }

    const onSignInPressed = () => {
        fetch('https://payconvert.fr/api/v1/users/login',data)
            .then((response) => response.json())
            .then(json => console.log(json))

    
    }
    return(
        <View style={styles.root}>
            <CustomInput placeholder="Username" value={username} setValue={setUsername} invisibled={false}/>
            <CustomInput placeholder="Password" value={password} setValue={setPassword} invisibled={true}/>
            <View style={styles.btn}>
                <CustomButton text="Connexion" onPress={onSignInPressed}/>
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