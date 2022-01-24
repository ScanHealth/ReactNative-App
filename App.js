/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { Button, Center, NativeBaseProvider } from "native-base";
import {AuthProvider} from './src/context/AuthContext';
import Navigation from './src/components/Navigation';
import {LogBox } from 'react-native';
LogBox.ignoreLogs(['Reanimated 2']);

export default function App() {
  return (
    <AuthProvider>
        <Navigation/>
    </AuthProvider>
  );
}
