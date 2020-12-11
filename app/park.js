import React, {useEffect, useState} from 'react'
import { View, Text, FlatList, ScrollView, Image } from 'react-native'
import { Acura, Audi, Aston_Martin, Ambulance, BMW, Camaro, Deawoo, Ford, Harley_Davidson, Honda, Isuzu, Lamborghini, Scooter, Tesla, Truck, Toyota, Kawasaki, Mercedes, Volkswagen} from './cars/index'
var cars_array = [Acura, Audi, Aston_Martin, Ambulance, BMW, Camaro, Deawoo, Ford, Harley_Davidson, Honda, Isuzu, Lamborghini, Scooter, Tesla, Truck, Toyota, Kawasaki, Mercedes, Volkswagen]
import { connect } from 'react-redux';

function Park(props) {
    const [cars_parked, setCars_parked] = useState([])
    const getRandomArbitrary = (min, max) => {
        // excludes the max
        return Math.floor(Math.random() * (max - min)) + min;
    }

    const Parked = (data) => {
        //console.log(data)

        return(<View style={{height:80, flexDirection:'row', alignItems:'center', padding:5, marginTop:5, marginHorizontal:10, shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.8, borderRadius:5,
        borderColor:'#eee',
        elevation: 2,
        shadowRadius: 1}}>
            <Image source = {data.img} resizeMode = "contain" style={{width:50, marginHorizontal:8, height:50,}} />
            <View>
            <Text style={{color:'#555', fontWeight:'100'}}>{data.name}</Text>
            <Text>Top Speed is {data.top_speed}.</Text>
            </View>
            <View style={{flexDirection:'row',flex:1,  justifyContent:'space-around'}}>
                <Text> ${data.price}.</Text>
            </View>
        </View>)
    }

    return (
        <View style={{flex:1}}>
            {/* {<FlatList
            data = {cars_array}
            keyExtractor = {(item) => item.name}
            renderItem = {(data) => <Parked {...data} />}
            />} */}
            <ScrollView>
            {props.game.park.cars.map((data) => <Parked key={data.name} {...data} />)}
            </ScrollView>
        </View>)
}
const mapStateToProps = (state) => {
    const { game } = state
    return { game }
  };
  
  export default connect(mapStateToProps)(Park);