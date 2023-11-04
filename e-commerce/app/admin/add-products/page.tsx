import Container from "@/app/components/Container";
import FormWrap from "@/app/components/FormWrap";
import React from "react";
import AddProductForm from "./AddProductForm";
import { getCurrentUser } from "@/actions/getCurrentUser";
import NullData from "@/app/components/NullData";

const AddProducts = async () => {
    const user = await getCurrentUser();

    if (!user || user.role !== "ADMIN") {
        return <NullData title="Access denied." />;
    }

    return (
        <div className="p-8">
            <Container>
                <FormWrap>
                    <AddProductForm />
                </FormWrap>
            </Container>
        </div>
    );
};

export default AddProducts;
