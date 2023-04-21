import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Layout from "./routes/Layout"
import New from "./routes/new"
import Post from "./routes/post"
import Edit from "./routes/edit"
import NotFound from "./routes/NotFound"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index={true} element={<App />} />
          <Route index={false} path="/new" element={<New />} />
          <Route index={false} path="/post/:id" element={<Post />} />
          <Route index={false} path="/edit/:id" element={<Edit />} />
          <Route index={false} path="*" element={ <NotFound /> }/>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
