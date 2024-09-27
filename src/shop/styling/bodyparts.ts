//models
import IShopBodypart from "@models/IShopBodypart"

const shop_bodyparts: IShopBodypart[] = [
    // Mazda RX-7
    // bumpers_front
    { id: 1, type: 'bumper_front', for_vehicle: 'mazda rx-7', present_name: 'Stock', price: 1000, },
    { id: 2, type: 'bumper_front', for_vehicle: 'mazda rx-7', present_name: 'Beta', price: 2500, },
    { id: 3, type: 'bumper_front', for_vehicle: 'mazda rx-7', present_name: 'Gamma', price: 2500, },
    { id: 4, type: 'bumper_front', for_vehicle: 'mazda rx-7', present_name: 'Delta', price: 2500, },
    { id: 5, type: 'bumper_front', for_vehicle: 'mazda rx-7', present_name: 'Epsilon', price: 2500, },
    { id: 6, type: 'bumper_front', for_vehicle: 'mazda rx-7', present_name: 'Zeta', price: 2500, },
    { id: 7, type: 'bumper_front', for_vehicle: 'mazda rx-7', present_name: 'Eta', price: 2500, },
    { id: 8, type: 'bumper_front', for_vehicle: 'mazda rx-7', present_name: 'Theta', price: 2500, },
    // bumpers_rear
    { id: 1, type: 'bumper_rear', for_vehicle: 'mazda rx-7', present_name: 'Stock', price: 1000, },
    { id: 2, type: 'bumper_rear', for_vehicle: 'mazda rx-7', present_name: 'Beta', price: 2200, },
    { id: 3, type: 'bumper_rear', for_vehicle: 'mazda rx-7', present_name: 'Gamma', price: 2200, },
    { id: 4, type: 'bumper_rear', for_vehicle: 'mazda rx-7', present_name: 'Delta', price: 2200, },
    { id: 5, type: 'bumper_rear', for_vehicle: 'mazda rx-7', present_name: 'Epsilon', price: 2200, },
    { id: 6, type: 'bumper_rear', for_vehicle: 'mazda rx-7', present_name: 'Zeta', price: 2200, },
    { id: 7, type: 'bumper_rear', for_vehicle: 'mazda rx-7', present_name: 'Eta', price: 2200, },
    { id: 8, type: 'bumper_rear', for_vehicle: 'mazda rx-7', present_name: 'Theta', price: 2200, },
    // skirts
    { id: 1, type: 'skirts', for_vehicle: 'mazda rx-7', present_name: 'Stock', price: 1500, },
    { id: 2, type: 'skirts', for_vehicle: 'mazda rx-7', present_name: 'Beta', price: 2350, },
    { id: 3, type: 'skirts', for_vehicle: 'mazda rx-7', present_name: 'Gamma', price: 2350, },
    { id: 4, type: 'skirts', for_vehicle: 'mazda rx-7', present_name: 'Delta', price: 2350, },
    { id: 5, type: 'skirts', for_vehicle: 'mazda rx-7', present_name: 'Epsilom', price: 2350, },
    { id: 6, type: 'skirts', for_vehicle: 'mazda rx-7', present_name: 'Zeta', price: 2350, },
    { id: 7, type: 'skirts', for_vehicle: 'mazda rx-7', present_name: 'Eta', price: 2350, },
    // spoilers
    { id: 1, type: 'spoiler', for_vehicle: 'mazda rx-7', present_name: 'Stock', price: 1500, },
    { id: 2, type: 'spoiler', for_vehicle: 'mazda rx-7', present_name: 'Beta', price: 3400, },
    { id: 3, type: 'spoiler', for_vehicle: 'mazda rx-7', present_name: 'Gamma', price: 3400, },
    { id: 4, type: 'spoiler', for_vehicle: 'mazda rx-7', present_name: 'Delta', price: 3400, },
    { id: 5, type: 'spoiler', for_vehicle: 'mazda rx-7', present_name: 'Epsilom', price: 3400, },
    { id: 6, type: 'spoiler', for_vehicle: 'mazda rx-7', present_name: 'Zeta', price: 3400, },
    { id: 7, type: 'spoiler', for_vehicle: 'mazda rx-7', present_name: 'Eta', price: 3400, },
    { id: 8, type: 'spoiler', for_vehicle: 'mazda rx-7', present_name: 'Theta', price: 3400, },
    // bonnets
    { id: 1, type: 'bonnet', for_vehicle: 'mazda rx-7', present_name: 'Stock', price: 1500, },
    { id: 2, type: 'bonnet', for_vehicle: 'mazda rx-7', present_name: 'Beta', price: 3400, },
    { id: 3, type: 'bonnet', for_vehicle: 'mazda rx-7', present_name: 'Gamma', price: 3400, },
    { id: 4, type: 'bonnet', for_vehicle: 'mazda rx-7', present_name: 'Delta', price: 3400, },
    { id: 5, type: 'bonnet', for_vehicle: 'mazda rx-7', present_name: 'Epsilom', price: 3400, },
    { id: 6, type: 'bonnet', for_vehicle: 'mazda rx-7', present_name: 'Zeta', price: 3400, },
    { id: 7, type: 'bonnet', for_vehicle: 'mazda rx-7', present_name: 'Eta', price: 3400, },
    // mirrors
    { id: 1, type: 'mirrors', for_vehicle: 'mazda rx-7', present_name: 'Stock', price: 1500, },
    // head lights
    { id: 1, type: 'head_lights', for_vehicle: 'mazda rx-7', present_name: 'Stock', price: 1500, },
    { id: 2, type: 'head_lights', for_vehicle: 'mazda rx-7', present_name: 'Beta', price: 3400, },
    { id: 3, type: 'head_lights', for_vehicle: 'mazda rx-7', present_name: 'Gamma', price: 3400, },
    // tail lights
    { id: 1, type: 'tail_lights', for_vehicle: 'mazda rx-7', present_name: 'Stock', price: 1500, },
    { id: 2, type: 'tail_lights', for_vehicle: 'mazda rx-7', present_name: 'Beta', price: 3400, },
    { id: 3, type: 'tail_lights', for_vehicle: 'mazda rx-7', present_name: 'Gamma', price: 3400, },
    { id: 4, type: 'tail_lights', for_vehicle: 'mazda rx-7', present_name: 'Delta', price: 3400, },
    { id: 5, type: 'tail_lights', for_vehicle: 'mazda rx-7', present_name: 'Epsilom', price: 3400, },
    { id: 6, type: 'tail_lights', for_vehicle: 'mazda rx-7', present_name: 'Zeta', price: 3400, },
    // wings front
    { id: 1, type: 'wings_front', for_vehicle: 'mazda rx-7', present_name: 'Stock', price: 1500, },
    { id: 2, type: 'wings_front', for_vehicle: 'mazda rx-7', present_name: 'Beta', price: 3400, },
    { id: 3, type: 'wings_front', for_vehicle: 'mazda rx-7', present_name: 'Gamma', price: 3400, },
    // wings rear
    { id: 1, type: 'wings_rear', for_vehicle: 'mazda rx-7', present_name: 'Stock', price: 1500, },
    { id: 2, type: 'wings_rear', for_vehicle: 'mazda rx-7', present_name: 'Beta', price: 3400, },
    { id: 3, type: 'wings_rear', for_vehicle: 'mazda rx-7', present_name: 'Gamma', price: 3400, },
    // exhausts
    { id: 1, type: 'exhaust', for_vehicle: 'mazda rx-7', present_name: 'Stock', price: 1500, },
]

export default shop_bodyparts