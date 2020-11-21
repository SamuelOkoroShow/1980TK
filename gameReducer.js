import { combineReducers } from 'redux';
import thug2 from './app/images/thug2.png'
import thug1 from './app/images/thug1.png'
import pistol1 from './app/images/pistol1.png'
import assult1 from './app/images/assult1.png'
import smg1 from './app/images/smg1.png'

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
 city: {
  name: "Puerto Sayulita",
  hasStore: true,
  hasMechanic: true,
  hasHospital: true
 },
 player : {
  name: "Ramiro Sanchez",
  img: thug2,
  hand: {
    gun:hk7
  },
  maxHp: 120,
  hp: 50,
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
  img: thug1,
  maxHp: 120,
  hp: 70,
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
  hp: 10,
  shooting: 40,
  running: 45,
  hotwiring: 80,
  driving: 30,
  speaking: 12,

 }]
};

const gameReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state
  }
};

export default combineReducers({
  game: gameReducer
});