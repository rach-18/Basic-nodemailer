import { useState } from 'react'
import axios from "axios";
import './App.css'

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [dataSaved, setDataSaved] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    try{
      const response = await axios.post("http://localhost:5000/sendEmail", {name, email, message});

      if(response.status === 200 && response.statusText === 'Ok') {
        setDataSaved(!dataSaved);
      }
    } 
    catch(e) {
      console.log(e);
    }
  }

  return (
    <>
      {dataSaved ? <p className='success'>Email Sent!</p> : ""}
      <h2>Basic Nodemailer App</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name='name'
          placeholder='Enter your name' 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <br />
        <input 
          type="email" 
          name='email'
          placeholder='Enter your email' 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <br />
        <textarea 
          name="message" 
          placeholder='Enter your message' 
          value={message} 
          onChange={(e) => setMessage(e.target.value)}
        >
          {message}
        </textarea>
        <br />
        <button type='submit'>Send</button>
      </form>
    </>
  )
}

export default App
