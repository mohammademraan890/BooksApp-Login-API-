import { createRoot } from 'react-dom/client'
import App from './App.jsx'
// npm create vite@latest my-react-app -- --template react
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
createRoot(document.getElementById('root')).render(
    <App />
)
