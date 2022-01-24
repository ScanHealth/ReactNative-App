import React, {Component,useState, useContext, useRef } from 'react';
import {View, Text, StyleSheet, Dimensions, Pressable, Alert, ImageBackground, Image, SafeAreaView, TouchableOpacity, Button, TouchableHighlight, useColorScheme } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import Svg, { Path } from "react-native-svg";
import {Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import  {today} from 'moment';
import moment from 'moment/min/moment-with-locales'



const Alimentation = () => {
    
    const [ModalState, setModalState] = useState(false);

    const [LundiState, setLundiState] = useState(false);
    const [MardiState, setMardiState] = useState(false);
    const [MercrediState, setMercrediState] = useState(false);
    const [JeudiState, setJeudiState] = useState(false);
    const [VendrediState, setVendrediState] = useState(false);
    const [SamediState, setSamediState] = useState(false);
    const [DimancheState, setDimancheState] = useState(false); 
    
    const sheetRef = React.useRef(null);

    // Variable date
    const Day= () =>{
        if(moment().format('dddd') == 'Monday' && !LundiState && !MardiState && !MercrediState && !JeudiState && !VendrediState && !SamediState && !DimancheState){
            setLundiState(true)
        }else if(moment().format('dddd') == 'Tuesday' && !LundiState && !MardiState && !MercrediState && !JeudiState && !VendrediState && !SamediState && !DimancheState){
            setMardiState(true)
        }else if(moment().format('dddd') == 'Wednesday' && !LundiState && !MardiState && !MercrediState && !JeudiState && !VendrediState && !SamediState && !DimancheState){
            setMercrediState(true)
        }else if(moment().format('dddd') == 'Thursday' && !LundiState && !MardiState && !MercrediState && !JeudiState && !VendrediState && !SamediState && !DimancheState){
            setJeudiState(true)
        }else if(moment().format('dddd') == 'Friday' && !LundiState && !MardiState && !MercrediState && !JeudiState && !VendrediState && !SamediState && !DimancheState){
            setVendrediState(true)
        }else if(moment().format('dddd') == 'Saturday' && !LundiState && !MardiState && !MercrediState && !JeudiState && !VendrediState && !SamediState && !DimancheState){
            setSamediState(true)
        }else if(moment().format('dddd') == 'Sunday' && !LundiState && !MardiState && !MercrediState && !JeudiState && !VendrediState && !SamediState && !DimancheState){
            setDimancheState(true)
        }}
    

    // Emplacement information tableau nutritif
    const state = {
        tableHead: ['Valeurs nutritionelles moyennes', 'Pour une portion de ?g'],
        tableData: [
          ['Énergie', '80 Kcal'],
          ['Matière grasses', '4.1g'],
          ['Acides gras saturés', '0.5g'],
          ['Glucide dont sucre', '8.6g'],
          ['Fibres', ''],
          ['Protéines', '0.9g'],
          ['Sel', '0.016g']
        ],
      }

      const Alimentation = {
          ResultatAlimDay: 500,
          ResultatAlimWeek: 54000,
          MaxAlimDay: 2300,
          MinAlimDay: 2100,
          MaxAlimWeek: 15400,
      }

    //Code Bottom sheet
    const BottomSheetModal = () => (
        <View style={{backgroundColor: 'white',padding: '1%',height: '100%',}}>
            {ModalState ? (
                <>
                {/* Modal haut affichage down + image + titre + details */}
                <ChevronDown style={{width: '10%', height: '10%', alignSelf: 'center'}} onPress={() => {sheetRef.current.snapTo(2);setModalState(false);}}/>
                <View style={{justifyContent:'space-between',flexDirection:'column'}}>
                <View style={{ flexDirection:'row', justifyContent:'space-evenly'}}>
                <View style={{width:'15%',height:'15%', marginBottom:'-20%'}}> 
                <Image source={require('../assets/Exemple_Image_Scan.jpg')} style={{width: '100%', height: '300%'}} resizeMode="stretch"></Image>
                </View>
                {/* View Titre + sous-titre */}
                <View style={{ alignItems:'center'}}>
                    <Text style={styles.title}>Title</Text>
                    <Text style={styles.text,styles.black}>UnderTitle</Text>
                </View>
                </View>
                <View style={{padding: '5%', backgroundColor:'rgba(188, 177, 154, 0.5)',borderRadius: 30, borderWidth: 0}}>
                {/* View tableau information */}
                    <Table borderStyle={{borderWidth: 0, borderColor: '#c8e1ff'}}>
                       <Row data={state.tableHead} style={styles.head} textStyle={styles.text,styles.black}/>
                        <Rows data={state.tableData} textStyle={styles.text,styles.black}/>
                    </Table>
                </View>
                {/* Information nutriscore */}
                <View style={{alignSelf:'center'}}>
                    <Text style={styles.nutriscore_Mauvais}>
                        MAUVAIS
                    </Text>
                </View>
                {/* Bouton Ajouter produit à sa consommation */}
                <View style={{alignSelf:'center'}}>
                        <Pressable onPress = {()=>{}}
                        style={({pressed}) => [
                            {
                                width: 306,
                                height: 58,
                                borderRadius: 100,
                                backgroundColor: pressed ? 'rgba(88,199,10,1)' : 'rgba(88,166,60,1)',
                            },]}>
                            <View style={styles.textView}>
                            <Text style = {styles.text, styles.white}>
                                Ajouter à ma consommation
                            </Text>
                        </View>
                    </Pressable>
                </View>
                </View>
                </>
            ):(
                <>
                {/* Modal bas affichage up + image + titre */}
                <ChevronUp style={{width: '10%', height: '10%', alignSelf: 'center'}} onPress={() => {sheetRef.current.snapTo(0);setModalState(true);}}/>
                {/* View Image + Text */}
                <View style={{felx:1, flexDirection:'row', justifyContent:'space-evenly'}}>
                <View style={{width:'15%',height:'15%', marginLeft:'5%'}}> 
                <ImageBackground source={require('../assets/Exemple_Image_Scan.jpg')} style={{width: '100%', height: '170%'}} resizeMode="stretch"></ImageBackground>
                </View>
                {/* View Titre + sous-titre */}
                <View style={{felx:1, alignItems:'center'}}>
                    <Text style={styles.title}>Title</Text>
                    <Text style={styles.text,styles.black}>UnderTitle</Text>
                </View>
                </View>
                </>
            )}
        </View>
      );

    // Code page alimentation
      return (
        <>
        {Day()}
          <View style={{flex: 1,backgroundColor: '#F0F0F0',alignItems: 'center',justifyContent: 'flex-start',}}>
            {/* Titre view */}
            <View>
                <Text style={{fontSize:40, color:'black'}}>Nutrition</Text>
            </View>
            {/* Alimentation journalière View groupe */}
            <View style={{alignItems:'center'}}>
                {/* Button selection jour View groupe */}
                <View style={{flexDirection: 'row',alignItems:'flex-end',justifyContent:'center'}}>
                    {/* Lundi button View */}
                    <View>
                        <Pressable onPress = {()=>{setLundiState(true),setMardiState(false),setMercrediState(false),setJeudiState(false),setVendrediState(false),setSamediState(false),setDimancheState(false)}} 
                        style={({pressed}) => [LundiState ? (styles.dateSelect) : (styles.dateNotSelect),{backgroundColor: pressed ? '#A09783' : '#BCB19A',},]}>
                            <View style={styles.textView}>
                                <Text style = {styles.text, styles.white}>L</Text>
                            </View>
                        </Pressable>
                    </View>
                    {/* Mardi button View */}
                    <View>
                        <Pressable onPress = {()=>{setLundiState(false),setMardiState(true),setMercrediState(false),setJeudiState(false),setVendrediState(false),setSamediState(false),setDimancheState(false)}} 
                        style={({pressed}) => [MardiState ? (styles.dateSelect) : (styles.dateNotSelect),{backgroundColor: pressed ? '#A09783' : '#BCB19A',},]}>
                            <View style={styles.textView}>
                                <Text style = {styles.text, styles.white}>M</Text>
                            </View>
                        </Pressable>
                    </View>
                    {/* Mercredi button View */}
                    <View>
                        <Pressable onPress = {()=>{setLundiState(false),setMardiState(false),setMercrediState(true),setJeudiState(false),setVendrediState(false),setSamediState(false),setDimancheState(false)}} 
                        style={({pressed}) => [MercrediState ? (styles.dateSelect) : (styles.dateNotSelect),{backgroundColor: pressed ? '#A09783' : '#BCB19A',},]}>
                            <View style={styles.textView}>
                                <Text style = {styles.text, styles.white}>M</Text>
                            </View>
                        </Pressable>
                    </View>
                    {/* Jeudi button View */}
                    <View>
                        <Pressable onPress = {()=>{setLundiState(false),setMardiState(false),setMercrediState(false),setJeudiState(true),setVendrediState(false),setSamediState(false),setDimancheState(false)}} 
                        style={({pressed}) => [JeudiState ? (styles.dateSelect) : (styles.dateNotSelect),{backgroundColor: pressed ? '#A09783' : '#BCB19A',},]}>
                            <View style={styles.textView}>
                                <Text style = {styles.text, styles.white}>J</Text>
                            </View>
                        </Pressable>
                    </View>
                    {/* Vendredi button View */}
                    <View>
                        <Pressable onPress = {()=>{setLundiState(false),setMardiState(false),setMercrediState(false),setJeudiState(false),setVendrediState(true),setSamediState(false),setDimancheState(false)}} 
                        style={({pressed}) => [VendrediState ? (styles.dateSelect) : (styles.dateNotSelect),{backgroundColor: pressed ? '#A09783' : '#BCB19A',},]}>
                            <View style={styles.textView}>
                                <Text style = {styles.text, styles.white}>V</Text>
                            </View>
                        </Pressable>
                    </View>
                    {/* Samedi button View */}
                    <View>
                        <Pressable onPress = {()=>{setLundiState(false),setMardiState(false),setMercrediState(false),setJeudiState(false),setVendrediState(false),setSamediState(true),setDimancheState(false)}} 
                        style={({pressed}) => [SamediState ? (styles.dateSelect) : (styles.dateNotSelect),{backgroundColor: pressed ? '#A09783' : '#BCB19A',},]}>
                            <View style={styles.textView}>
                                <Text style = {styles.text, styles.white}>S</Text>
                            </View>
                        </Pressable>
                    </View>
                    {/* Dimanche button View */}
                    <View>
                        <Pressable onPress = {()=>{setLundiState(false),setMardiState(false),setMercrediState(false),setJeudiState(false),setVendrediState(false),setSamediState(false),setDimancheState(true)}} 
                        style={({pressed}) => [DimancheState ? (styles.dateSelect) : (styles.dateNotSelect),{backgroundColor: pressed ? '#A09783' : '#BCB19A',},]}>
                            <View style={styles.textView}>
                                <Text style = {styles.text, styles.white}>D</Text>
                            </View>
                        </Pressable>
                    </View>
                </View>
                {/* information consomation simple View */}
                <View style={{backgroundColor:'white', borderRadius:30, padding:'5%', alignItems:'center'}}>
                <Text style={{color:'black'}}>{moment.locale('fr'), moment().format("dddd D MMMM")}</Text>
                {/* Jauge alimentation */}
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <Text style={{color:'black',fontSize: 20,}}>{Alimentation.MinAlimDay}{" Kcal <"} </Text>
                    <Text style={{color:'black',fontSize: 40, color: Alimentation.ResultatAlimDay > Alimentation.MaxAlimDay ? 'red' : 'green'}}>{Alimentation.ResultatAlimDay}</Text>
                    <Text style={{color:'black',fontSize: 20,}}>{" < "}{Alimentation.MaxAlimDay}{" Kcal"}</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <Text style={{color:'black',fontSize: 30, color: Alimentation.ResultatAlimWeek > Alimentation.MaxAlimWeek ? 'red' : 'green'}}>{Alimentation.ResultatAlimWeek}</Text>
                    <Text style={{color:'black',fontSize: 20,}}>{" < "}{Alimentation.MaxAlimWeek}{" Kcal"}</Text>
                </View>
                </View>
            </View>


            <Pressable onPress = {()=>{sheetRef.current.snapTo(0);setModalState(true);}}
                        style={({pressed}) => [{
                                width: 306,
                                height: 58,
                                borderRadius: 100,
                                backgroundColor: pressed ? 'rgba(88,199,10,1)' : 'rgba(88,166,60,1)',
                            },]}>
                        <View style={styles.textView}>
                            <Text style = {styles.text, styles.white}>
                                Voir détail du produit
                            </Text>
                        </View>
                </Pressable>
          </View>
          <BottomSheet
            ref={sheetRef}
            snapPoints={['70%', '15%', 0]}
            borderRadius={10}
            renderContent={BottomSheetModal}
            initialSnap={2}
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
        fontFamily: "Andika",
        fontWeight: "400",
        textDecorationLine: "none",
        fontSize: 15,
        letterSpacing: 0.1,
    },
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    title: {
        color: "black",
        fontWeight: "800",        
        fontSize: 20,
        
    },
    nutriscore_Bon: {
        color: "green",
        fontWeight: "800",        
        fontSize: 40,
    },
    nutriscore_Mauvais: {
        color: "red",
        fontWeight: "800",        
        fontSize: 40,
    },
    white:{
        color: "rgba(255,255,255,1)",
    },
    black:{
        color: "rgba(0,0,0,1)",
    },
    textView:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dateSelect:{
        width: 30,
        height: 50,
        borderTopStartRadius: 30,
        borderTopRightRadius: 30,
        marginHorizontal:'1%',
    },
    dateNotSelect:{
        width: 30,
        height: 30,
        borderTopStartRadius: 0,
        borderTopRightRadius: 0,        
        marginHorizontal:'1%',
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

export default Alimentation;

/*
Différente fonction importante pour le modal

onPress={() => sheetRef.current.snapTo(0)} -> Fait pop le modal à son premier point d'accroche


*/