import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './components/Main';
import Photos from "./components/Photos"
import Camera from './components/Camera';
import SinglePhoto from "./components/SinglePhoto";
const Stack = createNativeStackNavigator();
import * as Font from "expo-font";

export default function App() {
  useEffect(async () => {
      await Font.loadAsync({
          'titleFont': require('./font/accuratist.ttf'),
      });
  }, [])
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="main" component={Main} options={{ headerShown: false }} />
        <Stack.Screen name="photos" component={Photos} options={{
            title: "Zdjęcia zapisane w aplikacji",
            headerStyle: {
                backgroundColor: "#cc3035",
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontFamily: 'titleFont'
            },

        }} />
        <Stack.Screen name="camera" component={Camera} options={{ title: "Aparat" }} />
        <Stack.Screen name="singlephoto" component={SinglePhoto} options={{ title: "Wybrane zdjęcie" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

