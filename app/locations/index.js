import puerto_vallarta from './puerto_vallarta'
import oaxaca_city from './oaxaca_city'
import puerto_escondido from './puerto_escondido'
import ciudad_carmen from './puerto_vallarta'
import tabasco from './puerto_vallarta'

const Locations = [
    {
        name: "Puerto Vallarta",
        map: puerto_vallarta,
        distance:{
            car:{
            oaxaca: 2,
            escondido:2,
            carmen: 2,
            tabasco: 2
            }
        }
    },{
        name: "Oaxaca City",
        map: oaxaca_city
    },{
        name: "Puerto Escondido",
        map: puerto_escondido
    },{
        name:'Ciudad Carmen',
        map: ciudad_carmen
    },{
        name: "Tabasco",
        map: tabasco
    }
]

export default Locations;