import { useState } from "react"
import { createPortal } from "react-dom"
import ResetModal from './ResetModal'

export default function ModalButton() {
    const [showConfirmationModal, setShowConfirmationModal] = useState(false)

    return (
        <>
            <button
                onClick={() => setShowConfirmationModal(!showConfirmationModal)}
                className="block bg-cyan-600 hover:bg-cyan-500 texte-late-900 py-1 px-2 rounded">
                Reset Cart
            </button>

            {showConfirmationModal && createPortal(<ResetModal setShowConfirmationModal={setShowConfirmationModal} showConfirmationModal={showConfirmationModal} />, document.body)}
        </>
    )
}
