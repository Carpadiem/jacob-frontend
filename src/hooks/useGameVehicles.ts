import IVehicle from '@models/IVehicle'
import React from 'react'
import axios from 'axios'

const useGameVehicles = () => {
    // vars
    const url = 'http://localhost:3001/api/vehicles/gameVehicles'
    // states 
    const [gameVehicles, setGameVehicles] = React.useState<IVehicle[]>([])
    // effects
    React.useEffect(()=>{
        axios.get<IVehicle[]>(url).then((res)=>{
            setGameVehicles(res.data)
        })
    }, [])
    // return
    return gameVehicles
}

export default useGameVehicles