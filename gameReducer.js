import { combineReducers } from 'redux';

const INITIAL_STATE = {
  day: 98,
 city: {
  name: "Outlands",
  hasStore: true,
  hasMechanic: true,
  hasHospital: true
 }
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