import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from './components/Main';
import Photos from "./components/Photos"
import Camera from './components/Camera';
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="main" component={Main} options={{ headerShown: false }} />
        <Stack.Screen name="photos" component={Photos} options={{ title: "Zdjęcia zapisane w aplikacji" }} />
        <Stack.Screen name="camera" component={Camera} options={{ title: "Aparat" }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

