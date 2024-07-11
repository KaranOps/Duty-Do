import { useState, useEffect } from 'react'
import NavBar from './components/NavBar'
import { v4 as uuidv4 } from 'uuid';
// ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

function App() {
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showfinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)

    }
  }, [])


  const saveTodo = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id);
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveTodo()
  }

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveTodo()
  }

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveTodo()
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveTodo()
  }

  const toggleFinished = (e) => {
    setshowFinished(!showfinished)
  }

  return (
    <>
      <NavBar />
      <div className="mx-3 container md:mx-auto my-5 rounded-xl p-5 bg-violet-50 min-h-[75vh] md:w-1/2">
        <h1 className='font-bold text-center text-2xl' >iTask-Manage your todo at one place</h1>
        <div className="addTodo my-3 flex flex-col gap-2">
          <h1 className='font-bold text-lg' >Add a todo</h1>
          <div className="flex gap-1">
            <input onChange={handleChange} value={todo} type="text" placeholder='Write a Todo' className='w-full rounded-xl px-2 py-1' />
            <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-violet-700 disabled:bg-violet-900 hover:bg-violet-900 p-2 py-1 text-sm font-bold text-white rounded-xl'>Save</button>
          </div>
        </div>
        <input className='my-4' onChange={toggleFinished} type="checkbox" checked={showfinished} /> Show Finished
        <h2 className='font-bold text-lg'>Your Todos</h2>

        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No Todos to Display</div>}
          {todos.map(item => {

            return (showfinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between my-1 ">
              <div className='flex gap-5'>
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="btns flex h-full">
                <button onClick={(e) => handleEdit(e, item.id)} className='bg-violet-700 hover:bg-violet-900 p-2 py-1 text-sm font-bold mx-1 text-white rounded-md'><span class="material-symbols-outlined">
                  draw
                </span></button>
                <button onClick={(e) => handleDelete(e, item.id)} className='bg-violet-700 hover:bg-violet-900 p-2 py-1 text-sm font-bold  text-white rounded-md'><span class="material-symbols-outlined">
                  delete
                </span></button>
              </div>
            </div>
          })}

        </div>
      </div>
    </>
  )
}

export default App


