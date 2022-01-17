import React, {useContext} from 'react';
import {Text, View, Button, StyleSheet} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from './context/AuthContext';

const ScannerScreen = () => {
    const {userInfo, isLoading, logout} = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Spinner visible={isLoading}/>
            <Text style={styles.welcome}>Bienvenue {userInfo.user.username}</Text>
            <Button title="Logout" color="red" onPress={logout}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    welcome: {
        fontSize: 18,
        marginBottom: 8,
    },
})

export default ScannerScreen;