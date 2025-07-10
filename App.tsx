/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

// import { NewAppScreen } from '@react-native/new-app-screen';
import React from 'react';
import {  StyleSheet } from 'react-native';
import { SafeAreaProvider , SafeAreaView} from 'react-native-safe-area-context';

import ChatScreen from './src/screens/ChatScreen';


export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']} >
        <ChatScreen />
      </SafeAreaView>
    </SafeAreaProvider>
  );

  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,             
    backgroundColor: '#000',
  },
})