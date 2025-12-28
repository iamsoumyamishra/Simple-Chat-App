import React, { useEffect } from 'react'
import { useState } from 'react'
import { socket } from './socket';
import Logs from './components/Logs';
import Message from './components/Message';

const App = () => {

  const [val, setVal] = useState("");
  const [logs, setLogs] = useState([]);
  const [msgArr, setMsgArr] = useState([]);
  const [user, setUser] = useState("");
  const [friend, setFriend] = useState("");
  const [id, setId] = useState("Disconnected")

  useEffect(() => {

    socket.on("connect", () => {
      setId(socket.id)
      setLogs((prev) => [...prev, "Client: Connected to the server"])
    })
    
    socket.on("response", (msg) => {
      setMsgArr((prev) => [...prev, msg.data])
      setLogs((prev) => [...prev, `${msg.data.role}: ${msg.data.msg}`])
    })
    
    socket.on("disconnect", () => {
      setLogs((prev) => [...prev, "Client: Disconnected to the server"])
    })

    return(() => {
      socket.off()
      socket.disconnect()
    })


  }, []);

  const handleChange = (event) => {

    setVal(event.target.value)
  }

  const handleClick = () => {

    socket.emit("message", {role: user,msg: val})
    
  }
  
  const handleEnterClick = (event) => {

    if (user.trim() === "" || friend.trim() === "") {
      alert("First set the config!")
    }
    if (event.key === "Enter"){
      
      socket.emit("message", {role: user,msg: val})
    }
  }

  const connectToServer = () => {
    if (user.trim() === "" || friend.trim() === "") {
      alert("First set the config!")
    }
    socket.connect()
  }

  const disconnectToServer = () => {
    socket.disconnect()
    setId("Disconnected")
  }


  return (
    <div className="w-full mx-auto mb-10">
      <div className="flex flex-col justify-center items-center h-full">
        <div className="flex items-center gap-2 config mt-5 mb-3">
          <span>Config: </span>
          <input className='border p-2 rounded' type="text" onChange={(e) => setUser(e.target.value.trim())} value={user} placeholder='User'/>
          <input className='border p-2 rounded' type="text" onChange={(e) => setFriend(e.target.value.trim())} value={friend} placeholder='Friend'/>
        </div>
        <div className="flex w-100 gap-2 id mb-3">
          <span>ID: {id}</span>
        </div>

        <div className='flex gap-2 mt-2 mb-10 flex-wrap justify-center'>
          <Message user={user} msgArr = {msgArr} />
          <Logs logs = {logs}/>
        </div>

        <div className='flex gap-2'>
          <input onKeyDown={handleEnterClick} className='border p-2 rounded' type="text" onChange={handleChange} value={val}/>
          <button onClick={handleClick} className='hover:scale-105 transition-transform ease-in-out duration-100 p-2 rounded bg-black text-white cursor-pointer'>Send</button>
          <button onClick={connectToServer} onKeyDown={handleEnterClick} className='hover:scale-105 transition-transform ease-in-out duration-100 p-2 rounded bg-green-600 text-white cursor-pointer'>Connect</button>
          <button onClick={disconnectToServer} className='hover:scale-105 transition-transform ease-in-out duration-100 p-2 rounded bg-red-500 text-white cursor-pointer'>Disconnect</button>
        </div>
      </div>
    </div>
  )
}

export default App