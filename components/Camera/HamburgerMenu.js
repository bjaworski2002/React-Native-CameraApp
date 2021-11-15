import React, {useEffect, useState} from "react";
import {View, Text, FlatList, StyleSheet, Dimensions} from "react-native";
import { RadioButton } from 'react-native-paper';
import { Camera } from 'expo-camera'
export default function HamburgerMenu(props){
    useEffect(async () => {

    }, [])
    const [types, setTypes] = useState([
        {id: 0, type: 'whiteBalance', values: ['auto', 'sunny', 'cloudy', 'shadow', 'fluorescent', 'incandescent']},
        {id: 1, type: 'flashMode', values: ['auto', 'on', 'off']}
    ])
    const renderItem = ({item}) => {
        return (
            <View style={styles.valueContainer}>
                <Text style={styles.header}>{item.type.toUpperCase()}</Text>
                {item.values.map((e, id) =>
                    <View style={styles.item} key={id}>
                        <RadioButton value={e}
                                     status={item.values[id] === props.params[item.type] ? 'checked' : 'unchecked'}
                                     onPress={() =>
                                         props.onRadioPress(item.type, e)
                                     }
                        />
                        <Text style={styles.text}>{e}</Text>
                    </View>)
                }
            </View>)
    }
    return(
        <FlatList data={types} renderItem={renderItem} keyExtractor={item => item.id.toString()}/>
    )
}

const styles = StyleSheet.create({
    valueContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    header: {
        color: 'white',
        flexWrap: 'wrap',
        fontSize: 15,
        paddingTop: 20,
        padding: 5,
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        margin: 3,
    },
    text: {
        color: 'white',
        flexWrap: 'wrap',
    }
});