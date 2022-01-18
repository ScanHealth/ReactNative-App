import { Center } from 'native-base';
import React, {Component,useState, useContext} from 'react';
import {View, Text, StyleSheet, Dimensions, Pressable, Alert, ImageBackground,Image, Animated} from 'react-native';
import LottieView from 'lottie-react-native';
import CustomInput from './components/CustomInput';
import CustomButton from './components/CustomButton';


import { Assets } from 'react-navigation-stack';
import { exp } from 'react-native-reanimated';


const Home = () => {


    const state = {
        animation: new Animated.Value(0),
        fadeAnimation: new Animated.Value(1)
    }

    const startAnimationGoUpRegister = () => {
        Animated.timing(state.animation,{
            toValue: -500,
            duration: 1000,
            useNativeDriver: false
        }).start(()=>setRegisterInput(true),setRegisterInput(false));     
    }

    const startAnimationGoUpLogin = () => {
        Animated.timing(state.animation,{
            toValue: -500,
            duration: 1000,
            useNativeDriver: false
        }).start(()=>setLoginInput(true),setLoginInput(false));
                
    }

    const startAnimationGoDown = () => {
        Animated.timing(state.animation,{
            toValue: 0,
            duration: 1,
            useNativeDriver: false
        }).start(()=>{setRegisterInput(false),setLoginInput(false)});
    }

    const startAnimationFadeIn = () => {
        Animated.timing(state.fadeAnimation, {
            toValue: 1,
            duration: 100,
            useNativeDriver: false
          }).start();
    }

    const startAnimationFadeOut = () => {
        Animated.timing(state.fadeAnimation, {
            toValue: 0,
            duration: 100,
            useNativeDriver: false
          }).start();
    }

        const [LoginInput, setLoginInput] = useState(false);
        const [RegisterInput, setRegisterInput] = useState(false);

        const [email, setEmail] = useState('');
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');
        const [password_confirmation, setPassword_confirmation] = useState('');


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

          return(
            <View style={homeStyleSheet._bouton_group, {width: '100%', height: '110%'}}>                
                <Animated.View style={homeStyleSheet._bouton_group,animationGoTop,animationGoDown/*,{opacity: state.fadeAnimation}*/}>                                   
                <ImageBackground source={require('../assets/fruits.gif')} style={{width: '100%', height: '100%'}} resizeMode="cover">
                {/* <LottieView
                source={require('../assets/fruit.json')}
                autoPlay
                speed = {2}
                loop = {true}
                /> */}
                    <View style={homeStyleSheet._bouton_group}>    
                    {/* Button Register */}
                    <Pressable onPress = {startAnimationGoUpRegister}
                        style={({pressed}) => [
                            {
                                width: 306,
                                height: 58,
                                borderRadius: 100,
                                backgroundColor: pressed ? 'rgba(88,199,10,1)' : 'rgba(88,166,60,1)',
                            },
                        
                        ]}>
                        <View style={homeStyleSheet._TextView}>
                            <Text style = {homeStyleSheet._text, homeStyleSheet._white}>
                                Commencer
                            </Text>
                        </View>
                    </Pressable>
                    
                    {/* Button Login */}
                    <Pressable
                        style={({pressed}) => [
                            {
                                width: 206,
                                height: 38,
                                borderRadius: 10,
                                backgroundColor: pressed ? 'rgba(88,199,10,0)' : 'rgba(88,166,60,0)',
                            },
                        
                        ]}
                        onPress={startAnimationGoUpLogin}>
                        <View style={homeStyleSheet._TextView}>
                            <Text style = {homeStyleSheet._text, homeStyleSheet._black}>
                                Se connecter
                            </Text>
                        </View>
                    </Pressable>
                    </View>    
                    </ImageBackground>
                </Animated.View>

                {/* Logo view */}
                <View style={homeStyleSheet._bouton_group,{position:'absolute',top:20,left:0,bottom:0,right:0,backgroundColor:'486F3A'}}>                
                <Image source={require('../assets/scanhealth.png')} style={{alignSelf:'center',width: 300, height: 150, marginTop:20 }}/>

                {/* Input Area */}
                <View style={{alignItems:'center', marginTop:'50%'}}>
                {LoginInput ? (
                    <> 
                    {/* //Page Login */}
                    <CustomInput placeholder="Email" value={email} setValue={setEmail} invisibled={false}/>
                    <CustomInput placeholder="Password" value={password} setValue={setPassword} invisibled={true}/>
                    <View style={styles.btn}>
                        <CustomButton text="Connexion" onPress={() => {
                            login(email, password);
                        }}/>
                        </View>
                        {/* Button Back */}
                    <Pressable
                        style={({pressed}) => [
                            {
                                width: 206,
                                height: 38,
                                borderRadius: 10,
                                backgroundColor: pressed ? 'rgba(88,199,10,0)' : 'rgba(88,166,60,0)',
                            },
                        
                        ]}
                        onPress={startAnimationGoDown}>
                        <View style={homeStyleSheet._TextView}>
                            <Text style = {homeStyleSheet._text, homeStyleSheet._black}>
                                Retour
                            </Text>
                        </View>
                    </Pressable>                    
                    </>
                )
                : null}
                {RegisterInput ? (
                    <>
                    {console.log("RegisterInput")}
                    {/* // Page Register */}
                    <CustomInput placeholder="Username" value={username} setValue={setUsername} invisibled={false}/>
                    <CustomInput placeholder="Email" value={email} setValue={setEmail} invisibled={false}/>
                    <CustomInput placeholder="Password" value={password} setValue={setPassword} invisibled={true}/>
                    <CustomInput placeholder="Confirm Password" value={password_confirmation} setValue={setPassword_confirmation} invisibled={true}/>
                    <View style={styles.btn}>
                        <CustomButton text="S'enregistrer" onPress={() => {
                            register(email, username, password, password_confirmation);
                        }}/>
                        </View>
                        {/* Button Back */}
                    <Pressable
                        style={({pressed}) => [
                            {
                                width: 206,
                                height: 38,
                                borderRadius: 10,
                                backgroundColor: pressed ? 'rgba(88,199,10,0)' : 'rgba(88,166,60,0)',
                            },
                        
                        ]}
                        onPress={startAnimationGoDown}>
                        <View style={homeStyleSheet._TextView}>
                            <Text style = {homeStyleSheet._text, homeStyleSheet._black}>
                                Retour
                            </Text>
                        </View>
                    </Pressable>
                    </>
                )
                : null} 
                </View>
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
        fontSize: 20,
        letterSpacing: 0.1,
    },
    _TextView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    _white:{
        color: "rgba(255,255,255,1)",
    },
    _black:{
        color: "rgba(0,0,0,1)",
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














/*
color=backgroundColor:'#D9EAC7'


import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, Pressable, Alert} from 'react-native';


export default class Home extends Component {
    constructor(props){
        super();
    }

    render(){
          const { onPress, title = 'Save' } = props;
        return(
                <View style={homeStyleSheet._bouton_group}>
                    <Pressable
                        style={({pressed}) => [
                            {
                                width: 306,
                                height: 58,
                                borderRadius: 100,
                                backgroundColor: pressed ? 'rgba(88,199,10,1)' : 'rgba(88,166,60,1)',
                            },
                        
                        ]}
                        onPress={() => Alert.alert('Button Pressed!')}>
                        <View style={homeStyleSheet._TextView}>
                            <Text style = {homeStyleSheet._text}>
                                Commencer
                            </Text>
                        </View>
                    </Pressable>
                
                </View>
        )
    }
}

const homeStyleSheet = StyleSheet.create({
    /*_page_login: {
        position: 'relative',
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        borderRadius: 0,
        backgroundColor: "rgba(216,234,199,1)",
    },*//*
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
        fontSize: 20,
        color: "rgba(255,255,255,1)",
        letterSpacing: 0.1,
    },
    _TextView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

})*/