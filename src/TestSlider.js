import React, {Component,useState, useContext, useRef } from 'react';
import {View, Text, StyleSheet, Dimensions, Pressable, Alert, ImageBackground, Image, Animated, SafeAreaView, TouchableOpacity} from 'react-native';
import BottomSheet from "react-native-gesture-bottom-sheet";


const TestSlider = () => {
    // Needed in order to use .show()
    const bottomSheet = useRef();
  
    return (
      <SafeAreaView style={styles.container}>
        <BottomSheet hasDraggableIcon draggable sheetBackgroundColor="#D9EAC7" ref={bottomSheet} height={150} />
        <TouchableOpacity
          style={styles.button}
          onPress={() => bottomSheet.current.show()}
        >
          <Text style={styles.text}>Open modal</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

const styles = StyleSheet.create({
    button: {
      height: 50,
      width: 150,
      backgroundColor: "#140078",
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 20,
      shadowColor: "#8559da",
      shadowOpacity: 0.7,
      shadowOffset: {
        height: 4,
        width: 4,
      },
      shadowRadius: 5,
      elevation: 6,
    },
    text: {
      color: "white",
      fontWeight: "600",
    },
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
  });


<<<<<<< HEAD
    return(
        <View></View>
    )
}
=======
>>>>>>> 3af51e93ed70735b813518ee67e8960651171503

export default TestSlider;

/*
Différente fonction importante pour le modal

bottomSheet.current.show() -> Fait pop le modal


*/