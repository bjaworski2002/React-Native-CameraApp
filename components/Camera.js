import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Camera } from "expo-camera";

export default function CameraItem(props) {
    const hasCameraPermission = props.route.params.status; // podstawienie zmiennej ze state
    if (hasCameraPermission == null) {
        return <Text>{props.route.params.status}</Text>;
    } else if (hasCameraPermission === false) {
        return <Text>brak dostępu do kamery</Text>;
    } else {
        return (
            <View style={{ flex: 1 }}>
                <Camera
                    ref={ref => { let camera = ref; /* Uwaga: referencja do kamery używana później */ }} style={{ flex: 1 }} >
                    <View style={{ flex: 1 }}>
                        <Text style={{color: 'white'}}>{/* tutaj wstaw buttony do obsługi kamery, które widać na filmie*/props.route.params.status}</Text>
                    </View>
                </Camera>
            </View>
        );
    }
}