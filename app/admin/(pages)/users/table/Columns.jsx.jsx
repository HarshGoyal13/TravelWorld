"use client"

import { format } from 'timeago.js'
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai'
import ActionsCell from './ActionsCell' // Adjust the path as necessary

export const columns = [

    {
        accessorKey: "username",
        header: "Username",
    },
    {
        accessorKey: "email",
        header: ({ column }) => (
            <button
                className="flex items-center gap-1"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Email
                <span className="flex items-center">
                    <AiOutlineArrowUp />
                    <AiOutlineArrowDown />
                </span>
            </button>
        ),
    },
    {
        accessorKey: "reservations",
        header: ({ column }) => (
            <button
                className="flex items-center gap-1"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Reservations
                <span className="flex items-center">
                    <AiOutlineArrowUp />
                    <AiOutlineArrowDown />
                </span>
            </button>
        ),
        cell: ({ row }) => {
            const value = row.getValue("reservations")?.length || 0
            return (
                <div>
                    {value} reservations
                </div>
            )
        }
    },
    {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => {
            const value = row.getValue("createdAt")
            return (
                <div>
                    {format(value)}
                </div>
            )
        }
    },
    {
        accessorKey: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const { id: userId } = row.original
            return <ActionsCell userId={userId} />
        }
    },
]
