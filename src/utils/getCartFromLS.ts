import { TCartItem } from "../redux/slices/cart/types";
import { calcTotalPrice } from "./calcTotalPrice"

export const getCartFromLS = () => {
    const data = localStorage.getItem('cartItems')
    const items: TCartItem[] = data ? JSON.parse(data) : []
    const totalPrice: number = calcTotalPrice(items);
        return {
            items: items as TCartItem[],
            totalPrice
        }
}