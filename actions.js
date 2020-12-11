import {SHOOT_PLAYER, SHOOT_PARTY, SKIP_DAY, REDUCE_HEAT, TRAVEL} from './types'

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