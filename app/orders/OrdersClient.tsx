"use client";

import { Order, User } from "@prisma/client";
import React, { useCallback, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { formatPrice } from "@/utils/formatPrice";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import {
    MdAccessTimeFilled,
    MdDeliveryDining,
    MdDone,
    MdRemoveRedEye,
} from "react-icons/md";
import ActionButton from "@/app/components/ActionButton";
import { useRouter } from "next/navigation";
import ClipLoader from "react-spinners/ClipLoader";
import moment from "moment";

interface ManageOrdersClientProps {
    orders: ExtentOrder[];
}

type ExtentOrder = Order & {
    user: User;
};

const OrdersClient: React.FC<ManageOrdersClientProps> = ({ orders }) => {
    const [loading, setLoading] = useState(false);
    let rows: any = [];
    const router = useRouter();

    if (orders) {
        rows = orders.map((order) => {
            return {
                id: order.id,
                customer: order.user.name,
                amount: formatPrice(order.amount / 100),
                paymentStatus: order.status,
                date: moment(order.createDate).fromNow(),
                deliveryStatus: order.deliveryStatus,
            };
        });
    }

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 220 },
        { field: "customer", headerName: "Customer Name", width: 130 },
        {
            field: "amount",
            headerName: "Amount(USD)",
            width: 130,
            renderCell: (params) => {
                return (
                    <div className="font-bold text-slate-800">
                        {params.row.amount}
                    </div>
                );
            },
        },
        {
            field: "paymentStatus",
            headerName: "Payment Status",
            width: 130,
            renderCell: (params) => {
                return (
                    <div>
                        {params.row.paymentStatus === "pending" ? (
                            <Status
                                text="Pending"
                                icon={MdAccessTimeFilled}
                                bgColor="bg-slate-200"
                                color="text-slate-700"
                            />
                        ) : params.row.paymentStatus === "complete" ? (
                            <Status
                                text="Completed"
                                icon={MdDone}
                                bgColor="bg-green-200"
                                color="text-green-700"
                            />
                        ) : null}
                    </div>
                );
            },
        },
        {
            field: "deliveryStatus",
            headerName: "Delivery Status",
            width: 130,
            renderCell: (params) => {
                return (
                    <div>
                        {params.row.deliveryStatus === "pending" ? (
                            <Status
                                text="Pending"
                                icon={MdAccessTimeFilled}
                                bgColor="bg-slate-200"
                                color="text-slate-700"
                            />
                        ) : params.row.deliveryStatus === "dispatched" ? (
                            <Status
                                text="Dispatched"
                                icon={MdDeliveryDining}
                                bgColor="bg-purple-200"
                                color="text-purple-700"
                            />
                        ) : params.row.deliveryStatus === "delivered" ? (
                            <Status
                                text="Delivered"
                                icon={MdDone}
                                bgColor="bg-green-200"
                                color="text-green-700"
                            />
                        ) : null}
                    </div>
                );
            },
        },
        {
            field: "date",
            headerName: "Date",
            width: 130,
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 120,
            renderCell: (params) => {
                return (
                    <div className="flex justify-between gap-4 w-full">
                        <ActionButton
                            icon={MdRemoveRedEye}
                            onClick={() =>
                                router.push(`/order/${params.row.id}`)
                            }
                        />
                    </div>
                );
            },
        },
    ];

    return (
        <div>
            <div className="mb-4 mt-8 max-w-[1150px] m-auto text-xl">
                <Heading title="Manage Orders" center />
            </div>
            <div style={{ height: 600, width: "100%"}}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </div>
            {loading && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <ClipLoader color="#10B981" size={50} />
                </div>
            )}
        </div>
    );
};

export default OrdersClient;
