import './App.css'
import React,{ useState} from 'react';
import List from './List';
import Alert from './Alert';
import { useEffect } from 'react';

const getLocalStorage = () =>{
  let list = localStorage.getItem('list');
  if(list){
    return JSON.parse(localStorage.getItem('list'))
  }else{
    return []
  }
}

function App() {

  const [name, setName] = useState('');
  const [list, setList] = useState(getLocalStorage);
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show : true,
    msg : '',
    type : ''
  })

  const handleSubmit = (e) =>{
    e.preventDefault()
    if (!name){
      //display alert
      showAlert(true, 'danger', 'error')

    }else if(name && isEditing){
      //Deeling with edit
      setList(list.map((item)=>{
        if(item.id === editID){
          return {...item, title:name}
        }
        return item;
      })
      )
      setName('')
      setEditID(null)
      setIsEditing(false)
      showAlert(true, 'sucess', 'value changed')
    }else{
      //show alert
      showAlert(true, 'sucess', `${name} is added`)
      //add to the list
      const newItem = {id: new Date().getTime().toString(),
      title:name}
      // ...list to return the old value from the list
      setList([...list, newItem])
      // setname to empty string to clear my input field
      setName('')
    }
  }

  const showAlert = (show=false,type='',msg='') =>{
    setAlert({show, type, msg})
  }

  const clearList = () =>{
    showAlert(true, 'danger', 'empty list')
    setList([])
  }

  const removeItem = (id) =>{
    showAlert(true, 'danger', `${name} has beeen removed`)
    setList(list.filter((item)=>{
      return item.id !== id
    }))
  }

  const editItem = (id) =>{
    const specificItem = list.find((item)=> item.id === id)
    setIsEditing(true)
    setEditID(id)
    setName(specificItem.title)

  }

  useEffect(()=>{
    localStorage.setItem('list', JSON.stringify(list))
  },[list])

  return (
    <main className='todo-container'>
      <form onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert}
        removeAlert={showAlert}
        list={list}
        />}
        <h2>Todo List</h2>
        <div className="form-container">
          <input type="text"
          placeholder='e.g read'
          value={name}
          onChange={(e)=> setName(e.target.value)}
          />
          <button className='submit-btn' type='submit'>
          {isEditing ? 'edit' : 'submit'}
        </button>
      </div>
      </form>
      {list.length > 0 && (
        <div className="list-container">
          {/* 
          passing list as a props to list component
          I named this props 'items' and destruture it in list component
          in the func parameters
          */}
          <List  items={list}
          removeItem={removeItem}
          editItem={editItem}
          />
          <button onClick={clearList} className='clear-btn'>Clear items</button>
        </div>
      )}
      
    </main>
  );
}

export default App;
