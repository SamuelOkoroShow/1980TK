import React, {useState, useEffect} from 'react';
import {View,FlatList, ImageBackground, Dimensions, TouchableOpacity, Text} from 'react-native'
import { connect } from 'react-redux';
import { skipDay, reduceHeat, randomizeCars, travel } from '../actions';
import { bindActionCreators } from 'redux';
import Location from './location'
import map1 from './images/map1.jpg'
import {Ionicons } from '@expo/vector-icons';
import { Acura, Audi, Aston_Martin, Ambulance, BMW, Camaro, Deawoo, Ford, Harley_Davidson, Honda, Isuzu, Lamborghini, Scooter, Tesla, Truck, Toyota, Kawasaki, Mercedes, Volkswagen} from './cars/index'
var cars_array = [Acura, Audi, Aston_Martin, Ambulance, BMW, Camaro, Deawoo, Ford, Harley_Davidson, Honda, Isuzu, Lamborghini, Scooter, Tesla, Truck, Toyota, Kawasaki, Mercedes, Volkswagen]

const BASIC = '#ddd'
const RED = "#f96062"
const GREEN = "#37c94c"
const MAX_WANTEDLVL = 200;
const HEAT_BAR = 200

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

const Map = (props) => {
  const [map_name, setMapName] = useState(props.game.city.name)
  const [activeNav, setActiveNav] = useState(false)
  const [scene, setScene] = useState("")

  const getRandomArbitrary = (min, max) => {
    // excludes the max
    return Math.floor(Math.random() * (max - min)) + min;
}

  const onSkipDay = () => {
    // Reduce Heat
    props.reduceHeat({reduceVal: getRandomArbitrary(2,5)})
    // Police Search
    police_search()
    // Gang Search
    gang_search()
    // add contact
    props.skipDay('day')
  }

  const gang_search = () => {
    var taco = getRandomArbitrary(0,10)
    if(taco > 6){
      setMapName("Gangs are looking for you")
    }
  }



  const police_search = () => {
    // Police are searching
    var isPoliceActive = getRandomArbitrary(1, 10)
    if(isPoliceActive >= 4){
      setMapName("Police are in the area.")
      var busted = getRandomArbitrary(0,100)
      var inverseHeat = 100 - props.game.heat
      if(busted > inverseHeat){
        setMapName('Police are confronting you.')
        // turn off escapes

      }

    }
  }

  const newLocation = () => {
    //console.log(scene)
    if(scene == "Park"){
      //console.log("number_o_cars")
        var cars_parked = [];
        var number_o_cars = getRandomArbitrary(1,6);
        console.log(number_o_cars)
        for (var i =0; i<number_o_cars; i++){
            var j = getRandomArbitrary(0,cars_array.length);
            var car = cars_array[j]
            car.condition = getRandomArbitrary(5,100)
                cars_parked= [...cars_parked, car]
                
            }
      props.randomizeCars({name:map_name, cars: cars_parked})
    }
    props.navigation.push(scene)
  }


  return (
    <ImageBackground source={map1} style = {{flex:1, width:null, height:null, justifyContent:'flex-end', borderRadius:10, padding:20}}>
    {/* {<FlatList
    style = {{alignSelf:'center'}}
    contentContainerStyle= {{alignItems:'flex-start', borderRadius:10, justifyContent: 'center',flex: 1, backgroundColor:'rgba(255,255,255,0.1)'}}
      bounce = {false}
      style = {{marginBottom:10 }}
      data = {props.game.city.map}
      keyExtractor={(item,index) => item.name}
      renderItem = {(items) => <Location setScene = {setScene}  setMapName = {setMapName} locations = {items}/>} />} */}
      <View style={{marginBottom:100, justifyContent:'center'}}>
      {props.game.city.map.map((items,index) => <Location key={items.name} setScene = {setScene}  setMapName = {setMapName} locations = {items}/>)}
      </View>
    <View style={{backgroundColor:'#c0a47c', flexDirection:'row', justifyContent:'space-between', borderWidth:1, bordercolor:'#333', alignItems:'center'}}>
      <View />
      <Text style={{alignSelf:'center', color:"#252015", fontWeight:'bold'}}>{map_name}</Text>
      {(map_name != props.game.city.name)?
      <TouchableOpacity onPress={newLocation} style={{height:50, width:50, justifyContent:'center', alignItems:"center", backgroundColor:GREEN}}>
      <Ionicons name={'ios-return-right'} size={30} color="#fff" />
      </TouchableOpacity>:
      <View />}
    </View>
    <Menu skipDay={onSkipDay} navigation = {props.navigation} scene={scene} game = {props.game} />
    </ImageBackground>
  )
}

const mapStateToProps = (state) => {
  const { game } = state
  return { game }
};
const mapDispatchToProps = dispatch => (
  bindActionCreators({
     skipDay, travel, randomizeCars
  }, dispatch)
);

export default connect(mapStateToProps, mapDispatchToProps)(Map);