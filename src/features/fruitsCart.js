import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cart: []
}

export const fruitsCart = createSlice({
    name: 'fruitsCart',
    initialState,
    reducers: {
        addOne: (state, action) => {
            const { payload } = action;
            const byWeight = payload.byWeight;
            const existingFruitIndex = state.cart.findIndex(fruit => fruit.id === payload.id);

            if (existingFruitIndex !== -1) {
                if (byWeight) { state.cart[existingFruitIndex].weight += 1 }
                else { state.cart[existingFruitIndex].quantity += 1 }
            } else {
                if (byWeight) { state.cart.push({ ...payload, weight: 1, quantity: 0 }) }
                else { state.cart.push({ ...payload, quantity: 1, weight: 0 }) }
            }
        },
        removeOne: (state, action) => {
            const { payload } = action;
            const fruitKind = state.cart.find(fruit => fruit.name === payload.name);

            if (fruitKind) {
                if (fruitKind.quantity === 1) {
                    state.cart = state.cart.filter(fruitK => fruitK.id !== payload.id)
                }
                else if (fruitKind.quantity > 1) {
                    fruitKind.quantity--;
                }
            }
        },
        addAmount: (state, action) => {
            const { payload } = action
            const inputAmount = payload.amount[payload.id]
            const fruitKind = state.cart.find(fruit => fruit.id === payload.id)
            if (isNaN(inputAmount)) { return; }
            if (fruitKind) { fruitKind.quantity += inputAmount }
            else { state.cart.push({ ...payload, quantity: inputAmount }) }
        },
        removeAmount: (state, action) => {
            const { payload } = action
            const inputAmount = payload.amount[payload.id]
            const fruitKind = state.cart.find(fruit => fruit.name === payload.name);
            if (!inputAmount) { return; }
            if (fruitKind) {
                if (fruitKind.quantity > inputAmount) {
                    fruitKind.quantity -= inputAmount;
                }
                else {
                    state.cart = state.cart.filter(fruitK => fruitK.id !== payload.id)
                }
            }
        },
        reset: (state, action) => {
            state.cart = state.cart.filter(fruitK => fruitK.id !== action.payload.id)
        },
        resetCart: (state) => {
            return { ...state, cart: [] }
        }
    }
})

export const { addOne, removeOne, addAmount, removeAmount, reset, resetCart } = fruitsCart.actions
export default fruitsCart.reducer