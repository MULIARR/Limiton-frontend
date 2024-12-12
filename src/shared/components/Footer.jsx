import React from 'react';
import { Avatar } from "@nextui-org/react";
import logo from "../../assets/logo.jpg";

const Footer = () => {        
    return (
        <section className="pb-10 sm:pb-16 lg:pb-24 w-full">
            <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-4xl">
                <div className="flex justify-center">
                    <div className="max-w-lg w-full text-left">
                        <div className='flex items-center mb-5'>
                            <Avatar src={logo} className='h-20 w-20' />
                            <p className='text-xl font-semibold ml-3'>Limi<span className='text-[#338bfc]'>ton</span></p>
                        </div>

                        <p className="text-base leading-relaxed text-gray-600">
                            A reactive, user-friendly, and promising Limit Order App for the 
                            <span className='text-[#338bfc]'> TON</span> blockchain. Based on 
                            <span className='text-DeDust'> DeDust.io</span> and driven by passion.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Footer;
