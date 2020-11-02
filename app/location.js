import React from 'react';
import {View, TouchableOpacity, Image, Text} from 'react-native' 


const LOCATION_SIZE = 60;
var coordinates = {x:0,y:0};

const Location = (props) => {
	//coordinates = props.useCoordinate(0)[0]
	console.log(props)
		return(<View style={{position:'absolute', left:props.locations.item.x, bottom:props.locations.item.y, backgroundColor:'#333', width:LOCATION_SIZE, height:LOCATION_SIZE, borderRadius:LOCATION_SIZE/2}}>
			<TouchableOpacity stlye={{flex:1}}>
			</TouchableOpacity>
			</View>)
	}

export default Location;