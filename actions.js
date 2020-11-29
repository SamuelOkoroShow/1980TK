import {SHOOT_PLAYER, SHOOT_PARTY} from './types'

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