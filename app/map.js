import React from 'react';
import {View,FlatList, ImageBackground, Dimensions, TouchableOpacity, Text} from 'react-native'
import { connect } from 'react-redux';
import Location from './location'
import map1 from './images/map1.jpg'
import store from './images/store.png'
import thug from './images/thug1.png'
import park1 from './images/park1.png'
import park2 from './images/park2.png'
import park3 from './images/park3.png'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import Menu from './menu'

const OSET = windowWidth/5;
 
const locationMap = [{
	x: OSET,
	y: 100,
	img: store,
},{
	x: -30 - OSET,
	y: 0,
	img: thug
},{
	x: -50 + OSET,
	y: 0 - OSET,
	img: park1
},
{
	x: -30,
	y: -2.5*(OSET),
	img: park2
},{
	x: -130,
	y: 2*(OSET),
	img: park3
}
]

const useCoordinate = (coordinate) => {
	const locationVal = locationMap.splice(coordinate, 1)
	//console.log(locationMap)
	return locationVal;
}

const map = (props) => {
  return (
    <ImageBackground source={map1} style = {{flex:1, width:null, height:null, justifyContent:'flex-end', borderRadius:10, padding:20}}>
    <FlatList
    style = {{alignSelf:'center', backgroundColor:'#333'}}
    contentContainerStyle= {{alignItems:'center', borderRadius:10, justifyContent: 'center',flex: 1, backgroundColor:'rgba(255,255,255,0.4)'}}
      bounce = {false}
      style = {{marginBottom:10 }}
      data = {locationMap}
      keyExtractor={item => {item.x + item.y}}
      renderItem = {(items) => <Location locations = {items}/>} />
    <View style={{backgroundColor:'#c0a47c', padding:10}}>
    <Text style={{alignSelf:'center', color:"#252015"}}>{props.game.city.name}</Text>
    </View>
    <Menu game = {props.game} />
    </ImageBackground>
  )
}

const mapStateToProps = (state) => {
  const { game } = state
  return { game }
};

export default connect(mapStateToProps)(map);