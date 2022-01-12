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
        color: "rgba(255,255,255,1)",
        letterSpacing: 0.1,
    },
    _TextView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

})