import React from 'react'
import Navbar from '../components/Navbar'
import Breadcrumb from '../components/Breadcrumb'
import { Web3Button } from '@web3modal/react'

function Connect(){

    return(
        <>
            <Navbar />
            <main className="text-neutral-800 mt-11 max-h-screen font-paragraph">
                <section className="container mx-auto grid grid-cols-2">
                    <section className="space-y-8">
                        <Breadcrumb />
                        <h1 className="text-4xl font-bold">Visualize and export your <br />crypto tax reports quickly</h1>
                        <form className="w-1/2 flex flex-col gap-3">
                            <label htmlFor="location-select" className="after:content-['*'] after:text-red-500">Location </label>
                            <div>
                                <select id="location-select" className="w-full px-2 py-3 bg-neutral-200 rounded-md after:">
                                    <option value="">Select your country</option>
                                    <option value="india">India</option>
                                    <option value="brazil">Brazil</option>
                                </select>
                            </div>
                            <Web3Button />
                        </form>
                    </section>
                    <section className="bg-neutral-200 grid place-items-center">
                        <div className="text-center text-neutral-400 font-semibold">img here</div>
                    </section>
                </section>
            </main>
        </>
        
    );
}

export default Connect;
