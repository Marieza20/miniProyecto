import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inventario from '../pages/Inventario';

function Routing() {
    return(
        <Router>
            <Routes>
                <Route path='/' element={<Inventario/>}></Route>
            </Routes>
        </Router>
    )
}

export default Routing