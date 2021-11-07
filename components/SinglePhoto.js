import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Image, Dimensions } from 'react-native';
import * as MediaLibrary from "expo-media-library";
export default function SinglePhoto(props){

    const w = Dimensions.get("window").width
    const h = Dimensions.get("window").height
    const deleteHandle = async (asset) => {
        try {
            await MediaLibrary.deleteAssetsAsync(asset)
            await props.route.params.onDelete(asset)
            await props.navigation.pop()
        } catch (e){
            alert("Musisz wyrazić zgodę na usunięcie zdjęcia!")
        }
    }

    return(<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image style={{flex: 4, width: w * 0.7, height: h * 0.7, resizeMode: 'contain'}}
               source={{
                   uri: props.route.params.item.uri
               }}
        />
        <View style={{flex: 1, flexDirection: 'row', justifyContent: "space-around"}}>
            <TouchableOpacity><Text style={{margin: w * 0.04, fontSize: w * 0.08}}>SHARE</Text></TouchableOpacity>
            <TouchableOpacity onPress={(asset) => deleteHandle(props.route.params.item)}><Text style={{margin: w * 0.04, fontSize: w * 0.08}}>DELETE</Text></TouchableOpacity>
        </View>
    </View>)
}