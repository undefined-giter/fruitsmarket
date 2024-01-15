import { useSelector } from 'react-redux'
import ModalButton from './ModalButton'


export default function FruityCart() {

    const fruitsCart = useSelector(state => state.fruitsCart)
    let totalPrice = 0

    return (
        <div className="bg-slate-100 rounded">
            {fruitsCart.cart.length > 0 &&
                <h3 className="text-2xl p-5 border-b border-slate-400 text-center">Your Cart</h3>
            }
            <div className='w-full px-2 md:w-3/5 mx-auto'>
                <ul>
                    {fruitsCart.cart.map((fruitsKind, index) => {

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
                        console.log(fruitsKind.weight);
                        console.log(fruitsKind.quantity);
                        return (
                            <ul key={index}>
                                {fruitsKind.weight > 0 &&
                                    <li className="flex space-x-6">
                                        <h6 className="flex-grow">{fruitsKind.name}</h6>
                                        <p className="w-1/6">{fruitsKind.weight} {fruitsKind.weight === 1 ? 'Kg' : 'Kgs'}</p>
                                        <p className="w-1/6">{fruitsKind.pricePerKg}€ / Kg</p>
                                        <p className="w-1/6 text-right">{priceByWeight}€</p>
                                    </li>
                                }
                                {fruitsKind.quantity > 0 &&
                                    <li className="flex space-x-6">
                                        <h6 className="flex-grow">{fruitsKind.name}</h6>
                                        <p className="w-1/6">{fruitsKind.quantity} {fruitsKind.quantity === 1 ? 'unit' : 'units'}</p>
                                        <p className="w-1/6">{fruitsKind.pricePerUnit}€ / unit</p>
                                        <p className="w-1/6 text-right">{priceByUnit}€</p>
                                    </li>
                                }
                            </ul>
                        )
                    })}
                </ul>
                {totalPrice !== 0 ?
                    <>
                        <p className="text-xl py-3 border-t border-slate-400 text-right">Total price : <strong>{totalPrice.toFixed(1).replace(/\./g, ',')}€</strong></p>
                        <ModalButton />
                    </> :
                    <p className="text-xl py-3 text-center">Pick Your Fruits</p>
                }
            </div>
        </div>
    )
}
