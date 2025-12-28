import React, { useState } from 'react'


const Logs = ({logs = []}) => {


    return (
        <div className='logs rounded py-1 px-2 bg-black text-white h-120 w-120'>
            {logs.map((log, index) => {
                return <div key={index}>
                    {log}
                </div>
            })}
        </div>
    )
}

export default Logs