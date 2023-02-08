import { useState } from 'react'

import './App.css'
import './css/styles.css'

function App() {

  const [ input, setInput ] = useState("") // handle input values
  const [todos, setTodos] = useState([]) // push input values inside an array
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  
  function addToCart() {
    // console.log(input)
    const item = {
      id: todos.length,
      value: input,
      status: false,
      quantity: 1
    }
    
    if(!item.value){
      Toast.fire({
        icon: 'error',
        title: 'Please add an Item'
      })
      return false
    }else{
      setTodos(oldTodos => [...oldTodos, item])
      setInput("")
      console.log(todos)
    }
  }

  function checkList(id){
    const handleCheckList = todos.findIndex(todo => todo.id == id)

    const tempTodo = [...todos]

    if(tempTodo[handleCheckList].status){
      tempTodo[handleCheckList].status = false;
      setTodos(tempTodo)
    }else{
      tempTodo[handleCheckList].status = true;
      setTodos(tempTodo)
    }
    // console.log(todos)
  }

  // const [count, setCount] = useState(todos.quantity) // handle increment/decrement

  function addCount(id) {
    const cntQuantity = todos.findIndex(todo => todo.id == id)
    const tempCnt = [...todos]
    
    tempCnt[cntQuantity].quantity += 1
    setTodos(tempCnt)
  }

  function subCount(id) {
    const cntQuantity = todos.findIndex(todo => todo.id == id)
    const tempCnt = [...todos]
    
    if(tempCnt[cntQuantity].quantity <= 0) {
      Toast.fire({
        icon: 'error',
        title: 'Cannot deduct less than 0'
      })
      return false
    }else{
      tempCnt[cntQuantity].quantity -= 1
      setTodos(tempCnt)
    }
  }

  function deleteList(id) {
    const newTodoList = todos.filter(todo => todo.id !== id)
    setTodos(newTodoList)
  }

  let totalQty = 0;

  return (
    <div className="app">
      <div className="input-items">
        <input type="text" name="input-cart" id="input-cart" placeholder='Add an item...' value={input} onChange={ e => setInput(e.target.value)} maxLength={29}/>
        <button className='addToCart' onClick={addToCart}><i className="bi bi-plus"></i></button>
      </div>

      <div className='list-result'>
        <ul>
          {todos.map( todo => {
            totalQty += todo.quantity
            return( 
              <>
                <li id={todo.id} key={todo.id} className="list-item">
                  <label className='inputs-container'>
                    <input type="checkbox" onChange={() => checkList(todo.id)} />
                    <span style={{textDecoration: todo.status ? 'line-through' : ''}}>{todo.value}</span>
                  </label>

                  <div className='quantity-container'>
                    <span onClick={ () => deleteList(todo.id) }><i className="bi bi-trash"></i></span>
                    <span onClick={ () => subCount(todo.id) }> <i className="bi bi-caret-left"></i> </span>
                    <span> {todo.quantity} </span>
                    <span onClick={ () => addCount(todo.id) }> <i className="bi bi-caret-right"></i> </span>
                  </div>
                </li>
                <hr />
              </>
            )
          })}
        </ul>
      </div>
      <span>Total: {totalQty}</span>
    </div>
  )
}

export default App
