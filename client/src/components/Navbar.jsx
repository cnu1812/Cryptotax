import React from 'react'
import { Link } from 'react-router-dom'

function Navbar(){
    return (
        <header className="bg-neutral-800 text-neutral-50 font-paragraph py-4">
            <nav className="container mx-auto flex justify-between items-center">
                <Link 
                    to={'/'}
                    className="text-xl font-bold font-title">
                        CryptoTax
                </Link>
                <a href="https://github.com/cnu1812/Cryptotax" target='_blank_' className="flex items-center gap-2 px-3 py-1.5 border rounded-md group hover:bg-neutral-50 transition-colors">
                    <svg className="w-4 h-4 fill-neutral-50 group-hover:fill-neutral-800" viewBox="0 0 19 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M9.50011 0C4.40183 0 0.272461 4.12937 0.272461 9.22764C0.272461 13.3109 2.91387 16.7597 6.58186 17.9824C7.04325 18.0631 7.21626 17.7863 7.21626 17.5441C7.21626 17.3249 7.20473 16.5982 7.20473 15.8254C4.88628 16.2522 4.28649 15.2602 4.10193 14.7412C3.99812 14.4759 3.54827 13.6569 3.1561 13.4378C2.83313 13.2647 2.37175 12.838 3.14457 12.8264C3.87124 12.8149 4.3903 13.4954 4.56332 13.7723C5.3938 15.1679 6.72028 14.7758 7.25087 14.5335C7.33161 13.9337 7.57383 13.53 7.83913 13.2993C5.78598 13.0687 3.64055 12.2728 3.64055 8.74319C3.64055 7.73969 3.99812 6.9092 4.58638 6.26326C4.49411 6.03257 4.17114 5.08674 4.67866 3.81794C4.67866 3.81794 5.45148 3.57571 7.21626 4.76377C7.95448 4.55615 8.73883 4.45234 9.52318 4.45234C10.3075 4.45234 11.0919 4.55615 11.8301 4.76377C13.5949 3.56418 14.3677 3.81794 14.3677 3.81794C14.8752 5.08674 14.5522 6.03257 14.46 6.26326C15.0482 6.9092 15.4058 7.72815 15.4058 8.74319C15.4058 12.2843 13.2488 13.0687 11.1957 13.2993C11.5302 13.5877 11.8186 14.1414 11.8186 15.0065C11.8186 16.2407 11.807 17.2326 11.807 17.5441C11.807 17.7863 11.98 18.0746 12.4414 17.9824C14.2733 17.364 15.8651 16.1866 16.9928 14.6162C18.1205 13.0457 18.7273 11.1611 18.7278 9.22764C18.7278 4.12937 14.5984 0 9.50011 0Z"/>
                    </svg>
                    <p className="text-sm group-hover:text-neutral-800">Github</p> 
                </a>
            </nav>
        </header>    
    )
}

export default Navbar;