import React from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import AuthRequired from './components/AuthRequired'
import Home from './pages/Home'
import About from './pages/About'
import Login from './Login'
import Vans from './pages/Vans'
import VanDetail from './pages/VanDetail'
import Layout from './components/Layout'
import HostLayout from './components/HostLayout'
import Dashboard from './pages/Host/Dashboard'
import Income from "./pages/Host/Income"
import Reviews from "./pages/Host/Reviews"
import HostVans from './pages/Host/HostVans'
import HostVanDetail from './pages/Host/HostVanDetail'
import HostVanInfo from './pages/Host/HostVanInfo'
import HostVanPricing from './pages/Host/HostVanPricing'
import HostVanPhotos from './pages/Host/HostVanPhotos'
import "./server"

export default function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="vans" element={<Vans />} />
            <Route path="vans/:id" element={<VanDetail />} />
            <Route path="login" element={<Login />} />

            <Route element={<AuthRequired />}>
              <Route path="host" element={<HostLayout />} >
                <Route index element={<Dashboard />} />
                <Route path="income" element={<Income />} />
                <Route path="reviews" element={<Reviews />} />
                <Route path="vans" element={<HostVans />} />
                <Route path="vans/:id" element={<HostVanDetail />}>
                  <Route index element={<HostVanInfo />}/>
                  <Route path="pricing" element={<HostVanPricing />}/>
                  <Route path="photos" element={<HostVanPhotos />}/>
                </Route>
              </Route>
            </Route>
          </Route>
        </Routes>
    </BrowserRouter>
  )
}


