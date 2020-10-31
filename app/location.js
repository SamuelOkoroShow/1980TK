import React from 'react';
import {View, TouchableOpacity, Image, Text} from 'react-native' 


const LOCATION_SIZE = 60;

const Location = () => {
		return(<View style={{backgroundColor:'#333', width:LOCATION_SIZE, height:LOCATION_SIZE, borderRadius:LOCATION_SIZE/2}}>
			<TouchableOpacity stlye={{flex:1}}>
			</TouchableOpacity>
			</View>)
	}

export default Location;