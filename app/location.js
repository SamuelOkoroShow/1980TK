import React from 'react';
import {View, TouchableOpacity, Image, ImageBackground, Text} from 'react-native' 
import store from './images/store.png'

const LOCATION_SIZE = 60;
var coordinates = {x:0,y:0};

const Location = (props) => {
	//coordinates = props.useCoordinate(0)[0]
	console.log(props)
		return(<TouchableOpacity  style={{position:'absolute',shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    overflow: 'hidden',
    shadowRadius: 1, elevation:5, left:props.locations.item.x, bottom:props.locations.item.y, backgroundColor:'#ccc', width:LOCATION_SIZE, height:LOCATION_SIZE, borderRadius:LOCATION_SIZE/2}}>
			<Image source={props.locations.item.img} resizeMode = "stretch" style={{flex:1, height:LOCATION_SIZE, width:LOCATION_SIZE}} />
			</TouchableOpacity>)
	} 

export default Location;