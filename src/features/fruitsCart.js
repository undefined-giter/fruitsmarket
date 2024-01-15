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
            const byWeight = payload.byWeight
            const existingFruitIndex = state.cart.findIndex(fruit => fruit.id === payload.id)

            if (existingFruitIndex !== -1) {
                if (byWeight) { state.cart[existingFruitIndex].weight += 1 }
                else { state.cart[existingFruitIndex].quantity += 1 }
            } else {
                if (byWeight) { state.cart.push({ ...payload, weight: 1, quantity: 0 }) }
                else { state.cart.push({ ...payload, quantity: 1, weight: 0 }) }
            }
        },
        removeOne: (state, action) => {
            const { payload } = action
            const byWeight = payload.byWeight
            const existingFruitIndex = state.cart.findIndex(fruit => fruit.id === payload.id);

            if (existingFruitIndex !== -1) {
                if (byWeight & state.cart[existingFruitIndex].weight > 1) { state.cart[existingFruitIndex].weight -= 1 }
                else if (!byWeight & state.cart[existingFruitIndex].quantity > 1) { state.cart[existingFruitIndex].quantity -= 1 }
                else if ((byWeight & state.cart[existingFruitIndex].weight === 1 & state.cart[existingFruitIndex].quantity <= 0) || (!byWeight & state.cart[existingFruitIndex].quantity === 1 & state.cart[existingFruitIndex].weight <= 0)) { state.cart = state.cart.filter(fruitK => fruitK.id !== payload.id) }
                else if (byWeight & state.cart[existingFruitIndex].weight === 1) { state.cart[existingFruitIndex].weight = 0 }
                else if (!byWeight & state.cart[existingFruitIndex].quantity >= 1) { state.cart[existingFruitIndex].quantity -= 1 }
            }
        },
        addAmount: (state, action) => {
            const { payload } = action
            const byWeight = payload.byWeight
            const inputAmount = payload.amount[payload.id]
            const existingFruitIndex = state.cart.findIndex(fruit => fruit.id === payload.id);

            if (isNaN(inputAmount)) { return; }
            if (existingFruitIndex !== -1) {
                if (byWeight) { state.cart[existingFruitIndex].weight += inputAmount }
                else { state.cart[existingFruitIndex].quantity += inputAmount }
            } else {
                if (byWeight) { state.cart.push({ ...payload, weight: inputAmount, quantity: 0 }) }
                else { state.cart.push({ ...payload, quantity: inputAmount, weight: 0 }) }
            }
        },
        removeAmount: (state, action) => {
            const { payload } = action
            const byWeight = payload.byWeight
            const inputAmount = payload.amount[payload.id]
            const existingFruitIndex = state.cart.findIndex(fruit => fruit.id === payload.id);

            if (existingFruitIndex !== -1) {
                if (byWeight & state.cart[existingFruitIndex].weight > inputAmount) { state.cart[existingFruitIndex].weight -= inputAmount }
                else if (!byWeight & state.cart[existingFruitIndex].quantity > inputAmount) { state.cart[existingFruitIndex].quantity -= inputAmount }
                else if ((byWeight & state.cart[existingFruitIndex].weight <= inputAmount & state.cart[existingFruitIndex].quantity <= 0) || (!byWeight & state.cart[existingFruitIndex].quantity <= inputAmount & state.cart[existingFruitIndex].weight <= 0)) { state.cart = state.cart.filter(fruitK => fruitK.id !== payload.id) }
                else if (byWeight & state.cart[existingFruitIndex].weight <= inputAmount) { state.cart[existingFruitIndex].weight = 0 }
                else if (!byWeight & state.cart[existingFruitIndex].quantity <= inputAmount) { state.cart[existingFruitIndex].quantity = 0 }
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