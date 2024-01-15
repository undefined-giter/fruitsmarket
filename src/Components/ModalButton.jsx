import { useState } from "react"
import { createPortal } from "react-dom"
import ConfirmationModal from './ConfirmationModal'

export default function ModalButton() {
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)

    return (
        <>
            <button
                onClick={() => setShowConfirmationModal(!showConfirmationModal)}
                className="block mb-2 bg-cyan-600 hover:bg-cyan-500 texte-late-900 p-2 rounded">
                Reset Cart
            </button>

            {showConfirmationModal && createPortal(<ConfirmationModal setShowConfirmationModal={setShowConfirmationModal} showConfirmationModal={showConfirmationModal} />, document.body)}
        </>
    )
}
