import { createRoot } from 'react-dom/client'
import './assets/css/index.css'
import { Provider } from 'react-redux'
import store from './app/store'
import Todo from './components/Todo'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
    <Provider store={store}>
        <Todo />
    </Provider>
)