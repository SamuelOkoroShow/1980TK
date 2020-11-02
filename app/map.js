import React from 'react';
import {View,FlatList, Dimensions, TouchableOpacity, Text} from 'react-native'
import { connect } from 'react-redux';
import Location from './location'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const OSET = windowWidth/5;
 
const locationMap = [{
	x: OSET,
	y: 100
},{
	x: -30 - OSET,
	y: 0
},{
	x: -50 + OSET,
	y: 0 - OSET
},
{
	x: -30,
	y: -2.5*(OSET),
},{
	x: -130,
	y: 2*(OSET),
}
]

const useCoordinate = (coordinate) => {
	const locationVal = locationMap.splice(coordinate, 1)
	//console.log(locationMap)
	return locationVal;
}

const map = (props) => {
  return (
    <View style = {{flex:1, justifyContent:'flex-end', borderRadius:10, padding:20}}>
    <FlatList
    style = {{alignSelf:'center', backgroundColor:'#333'}}
    contentContainerStyle= {{alignItems:'center', borderRadius:10, justifyContent: 'center',flex: 1, backgroundColor:'#ddd'}}
      bounce = {false}
      style = {{marginBottom:10 }}
      data = {locationMap}
      keyExtractor={item => item.x}
      renderItem = {(items) => <Location locations = {items}/>} />
    <Text style={{alignSelf:'center'}}>{props.game.day} days have past</Text>
    </View>
  )
}

const mapStateToProps = (state) => {
  const { game } = state
  return { game }
};

export default connect(mapStateToProps)(map);