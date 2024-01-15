import { useDispatch } from 'react-redux'
import { resetCart } from "../features/fruitsCart"



export default function ResetModal({ setShowConfirmationModal, showConfirmationModal }) {

    const dispach = useDispatch()

    return (
        <div className='fixed inset-0 bg-slate-800/80 flex items-center justify-center'>
            <div className='bg-slate-300 text-slate-900 p-10 rounded relative mb-[20vh]'>
                <p>Do you really want to discard all your products ?</p>
                <br />
                <div className='flex justify-between'>
                    <button
                        onClick={() => dispach(resetCart())}
                        className="bg-red-600 hover:bg-red-500 p-4 rounded font-bold w-[150px]">Reset My Cart
                    </button>
                    <button
                        onClick={() => setShowConfirmationModal(!showConfirmationModal)}
                        className="bg-green-600 hover:bg-green-500 p-4 rounded font-bold w-[150px]">Close
                    </button>
                </div>
            </div>
        </div>
    )
}
