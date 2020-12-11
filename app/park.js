import React, {useEffect, useState, Component} from 'react'
import { View, Text, FlatList, ScrollView, Image } from 'react-native'
import { useFocusEffect } from '@react-navigation/native'
import { Acura, Audi, Aston_Martin, Ambulance, BMW, Camaro, Deawoo, Ford, Harley_Davidson, Honda, Isuzu, Lamborghini, Scooter, Tesla, Truck, Toyota, Kawasaki, Mercedes, Volkswagen} from './cars/index'
var cars_array = [Acura, Audi, Aston_Martin, Ambulance, BMW, Camaro, Deawoo, Ford, Harley_Davidson, Honda, Isuzu, Lamborghini, Scooter, Tesla, Truck, Toyota, Kawasaki, Mercedes, Volkswagen]


export default class park extends Component {
    constructor(props){
        super(props)
        this.state = {
            cars_parked : []
        }
    }
    componentDidmount(){
        console.log("number_o_cars")
        var number_o_cars = getRandomArbitrary(1,6);
        console.log(number_o_cars)
        for (var i =0; i<number_o_cars; i++){
            var j = getRandomArbitrary(0,cars_array.length);
            this.setState({
                cars_parked: [...this.state.cars_parked, cars_array[j]]
                })
            }
    }
    componentWillReceiveProps(){
        console.log("Will Recieve")
    }
    getRandomArbitrary(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
    }

    Parked(data){
        console.log("parked")

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

    render() {
        console.log("render")
        return (
            <View style={{flex:1, backgroundColor:'#333'}}>
                {<FlatList
                data = {this.state.cars_parked}
                keyExtractor = {(item) => item.name}
                renderItem = {(data) => this.Parked(data)}
                />}
                <ScrollView>
                {this.state.cars_parked.map((data) => this.Parked(data))}
                </ScrollView>
            </View>)
    }
}
