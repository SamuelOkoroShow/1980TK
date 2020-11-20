import pistol1 from '../images/pistol1.png'
import assult1 from '../images/assult1.png'
import smg1 from '../images/smg1.png'
const HAND = 'hand'

const pistol_Avatar = {
    name: "HK 7 Pistol",
    price : 500,
    img: pistol1,
    damage: 20,
    accuracy: 60,
    use:HAND,
    shootingLvl: 20
  } 
  const smg_Avatar = {
    name: "HK 7 MP5",
    price : 600,
    img: smg1,
    damage: 35,
    accuracy:45,
    use:HAND,
    shootingLvl: 35
  } 
  const assult_Avatar = {
    name: "AK 47",
    price : 400,
    img: assult1,
    damage: 45,
    accuracy: 55,
    use: HAND,
    shootingLvl: 40
  } 

  export default guns = [pistol_Avatar, smg_Avatar, assult_Avatar]