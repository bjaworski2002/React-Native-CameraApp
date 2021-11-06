import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Image, Dimensions } from 'react-native';
export default function SinglePhoto(props){

    const w = Dimensions.get("window").width
    const h = Dimensions.get("window").height

    return(<View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Image style={{flex: 4, width: w * 0.7, height: h * 0.7, resizeMode: 'contain'}}
               source={{
                   uri: props.route.params.uri
               }}
        />
        <View style={{flex: 1, flexDirection: 'row', justifyContent: "space-around"}}>
            <TouchableOpacity><Text style={{margin: w * 0.04, fontSize: w * 0.08}}>SHARE</Text></TouchableOpacity>
            <TouchableOpacity><Text style={{margin: w * 0.04, fontSize: w * 0.08}}>DELETE</Text></TouchableOpacity>
        </View>
    </View>)
}