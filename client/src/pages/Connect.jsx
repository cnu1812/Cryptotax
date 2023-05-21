import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Breadcrumb from '../components/Breadcrumb'
import { Web3Button } from '@web3modal/react'
import { useAccount } from 'wagmi'
import { Form, redirect, useNavigate } from 'react-router-dom'
import axios from 'axios'

export async function action({ request }){
    const formData = await request.formData();
    const address = formData.get('address');
    const country = formData.get('country')

    axios.post('http://localhost:3000/cryptotax/address', { address, country })
    .then(response => {
        console.log('Response: ', response);
    })
    .catch(error => {
        console.log('Error: ', error);
    })
    
    return redirect('/dashboard');
}

function Connect() {
    const { address } = useAccount()
    const [selectedCountry, setSelectedCountry] = useState('');
    const navigate = useNavigate();

    function handleCountryChange (event) {
        setSelectedCountry(event.target.value);
    };

    return (
        <>
            <Navbar />
            <main className="text-neutral-800 mt-11 max-h-screen font-paragraph">
                <section className="container mx-auto grid grid-cols-2">
                    <section className="space-y-8">
                        <Breadcrumb />
                        <h1 className="text-4xl font-bold">Visualize and export your <br />crypto tax reports quickly</h1>
                        <Form method="post" className="w-fit flex flex-col gap-4">
                            <div className="flex gap-5 items-center">
                                <div className="relative">
                                    <select
                                        name="country"
                                        value={selectedCountry}
                                        onChange={handleCountryChange}
                                        className="block appearance-none py-2.5 px-4 pr-8 leading-tight bg-white border border-neutral-400 rounded-md focus:outline-none focus:bg-white focus:border-gray-500"
                                    >
                                        <option value="">Select your country</option>
                                        <option value="Brazil">Brazil</option>
                                        <option value="India">India</option>
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-neutral-800">
                                        <svg
                                            className="fill-current h-4 w-4"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                d="M10 12l-4-4h8l-4 4z"
                                            />
                                        </svg>
                                    </div>
                                </div>
                                <Web3Button/>
                                {address&&<input readOnly type="text" name="address" value={address} className="hidden" />}
                            </div>
                            <button type="submit" disabled={(address&&selectedCountry)?false:true} className="px-2 py-2 bg-neutral-100 rounded-md font-title font-medium hover:bg-neutral-800 hover:text-neutral-50 transition-all disabled:text-neutral-800 disabled:bg-transparent disabled:cursor-not-allowed disabled:opacity-30">
                                Calculate Taxes
                            </button>
                        </Form>
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
