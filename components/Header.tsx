import React from "react";
import { StyleSheet, View, Text } from "react-native";
import DropdownMenu from './DropdownMenu'

const Header = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}> MorphAI </Text>
            <DropdownMenu />
        </View>
    )
}

const styles= StyleSheet.create({
    container:{
        width: '100%',
        paddingTop: 60,
        paddingBottom: 20,
        paddingHorizontal: 20,
        backgroundColor: '#000',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        zIndex: 1,
    },
    text: {
        fontSize: 18,
        color: '#7d7d7d',
        fontWeight: 'bold',
  },
})

export default Header;