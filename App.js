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
import Battle from './app/battle'
import Inventory from './app/inventory'
import Travel from './app/travel'
import Park from './app/park'
import Gang from './app/gang'
import Hospital from './app/hospital'
import Contact from './app/contact'
import Steal from './app/steal'

const Stack = createStackNavigator();
const store = createStore(gameReducer);

export default function App() {
  return (
    <Provider store={store}>
    <StatusBar hidden style="auto" />
     <NavigationContainer>
      <Stack.Navigator
      initialRouteName = "Map"
      screenOptions={{
      headerShown: false
        }}
      >
      <Stack.Screen
          name="Map"
          component={Map}
          
        />
        <Stack.Screen
          name="Battle"
          component={Battle}
        />
         <Stack.Screen
          name="Profile"
          component={Profile}
        />
        <Stack.Screen
          name="Inventory"
          component={Inventory}
        />
        <Stack.Screen
          name="Park"
          component={Park}
          
        />
        <Stack.Screen
          name="Travel"
          component={Travel}
        />
        <Stack.Screen
          name="Contact"
          component={Contact}
        />
        <Stack.Screen
          name="Hospital"
          component={Hospital}
        />
        <Stack.Screen
          name="Gang"
          component={Gang}
        />
        <Stack.Screen
          name="Steal"
          component={Steal}
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
