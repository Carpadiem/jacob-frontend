import IVehicle from '@models/IVehicle'
import React from 'react'
import axios from 'axios'

const usePlayerVehicles = (user_id: number) => {
    // vars
    const url = `http://localhost:3001/api/vehicles/playerVehicles/${user_id}`
    // states 
    const [playerVehicles, setPlayerVehicles] = React.useState<IVehicle[]>([])
    // effects
    React.useEffect(()=>{
        axios.get(url).then((res)=>{
            setPlayerVehicles(res.data)
        })
    }, [])
    // return
    return playerVehicles
}

export default usePlayerVehicles