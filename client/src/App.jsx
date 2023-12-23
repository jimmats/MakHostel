import './App.css';
import {Route, Routes} from "react-router-dom";
import IndexPage from './components/Layout/IndexPage';
import Login from './components/Login/LoginPage';
import Layout from './components/Layout/Layout';
import Register from './components/Register/RegisterPage';
import axios from "axios";
import UserContextProvider from './UserContext';
import ProfilePage from './components/Profile/ProfilePage';
import PlacesPage from './components/Places/PlacesPage';
import PlacesFormPage from './components/Places/PlacesFormPage';
import PlacePage from './components/Places/PlacePage';
import BookingsPage from './components/Bookings/BookingsPage';
import BookingPlace from './components/Bookings/BookingPlace';
import PlaceRoom from './components/PlaceRoom';
import RoomsPage from './components/Rooms/RoomsPage';
import AddRoomsForm from './components/Rooms/AddRoomsForm';
import RoomPage from './components/Rooms/RoomPage';
import RoomsDisplayPage from './components/Rooms/RoomsDisplayPage';
import RoomsBooked from './components/Rooms/RoomsBooked';


axios.defaults.baseURL = 'http://localhost:3000';
axios.defaults.withCredentials = true;

function App() {


  return (
      <UserContextProvider>
       <Routes>
       <Route path="/" element={<Layout />}>
        <Route index element={<IndexPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/account" element={<ProfilePage />} />
        <Route path="/account/places" element={<PlacesPage />} />
        <Route path="/account/mybookings" element={<RoomsBooked />} />
        <Route path="/account/places/new" element={<PlacesFormPage />} />
        <Route path="/account/places/:id" element={<PlacesFormPage />} />
        <Route path="/places/:id" element={<PlacePage />} />
        <Route path="/account/bookings" element={<BookingsPage />} />
        <Route path="/account/bookings/:id" element={<BookingPlace />} />
        <Route path="/places/:id/rooms" element={<PlaceRoom />} />
        <Route path="/rooms" element={<RoomsPage />} />
        <Route path="/places/rooms/new" element={<AddRoomsForm />} />
        <Route path="/account/rooms" element={<RoomsPage />} />
        <Route path="/account/rooms/:id" element={<AddRoomsForm />} />
        <Route path="/getallrooms" element={<RoomsDisplayPage />} />
        <Route path="/rooms/:id" element={<RoomPage />} />
        
      </Route>
      </Routes>
      </UserContextProvider>
  )
}

export default App;
