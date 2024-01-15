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
            <div className='w-full sm:px-2 md:w-3/5 mx-auto'>
                <ul>
                    {fruitsCart.cart.map((fruitsKind, index) => {
                        const priceNotRounded = fruitsKind.quantity * fruitsKind.pricePerUnit;
                        const pricePerKind = parseFloat(priceNotRounded.toFixed(1));
                        totalPrice += pricePerKind;

                        return (
                            <li key={index} className="flex space-x-6">
                                <h6 className="flex-grow">{fruitsKind.name}</h6>
                                <p className="w-1/6">{fruitsKind.quantity} {fruitsKind.quantity === 1 ? 'unit' : 'units'}</p>
                                <p className="w-1/6">{fruitsKind.pricePerUnit}€ / unit</p>
                                <p className="w-1/6 text-right">{pricePerKind}€</p>
                            </li>
                        )
                    })}
                </ul>
                {totalPrice !== 0 ?
                    <>
                        <p className="text-xl py-3 border-t border-slate-400 text-right">Total price : <strong>{parseFloat(totalPrice.toFixed(1))}€</strong></p>
                        <ModalButton />
                    </> :
                    <p className="text-xl py-3 text-center">Pick Your Fruits</p>
                }
            </div>
        </div>
    )
}
