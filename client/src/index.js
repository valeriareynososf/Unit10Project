import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { CourseProvider } from "./context/CourseContext";

import './styles/global.css';

import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <CourseProvider>
      <App />
      </CourseProvider>
    </BrowserRouter>
  </React.StrictMode>
);

