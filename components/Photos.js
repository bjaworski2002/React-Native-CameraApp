import React, {useEffect, useState, useMemo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, FlatList, Image, Dimensions} from 'react-native';
import * as MediaLibrary from 'expo-media-library';

function Photos(props) {
    const w = Dimensions.get("window").width
    const h = Dimensions.get("window").height

    const [photos, setPhotos] = useState([])
    const [grid, setGrid] = useState(true)
    const [permissions, setPermissions] = useState("")
    const gridHandle = () => {
        setGrid(!grid)
    }
    const onPhotoTake = (asset) => {
        let tempPhotos = [asset, ...photos]
        tempPhotos.pop()
        setPhotos(tempPhotos)
    }
    const deleteHandle = (asset) => {
        setPhotos(photos.filter(a => a.id !== asset.id))
    }
    const handleSingleImage = (item) => {
        console.log(item)
        props.navigation.navigate("singlephoto", {item: item, onDelete: (asset) => deleteHandle(asset)})
    }
    const renderItem = ({item}) => {
        return (
            <TouchableOpacity onPress={() => handleSingleImage(item)}><View style={grid ? {height: w * 0.2, width: w * 0.8, margin: 5} : {
                height: w * 0.2,
                width: w * 0.2,
                margin: 5
            }}>
            <Image style={{flex: 1}}
                source={{
                    uri: item.uri
                }}
            />
            </View>
            </TouchableOpacity>
        )
    }
    const cameraHandle = () => {
        props.navigation.navigate("camera", {status: permissions, photoTake: (asset) => onPhotoTake(asset)})
    }
    useEffect(() => {
        const grantPermissions = async () => {
            let {status} = await MediaLibrary.requestPermissionsAsync();
            if (status !== 'granted') {
                alert('brak uprawnień do czytania image-ów z galerii')
            } else {
                let obj = await MediaLibrary.getAssetsAsync({
                    first: 100,           // ilość pobranych assetów
                    mediaType: 'photo'    // typ pobieranych danych, photo jest domyślne
                })
                setPermissions(status)
                setPhotos(obj.assets)
            }
        }
        grantPermissions()
    }, [])
    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <TouchableOpacity onPress={gridHandle}>
                    <Text style={styles.text2}>GRID / LIST</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={cameraHandle} style={styles.text2}>
                    <Text style={styles.text2}>OPEN CAMERA</Text>
                </TouchableOpacity>
                <Text style={styles.text2}>REMOVE SELECTED</Text>
            </View>
            <View style={styles.body}>
                <FlatList
                    data={photos}
                    keyExtractor={item => item.id.toString()}
                    renderItem={renderItem}
                    numColumns={grid ? 1 : 4}
                    key={grid ? 1 : 4}
                />
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#303030',
        alignItems: 'center',
        justifyContent: 'center',
    },
    head: {
        padding: 10,
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-around"
    },
    body: {
        flex: 6,
    },
    text2: {
        flex: 1,
        fontSize: 22,
        color: '#ffffff'
    },
    Image2: {
        height: 40,
        width: 40,
    }
});
export default React.memo(Photos)