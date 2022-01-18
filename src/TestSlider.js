import React, {Component,useState, useContext} from 'react';
import {View, Text, StyleSheet, Dimensions, Pressable, Alert, ImageBackground,Image, Animated} from 'react-native';



const TestSlider = () => {

    return(
        <View>
            <Text style={Styles._text,Styles._Color_Black}>Hého</Text>
        </View>
    )
}

const Styles = StyleSheet.create({
    /*_page_login: {
        position: 'relative',
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        borderRadius: 0,
        backgroundColor: "rgba(216,234,199,1)",
    },*/
    _text: {
        fontFamily: "Andika",
        fontWeight: "400",
        textDecorationLine: "none",
        fontSize: 20,
        letterSpacing: 0.1,
    },
    _Color_Black: {
        color:"#000"
    }
})



export default TestSlider;