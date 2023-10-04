import React, { useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";

import './App.css';

function App() {
  const [images, setImages] = useState();

  useEffect(() => {
    let activeFetch = true;
  
    fetch("http://localhost:5000/api/courses")
    .then(res => {
      if (res.ok) {
        console.log(res)
         return res.json() 
      } else {
          console.log(res)
          console.log("Not successful!")
      }
     
  })
    .then(res => {
      if (activeFetch) {
        console.log(res)
            // setImages(res.photos.photo);
  
          }
    })
    .catch(error => console.log("Error fetching data", error))
    return () => {
      activeFetch = false;
    };
  
    }, [images])


  return (
    <div>
     <Routes>
      <Route path="/" element={<h1>HELLO</h1>}  />

     </Routes>
    </div>
  );
}

export default App;
