import React, {Component,useState, useContext, useRef } from 'react';
import {View, Text, StyleSheet, Dimensions, Pressable, Alert, ImageBackground, Image, SafeAreaView, TouchableOpacity, Button, TouchableHighlight } from 'react-native';
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import Svg, { Path } from "react-native-svg";


const TestSlider = () => {
    
    const [ModalState, setModalState] = useState(false);
        
    const sheetRef = React.useRef(null);

    const renderContent = () => (
        <View
            style={{
                backgroundColor: 'white',
                padding: '1%',
                height: '100%',
            }}
        >
            {ModalState ? (
                <ChevronDown style={{width: '10%', height: '10%', alignSelf: 'center'}} onPress={() => {sheetRef.current.snapTo(2);setModalState(false);}}/>
            ):(
                <ChevronUp style={{width: '10%', height: '10%', alignSelf: 'center'}} onPress={() => {sheetRef.current.snapTo(0);setModalState(true);}}/>
            )}
        </View>
      );

    
      return (
        <>
          <View
            style={{
              flex: 1,
              backgroundColor: 'papayawhip',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Button
              title="Open Bottom Sheet"
              onPress={() => {sheetRef.current.snapTo(1);setModalState(false);}}
            />
          </View>
          <BottomSheet
            ref={sheetRef}
            snapPoints={['70%', '15%', 0]}
            borderRadius={10}
            renderContent={renderContent}
          />
        </>
      );
    }
    ;

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


  const ChevronUp = (props) => (
    <Svg
      viewBox="0 0 240 240"
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      style={{
        fillRule: "evenodd",
        clipRule: "evenodd",
        strokeLinejoin: "round",
        strokeMiterlimit: 2,
      }}
      {...props}
    >
      <Path
        d="M200.61 158.184a6.003 6.003 0 0 0 0-8.486l-76.367-76.367a6.003 6.003 0 0 0-8.486 0l-12.728 12.728 80.611 80.61a6.002 6.002 0 0 0 8.485 0l8.485-8.485Z"
        style={{
          fill: "#486f3a",
        }}
      />
      <Path
        d="M39.39 158.184a6.003 6.003 0 0 1 0-8.486l76.367-76.367a6.003 6.003 0 0 1 8.486 0l12.728 12.728-80.611 80.61a6.002 6.002 0 0 1-8.485 0l-8.485-8.485Z"
        style={{
          fill: "#486f3a",
          fillOpacity: 0.6,
        }}
      />
    </Svg>
  )

  const ChevronDown = (props) => (
    <Svg
      viewBox="0 0 240 240"
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      style={{
        fillRule: "evenodd",
        clipRule: "evenodd",
        strokeLinejoin: "round",
        strokeMiterlimit: 2,
      }}
      {...props}
    >
      <Path
        d="M200.61 81.816a6.003 6.003 0 0 1 0 8.486l-76.367 76.367a6.003 6.003 0 0 1-8.486 0l-12.728-12.728 80.611-80.61a6.002 6.002 0 0 1 8.485 0l8.485 8.485Z"
        style={{
          fill: "#486f3a",
        }}
      />
      <Path
        d="M39.39 81.816a6.003 6.003 0 0 0 0 8.486l76.367 76.367a6.003 6.003 0 0 0 8.486 0l12.728-12.728-80.611-80.61a6.002 6.002 0 0 0-8.485 0l-8.485 8.485Z"
        style={{
          fill: "#486f3a",
          fillOpacity: 0.6,
        }}
      />
    </Svg>
  )

export default TestSlider;

/*
Différente fonction importante pour le modal

onPress={() => sheetRef.current.snapTo(0)} -> Fait pop le modal à son premier point d'accroche


*/