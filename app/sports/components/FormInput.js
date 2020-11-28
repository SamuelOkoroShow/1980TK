import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {windowHeight, windowWidth} from '../utils/Dimensions';

export default function FormInput({labelValue, placeholderText, ...rest}) {
  return (
    <TextInput
      value={labelValue}
      style={styles.input}
      numberOfLines={1}
      placeholder={placeholderText}
      placeholderTextColor='rgba(227,85,64,0.3)'
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: windowWidth / 1.5,
    height: windowHeight / 15,
    fontSize: 16,
    borderRadius: 30,
    borderWidth: 1,
    color: '#E35540',
    borderColor: 'rgba(227,85,64,0.3)'
  },
});
