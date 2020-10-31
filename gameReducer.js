import { combineReducers } from 'redux';

const INITIAL_STATE = {
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
  friends: friendsReducer
});