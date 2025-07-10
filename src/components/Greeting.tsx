import React from 'react';
import { Text, StyleSheet, View } from 'react-native';


const Greeting = () => {

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Welcome to MorphAI</Text>
    </View>
  );
};

const styles= StyleSheet.create({
    container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',    
  },
   greeting:{
    fontSize: 26,
    color: '#7d7d7d',
    fontWeight: 'bold',
   },
})

export default Greeting;