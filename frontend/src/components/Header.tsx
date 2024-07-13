import { Link } from "react-router-dom";
import { useEffect } from "react";

import {
    Menubar,
    MenubarMenu,
} from "@/components/ui/menubar";
import Account from "./Account";


function Header() {

    useEffect(() => {
        const elements = document.getElementsByClassName('navlinks');
        [...elements].forEach(ele => {
            ele.addEventListener('click', () => {
                [...elements].forEach(ele2 => {
                    ele2.classList.remove('navlinks-active');
                    ele2.classList.add('navlinks-inactive');
                })
                ele.classList.remove('navlinks-inactive');
                ele.classList.add('navlinks-active');
            })
        });
    }, [])

    return (
        <div className="grid grid-cols-4">
            <div className="h-fit w-fit p-2 col-span-3">
                <Menubar>
                    <MenubarMenu>
                        <Link to="game">
                            <button className="navlinks navlinks-inactive h-7 w-20 px- py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">Game</button>
                        </Link>
                        <Link to="/">
                            <button className="navlinks navlinks-active h-7 w-20 px-3 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">Account</button>
                        </Link>
                        <button className="navlinks navlinks-inactive h-7 w-20 px-3 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">Ghost</button>
                        <button className="navlinks navlinks-inactive h-7 w-20 px-3 py-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">Ghost</button>
                    </MenubarMenu>
                </Menubar>
            </div>
            <div className="flex justify-end items-center p-2">
                <Account />
            </div>
        </div>
    )
}

export default Header