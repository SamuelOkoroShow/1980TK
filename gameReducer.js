import { combineReducers } from 'redux';
import thug2 from './app/images/thug2.png'
import thug1 from './app/images/thug1.png'
import pistol1 from './app/images/pistol1.png'
import assult1 from './app/images/assult1.png'
import smg1 from './app/images/smg1.png'
import {ADD_CAR, ADD_HEAT, ADD_PARTY_MEMBER, ADD_ITEM, RANDOMIZE_CARS, REDUCE_HEAT, REMOVE_PARTY_MEMBER, SHOOT_PLAYER, TRAVEL, RECOVER_HP, HEAL_HP, STEAL} from './types'
import {SHOOT_PARTY, SKIP_DAY} from './types'
import update from 'react-addons-update';
import locations from './app/locations/index'

const HAND = 'hand'
const hk7 = {
  name: "HK 7 Pistol",
  price : 500,
  img: pistol1,
  damage: 20,
  accuracy: 40,
  use:HAND,
  shootingLvl: 20
} 
const mp5 = {
  name: "HK 7 MP5",
  price : 600,
  img: smg1,
  damage: 35,
  accuracy:45,
  use:HAND,
  shootingLvl: 35
} 
const ak47 = {
  name: "AK 47",
  price : 400,
  img: assult1,
  damage: 45,
  accuracy: 55,
  use: HAND,
  shootingLvl: 40
} 

const INITIAL_STATE = {
  day: 58,
  money:0,
  cars: [],
  stealing:{},
  inventory: [
  hk7
  ],
  heat: 50,
  park: {
    name:'Oaxaca City National',
    cars: []
  },
  city_heat: {
    puerto_vallarta:15,
    oaxaca_city: 20,
    puerto_escondido: 40,
    ciudad_carmen: 30,
    tabasco: 100

  },
 city: locations[0],
 player : {
  name: "Samuel Okoro",
  img: thug2,
  hand: {
    gun:hk7
  },
  hand2:{},
  speed:20,
  maxHp: 120,
  hp: 100,
  shooting: 40,
  running: 45,
  hotwiring: 80,
  driving: 90,
  speaking: 12,
  level: 12
 },
 maxGroup: 3,
 party: [{
  name: "Devon Guztavo",
  job: 'Actor',
  hand:{},
  hand2:{},
  speed:20,
  ai: true,
  img: thug1,
  maxHp: 120,
  hp: 100,
  shooting: 40,
  running: 45,
  hotwiring: 80,
  driving: 30,
  speaking: 100,

 },{
  name: "Mercedez Lopez",
  img: thug1,
  maxHp: 120,
  job: 'Driver',
  hand:{},
  hand2:{},
  speed:20,
  ai: true,
  hp: 100,
  shooting: 40,
  running: 45,
  hotwiring: 90,
  driving: 30,
  speaking: 12,

 }]
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOOT_PLAYER:
      console.log("Damage: " + action.payload.damage)

      var newState = {...state,  
      player: {...state.player, 
          hp: state.player.hp - action.payload.damage
        }
      }
      //console.log(newState)
      return state

    case SKIP_DAY:
        console.log("skip day")
      var newState = {
        ...state,
        day : state.day+1
      }
      
      return newState

    case REDUCE_HEAT:
        var defaultHeat = 25;
        if(state.heat > defaultHeat){
          var newState = {...state, heat:state.heat-action.payload.reduceVal}
        }
        return newState

    case RANDOMIZE_CARS:
        var defaultHeat = 15;
          var cars = action.payload.cars
          var newState = {...state, park:{
            name: action.payload.name,
            cars: cars
          }}
        
        return newState
    case REMOVE_PARTY_MEMBER:
          var newArr = [...state.party]
          newArr = newArr.splice(action.payload.id,1)
          var newState = {...state, party:newArr}
          
          return newState
    case ADD_CAR:
          var cars = [...state.cars]
          if(state.cars.length < 2){
            cars.push(action.payload.car)
          }
          var newState = {...state, cars:cars}
          return newState
    case ADD_ITEM:
          var items = {...state.inventory}
          if(state.inventory.length < 7){
            items.push(action.payload.item)
          }
          var newState = {...state, inventory:items}
          return newState
    case ADD_PARTY_MEMBER:
          const MAX_PARTY_SIZE = 3
          var party = {...state.party}
          if(state.party.length < MAX_PARTY_SIZE){
            party.push(action.payload.partyMember)
          }
          var newState = {...state, party:party}
          return newState

    case ADD_HEAT:
      var maxHeat = 100;
        if(state.heat+action.payload.heatVal < maxHeat){
          var newState = {...state, heat:state.heat+action.payload.heatVal}
        }else{
          var newState = {...state, heat:maxtHeat}
        }
        return newState
    case RECOVER_HP:
      // irst we need to get the player
        if(action.payload.id == 0){
          var player = {...state.player}
          
          if(state.player.hp + action.payload.recover >= player.maxHp){
            player.hp = player.maxHp
          }else{
            player.hp = state.player.hp + action.payload.recover
          }
          var newState = {...state, player:player}
          return newState
        }else{
            var party = {...state.party}
            if(state.party[action.payload.id -1].hp + action.payload.recover >= party[action.payload.id].maxHp){
              party[action.payload.id].hp = party[action.payload.id].maxHp
            }else{
              party[action.payload.id].hp = state.party[action.payload.id].hp + action.payload.recover
            }
            var newState = {...state, party: party}
            return newState
        }
      case HEAL_HP:
      // irst we need to get the player
        var charge = action.payload.charge;
        var money = state.money - charge

        if(action.payload.id == 0){
          var player = {...state.player}
          
          if(state.player.hp + action.payload.recover >= player.maxHp){
            player.hp = player.maxHp
          }else{
            player.hp = state.player.hp + action.payload.recover
          }
          var newState = {...state, player:player, money:money}
          return newState
        }else{
            var party = [...state.party]
            if(state.party[action.payload.id -1].hp + action.payload.recover >= party[action.payload.id-1].maxHp){
              party[action.payload.id-1].hp = party[action.payload.id-1].maxHp
            }else{
              party[action.payload.id-1].hp = state.party[action.payload.id-1].hp + action.payload.recover
            }
            var newState = {...state, party: party, money: money}
            return newState
        }
      
    case SHOOT_PARTY:
      //console.log(action)
      //console.log("shoot party reducer")
      //console.log(action.payload.damage)

      var newArr = [...state.party]
      newArr[action.payload.id] = {
        ...newArr[action.payload.id],
        hp: action.payload.damage
      }

      var newState = {...state, party:newArr}
      //console.log(newState)
      return newState

      case TRAVEL:
      var newCity = action.payload.city;
      var charge = action.payload.charge
      console.log(action.payload.city.map)
      var newState = {...state, city:newCity, day:state.day + action.payload.days, money : state.money - charge}
      return newState

      case STEAL:
        var newCar = action.payload.car
        newState = {...state, stealing: newCar}
        return newState

    default:
      return state
  }
};

export default combineReducers({
  game: gameReducer
});