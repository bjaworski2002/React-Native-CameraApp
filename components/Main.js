import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Font from "expo-font";

export default function Main(props) {

    const [loading, setLoading] = useState(true)
    const onPressHandler = () => {
        props.navigation.navigate("photos")
        console.log("Press")
    }
    useEffect(async () => {
        await Font.loadAsync({
            'titleFont': require('../font/accuratist.ttf'),
        });
        setLoading(false)
    }, [])
    return (
        <View style={styles.container}>
            {loading ? null :
                <>
                <TouchableOpacity onPress={onPressHandler}>
                    <Text style={styles.h1Text}>Camera App</Text>
                </TouchableOpacity>
                <Text style={styles.h4Text}>show gallery pictures</Text>
                <Text style={styles.h4Text}>take picture from camera</Text>
                <Text style={styles.h4Text}>save photo to device</Text>
                <Text style={styles.h4Text}>delete photo from device</Text>
                <Text style={styles.h4Text}>share photo</Text>
                </>
            }
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
        padding: 25,
        fontFamily: 'titleFont'
    },
    h4Text: {
        color: "white",
        fontSize: 22,
        padding: 10,
        fontFamily: 'titleFont'
    }
});