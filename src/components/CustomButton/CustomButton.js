import React from 'react'
import { View, Text, StyleSheet, Pressable } from 'react-native'

const CustomButton = ({ onPress, text }) => {
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#ffff',
        padding: 15,
        marginVertical: 5,
        alignItems: 'center',
        borderRadius: 20,
    },
    text: {
        fontWeight: 'bold',
        color: 'black',
    },
})

export default CustomButton
