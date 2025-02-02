import { createRoot } from 'react-dom/client'
import '../assets/css/index.css'
import { Provider } from 'react-redux'
import PasswordManager from '../pages/PasswordManager'
import store from '../configs/toolkit'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
    <Provider store={store}>
        <PasswordManager />
    </Provider>
)