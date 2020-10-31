import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native'
import { connect } from 'react-redux';
import Location from './location'
 

const map = (props) => {
  return (
    <View stlye = {{flex:1}}>
    <Location />
    <Text>{props.game.day}</Text>
    </View>
  )
}

const mapStateToProps = (state) => {
  const { game } = state
  return { game }
};

export default connect(mapStateToProps)(map);