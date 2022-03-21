import { Center } from 'native-base';
import React, { Component, useRef, useState, useContext } from 'react';
import { View, Text, StyleSheet, Dimensions, Pressable, Alert, ImageBackground, Image, Animated } from 'react-native';
import LottieView from 'lottie-react-native';
import CustomInput from './components/CustomInput';
import CustomButton from './components/CustomButton';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from './context/AuthContext';


const Home = () => {

    const state = {
        animation: useRef(new Animated.Value(0)).current,
        fadeAnimation: useRef(new Animated.Value(0)).current
    }

    const startAnimationGoUpRegister = () => {
        Animated.timing(state.animation, {
            toValue: -500,
            duration: 1000,
            useNativeDriver: false
        }).start(() => setRegisterInput(true), setRegisterInput(false));
    }

    const startAnimationGoUpLogin = () => {
        Animated.timing(state.animation, {
            toValue: -500,
            duration: 1000,
            useNativeDriver: false
        }).start(() => setLoginInput(true), setLoginInput(false));

    }

    const startAnimationGoDown = () => {
        Animated.timing(state.animation, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false
        }).start(() => { setRegisterInput(false), setLoginInput(false) });
    }

    const startAnimationFadeIn = () => {
        Animated.timing(state.fadeAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: false
        }).start();
    }

    const startAnimationFadeOut = () => {
        Animated.timing(state.fadeAnimation, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: false
        }).start();
    }

    const [LoginInput, setLoginInput] = useState(false);
    const [RegisterInput, setRegisterInput] = useState(false);

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPassword_confirmation] = useState('');
    const { isLoading, register, login, userInfo } = useContext(AuthContext);



    const animationGoTop = {
        transform: [
            {
                translateY: state.animation,
            }
        ]
    }

    const animationGoDown = {
        transform: [
            {
                translateY: state.animation,
            }
        ]
    }

    return (
        <View style={homeStyleSheet._bouton_group, { width: '100%', height: '115%', backgroundColor: '#D2F2EC' }}>
            <Spinner visible={isLoading} />
            <Animated.View style={homeStyleSheet._bouton_group, animationGoTop, animationGoDown/*,{opacity: state.fadeAnimation}*/}>
                <ImageBackground /*source={require('../assets/fruits.gif')}</Animated.View>*/ style={{ width: '100%', height: '100%' }} resizeMode="cover">
                    <LottieView
                        source={require('../assets/HomeAnim.json')}
                        speed={0.5}
                        style={{ width: '100%', height: '100%', alignSelf: 'center' }}
                    />
                </ImageBackground>
                <View style={homeStyleSheet._bouton_group, { position: 'absolute', alignItems: 'center', alignSelf: 'center', marginTop: '100%' }}>
                    {/* Button Register */}
                    <Pressable onPress={() => { setRegisterInput(true), setRegisterInput(false), startAnimationGoUpRegister(), startAnimationFadeIn() }}
                        style={({ pressed }) => [
                            {
                                width: 306,
                                height: 58,
                                borderRadius: 100,
                                backgroundColor: pressed ? '#f1f1f3' : '#f3f3f3',
                            },

                        ]}>
                        <View style={homeStyleSheet._TextView}>
                            <Text style={homeStyleSheet._text, homeStyleSheet._black}>
                                Commencer
                            </Text>
                        </View>
                    </Pressable>

                    {/* Button Login */}
                    <Pressable
                        style={({ pressed }) => [
                            {
                                width: 206,
                                height: 38,
                                borderRadius: 10,
                                backgroundColor: pressed ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0)',
                            },

                        ]}
                        onPress={() => { startAnimationGoUpLogin(), startAnimationFadeIn() }}>
                        <View style={homeStyleSheet._TextView}>
                            <Text style={homeStyleSheet._text, homeStyleSheet._black}>
                                Se connecter
                            </Text>
                        </View>
                    </Pressable>
                </View>
            </Animated.View>

            {/* Logo view */}
            <View style={homeStyleSheet._bouton_group, { position: 'absolute', top: 20, left: 0, bottom: 0, right: 0, backgroundColor: '486F3A' }}>
                <Image source={require('../assets/scanhealthnoir.png')} style={{ alignSelf: 'center', width: 300, height: 150, marginTop: '3%' }} />

                {/* Input Area */}
                <Animated.View style={{ alignItems: 'center', marginTop: '40%', opacity: state.fadeAnimation }}>
                    {LoginInput ? (
                        <>
                            {/* //Page Login */}
                            <CustomInput placeholder="Email" value={email} setValue={setEmail} invisibled={false} />
                            <CustomInput placeholder="Password" value={password} setValue={setPassword} invisibled={true} />
                            <View style={styles.btn}>
                                <CustomButton text="Connexion" onPress={() => {
                                    login(email, password);
                                }} />
                            </View>
                            {/* Button Back */}
                            <Pressable
                                style={({ pressed }) => [
                                    {
                                        width: 206,
                                        height: 38,
                                        borderRadius: 10,
                                        backgroundColor: pressed ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0)',
                                    },

                                ]}
                                onPress={() => { startAnimationGoDown(), startAnimationFadeOut() }}>
                                <View style={homeStyleSheet._TextView}>
                                    <Text style={homeStyleSheet._text, homeStyleSheet._black}>
                                        Retour
                                    </Text>
                                </View>
                            </Pressable>
                        </>
                    )
                        : null}
                    {RegisterInput ? (
                        <>
                            {/* // Page Register */}
                            <CustomInput placeholder="Username" value={username} setValue={setUsername} invisibled={false} />
                            <CustomInput placeholder="Email" value={email} setValue={setEmail} invisibled={false} />
                            <CustomInput placeholder="Password" value={password} setValue={setPassword} invisibled={true} />
                            <CustomInput placeholder="Confirm Password" value={password_confirmation} setValue={setPassword_confirmation} invisibled={true} />
                            <View style={styles.btn}>
                                <CustomButton text="S'enregistrer" onPress={() => {
                                    register(email, username, password, password_confirmation);
                                }} />
                            </View>
                            {/* Button Back */}
                            <Pressable
                                style={({ pressed }) => [
                                    {
                                        width: 206,
                                        height: 38,
                                        borderRadius: 10,
                                        backgroundColor: pressed ? 'rgba(0,0,0,0)' : 'rgba(0,0,0,0)',
                                    },

                                ]}
                                onPress={() => { startAnimationGoDown(), startAnimationFadeOut() }}>
                                <View style={homeStyleSheet._TextView}>
                                    <Text style={homeStyleSheet._text, homeStyleSheet._black}>
                                        Retour
                                    </Text>
                                </View>
                            </Pressable>
                        </>
                    )
                        : null}
                </Animated.View>
            </View>
        </View>
    )
}

const homeStyleSheet = StyleSheet.create({
    /*_page_login: {
        position: 'relative',
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        borderRadius: 0,
        backgroundColor: "rgba(216,234,199,1)",
    },*/
    _bouton_group: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        borderRadius: 0,
        backgroundColor: "rgba(0,0,0,0)",
    },
    _text: {
        fontFamily: "Andika",
        fontWeight: "400",
        textDecorationLine: "none",
        letterSpacing: 0.1,
    },
    _TextView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    _white: {
        color: "rgba(255,255,255,1)",
    },
    _black: {
        color: "rgba(0,0,0,1)",
        fontSize: 20
    },
});

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

export default Home;