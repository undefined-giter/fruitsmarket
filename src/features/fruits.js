import { createSlice } from "@reduxjs/toolkit"
import { nanoid } from "@reduxjs/toolkit"

const initialState = {
    list: [
        {
            name: "Granny Smith Apples",
            url: "/fruits/granny.jpg",
            pricePerUnit: 0.6,
            pricePerKg: 1.8,
            id: nanoid()
        },
        {
            name: "Canada Apples",
            url: "/fruits/canada.jpg",
            pricePerUnit: 0.4,
            pricePerKg: 1.4,
            id: nanoid()
        },
        {
            name: "Reinettes Apples",
            url: "/fruits/reinettes.jpg",
            pricePerUnit: 0.7,
            pricePerKg: 2.3,
            id: nanoid()
        },
        {
            name: "Old-fashioned Tomatoes",
            url: "/fruits/tomates_anciennes.jpg",
            pricePerUnit: 0.9,
            pricePerKg: 2.1,
            id: nanoid()
        },
        {
            name: "Grape Tomatoes",
            url: "/fruits/tomates_grappe.jpg",
            pricePerUnit: 0.2,
            pricePerKg: 1.6,
            id: nanoid()
        }
    ]
}

export const fruits = createSlice({
    name: 'fruits',
    initialState,
})

export default fruits.reducer