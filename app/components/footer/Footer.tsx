import React from "react";
import Container from "../Container";
import FooterList from "./FooterList";
import Link from "next/link";
import { BsFacebook } from "react-icons/bs";
import {AiOutlineTwitter, AiFillInstagram, AiFillYoutube} from "react-icons/ai";

const Footer = () => {
    return (
        <footer className="bg-slate-700 text-slate-200 text-sm mt-16">
            <Container>
                <div className="flex flex-col md:flex-row justify-between pt-16 pb-8">
                    <FooterList>
                        <h3 className="font-bold text-lg mb-2">
                            Shop Categories
                        </h3>
                        <Link href="#">Phones</Link>
                        <Link href="#">Laptops</Link>
                        <Link href="#">Desktops</Link>
                        <Link href="#">Watches</Link>
                        <Link href="#">TVs</Link>
                        <Link href="#">Accessories</Link>
                    </FooterList>
                    <FooterList>
                        <h3 className="font-bold text-lg mb-2">
                            Custom Service
                        </h3>
                        <Link href="#">Contact us</Link>
                        <Link href="#">Shipping Policy</Link>
                        <Link href="#">Return and Exchanges</Link>
                        <Link href="#">Watches</Link>
                        <Link href="#">FAQs</Link>
                    </FooterList>
                    <FooterList>
                        <h3 className="font-bold text-lg mb-2">About us</h3>
                        <p>
                            At our electronics store, we are dedicated to
                            providing the latest and greatest devices and
                            accessories to our customers. With a wide selection
                            of phones, TVs, laptops, watches and more.
                        </p>
                    </FooterList>
                    <FooterList>
                        <h3 className="font-bold text-lg mb-2">Follow us</h3>
                        <div className="flex gap-2">
                            <Link href="#">
                                <BsFacebook size={24}/>
                            </Link>
                            <Link href="#">
                                <AiOutlineTwitter size={24}/>
                            </Link>
                            <Link href="#">
                                <AiFillInstagram size={24}/>
                            </Link>
                            <Link href="#">
                                <AiFillYoutube size={24}/>
                            </Link>
                        </div>
                    </FooterList>
                </div>
            </Container>
        </footer>
    );
};

export default Footer;
