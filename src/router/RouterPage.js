import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Home from '../pages/Home/Home';
import ChampDetail from '../pages/ChampDetail/ChampDetail';

export default function RouterPage() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/champ/:id" element={<ChampDetail />} />
                </Routes>
            </Router>
        </div>
    )
}
