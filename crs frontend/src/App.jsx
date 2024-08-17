import './App.css';
import RegisterUser from './Pages/User-Pages/register';
import Home from './Pages/User-Pages/home';
import { ToastContainer } from 'react-toastify'
import { Routes, Route  } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css'
import Complaints from './Pages/User-Pages/complaints';
import Status from './Pages/User-Pages/status';
import History from './Pages/User-Pages/history';
import UpdateComplaint from './Pages/User-Pages/update'
import Contact from './Pages/User-Pages/contact';
import ComplaintDetails from './Components/complaint_details';
import AdminHome from './Pages/Admin-Pages/admin_home';
import AdminComplaints from './Pages/Admin-Pages/admin_complaints';
import AdminPoliceStations from './Pages/Admin-Pages/admin_police_stations';
import UpdatePoliceStation from './Pages/Admin-Pages/update_police_station';
import AdminPoliceOfficers from './Pages/Admin-Pages/admin_police_officers';
import AdminInquires from './Pages/Admin-Pages/admin_inquries';
import AddPoliceStation from './Components/Admin-Components/add_police_station';
import AddPoliceOfficer from './Components/Admin-Components/add_police_officer';
import PoliceHome from './Pages/Police-Pages/police_home';
import PoliceComplaints from './Pages/Police-Pages/police_complaints';
import PoliceOfficers from './Pages/Police-Pages/police_officers';
import PoliceInquires from './Pages/Police-Pages/police_inquires';
import ComplaintDetailsUser from './Pages/User-Pages/complaint_details';
import UserLogin from './Pages/User-Pages/login';
import PoliceLogin from './Pages/Police-Pages/police_login';
import AdminLogin from './Pages/Admin-Pages/admin_login';
import PoliceProtection from './Pages/Police-Pages/police_protection';
function App() {
  return (
    <div className="App">
    <Routes>
    <Route path='/' element={<Home />} /> 
    <Route path='/login/user' element={<UserLogin />} />
    <Route path='/login/admin' element={<AdminLogin />} />
    <Route path='/login/police' element={<PoliceLogin />} />
    <Route path='/register' element={<RegisterUser />} />
    <Route path='/home' element={<Home />} />
    <Route path='/complaints' element={<Complaints />} />
    <Route path='/status' element={<Status />} />
    <Route path='/history' element={<History />} />
    <Route path="/updateComplaint/:complaintId" element={<UpdateComplaint />} />
    <Route path='/contact' element={<Contact />} />
    <Route path='/view' element={<ComplaintDetails />} />
    <Route path='/viewDetails' element={<ComplaintDetailsUser />} />
    <Route path='/admin-home' element={<AdminHome />} />
    <Route path='/admin-complaints' element={<AdminComplaints />} />
    <Route path='/admin-police-stations' element={<AdminPoliceStations />} />
    <Route path='/add-police-station' element={<AddPoliceStation />} />
    <Route path="/update-police-station/:id" element={<UpdatePoliceStation />} />
    <Route path='/add-police-officer' element={<AddPoliceOfficer />} />
    <Route path='/admin-police-officers' element={<AdminPoliceOfficers />} />
    <Route path='/admin-users-inquires' element={<AdminInquires />} />
    <Route path='/police-home' element={<PoliceProtection><PoliceHome /></PoliceProtection>} />
    <Route path='/police-complaints' element={<PoliceProtection><PoliceComplaints /></PoliceProtection>} />
    <Route path='/police-officers' element={<PoliceProtection><PoliceOfficers /></PoliceProtection>} />
    <Route path='/police-users-inquires' element={<PoliceProtection><PoliceInquires /></PoliceProtection>} />
    
    </Routes>
    <ToastContainer />
    </div>
  );
}

export default App;
