import React from "react";
import Sidebar from "../components/Sidebar";

function Dashboard(){
    return (
        <>
            <main className="grid grid-cols-2" style={{gridTemplateColumns: '20vw 1fr'}}>
                <Sidebar />
                <section>
                    hi
                </section>
            </main>
        </>
    )
}

export default Dashboard;