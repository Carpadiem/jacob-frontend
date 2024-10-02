import IVehicle from '@models/IVehicle'
import React from 'react'
import axios from 'axios'

const usePlayerVehicles = (user_id: number, player_money: number) => {
    // vars
    const url = `http://localhost:3001/api/vehicles/playerVehicles/${user_id}`
    // states 
    const [playerVehicles, setPlayerVehicles] = React.useState<{
        vehicles: IVehicle[]
        garage_slots_limit: number
    }>({
        vehicles: [],
        garage_slots_limit: 0
    })
    // effects
    React.useEffect(()=>{
        axios.get(url).then((res)=>{
            setPlayerVehicles(res.data)
        })
    }, [player_money])
    // return
    return playerVehicles
}

export default usePlayerVehicles