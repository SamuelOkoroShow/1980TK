import civilian1 from '../images/civilian1.jpg'
import civilian2 from '../images/civilian2.jpg'
import civilian3 from '../images/civilian3.jpg'
import civilian4 from '../images/civilian4.jpg'
import names from './name'


const getRandomArbitrary = (min, max) => {
    // excludes the max
    return Math.floor(Math.random() * (max - min)) + min;
}


const civilians = [{
    name:names[getRandomArbitrary(0,101)].first_name,
    maxHp:60,
    image: civilian1,
    shooting:10,
    speed: 20,
    ai: true,
    item : {
    }},
    {
    name:names[getRandomArbitrary(0,101)].first_name,
    maxHp:80,
    image: civilian2,
    shooting:20,
    ai : true,
    speed:30,
    item : {
    }},
    {
    name:names[getRandomArbitrary(0,101)].first_name,
    maxHp:100,
    image: civilian3,
    shooting:30,
    ai : true,
    speed:30,
    item : {
        
    }},{
        name:names[getRandomArbitrary(0,101)].first_name,
        maxHp:100,
        image: civilian4,
        shooting:40,
        ai : true,
        speed:40,
        item : {
            
        }}
]

export default civilians;