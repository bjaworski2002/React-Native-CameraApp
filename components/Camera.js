import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, Image, Dimensions, Animated} from 'react-native';
import {Camera} from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { LogBox } from 'react-native';
import HamburgerMenu from "./Camera/HamburgerMenu";

LogBox.ignoreLogs([
    'Non-serializable values were found in the navigation state',
]);
function CameraItem(props) {
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [hasPermission, setHasPermission] = useState(null);
    const [settings, setSettings] = useState(false)
    const [params, setParams] = useState({
        type: Camera.Constants.Type.front,
        whiteBalance: "auto",
        flashMode: "off",
    })
    const onRadioPress = (param, value) => {
        setParams({...params, [param]: value})
    }
    const hamburgerRef = useRef(new Animated.Value(-1 * Dimensions.get("window").width)).current
    let camera
    useEffect(async () => {
        const {status} = await Camera.requestCameraPermissionsAsync();
        setHasPermission(status === 'granted');
    }, []);

    if (hasPermission == null) {
        return <Text>{props.route.params.status}</Text>;
    } else if (hasPermission === false) {
        return <Text>brak dostępu do kamery</Text>;
    } else {
        return (
            <View style={{flex: 1}}>
                <Camera
                    ref={ref => {
                        camera = ref;
                    }} style={{flex: 1}}
                    {...params}
                >
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}>
                            <TouchableOpacity
                                onPress={() => {
                                    setParams(params.type === Camera.Constants.Type.back
                                            ? {...params, type: Camera.Constants.Type.front}
                                            : {...params, type: Camera.Constants.Type.back}
                                    )
                                }}
                            >
                                <Image source={require('../assets/rotate.png')} style={styles.img}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.button}>
                            <TouchableOpacity
                                onPress={async () => {
                                    if (camera) {
                                        let foto = await camera.takePictureAsync();
                                        let asset = await MediaLibrary.createAssetAsync(foto.uri);
                                        props.route.params.photoTake(asset)
                                        alert("Zrobiono zdjęcie!")
                                    }
                                }}
                            >
                                <Image source={require('../assets/camera.png')} style={styles.img}/>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.button}>
                            <TouchableOpacity
                                onPress={() => {
                                    Animated.timing(hamburgerRef, {
                                        toValue: settings ? -1 * Dimensions.get("window").width / 2 : 0,
                                        delay: 50,
                                        duration: 300,
                                        useNativeDriver: true
                                    }).start()
                                    setSettings(!settings)
                                }}
                            >
                                <Image source={require('../assets/setting.png')} style={styles.img}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Animated.View style={[styles.types, {
                        transform: [
                            {translateX: hamburgerRef}
                        ],
                        display: settings ? 'block' : 'none',
                    }]} >
                        <HamburgerMenu params={params} onRadioPress={onRadioPress} />
                    </Animated.View>
                </Camera>
            </View>
        );
    }
}
export default React.memo(CameraItem)
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        margin: 20,
        transform: [
            {translateY: Dimensions.get("window").height * 0.65}
        ]
    },
    button: {
        backgroundColor: '#cc3035',
        height: 80,
        width: 80,
        padding: 10,
        borderRadius: 40,
        margin: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    img: {
        flex: 1,
        resizeMode: 'contain',
        width: 50,
        height: 50,
    },
    types: {
        position: 'absolute',
        backgroundColor: '#cc3035',
        height: Dimensions.get("window").height,
        width: Dimensions.get("window").width / 2,
    }
});