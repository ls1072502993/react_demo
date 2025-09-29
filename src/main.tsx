import ReactDOM from 'react-dom/client'
import '@ant-design/v5-patch-for-react-19'
import '@/assets/styles/tailwindcss.css'
import '@/assets/styles/index.scss'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(<App />)
