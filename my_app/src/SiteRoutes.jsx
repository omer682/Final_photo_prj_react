import React from 'react'
import { Route, Routes} from 'react-router-dom'
import Home from './Pages/Home'
import Projects from './Pages/Projects'
import Test from './Pages/Test'
import Contact from './Pages/Contact'
import Tours from './Pages/Tours/Tours'
import Tour from './Pages/Tours/Tour'
import TourForm from './Pages/Tours/TourForm'
import Photographers from './Pages/Photographers/Photographers'
import PhotographerProfile from './Pages/Photographers/PhotographerProfile'
import NotFound from './Pages/navigations/NotFound'
import AccesDeniced from './Pages/navigations/AccesDeniced'
import EditUser from './Pages/editUser/EditUser'
import AlbumImages from './Pages/Photographers/AlbumImages'
const SiteRoutes = () => {
  return (
    <div>
        <Routes>
            
                <Route path='/home'element={<Home/>} />
                <Route path='/project' element={<Projects/>}/>
                <Route path='photographers' element={<Photographers/>}/>
                <Route path='test' element={<Test/>}/>
                <Route path="/contact" element={<Contact/>}/>
                <Route path='/tours' element={<Tours/>}/>
                <Route path="/tours/tour/:id" element={<Tour/>}/>
                <Route path="/tours/add-tour-form" element={<TourForm/>}/>
                <Route path='/photographers/profile/:id' element={<PhotographerProfile/>}/>
                <Route path='/404' element={<NotFound/>}/>
                <Route path='/acces-denied' element={<AccesDeniced/>}/>
                <Route path='/user-edit' element={<EditUser/>}/>
                <Route path='photographer/album/:id' element={<AlbumImages/>}/>
        </Routes>
    
    </div>
  )
}

export default SiteRoutes