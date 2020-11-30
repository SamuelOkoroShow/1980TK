import React, {useState} from 'react';
import {View,FlatList, ImageBackground, Dimensions, TouchableOpacity, Text} from 'react-native'
import { connect } from 'react-redux';
import Location from './location'
import map1 from './images/map1.jpg'
import {Ionicons } from '@expo/vector-icons';
const BASIC = '#ddd'
const RED = "#f96062"
const GREEN = "#37c94c"


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import puerto_vallarta from './locations/puerto_vallarta'
import Menu from './menu'

const OSET = windowWidth/5;
 
const useCoordinate = (coordinate) => {
	const locationVal = locationMap.splice(coordinate, 1)
	//console.log(locationMap)
	return locationVal;
}

const map = (props) => {
  const [map_name, setMapName] = useState(props.game.city.name)
  const [activeNav, setActiveNav] = useState(false)
  return (
    <ImageBackground source={map1} style = {{flex:1, width:null, height:null, justifyContent:'flex-end', borderRadius:10, padding:20}}>
    <FlatList
    style = {{alignSelf:'center'}}
    contentContainerStyle= {{alignItems:'flex-start', borderRadius:10, justifyContent: 'center',flex: 1, backgroundColor:'rgba(255,255,255,0.1)'}}
      bounce = {false}
      style = {{marginBottom:10 }}
      data = {puerto_vallarta}
      keyExtractor={(item,index) => item.name}
      renderItem = {(items) => <Location setMapName = {setMapName} locations = {items}/>} />
    <View style={{backgroundColor:'#c0a47c', flexDirection:'row', justifyContent:'space-between', borderWidth:1, bordercolor:'#333', alignItems:'center'}}>
      <View />
      <Text style={{alignSelf:'center', color:"#252015", fontWeight:'bold'}}>{map_name}</Text>
      {(map_name != props.game.city.name)?<TouchableOpacity style={{height:50, width:50, justifyContent:'center', alignItems:"center", backgroundColor:GREEN}}>
      <Ionicons name={'ios-return-right'} size={30} color="#fff" />
      </TouchableOpacity>:
      <View />}
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