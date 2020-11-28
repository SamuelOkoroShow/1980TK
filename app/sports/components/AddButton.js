import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimensions';

export default function AddButton({buttonTitle, ...rest}) {
  return (
    <TouchableOpacity style={styles.buttonContainer} {...rest}>
      <Text style={styles.buttonText}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    width: windowWidth * 0.4186,
    height: windowHeight * 0.0394,
    backgroundColor: '#E35540',
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#ffffff',
  },
});
