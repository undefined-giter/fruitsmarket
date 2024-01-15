import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    cart: []
}

export const fruitsCart = createSlice({
    name: 'fruitsCart',
    initialState,
    reducers: {
        addOne: (state, action) => {
            const { payload } = action
            const existingFruit = state.cart.find(fruit => fruit.id === payload.id)

            if (existingFruit) { existingFruit.quantity++ }
            else { state.cart.push({ ...payload, quantity: 1 }) }
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
        }
    }
})

export const { addOne, removeOne, addAmount, removeAmount, reset } = fruitsCart.actions
export default fruitsCart.reducer