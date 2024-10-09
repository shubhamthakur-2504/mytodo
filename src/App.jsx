import './App.css'
import Form from './components/form'
import List from './components/list'
import { useSelector } from 'react-redux'
function App() {
  const todos = useSelector(state => state.todos);

  return (
    <>

      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <Form />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {
              todos.map((todo) => (
                <div key={todo.id} className='w-full'>
                  <List todo={todo} />
                </div>
              ))

            }
          </div>
        </div>
      </div>

    </>
  )
}

export default App
