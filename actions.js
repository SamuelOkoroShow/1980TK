import {SHOOT_PLAYER, SHOOT_PARTY, SKIP_DAY, REDUCE_HEAT, TRAVEL, STEAL, RANDOMIZE_CARS, REMOVE_PARTY_MEMBER, ADD_CAR, ADD_HEAT, ADD_ITEM, ADD_PARTY_MEMBER, HEAL_HP, RECOVER_HP} from './types'

export const shootPlayer = damageIndex => (
    {
      type: SHOOT_PLAYER,
      payload: damageIndex,
    }
  );
  export const shootParty = damageIndex => (
    {
      type: SHOOT_PARTY,
      payload: damageIndex,
    }
  );
  export const skipDay = day => (
    {
      type: SKIP_DAY,
      payload: day,
    });
  export const removePartyMember = partymember => (
    {
      type: REMOVE_PARTY_MEMBER,
      payload: partymember,
    });
  export const addCar = car => (
    {
      type: ADD_CAR,
      payload: car,
    });
  export const addHeat = heat => (
    {
      type: ADD_HEAT,
      payload: heat,
    });
  export const randomizeCars = cars => (
    {
      type: RANDOMIZE_CARS,
      payload: cars,
    });
  export const addItems = item => (
    {
      type: ADD_ITEM,
      payload: item,
    });
  export const healHP = hp => (
    {
      type: HEAL_HP,
      payload: hp,
    });
  export const recoverHP = hp => (
    {
      type: RECOVER_HP,
      payload: hp,
    });

  export const steal = car => ({
    type: STEAL,
    payload: car
  })
    export const addPartyMember = partyMember => (
      {
        type: ADD_PARTY_MEMBER,
        payload: partyMember
      }
    )

    export const reduceHeat = reduceVal => ({
      type: REDUCE_HEAT,
      payload: reduceVal
    }
  );
  export const travel = newLocation => ({
    type: TRAVEL,
    payload: newLocation
  }
);