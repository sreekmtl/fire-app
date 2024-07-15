import { NAV_LINKS } from "../constants/defaults";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar= ()=>{
    return (
        <nav className="flexBetween
        max-container padding-container relative z-30 py-5 flex flex-col lg:flex-row">
            <Link href="/">
                <Image src='/fire.svg' alt='logo' width={100} height={100}/>
            </Link>
            
            <ul className=" h-full gap-12 flex">
                    {NAV_LINKS.map((link)=>(
                        <Link href={link.href} key={link.key}
                        className="regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold">
                            {link.label}
                        </Link>
                    ))}
            </ul>

        

           
        </nav>
    )
}


export default Navbar