
import React, { Component, useContext, useState, useRef, useEffect, useLayoutEffect } from 'react';
import { Button, Text, View, TouchableOpacity, StyleSheet, ImageBackground, Image, Pressable, TouchableHighlight } from 'react-native';
import Animated from 'react-native-reanimated';
import { RNCamera } from 'react-native-camera';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Permissions from 'react-native-permissions';
import BottomSheet from 'reanimated-bottom-sheet';
import Svg, { Path } from "react-native-svg";
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import { Divider } from 'react-native-elements';
import {AuthContext} from './context/AuthContext';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



const CameraApp = (props) => {
  const { onClose } = props
  let [flash, setFlash] = useState('off')
  let [toggleModal, setModal] = useState(true)
  let [zoom, setZoom] = useState(0)
  let [autoFocus, setAutoFocus] = useState('on')
  let [depth, setDepth] = useState(0)
  let [type, setType] = useState('back')
  let [permission, setPermission] = useState('undetermined')
  let [isOpen, setIsOpen] = useState(false)
  let cameraRef = useRef(null)
  let [barcodeArray, setBarcodeArray] = useState([])
  let [Product, setProduct] = useState({})


  let [Title, setTitle] = useState('Undefined');
  let [SubTitle, setSubTitle] = useState('Undefined');
  let [imageUrl, setimageUrl] = useState('Undefined');


  const [isLoading, setIsLoading] = useState(false);


  const onFullScreen = () => {
    console.log("I'll fire on full screen");
  };

  const {DebugLogout} = useContext(AuthContext);






  useLayoutEffect(() => {
    //check local token or something
    console.log("oui")
  }, []);

  useEffect(() => {
    console.log("ICI");
    Permissions.check('photo').then(response => {
      // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
      setPermission(response);
    });
  }, []);


  const toggleFlash = () => {
    setFlash(flashModeOrder[flash])
  }
  const zoomOut = () => {
    setZoom(zoom - 0.1 < 0 ? 0 : zoom - 0.1)
  }
  const zoomIn = () => {
    setZoom(zoom + 0.1 > 1 ? 1 : zoom + 0.1);
  }


  const getDataOfProduct = (scanResult) => {
    setIsLoading(true);

    axios.get(`https://world.openfoodfacts.org/api/v0/product/${scanResult}.json`)
      .then(res => {
        let ProductInfo = res.data;
        setProduct(ProductInfo);
        setState({
          tableHead: ['Valeurs nutritionelles moyennes', 'Pour une portion de 100g'],
          tableData: [
            ['Énergie', `${ProductInfo.product.nutriments.energy_100g}`],
            ['Matière grasses', `${ProductInfo.product.nutriments.fat_100g}`],
            ['Acides gras saturés', `${ProductInfo.product.nutriments["saturated-fat_100g"]}`],
            ['Glucide dont sucre', `${Math.round(ProductInfo.product.nutriments.carbohydrates_100g * 10) / 10}`],
            ['Fibres', `${ProductInfo.product.nutriments.fiber_100g}`],
            ['Protéines', `${Math.round(ProductInfo.product.nutriments.proteins_100g * 10) / 10}`],
            ['Sel', `${Math.round(ProductInfo.product.nutriments.salt_100g * 10) / 10}`]
          ]
        })



        setimageUrl(`${ProductInfo.product.image_front_small_url}`);
        console.log("image: " + imageUrl);

        setTitle(`${ProductInfo.product.product_name_fr}`);
        setSubTitle(`${ProductInfo.product.brands}`);

        setIsOpen(true)
        sheetRef.current.snapTo(1); setModalState(false);

        setIsLoading(false);

        setBarcodeArray([])

        return;
      }).catch(e => {
        console.log(`Register error ${e}`)

      });
  }

  const callbackNode = new Animated.Value(0);


  const onBarCodeRead = (scanResult) => {
    if (scanResult.data != null && !isOpen) {
      if (!barcodeArray.includes(scanResult.data)) {
        barcodeArray.push(scanResult.data);
        getDataOfProduct(scanResult.data);
        console.log('onBarCodeRead call');
      }
      else {
        return;
      }
    }
    return;
  }


  const [ModalState, setModalState] = useState(false);

  const sheetRef = React.useRef(null);

  const [state, setState] = useState({
    tableHead: ['Valeurs nutritionelles moyennes', 'Pour une portion de ?g'],
    tableData: [
      ['Énergie', '80 Kcal'],
      ['Matière grasses', '4.1g'],
      ['Acides gras saturés', '0.5g'],
      ['Glucide dont sucre', '0.6g'],
      ['Fibres', ''],
      ['Protéines', '0.9g'],
      ['Sel', '0.016g']
    ]
  })

  const renderContent = () => (

    <View style={{ backgroundColor: 'white', padding: '1%', height: '100%', }}>
      <>
        {/* Modal haut affichage down + image + titre + details */}
        <View style={{ marginTop: 10, marginBottom: 40, width: 100, height: 0, alignSelf: 'center', borderWidth: 1, borderColor: '#4e4e4e' }}/>
        <View style={{ justifyContent: 'space-between', flexDirection: 'column', width: '100%', height: '90%' }}>
          <View style={{ marginBottom: 30, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
            <View>
              <Image source={{ uri: imageUrl }} style={{ width: 150, height: 100 }} resizeMode="contain"></Image>
              {/* <Imag source={Image} style={{ width: 50, height: 50 }} resizeMode="stretch"></Imag> */}
            </View>
            {/* View Titre + sous-titre */}

            <View style={{ maxWidth: '55%' }}>
              <Text style={styles.title}>{Title}</Text>
              <Text style={styles.text, styles.black}>{SubTitle}</Text>
            </View>
          </View>
          <View style={{ backgroundColor: 'rgba(188, 177, 154, 0.5)', borderRadius: 30, borderWidth: 3, borderColor: '#BCB19A' }}>
            {/* View tableau information */}
            <View style={{ justifyContent: 'space-between', width: '100%', height: 'auto' }}>
              {/* Energie */}
              <View style={{ flexDirection: 'row' }}>
                <View style={{ backgroundColor: '#BCB19A', width: 170, height: 35, borderTopRightRadius: 30, borderBottomEndRadius: 30, borderTopStartRadius: 45, justifyContent: 'center' }}>
                  <Text style={{ alignSelf: 'center', fontSize: 15, color: 'white' }}>Glucides</Text>
                </View>
                <View style={{ justifyContent: 'space-evenly', alignItems: 'center', marginLeft: '20%' }}>
                  <Text style={{ color: 'black', fontSize: 20, color: 'black' }}>{Product.product.nutriments.energy_100g}{" Kcal"}</Text>
                </View>
              </View>
              <Divider style={styles.divider} />
              {/* Matières Grasses */}
              <View style={{ flexDirection: 'row' }}>
                <View style={{ backgroundColor: '#BCB19A', width: 170, height: 35, borderTopRightRadius: 30, borderBottomEndRadius: 30, justifyContent: 'center' }}>
                  <Text style={{ alignSelf: 'center', fontSize: 15, color: 'white' }}>Matières grasses</Text>
                </View>
                <View style={{ justifyContent: 'space-evenly', alignItems: 'center', marginLeft: '20%' }}>
                  <Text style={{ color: 'black', fontSize: 20, color: 'black' }}>{Product.product.nutriments.fat_100g}{" g"}</Text>
                </View>
              </View>
              <Divider style={styles.divider} />
              {/* Acides gras saturés */}
              <View style={{ flexDirection: 'row' }}>
                <View style={{ backgroundColor: '#BCB19A', width: 170, height: 35, borderTopRightRadius: 30, borderBottomEndRadius: 30, justifyContent: 'center' }}>
                  <Text style={{ alignSelf: 'center', fontSize: 15, color: 'white' }}>Acides gras saturés</Text>
                </View>
                <View style={{ justifyContent: 'space-evenly', alignItems: 'center', marginLeft: '20%' }}>
                  <Text style={{ color: 'black', fontSize: 20, color: 'black' }}>{Product.product.nutriments["saturated-fat_100g"]}{" g"}</Text>
                </View>
              </View>
              <Divider style={styles.divider} />
              {/* Glucide dont sucre */}
              <View style={{ flexDirection: 'row' }}>
                <View style={{ backgroundColor: '#BCB19A', width: 170, height: 35, borderTopRightRadius: 30, borderBottomEndRadius: 30, justifyContent: 'center' }}>
                  <Text style={{ alignSelf: 'center', fontSize: 15, color: 'white' }}>Glucide dont sucre</Text>
                </View>
                <View style={{ justifyContent: 'space-evenly', alignItems: 'center', marginLeft: '20%' }}>
                  <Text style={{ color: 'black', fontSize: 20, color: 'black' }}>{Math.round(Product.product.nutriments.carbohydrates_100g * 10) / 10}{" g"}</Text>
                </View>
              </View>
              <Divider style={styles.divider} />
              {/* Fibres */}
              <View style={{ flexDirection: 'row' }}>
                <View style={{ backgroundColor: '#BCB19A', width: 170, height: 35, borderTopRightRadius: 30, borderBottomEndRadius: 30, justifyContent: 'center' }}>
                  <Text style={{ alignSelf: 'center', fontSize: 15, color: 'white' }}>Fibres</Text>
                </View>
                <View style={{ justifyContent: 'space-evenly', alignItems: 'center', marginLeft: '20%' }}>
                  <Text style={{ color: 'black', fontSize: 20, color: 'black' }}>{Product.product.nutriments.fiber_100g}{" g"}</Text>
                </View>
              </View>
              <Divider style={styles.divider} />
              {/* Protéines */}
              <View style={{ flexDirection: 'row' }}>
                <View style={{ backgroundColor: '#BCB19A', width: 170, height: 35, borderTopRightRadius: 30, borderBottomEndRadius: 30, justifyContent: 'center' }}>
                  <Text style={{ alignSelf: 'center', fontSize: 15, color: 'white' }}>Protéines</Text>
                </View>
                <View style={{ justifyContent: 'space-evenly', alignItems: 'center', marginLeft: '20%' }}>
                  <Text style={{ color: 'black', fontSize: 20, color: 'black' }}>{Math.round(Product.product.nutriments.proteins_100g * 10) / 10}{" g"}</Text>
                </View>
              </View>
              <Divider style={styles.divider} />
              {/* Sel */}
              <View style={{ flexDirection: 'row' }}>
                <View style={{ backgroundColor: '#BCB19A', width: 170, height: 35, borderTopRightRadius: 30, borderBottomEndRadius: 30, borderBottomLeftRadius: 45, justifyContent: 'center' }}>
                  <Text style={{ alignSelf: 'center', fontSize: 15, color: 'white' }}>Sel</Text>
                </View>
                <View style={{ justifyContent: 'space-evenly', alignItems: 'center', marginLeft: '20%' }}>
                  <Text style={{ color: 'black', fontSize: 20, color: 'black' }}>{Math.round(Product.product.nutriments.salt_100g * 10) / 10}{" g"}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Information nutriscore */}
          <View style={{ alignSelf: 'center' }}>
            <Text style={Product.product.nutrition_grades_tags == "a" ? styles_Slider.nutriscore_A : Product.product.nutrition_grades_tags == "b" ? styles_Slider.nutriscore_B : Product.product.nutrition_grades_tags == "c" ? styles_Slider.nutriscore_C : Product.product.nutrition_grades_tags == "d" ? styles_Slider.nutriscore_D : Product.product.nutrition_grades_tags == "e" ? styles_Slider.nutriscore_E : { color: 'black' }}>
              {Product.product.nutrition_grades_tags == "a" ? 'Très bon' : Product.product.nutrition_grades_tags == "b" ? 'Bon' : Product.product.nutrition_grades_tags == "c" ? 'Assez bon' : Product.product.nutrition_grades_tags == "d" ? 'Moyen' : Product.product.nutrition_grades_tags == "e" ? 'Mauvais' : 'Nutriscore inconnu'}
            </Text>
          </View>
          {/* Bouton Ajouter produit à sa consommation */}
          <View style={{ alignSelf: 'center' }}>
            <Pressable onPress={() => { }}
              style={({ pressed }) => [
                {
                  width: 306,
                  height: 58,
                  borderRadius: 100,
                  backgroundColor: pressed ? '#598E12' : '#4C711C',
                },]}>
              <View style={styles.textView}>
                <Text style={styles.text, styles.white}>
                  Ajouter à ma consommation
                </Text>
              </View>
            </Pressable>
          </View>
        </View>
      </>

    </View>
  );

  //////////////////////////////////////////////////////////////////////Here


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


  return (
    <>
              <Pressable onPress={DebugLogout} style={{
              position: "absolute", left: 0, top: 0, zIndex : 1,
              margin: 10,
              borderWidth:1,
              borderColor:'rgba(0,0,0,0.2)',
              alignItems:'center',
              justifyContent:'center',
              width:60,
              height:60,
              backgroundColor:'#d2f2ec',
              borderRadius:50,
            }}>
              <View>
                <MaterialCommunityIcons style={{marginLeft: 3}}name="logout" color="#ff791d" size={30} />
              </View>
          </Pressable>
      <View style={styles.container}> 
        <RNCamera
          ref={cameraRef}
          style={styles.preview}
          type={type}
          captureAudio={false}
          flashMode={flash}
          onBarCodeRead={onBarCodeRead}
          autoFocus={true}
        >
        <View>
          <Image source={require("../assets/logo_scan.png")} style={{ width: 600, height: 600, flex: 1, opacity: 0.6}} resizeMode="contain"></Image>
        </View>
        </RNCamera>
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>

        </View>


      </View>

      {isOpen ? (
        <>
          <Animated.Code>
             {/* Detecte quand le modal est fermé par l'user" */}
            {() => Animated.onChange(callbackNode, [Animated.cond(Animated.eq(callbackNode, 1), Animated.call([], () => { setModalState(false), setIsOpen(false), setBarcodeArray([]) }),)])}
          </Animated.Code>
          <BottomSheet
            ref={sheetRef}
            snapPoints={['80%', '25%', 0]}
            borderRadius={10}
            renderContent={renderContent}
            initialSnap={2}
            callbackNode={callbackNode}
          />
        </>
      ) : (
        <>
        </>
      )}
    </>
  )


}

/*
<BottomSheet
            ref={sheetRef}
            snapPoints={['70%', '15%', 0]}
            borderRadius={10}
            renderContent={renderContent}
            initialSnap={2}
          />
          */

export default CameraApp

const styles_Slider = StyleSheet.create({
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
    textAlign: 'right',

  },
  nutriscore_A: {
    color: "#0BAD17",
    fontWeight: "800",
    fontSize: 40,
  },
  nutriscore_B: {
    color: "#76E37E",
    fontWeight: "800",
    fontSize: 40,
  },
  nutriscore_C: {
    color: "#FAED29",
    fontWeight: "800",
    fontSize: 40,
  },
  nutriscore_D: {
    color: "#FAAE29",
    fontWeight: "800",
    fontSize: 40,
  },
  nutriscore_E: {
    color: "#E53B3B",
    fontWeight: "800",
    fontSize: 40,
  },
  white: {
    color: "rgba(255,255,255,1)",
  },
  black: {
    color: "rgba(0,0,0,1)",
  },
  textView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

const styles = {
  container: {
    flex: 1
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center'
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  enterBarcodeManualButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40
  },
  scanScreenMessage: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
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
  container_: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "black",
    fontWeight: "800",
    fontSize: 20,
    textAlign: 'center',

  },
  nutriscore_B: {
    color: "green",
    fontWeight: "800",
    fontSize: 40,
  },
  nutriscore_Mauvais: {
    color: "red",
    fontWeight: "800",
    fontSize: 40,
  },
  white: {
    color: "rgba(255,255,255,1)",
  },
  black: {
    color: "rgba(0,0,0,1)",
    textAlign: 'center',

  },
  textView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnClickContain: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    alignSelf: 'stretch',
    backgroundColor: '#009D6E',
    width: 32,
    height: 32,
  },
};

