import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Map from './app/map'
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import gameReducer from "./gameReducer"

const store = createStore(gameReducer);

export default function App() {
  return (
    <Provider store={store}>
    <View style={styles.container}>
      <Map />
      <StatusBar hidden style="auto" />
    </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
