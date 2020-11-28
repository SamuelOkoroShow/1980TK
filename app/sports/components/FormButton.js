import React from 'react';
import {StyleSheet, TouchableOpacity, Text} from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimensions';

export default function FormButton({buttonTitle, ...rest}) {
  return (
    <TouchableOpacity style={styles.buttonContainer} {...rest}>
      <Text style={styles.buttonText}>{buttonTitle}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    width: windowWidth * 0.666,
    height: windowHeight * 0.0615,
    backgroundColor: '#E35540',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 24,
    color: '#ffffff',
  },
});
