import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Map from './app/map'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import gameReducer from "./gameReducer"
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from './app/profile'

const Stack = createStackNavigator();
const store = createStore(gameReducer);

export default function App() {
  return (
    <Provider store={store}>
    <StatusBar hidden style="auto" />
     <NavigationContainer>
      <Stack.Navigator
      initialRouteName = "Profile"
      screenOptions={{
      headerShown: false
        }}
      >
      <Stack.Screen
          name="Map"
          component={Map}
          options={{ title: 'Welcome' }}
        />
         <Stack.Screen
          name="Profile"
          component={Profile}
        />
        </Stack.Navigator>
        </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
