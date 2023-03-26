import React from 'react'
import { MoonLoader } from 'react-spinners'

function Loader({ loading }) {
    return (
        <div style={{ position: 'fixed', width: '100%', height: '100%', top: '0px', left: '0px', display: loading ? 'block' : 'none', zIndex: 100, backgroundColor: "	rgb(0, 0, 0,0.5)" }}>
            <div className='loading-center' style={{ width: "100%", height: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <MoonLoader color='#ffffff' loading={loading} />
            </div>
        </div>
    )
}

export default Loader
