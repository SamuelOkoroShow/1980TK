import React, { useState } from 'react';
import {View, TouchableOpacity, Dimensions, Text, Animated} from 'react-native'
import { AntDesign, Ionicons } from '@expo/vector-icons';
const windowWidth = Dimensions.get('window').width;
const RED = "#f96062"
const BUTTON_SIZE = windowWidth/6
const CITY_HEAT_COLOR = "#b90000"
const HEAT_COLOR = "#ed832e"
const HEAT_BAR = 80;
const maxHeat = 100;

const Menu = (props) => {
	const animatedVal = React.useRef(new Animated.Value(0)).current;
	const [city_heat, set_city_heat] = useState(props.game.city_heat.puerto_vallarta)
	const [fold, setfold] = React.useState(0)
	var animatedValue = animatedVal;

	const animation = (toValue) => Animated.timing(animatedVal, {
			toValue: toValue,
			duration: 200,
			useNativeDriver: false
		})


	const Heat_bar = () => {
    //var city_heat
	var heat_width = props.game.heat
	

	if(props.game.city.name == "Puerto Vallarta"){
		set_city_heat((props.game.city_heat.puerto_vallarta/maxHeat) * HEAT_BAR)
	}
	if(props.game.city.name == "Puerto Escondido"){
		set_city_heat((props.game.city_heat.puerto_escondido/maxHeat) * HEAT_BAR)
	}
	if(props.game.city.name == "Oaxaca City"){
		set_city_heat((props.game.city_heat.oaxaca_city/maxHeat) * HEAT_BAR)
	}
	if(props.game.city.name == "Ciudad Carmen"){
		set_city_heat((props.game.city_heat.ciudad_carmen/maxHeat) * HEAT_BAR)
	}
	if(props.game.city.name == "Tabasco"){
		set_city_heat((props.game.city_heat.tabasco/maxHeat) * HEAT_BAR)
	}
	
	var heatz = (props.game.heat/maxHeat) * HEAT_BAR

	if((props.game.heat + (city_heat-2)) > maxHeat){
		heatz = (maxHeat - (city_heat*maxHeat/HEAT_BAR)) - 2
		
	}

	return(<View style={{width:HEAT_BAR, height:5, alignItems:'center', padding:0, borderWidth:1, borderColor:'#444', flexDirection:'row'}}>
      <View style = {{backgroundColor:CITY_HEAT_COLOR, width:city_heat, height:3}} />
      <View style = {{backgroundColor:HEAT_COLOR, width:heatz, borderRadius:5, height:3}} />
    </View>)
}
	
	function DaysGone(){
		if(fold == 0){
		return (<View />)
	}else{
		return (
		<View style={{justifyContent:'space-between', flexDirection:'row', flex:1}}>
			<View style={{marginLeft:20,}}>
			<Text style={{fontSize:12}}>Wanted Lvl...</Text>
			<Heat_bar />
		<Text style={{fontSize:9.5, textAlign:'center'}}>{props.game.city.name}</Text>
			</View>
			<View style={{flexDirection:'row',}}>
				<TouchableOpacity onPress = {() => props.navigation.navigate('Profile')} style={{ alignItems:'center', justifyContent:'center', paddingHorizontal:15}}>
					<Ionicons name={"ios-person"} size={25} color="#333" />
					<Text style={{fontSize:8, textAlign:'center'}}>Party: {props.game.party.length + 1}</Text>
				</TouchableOpacity>
				<View style={{justifyContent:'flex-end'}}>
		<Text style={{fontSize:9, textAlign:'center', color:'#2fc170', backgroundColor:'#333', paddingHorizontal:2, borderRadius:3}}>${numberWithCommas(props.game.money)}</Text>
						<Text style={{fontSize:9.5, textAlign:'center'}}>Day: {props.game.day}</Text>
				</View>
				<TouchableOpacity onPress = {props.skipDay} style={{backgroundColor:RED, borderTopRightRadius:BUTTON_SIZE/2, justifyContent:'center', alignItems:'center', marginLeft:5, borderBottomRightRadius:BUTTON_SIZE/2, width:BUTTON_SIZE/1.6}}>
				 <Ionicons name={'ios-fastforward'} size={15} color="white" />
				</TouchableOpacity>
					</View>
			</View>)
		}
	}

	function numberWithCommas(x) {
        x = x.toString();
        var pattern = /(-?\d+)(\d{3})/;
        while (pattern.test(x))
            x = x.replace(pattern, "$1,$2");
        return x;
	}
	
	const onPress = () => {
		//console.log(fold === 1? 0: 1)
		console.log(props.game.city_heat)
		animation(fold === 1 ? 0 : 1).start()
		setfold(fold === 1? 0: 1);
		
	}

  return (
    <View style = {{position:'absolute', bottom:70, alignSelf:'center', justifyContent:'center', alignItems:'center'}}>
    <Animated.View style = {{position:'absolute',shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 3, width:animatedVal.interpolate({
				inputRange:[0,0.5,1],
				outputRange:[1,BUTTON_SIZE*2.5, windowWidth-30]
			}), backgroundColor:'#c0a47c', height:BUTTON_SIZE-10, borderRadius:BUTTON_SIZE/2, alignSelf:'center'}}>
			<DaysGone />
	</Animated.View>
    <TouchableOpacity onPress={onPress} style={{shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 8, width:BUTTON_SIZE, alignSelf:'center', backgroundColor:"#c0a47c", justifyContent:'center', alignItems:'center', height:BUTTON_SIZE, borderRadius:BUTTON_SIZE/2}}>
    <Ionicons name={fold === 1?"ios-close":"ios-car"} size={25} color="#fff" />
    </TouchableOpacity>

    </View>
  )
}

export default Menu;