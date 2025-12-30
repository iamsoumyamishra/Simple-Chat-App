import React, { useState, useRef, useEffect } from 'react'


const Logs = ({logs = []}) => {

        const messagesEndRef = useRef(null);
    
        const scrollToBottom = () => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    
        useEffect(() => {
            scrollToBottom();
        }, [logs])

    return (
        <div className='logs rounded py-1 px-2 bg-black text-white h-120 w-120 overflow-y-auto'>
            {logs.map((log, index) => {
                return <div key={index}>
                    {log}
                </div>
            })}
        </div>
    )
}

export default Logs