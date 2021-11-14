import React, { useEffect, useState, useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Image, Dimensions } from 'react-native';
import * as MediaLibrary from 'expo-media-library';

function Photos(props) {
    const w = Dimensions.get("window").width
    const h = Dimensions.get("window").height

    const [photos, setPhotos] = useState([])
    const [selectedPhotos, setSelectedPhotos] = useState([])
    const [grid, setGrid] = useState(true)
    const [permissions, setPermissions] = useState("")

    const gridHandle = () => {
        setGrid(!grid)
    }
    const onPhotoTake = (asset) => {
        /*let tempPhotos = [asset, ...photos]
        if (tempPhotos.length > 100) tempPhotos.pop()
        console.log(tempPhotos[0])
        setPhotos(tempPhotos)*/
        grantPermissions()
    }
    const deleteHandle = (asset) => {
        setPhotos(photos.filter(a => a.id !== asset.id))
    }
    const removeHandle = async () => {
        selectedPhotos.map(async e => {
            await MediaLibrary.deleteAssetsAsync(e)
            //await setPhotos(photos.filter(a => a.id !== e.id))
            await setSelectedPhotos(selectedPhotos.filter(a => a.id !== e.id))
        })
    }
    const handleSingleImage = (item) => {
        props.navigation.navigate("singlephoto", { item: item, onDelete: (asset) => deleteHandle(asset) })
    }
    const handleLongPress = async (item) => {
        if(selectedPhotos.length > 0 && selectedPhotos.filter(a => a.id === item.id).length > 0) {
            setSelectedPhotos(selectedPhotos.filter(a => a.id !== item.id))
        }
        else {
            setSelectedPhotos([...selectedPhotos, item])
        }
    }
    const checkRepeat = (item) => {
        if (selectedPhotos.filter(a => a.id === item.id).length > 0) return true
        else return false
    }
    const renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => handleSingleImage(item)} onLongPress={() => handleLongPress(item)}><View
                style={[checkRepeat(item) ? styles.selectedItem : styles.unSelectedItem, { alignItems: 'center', borderRadius: 10 }, grid ? {
                    height: w * 0.2,
                    width: w * 0.8,
                    margin: 5
                } : {
                    height: w * 0.2,
                    width: w * 0.2,
                    margin: 5
                }]}>
                <Image
                    source={{
                        uri: item.uri
                    }}
                    style={grid ? { flex: 1, height: w * 0.17, width: w * 0.74, margin: 5 } : {
                        flex: 1,
                        height: w * 0.17,
                        width: w * 0.17,
                        margin: 5
                    }}
                />
            </View>
            </TouchableOpacity>
        )
    }
    const cameraHandle = () => {
        props.navigation.navigate("camera", { status: permissions, photoTake: (asset) => onPhotoTake(asset) })
    }
    const grantPermissions = async () => {
        let { status } = await MediaLibrary.requestPermissionsAsync();
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
    useEffect(() => {
        grantPermissions()
    }, [])
    useEffect(() => {
          grantPermissions()
    }, [selectedPhotos])

    return (
        <View style={styles.container}>
            <View style={styles.head}>
                <TouchableOpacity onPress={gridHandle}>
                    <Text style={styles.text2}>GRID / LIST</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={cameraHandle} style={styles.text2}>
                    <Text style={styles.text2}>OPEN CAMERA</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={removeHandle} style={styles.text2}>
                    <Text style={styles.text2}>REMOVE SELECTED</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                <FlatList
                    data={photos}
                    extraData={selectedPhotos}
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
        justifyContent: "space-around",
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
    },
    selectedItem: {
        backgroundColor: 'green',
        transform: [
            {scale: 0.9},
        ]
    },
    unSelectedItem: {
        backgroundColor: 'red'
    }
});
export default React.memo(Photos)
