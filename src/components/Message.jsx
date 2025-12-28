import React from 'react'

const Message = ({user = {name: "user"}, msgArr = []}) => {

    return (
        <div className='bg-white logs flex flex-col rounded border-2 py-1 px-2 h-120 w-120'>
            {
                msgArr.map((msg, index) => {
                    return(
                        <div key={index} className={`flex py-1 px-2 m-2 ${msg?.role === user? "self-end bg-green-400 text-white rounded" :"self-start"}`}>{msg?.msg}</div>
                    )
                })
            }
        </div>
    )
}

export default Message