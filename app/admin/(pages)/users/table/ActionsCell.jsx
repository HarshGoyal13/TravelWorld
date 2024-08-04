"use client"

import React, { useState } from 'react'
import { FaPen, FaTrash } from "react-icons/fa"
import { useUserHook } from "../../../hooks/user-hook"
import UserModal from '@/app/admin/modals/user-modal/UserModal'
import { toast } from "react-hot-toast"

const ActionsCell = ({ userId }) => {
    const [showModal, setShowModal] = useState(false)
    const { handleDeleteUser, isPending } = useUserHook()

    const handleHideModal = () => setShowModal(false)
    const handleShowModal = () => setShowModal(true)

    const handleDeleteClick = () => {
        handleDeleteUser(userId)
            .then(() => toast.success("User deleted successfully"))
            .catch((error) => toast.error(`Error deleting user: ${error.message}`))
    }

    return (
        <>
            <button
                className="cursor-pointer disabled:bg-slate-200 px-2 py-1 rounded-xl"
                disabled={isPending}
                onClick={handleDeleteClick}
            >
                <FaTrash color={`${isPending ? "#bdb2b2" : "#f00"}`} />
            </button>
            <button
                onClick={handleShowModal}
                className="cursor-pointer disabled:bg-slate-200 px-2 py-1 rounded-xl"
            >
                <FaPen color="#31b608" />
            </button>
            {showModal && (
                <UserModal
                    userId={userId}
                    handleHideModal={handleHideModal}
                />
            )}
        </>
    )
}

export default ActionsCell
