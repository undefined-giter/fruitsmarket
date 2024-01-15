import { useSelector, useDispatch } from 'react-redux'
import SearchBar from './searchBar';
import FruityCart from './FruityCart'
import { addOne, removeOne, addAmount, removeAmount, reset } from "../features/fruitsCart"
import { useState } from 'react'


export default function Fruity() {

    const fruitsList = useSelector(state => state.fruits)
    const dispatch = useDispatch()
    const [amount, setAmount] = useState({})
    const [searchFruit, setSearchFruit] = useState('')

    const handleInputChange = (fruitId, value) => {
        const inputValue = parseInt(value, 10);
        if (!isNaN(inputValue) && inputValue >= 0 && inputValue <= 250) {
            setAmount(prevAmounts => ({ ...prevAmounts, [fruitId]: inputValue }));
        } else if (value === '' || value === '0') {
            setAmount(prevAmounts => ({ ...prevAmounts, [fruitId]: 0 }));
        }
    }

    const handleSearchFruit = (e) => {
        setSearchFruit(e.target.value)
    }

    const filteredFruits = fruitsList.list.filter((fruit) =>
        fruit.name.toLowerCase().includes(searchFruit.toLowerCase())
    );



    return (
        <>
            <h1 className="text-4xl text-slate-100 font-bold text-center mb-1">Fruits & Vegetables</h1>
            <SearchBar searchFruit={searchFruit} onSearchFruit={handleSearchFruit} />
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-7 4xl:grid-cols-8 gap-2">
                {filteredFruits.length == 0 && <div className='bg-orange-600 text-center text-xl text-bold'><p>No fruit found with this name.<br /><small>Try to <span onClick={() => setSearchFruit('')} className='font-bold'>reset</span> you research.</small></p></div>}
                {filteredFruits.map((fruit) => (
                    <li key={fruit.id} className='bg-slate-100 p-4 rounded mb-4' style={{ minWidth: '300px' }}>
                        <img src={fruit.url} className='w-full h-[250px] object-cover mb-1' alt={fruit.name} />

                        <div className='flex justify-between mb-4 items-baseline'>
                            <p className='text-2xl mb-2 font-semibold overflow-hidden' style={{ whiteSpace: 'nowrap', overflow: 'auto', maxWidth: '100%' }}>{fruit.name}</p>

                            <p className='text-lg font-semibold ml-2'>{fruit.pricePerUnit}€/unit</p>
                        </div>
                        <div className=''>
                            <div className='flex px-2'>
                                <button
                                    className='w-full w-70 mr-4 bg-green-600 hover:bg-green-500 text-slate-100 p-1 rounded text-lg'
                                    onClick={() => dispatch(addOne({ name: fruit.name, id: fruit.id, pricePerUnit: fruit.pricePerUnit, pricePerKg: fruit.pricePerKg }))}
                                >Add one</button>
                                <button
                                    className='w-20 bg-red-600 hover:bg-red-500 text-slate-100 p-1 rounded text-lg m-auto'
                                    onClick={() => dispatch(removeOne({ name: fruit.name, id: fruit.id, pricePerUnit: fruit.pricePerUnit, pricePerKg: fruit.pricePerKg }))}
                                >Remove one</button>
                            </div>
                            <div className='flex py-3 leading-3'>
                                <input
                                    type="number"
                                    pattern="[0-9]"
                                    value={amount[fruit.id] || ''}
                                    onChange={(e) => handleInputChange(fruit.id, e.target.value)}
                                    className='w-16 text-slate-100 p-1 rounded text-2xl ml-2'
                                    max='250'
                                />
                                <button
                                    className='min-w-16 bg-green-600 hover:bg-green-500 text-slate-100 p-1 min-m-1 rounded text-lg ml-2'
                                    onClick={() => dispatch(addAmount({ name: fruit.name, id: fruit.id, pricePerUnit: fruit.pricePerUnit, amount: amount, pricePerKg: fruit.pricePerKg }))}
                                >+ {amount[fruit.id] || 0}</button>
                                <button
                                    className='min-w-16 bg-red-600 hover:bg-red-500 text-slate-100 p-1 rounded text-lg ml-2'
                                    onClick={() => dispatch(removeAmount({ name: fruit.name, id: fruit.id, pricePerUnit: fruit.pricePerUnit, amount: amount, pricePerKg: fruit.pricePerKg }))}
                                >- {amount[fruit.id] || 0}</button>
                                <button
                                    className='h-10 w-15 bg-cyan-600 hover:bg-cyan-500 text-slate-100 p-1 rounded text-lg ml-auto mr-2'
                                    onClick={() => dispatch(reset({ name: fruit.name, id: fruit.id, pricePerUnit: fruit.pricePerUnit, pricePerKg: fruit.pricePerKg }))}
                                >Reset</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul >
            <FruityCart />
        </>
    )
}
