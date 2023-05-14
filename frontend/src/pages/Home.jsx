import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx'

function Home(){
    return (
        <>
            <Navbar />
            <main className="container mx-auto font-paragraph text-neutral-800">
                <section className="mt-11 flex justify-center">
                    <iframe
                        src="https://www.youtube.com/embed/9lW9unsbSGw"
                        title="Tailwind Sizing Utility Classes Explanations"
                        frameborder="0"
                        className="w-full max-w-2xl aspect-video rounded-md">
                    </iframe>
                </section>
                <section className="mt-20 grid grid-cols-2 gap-10">
                    <div className="space-y-5">
                        <h1 className="text-5xl font-title font-bold">
                            Visualize your <br />crypto tax reports
                        </h1>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sagittis ligula consectetur nisi lacinia, eu euismod orci auctor.
                        </p>
                        <Link
                            to={'/connect'}
                            className="block w-1/2 p-2.5 bg-teal-500 text-neutral-50 font-title text-center rounded-md">
                                Start Now
                        </Link>
                    </div>
                    <div>
                        <img src="https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="Crypto Coins" />
                    </div>
                </section>
            </main>
        </>
    )
}

export default Home;