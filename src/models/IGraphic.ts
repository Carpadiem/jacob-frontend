export default interface IGraphic {
    id: number
    type: string // 'paint_color' | 'paint_coating'
    data: string // hex code `#123123` OR `mate` | `glossy` | ...
    name: string
    price: number
}