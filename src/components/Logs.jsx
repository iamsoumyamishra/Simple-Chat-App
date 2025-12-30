import React, { useState, useRef } from 'react'


const Logs = ({logs = []}) => {

        const messagesEndRef = useRef(null);
    
        const scrollToBottom = () => {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    
        useEffect(() => {
            scrollToBottom();
        }, [msgArr])

    return (
        <div className='logs rounded py-1 px-2 bg-black text-white h-120 w-120 overflow-y-auto'>
            {logs.map((log, index) => {
                return <div key={index}>
                    {log}
                </div>
            })}
            <div ref={messagesEndRef}></div>
        </div>
    )
}

export default Logs