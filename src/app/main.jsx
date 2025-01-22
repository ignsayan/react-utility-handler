import { createRoot } from 'react-dom/client'
import '../assets/css/index.css'
import { Provider } from 'react-redux'
import store from './store'
import PasswordManager from '../pages/PasswordManager'
import TodoList from '../pages/TodoList'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
    <Provider store={store}>
        <PasswordManager />
        {/* <TodoList /> */}
    </Provider>
)