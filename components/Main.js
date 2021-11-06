import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
export default function Main(props) {
    const onPressHandler = () => {
        props.navigation.navigate("photos")
        console.log("Press")
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onPressHandler}><Text style={styles.h1Text}>Camera App</Text></TouchableOpacity>
            <Text style={styles.h4Text}>show gallery pictures</Text>
            <Text style={styles.h4Text}>take picture from camera</Text>
            <Text style={styles.h4Text}>save photo to device</Text>
            <Text style={styles.h4Text}>delete photo from device</Text>
            <Text style={styles.h4Text}>share photo</Text>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#cc3035',
        alignItems: 'center',
        justifyContent: 'center',
    },
    h1Text: {
        color: "white",
        fontSize: 48,
        padding: 25
    },
    h4Text: {
        color: "white",
        fontSize: 22,
        padding: 10
    }
});