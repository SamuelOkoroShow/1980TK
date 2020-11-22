import police_man from '../images/police_man3.png'
import police_man2 from '../images/police_man2.png'
import police_man3 from '../images/police_man3.png'
import police_avatar1 from '../images/police_avatar1.png'
import police_avatar2 from '../images/police_avatar2.png'
import guns from '../items/guns'


const police = [{
    name:'Police Man',
    maxHp:100,
    image: police_man,
    avatar: police_avatar1,
    speed: 30,
    item : {
        gun: guns[0]
    }},
    {
    name:'Police Enforcer',
    maxHp:100,
    image: police_man2,
    avatar: police_avatar2,
    speed:30,
    item : {
        gun: guns[0]
    }}
]

export default police;