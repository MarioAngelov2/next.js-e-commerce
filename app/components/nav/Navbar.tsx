import React from "react";
import Container from "../Container";
import Link from "next/link";
import CartCount from "./CartCount";
import UserMenu from "./UserMenu";
import { getCurrentUser } from "@/actions/getCurrentUser";
import CategoriesBar from "./CategoriesBar";
import SearchBar from "../SearchBar";

const Navbar = async () => {
    const user = await getCurrentUser();

    return (
        <div className="sticky top-0 w-full bg-slate-200 z-30 shadow-md">
            <div className="py-4 border-b-[1px]">
                <Container>
                    <div className="flex flex-col md:flex-row items-center md:justify-between gap-3 md-gap-0">
                        <Link
                            href="/"
                            className="font-bold text-xl md:text-2xl"
                        >
                            E-SHOP
                        </Link>
                        <SearchBar />
                        <div className="flex items-center gap-8 md:gap-7">
                            <CartCount />
                            <UserMenu user={user || null} />
                        </div>
                    </div>
                </Container>
            </div>
            <CategoriesBar />
        </div>
    );
};

export default Navbar;
