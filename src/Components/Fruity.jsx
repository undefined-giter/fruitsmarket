import { useSelector, useDispatch } from 'react-redux'
import SearchBar from './searchBar';
import FruityCart from './FruityCart'
import { addOne, removeOne, addAmount, removeAmount, reset } from "../features/fruitsCart"
import { useState, useEffect } from 'react'


export default function Fruity() {

    const fruitsList = useSelector(state => state.fruits)
    const dispatch = useDispatch()
    const [amount, setAmount] = useState({})
    const [searchFruit, setSearchFruit] = useState('')
    const [byWeight, setByWeight] = useState({})

    useEffect(() => {
        const initialByWeight = fruitsList.list.reduce((acc, fruit) => {
            acc[fruit.id] = true
            return acc;
        }, {});
        setByWeight(initialByWeight);
    }, [fruitsList.list]);

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

    const resetInput = (fruitId) => {
        setAmount((prevState) => ({ ...prevState, [fruitId]: 0 }))
    }


    const addOneFruitOrKg = (fruit, byWeight) => {
        dispatch(addOne({ name: fruit.name, id: fruit.id, pricePerUnit: fruit.pricePerUnit, pricePerKg: fruit.pricePerKg, byWeight: byWeight }))
    }

    const removeOneFruitOrKg = (fruit, byWeight) => {
        dispatch(removeOne({ name: fruit.name, id: fruit.id, pricePerUnit: fruit.pricePerUnit, pricePerKg: fruit.pricePerKg, byWeight: byWeight }))
    }


    return (
        <div className="bg-cyan-200 text-slate-900 dark:bg-[#D1E0EB] dark:text-green-900">
            <h1 className="text-4xl text-green-900 dark:text-cyan-200 dark:bg-[#D1E0EB] font-bold text-center mb-1">Fruits & Vegetables</h1>
            <div className="md:absolute md:right-1 md:top-0 mt-2 mr-1 flex justify-end">
                <SearchBar searchFruit={searchFruit} onSearchFruit={handleSearchFruit} />
            </div>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-7 4xl:grid-cols-8 gap-2">
                {filteredFruits.length == 0 && <div className='bg-orange-700 text-center text-xl text-bold'><p>No fruit found with this name.<br /><small>Try to <span onClick={() => setSearchFruit('')} className='font-bold'>reset</span> you research.</small></p></div>}
                {filteredFruits.map((fruit) => (
                    <li key={fruit.id} className='bg-cyan-400 p-4 rounded m-2' style={{ minWidth: '300px' }}>
                        <img src={fruit.url} className='w-full h-[250px] object-cover mb-1 rounded-xl' alt={fruit.name} />

                        <div className='flex justify-between items-baseline'>
                            <p className='text-2xl ml-1 font-semibold overflow-hidden' style={{ whiteSpace: 'nowrap', overflow: 'auto', maxWidth: '68%' }}>{fruit.name}</p>

                            <p className='text-lg mb-6 font-semibold mr-1'>{byWeight[fruit.id] ? fruit.pricePerKg : fruit.pricePerUnit}€/
                                <button
                                    onClick={() => setByWeight((prevByWeight) => ({ ...prevByWeight, [fruit.id]: !prevByWeight[fruit.id] }))}>
                                    <p className={`${byWeight[fruit.id] ? 'text-[#7D1C02]' : 'text-red-600'}`}>
                                        {byWeight[fruit.id] ? 'Kg' : 'unit'}
                                    </p>
                                </button>
                            </p>
                        </div>
                        <div className=''>
                            <div className='flex px-2'>
                                <button
                                    className='w-full w-70 mr-4 bg-green-600 hover:bg-green-500 text-slate-100 p-1 rounded text-lg'
                                    onClick={() => addOneFruitOrKg(fruit, byWeight[fruit.id])}
                                >Add one {byWeight[fruit.id] ? 'Kg' : fruit.name.slice(0, -1)}</button>
                                <button
                                    className='w-20 bg-red-600 hover:bg-red-500 text-slate-100 p-1 rounded text-lg m-auto'
                                    onClick={() => dispatch(removeOneFruitOrKg(fruit, byWeight[fruit.id]))}
                                >Remove one {byWeight[fruit.id] && 'Kg'}</button>
                            </div>
                            <div className='flex pt-2 leading-3'>
                                <input
                                    type="number"
                                    pattern="[0-9]"
                                    value={amount[fruit.id] || ''}
                                    onChange={(e) => handleInputChange(fruit.id, e.target.value)}
                                    className='w-16 text-slate-900 p-1 rounded text-2xl ml-2 bg-cyan-200'
                                    max='250'
                                    id={`amountInput-${fruit.id}`}
                                />
                                <button
                                    className='min-w-16 bg-green-600 hover:bg-green-500 text-slate-100 p-1 min-m-1 rounded text-lg ml-2'
                                    onClick={() => dispatch(addAmount({ name: fruit.name, id: fruit.id, pricePerUnit: fruit.pricePerUnit, amount: amount, pricePerKg: fruit.pricePerKg, byWeight: byWeight[fruit.id] }))}
                                    id='addAmount'
                                >+ {amount[fruit.id] || 0}</button>
                                <button
                                    className='min-w-16 bg-red-600 hover:bg-red-500 text-slate-100 p-1 rounded text-lg ml-1.5'
                                    onClick={() => dispatch(removeAmount({ name: fruit.name, id: fruit.id, pricePerUnit: fruit.pricePerUnit, amount: amount, pricePerKg: fruit.pricePerKg, byWeight: byWeight[fruit.id] }))}
                                >- {amount[fruit.id] || 0}</button>
                                <button
                                    className='h-10 w-15 bg-cyan-700 hover:bg-cyan-600 text-slate-100 p-1 rounded text-lg ml-auto mr-2'
                                    onClick={() => { dispatch(reset({ name: fruit.name, id: fruit.id, pricePerUnit: fruit.pricePerUnit, pricePerKg: fruit.pricePerKg })); resetInput(fruit.id) }}
                                >Reset</button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul >
            <FruityCart addOneFruitOrKg={addOneFruitOrKg} removeOneFruitOrKg={removeOneFruitOrKg} />
        </div>
    )
}
