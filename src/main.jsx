import React from 'react'
import ReactDOM from 'react-dom/client'
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import App from './App.jsx'
import './index.scss'
import axios from 'axios'
import { ErrorBoundary } from 'react-error-boundary';
import ErrorPage from './pages/Error.jsx';

axios.defaults.debug = true;

// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.json'
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<ErrorPage/>}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>,
)
