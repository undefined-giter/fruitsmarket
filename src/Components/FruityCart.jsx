import { useSelector } from 'react-redux'
import ResetButton from './ResetButton'


export default function FruityCart({ addOneFruitOrKg, removeOneFruitOrKg }) {

    const fruitsCart = useSelector(state => state.fruitsCart)
    let totalPrice = 0

    return (
        <div className="cursor-default bg-cyan-200 text-green-900 dark:bg-[#115e59] dark:text-green-900 pb-4">
            {fruitsCart.cart.length > 0 &&
                <>
                    <hr style={{ border: '2px solid green' }} />
                    <h3 className="text-2xl p-5 border-green-900 text-green-900 text-center underline underline-offset-2 font-bold ">Your Cart :</h3>
                </>
            }
            <div className='bg-cyan-300 dark:bg-cyan-800 dark:text-green-300 mx-auto border-2 w-[502px] border-black pt-1 px-4'>
                <ul>
                    {fruitsCart.cart.map((fruitsKind, index, array) => {

                        let priceByUnit = 0
                        if (fruitsKind.quantity > 0) {
                            let priceNotRounded = fruitsKind.quantity * fruitsKind.pricePerUnit;
                            priceByUnit = parseFloat(priceNotRounded.toFixed(1));
                            if (isNaN(priceByUnit)) { priceByUnit = 0 }

                            totalPrice += priceByUnit
                        }

                        let priceByWeight = 0
                        if (fruitsKind.weight > 0) {
                            let priceNotRoundedWeight = fruitsKind.weight * fruitsKind.pricePerKg;
                            priceByWeight = parseFloat(priceNotRoundedWeight.toFixed(1));
                            if (isNaN(priceByWeight)) { priceByWeight = 0 }
                            totalPrice += priceByWeight
                        }

                        return (
                            <ul key={index} className={index % 3 === 2 && index !== array.length - 1 ? "border-b" : ""}>
                                {fruitsKind.weight > 0 &&
                                    <li className="flex my-1">
                                        <p className="w-[250px] overflow-x-auto whitespace-nowrap">{fruitsKind.name}</p>
                                        <p className="w-[80px]">{fruitsKind.weight} {fruitsKind.weight === 1 ? 'Kg' : 'Kgs'}</p>
                                        <p className="w-[80px]">{fruitsKind.pricePerKg}€/Kg</p>
                                        <p className="text-right w-[80px]">{priceByWeight}€</p>
                                        <div className="w-[80px] text-right">
                                            <button onClick={() => removeOneFruitOrKg(fruitsKind, true)} className='bg-red-600 rounded px-2 mx-2'>-</button>
                                            <button onClick={() => addOneFruitOrKg(fruitsKind, true)} className='bg-green-600 rounded px-2'>+</button>
                                        </div>
                                    </li>
                                }
                                {fruitsKind.quantity > 0 &&
                                    <li className="flex my-1">
                                        <p className="w-[250px] overflow-x-auto whitespace-nowrap">{fruitsKind.name}</p>
                                        <p className="w-[80px]">{fruitsKind.quantity} {fruitsKind.quantity === 1 ? 'unit' : 'units'}</p>
                                        <p className="w-[80px]">{fruitsKind.pricePerUnit}€/unit</p>
                                        <p className="text-right w-[80px]">{priceByUnit}€</p>
                                        <div className="w-[80px] text-right">
                                            <button onClick={() => removeOneFruitOrKg(fruitsKind, false)} className='bg-red-600 rounded px-2 mx-2'>-</button>
                                            <button onClick={() => addOneFruitOrKg(fruitsKind, false)} className='bg-green-600 rounded px-2'>+</button>
                                        </div>
                                    </li>
                                }
                            </ul>

                        )
                    })}
                </ul>
                {totalPrice !== 0 ?
                    <>
                        <hr style={{ border: '1px dotted green', marginTop: '2px' }} />
                        <div className="flex items-center justify-between">
                            <ResetButton />
                            <p className="text-xl py-3 text-right">
                                Total price : <strong>{totalPrice.toFixed(1).replace(/\./g, ',')}€</strong>
                            </p>
                        </div>
                    </>
                    :
                    <p className="text-xl pb-1 text-center dark:text-green-300">Pick Your Fruits</p>
                }
            </div>
        </div>
    )
}
