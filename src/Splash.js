import React, { Component, component } from 'react'
import {View} from 'react-native';
import LottieView from 'lottie-react-native';

export default class Splash extends Component {
    constructor(props) {
        super();
    }

    render() {
        return(
            <View style={{
                flex:1,
                backgroundColor: '#fff'
            }}
            >
                <LottieView
                    source={require('../assets/splash.json')}
                    autoPlay
                    loop = {false}
                    onAnimationFinish = {() =>{
                        console.log("Animation Finished.")
                        this.props.navigation.replace('Home');
                    }}
                />
            </View>
        )
    }
}