import { Center } from 'native-base';
import React, {Component,useRef} from 'react';
import {View, Text, StyleSheet, Dimensions, Pressable, Alert, ImageBackground,Image, Animated} from 'react-native';


import { Assets } from 'react-navigation-stack';



export default class Home extends Component {
    constructor(props){
        super();
    }
    state = {
        animation: new Animated.Value(0),
        fadeAnimation: new Animated.Value(1)
    }
    startAnimationGoUp = () => {
        Animated.timing(this.state.animation,{
            toValue: -1200,
            duration: 1500,
            useNativeDriver: true
        }).start();
    }
    startAnimationFadeIn = () => {
        Animated.timing(this.state.fadeAnimation, {
            toValue: 1,
            duration: 100,
            useNativeDriver: true
          }).start();
    }
    startAnimationFadeOut = () => {
        Animated.timing(this.state.fadeAnimation, {
            toValue: 0,
            duration: 100,
            useNativeDriver: true
          }).start();
    }


    render(){
          const { onPress, title = 'Save' } = this.props;

            const animationGoTop = {
                transform: [
                    {
                        translateY: this.state.animation,
                    }
                ]
            }

          return(
            <View style={homeStyleSheet._bouton_group}>                
                <Animated.View style={homeStyleSheet._bouton_group,animationGoTop/*,{opacity: this.state.fadeAnimation}*/}>                                   
                <ImageBackground source={require('../assets/BackgroundHomePage.jpg')} resizeMode="cover">
                    <View style={homeStyleSheet._bouton_group}>    
                    {/* Button Register */}
                    <Pressable onPress = {this.startAnimationGoUp}
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
                        onPress={() => Alert.alert('Button Pressed!')}>
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
                <View style={homeStyleSheet._bouton_group,{position:'absolute',top:20,left:0,bottom:0,right:0}}>                
                <Image source={require('../assets/scanhealth.png')} style={{alignSelf:'center',width: 300, height: 150, marginTop:20 }}/>
                </View>
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
















/*
import React, {Component} from 'react';
import {View, Text, StyleSheet, Dimensions, Pressable, Alert} from 'react-native';


export default class Home extends Component {
    constructor(props){
        super();
    }

    render(){
          const { onPress, title = 'Save' } = this.props;
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