"use client";

import { Product } from "@prisma/client";
import React, { useCallback, useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { formatPrice } from "@/utils/formatPrice";
import Heading from "@/app/components/Heading";
import Status from "@/app/components/Status";
import {
    MdCached,
    MdClose,
    MdDelete,
    MdDone,
    MdRemoveRedEye,
} from "react-icons/md";
import ActionButton from "@/app/components/ActionButton";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import ClipLoader from "react-spinners/ClipLoader";
import { deleteObject, getStorage, ref } from "firebase/storage";
import firebaseApp from "@/libs/firebase";

interface ManageProductsClientProps {
    products: Product[];
}

const ManageProductsClient: React.FC<ManageProductsClientProps> = ({
    products,
}) => {
    const [loading, setLoading] = useState(false);
    let rows: any = [];
    const router = useRouter();
    const storage = getStorage(firebaseApp);

    if (products) {
        rows = products.map((product) => {
            return {
                id: product.id,
                name: product.name,
                price: formatPrice(product.price),
                category: product.category,
                brand: product.brand,
                inStock: product.inStock,
                images: product.images,
            };
        });
    }

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 220 },
        { field: "name", headerName: "Name", width: 220 },
        {
            field: "price",
            headerName: "Price(USD)",
            width: 100,
            renderCell: (params) => {
                return (
                    <div className="font-bold text-slate-800">
                        {params.row.price}
                    </div>
                );
            },
        },
        { field: "category", headerName: "Category", width: 220 },
        { field: "brand", headerName: "Brand", width: 100 },
        {
            field: "inStock",
            headerName: "In Stock",
            width: 120,
            renderCell: (params) => {
                return (
                    <div>
                        {params.row.inStock === true ? (
                            <Status
                                text="In Stock"
                                icon={MdDone}
                                bgColor="bg-teal-300"
                                color="text-teal-800"
                            />
                        ) : (
                            <Status
                                text="Out of Stock"
                                icon={MdClose}
                                bgColor="bg-rose-300"
                                color="text-rose-800"
                            />
                        )}
                    </div>
                );
            },
        },
        {
            field: "actions",
            headerName: "Actions",
            width: 160,
            renderCell: (params) => {
                return (
                    <div className="flex justify-between gap-4 w-full">
                        <ActionButton
                            icon={MdCached}
                            onClick={() =>
                                handleStockChange(
                                    params.row.id,
                                    params.row.inStock
                                )
                            }
                        />
                        <ActionButton
                            icon={MdDelete}
                            onClick={() =>
                                handleDeleteProduct(
                                    params.row.id,
                                    params.row.images
                                )
                            }
                        />
                        <ActionButton
                            icon={MdRemoveRedEye}
                            onClick={() => {}}
                        />
                    </div>
                );
            },
        },
    ];

    const handleStockChange = useCallback((id: string, inStock: boolean) => {
        setLoading(true);

        axios
            .put("/api/product", {
                id,
                inStock: !inStock,
            })
            .then((res) => {
                toast.success("Product status updated");
                router.refresh();
                setLoading(false);
            })
            .catch((err) => {
                toast.error("Something went wrong");
                console.log(err);
            });
    }, []);

    const handleDeleteProduct = useCallback(
        async (id: string, images: any[]) => {
            toast("Deleting product, please wait...");

            const handleImageDelete = async () => {
                try {
                    for (const item of images) {
                        if (item.image) {
                            const imageRef = ref(storage, item.image);
                            await deleteObject(imageRef);
                            console.log("Image deleted", item.image);
                        }
                    }
                } catch (error) {
                    return console.log("Deleting image error.", error);
                }
            };

            await handleImageDelete();

            axios
                .delete(`/api/product/${id}`)
                .then((res) => {
                    toast.success("Product deleted");
                    router.refresh();
                })
                .catch((err) => {
                    toast.error("Something went wrong");
                    console.log(err);
                });
        },
        []
    );

    return (
        <div>
            <div className="mb-4 mt-8 max-w-[1150px] m-auto text-xl">
                <Heading title="Manage Products" center />
            </div>
            <div style={{ height: 600, width: "100%" }}>
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

export default ManageProductsClient;
