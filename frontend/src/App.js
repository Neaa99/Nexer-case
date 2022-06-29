import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { AllBooks } from 'components/AllBooks'
import { Details } from 'components/Details'

export const App = () => {

  return (
    <BrowserRouter>
        <main>
          <Routes>
            <Route exact path="/" element={<AllBooks />}></Route>
            <Route exact path="/:title" element={<Details />}></Route>
            {/* <Route exact path='/:author' element={x}></Route> */}
            
            {/* <Route path="/404" element={<NotFound />}></Route>
            <Route path="*" element={<Navigate to="/404" replace />}></Route> */}
          </Routes>
        </main>
    </BrowserRouter>
  )
}
