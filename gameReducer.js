import { combineReducers } from 'redux';
import thug2 from './app/images/thug2.png'
import thug1 from './app/images/thug1.png'
import pistol1 from './app/images/pistol1.png'
import assult1 from './app/images/assult1.png'
import smg1 from './app/images/smg1.png'
import {RANDOMIZE_CARS, REDUCE_HEAT, SHOOT_PLAYER, TRAVEL} from './types'
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
  money:10000,
  cars: [],
  inventory: [
  hk7
  ],
  heat: 30,
  park: {
    name:'Oaxaca City National',
    cars: []
  },
  city_heat: {
    puerto_vallerta:30,
    oaxaca_city: 20,
    puerto_escondido: 40,
    ciudad_carmen: 30,
    tabasco: 30

  },
 city: locations[0],
 player : {
  name: "Samuel Okoro",
  img: thug2,
  hand: {
    gun:hk7
  },
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
  speed:20,
  ai: true,
  hp: 100,
  shooting: 40,
  running: 45,
  hotwiring: 80,
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
        var defaultHeat = 25;
          var cars = action.payload.cars
          var newState = {...state, park:{
            name: action.payload.name,
            cars: cars
          }}
        
        return newState
      
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

      var newState = {...state, city:action.payload.city, day:state.day + action.payload.days}
      return newState

    default:
      return state
  }
};

export default combineReducers({
  game: gameReducer
});