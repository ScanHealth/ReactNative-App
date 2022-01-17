import React from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

const CustomInput = ({value, setValue, placeholder, invisibled}) => {
    return (
        <View style={styles.container}>
            <TextInput placeholder={placeholder} style={styles.input} value={value} onChangeText={setValue} secureTextEntry={invisibled} placeholderTextColor="#000"/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        borderColor:  '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 5,

    },
    input: {
        color:'black',
    },
})

export default CustomInput
