import { combineReducers } from 'redux';
import thug2 from './app/images/thug2.png'
import thug1 from './app/images/thug1.png'

const INITIAL_STATE = {
  day: 58,
  money:10000,
  cars: [],
 city: {
  name: "Puerto Sayulita",
  hasStore: true,
  hasMechanic: true,
  hasHospital: true
 },
 player : {
  name: "Ramiro Sanchez",
  img: thug2,
  
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
  hp: 40,
  shooting: 40,
  running: 45,
  hotwiring: 80,
  driving: 30,
  speaking: 100,

 },{
  name: "Devon Guztavo",
  img: thug1,
  maxHp: 120,
  job: 'Driver',
  hp: 40,
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