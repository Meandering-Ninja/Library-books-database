import logo from './logo.svg';
import './App.css';
import {useState , useEffect} from 'react';

function App() {
  const [form, setForm] = useState({});
  const [users, setUsers] = useState([]);
  const handleform = (e) =>{
    
    console.log(e.target.value, e.target.name);
    setForm({
      ...form,
      [e.target.name]  : e.target.value
    })
  }
  const handleSubmit = async (e)=>{
   e.preventDefault();
    const response = await fetch('http://localhost:8080/',{
      method : 'POST',
      body : JSON.stringify(form),
      headers:{
        'Content-Type':'application/json'
      }
    })
    const data = await response.json();
    console.log(data);
  }
  const getUsers = async ()=>{
    const response = await fetch('http://localhost:8080/',{
      method : 'GET',
      
    })
    const data = await response.json();
    setUsers(data);
  }

useEffect(()=>{
  getUsers();
},[])

  return (
    <div>
      <form onSubmit ={handleSubmit}>
        
        <span>username</span>
        <input type ="text" name = "username" onChange = {handleform}></input>
        <span>password</span>
      
        <input type ="text" name = "password" onChange = {handleform}></input>
        <input type = "Submit"></input>
      </form>
      <div>
        <ul>
          {users.map(user=><li>{user.username}</li>)}
        </ul>
      </div>
    </div>
  );
}

export default App;
