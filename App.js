/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import type {Node} from 'react';
import { Button, Center, NativeBaseProvider } from "native-base"

export const Example = () => {
  return (
    <>
      <Button onPress={() => console.log("hello world")}>Primary</Button>
    </>
  )
}

export default function App() {
  return (
    <NativeBaseProvider>
      <Center flex={1} px="3">
        <Example />
      </Center>
    </NativeBaseProvider>
  );
}
