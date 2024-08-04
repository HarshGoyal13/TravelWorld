import Image from 'next/image'
import { format } from "date-fns"
import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai'

import React from 'react'

export const columns = [
    {
        accessorKey: "image",
        header: "Image",
        cell: ({ row }) => {
            const image = row.getValue("listing").imageUrls[0]

            return (
                <div>
                    <Image
                        src={image}
                        width="35"
                        height="35"
                        className="rounded-full object-cover"
                        alt="image1"
                    />
                </div>
            )
        }
    },
    {
        accessorKey: "startDate",
        header: "Start Date",
        cell: ({ row }) => {
            const startDate = row.getValue("startDate")

            return (
                <span>{format(startDate, "MMM do yyyy")}</span>
            )
        }
    },
    {
        accessorKey: "endDate",
        header: "End Date",
        cell: ({ row }) => {
            const endDate = row.getValue("endDate")

            return (
                <span>{format(endDate, "MMM do yyyy")}</span>
            )
        }
    },
    {
        accessorKey: "user",
        header: "User",
        cell: ({ row }) => {
            const { email } = row.getValue("user")

            return (
                <span>{email}</span>
            )
        }
    },
    {
        accessorKey: "totalPrice",
        header: ({ column }) => {
            return (
                <button
                    className="flex justify-center items-center gap-1"
                    onClick={() => column.toggleSorting(column.getIsSorted === "asc")}
                >
                    Total Price
                    <span className="flex items-center">
                        <AiOutlineArrowUp />
                        <AiOutlineArrowDown />
                    </span>
                </button>
            )
        },
        cell: ({ row }) => {
            const totalPrice = row.getValue("totalPrice")

            return (
                <span className="block text-left">
                    ${totalPrice}
                </span>
            )
        }
    },
    {
        accessorKey: "listing",
        header: "Listing",
        cell: ({ row }) => {
            const { name } = row.getValue("listing")

            return (
                <span>{name}</span>
            )
        }
    }
]