import './style.css';
import { Card } from '../../components/Card';
import React , { useState , useEffect} from 'react';

export function Home() {
  const [studentName,setStudentName]=useState();
  const [students , setStudents] = useState([]);
  const [user , setUser] = useState({name:'', avatar :''});

  function handleAddStudent(){
    const newStudent={
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br",{
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })

    };
    setStudents(prevState => [...prevState,newStudent]);
  };
  useEffect(() => {
    async function fetchData(){
      const response = await fetch('https://api.github.com/users/felipeversiane');
      const data = await response.json();
      setUser({
        name: data.login,
        avatar : data.avatar_url
      });
    }
    fetchData();
    },[])

  return (
    <div className='container'>
    
      <header>
        
        <h1>Lista de Presença</h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="foto de perfil" />
        </div>
        
        
      </header>
      
      
       
       <input onChange={e=> setStudentName(e.target.value)} type="text" placeholder="Digite um nome" />
       <button onClick={handleAddStudent} type="button">Adicionar</button>
       {
        students.map(students => (
        <Card 
        key={students.time}  
        name={students.name} 
        time={students.time}
        />) )
        
       }
       



    </div>
   
  )
}

