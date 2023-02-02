import Swal from 'sweetalert2'
import './App.css'
import { useState } from 'react'

function App() {

  const [input, setInput] = useState("") // handle state
  const [todos, setTodos] = useState([]) // handle all input values to array

  // adds inputs in list <li>
  function addTodo() {

      const item = {
        id : Math.floor(Math.random() * 1000),
        value : input,
        status: false
      }
      if(!item.value){
        // alert("Enter to do list")
        Swal.fire({
          title: 'Error!',
          text: 'Do you want to continue',
          icon: 'error',
          confirmButtonText: 'Cool'
        })
        return false
      }else{
        setTodos(oldTodos => [...oldTodos, item])
        setInput("")
      }
      
  }// end of addTodo()

  function delTodo(id) {
    const newTodoList = todos.filter(todo => todo.id !== id)
    setTodos(newTodoList)
  }

  function checkTodo(id) {
    const checkTodoList = todos.findIndex(todo => todo.id == id)

    const tempTodo = [...todos]
    tempTodo[checkTodoList].status = true;

    setTodos(tempTodo)
    // console.log(checkTodoList)
    // console.log(tempTodo)
    console.log(todos)

  }

    return (
      <div className="card">
        <div className='inputs'>
          <input onChange={ e => setInput(e.target.value)} value={input} placeholder='Add list here...' style={{textAlign: 'center'}} />
          <button style={{textAlign: 'center'}} onClick={ () => addTodo()}>Submit</button>
        </div>
        
        <hr />
        <ul className='myList'>
          {todos.map(todo => {
            return (
                <li id={todo.id} key={todo.id} className="list-item" >
                  <table style={{width: '100%'}} border="1">
                    <tbody>
                    <tr>
                      <td>
                        <p style={{textDecoration: todo.status ? 'line-through' : ''}}>{todo.value}</p>
                      </td>
                      <td style={{width: '50px'}}>
                      <button onClick={() => delTodo(todo.id)}>❌</button>
                      </td>
                      <td style={{width: '50px'}}>
                      <button onClick={() => checkTodo(todo.id)}>✔️</button>
                      </td>
                    </tr>
                    </tbody>
                    
                  </table>
                </li>
            )
          })}
        </ul>
      </div>
    )//end of return

}//end of App()

export default App
