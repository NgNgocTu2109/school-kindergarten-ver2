import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // 🛠️ BẠT BUỘC phải có dòng này!
import 'react-toastify/dist/ReactToastify.css';
import './App.css'; // 👉 thêm dòng này
import Home from '../src/components/Home';
import ChooseUser from '../src/components/ChooseUser';
import AdminSignIn from './components/AdminSignIn';
import StudentSignIn from './components/StudentSignIn';
import TeacherSign from './components/TeacherSignIn';
import About from './components/About'; // hoặc '../src/components/About' nếu bạn để ở đó
import News from './components/News';



//import Dashboard 
import AdminDashboard from './pages/Admin/Dashboard';   
import StudentDashboard from './pages/Students/Dashboard';
import TeacherDashboard from './pages/Teachers/Dashboard';

//import Admin Section
import Classes from './pages/Admin/Classes';
import Performance from './pages/Admin/Performance';
import Teachers from './pages/Admin/Teachers';
import Assignments from './pages/Admin/Assignment';
import Library from './pages/Admin/Library';
import SettingsProfile from './pages/Admin/SettingsProfile';
import Announcement from './pages/Admin/Announcement';
import Statistics from './pages/Admin/Statistics';
import Children from './pages/Admin/Children';
import AdminMenu from './pages/Admin/AdminMenu';
import ServiceManagement from './pages/Admin/ServiceManagement';
import MonthlyBill from './pages/Admin/MonthlyBill';
import AdminEventManager from "./pages/Admin/AdminEventManager";





//import Student Section
import StudentAssignments from './pages/Students/Assignments';
import PerformanceSection from './pages/Students/Performance';
import LibrarySection from '../src/pages/Students/Library';
import AnnouncementSection from './pages/Students/Announcement';
import ProfileSection from './pages/Students/Profile';
import StudentAttendance from "./pages/Students/StudentAttendance";
import StudentRegisterService from './pages/Students/StudentRegisterService';
import StudentMonthlyBill from './pages/Students/StudentMonthlyBill';
import StudentMessages from './pages/Students/StudentMessages';
import StudentEvents from "./pages/Students/StudentEvents";




//import Teacher Section
import ClassSection from './pages/Teachers/Classes';
import CheckPerformanceSection from './pages/Teachers/Performance';
import TeacherProfileSection from './pages/Teachers/Profile';
import CheckAnnouncementSection from './pages/Teachers/Announcement';
import AssignmentSection from './pages/Teachers/Assignments';
import Attendance from './pages/Teachers/Attendance';
import TeacherMenu from './pages/Teachers/TeacherMenu';
import TeacherMessages from './pages/Teachers/TeacherMessages';
import TeacherEvents from "./pages/Teachers/TeacherEvents";



function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/choose-user' element={<ChooseUser/>} />
        <Route path='/about' element={<About />} />
        <Route path='/news' element={<News />} />

        



{/*sign in */}
        <Route exact path='/admin-signIn' element={<AdminSignIn/>} />
        <Route exact path='/student-signIn' element={<StudentSignIn/>} />
        <Route exact path='/teacher-signIn' element={<TeacherSign/>} />

{/*dashboard */}
        <Route  path='/admin/dashboard' element={<AdminDashboard/>} />
        <Route  path='/student/dashboard' element={<StudentDashboard/>} />
        <Route  path='/teacher/dashboard' element={<TeacherDashboard/>} />

{/*admin section */}
        <Route exact path='/admin/classes' element={<Classes/>} />
        <Route exact path='/admin/performance' element={<Performance/>} />
        <Route exact path='/admin/teachers' element={<Teachers/>} />
        <Route exact path='/admin/assignments' element={<Assignments/>} />
        <Route exact path='/admin/library' element={<Library/>} />
        <Route exact path='/admin/communication' element={<Announcement/>} />
        <Route exact path='/admin/settings' element={<SettingsProfile/>} />
        <Route exact path='/admin/statistics' element={<Statistics />} />
        <Route exact path="/admin/children" element={<Children />} />
        <Route exact path="/admin/menu" element={<AdminMenu />} />
        <Route path="/admin/services" element={<ServiceManagement />} />
        <Route exact path="/admin/fees" element={<MonthlyBill />} />
        <Route exact path="/admin/events" element={<AdminEventManager />} />








{/*student section */}
        <Route exact path='/student/assignments' element={<StudentAssignments/>} />   
        <Route exact path='/student/performance' element={<PerformanceSection/>} />
        <Route exact path="/student/library" element={<LibrarySection />} />
        <Route exact path='/student/communication' element={<AnnouncementSection/>} />
        <Route exact path='/student/settings' element={<ProfileSection/>} />
        <Route exact path="/student/attendance" element={<StudentAttendance />} />
        <Route path="/student/services" element={<StudentRegisterService />} />
        <Route path="/student/bills" element={<StudentMonthlyBill />} />
        <Route exact path="/student/messages" element={<StudentMessages />} />
        <Route path="/student/events" element={<StudentEvents />} />


  

  {/*teacher section */}
        <Route exact path='/teacher/classes' element={<ClassSection />} />
        <Route exact path='/teacher/assignments' element={<AssignmentSection />} />
        <Route exact path='/teacher/performance' element={<CheckPerformanceSection />} />
        <Route exact path='/teacher/communication' element={<CheckAnnouncementSection />} />
        <Route exact path='/teacher/settings' element={<TeacherProfileSection/>} />    
        <Route path="/teacher/attendance" element={<Attendance />} />
        <Route path="/teacher/menu" element={<TeacherMenu />} />
        <Route path="/teacher/messages" element={<TeacherMessages />} />
        <Route path="/teacher/events" element={<TeacherEvents />} />


        </Routes>
       </Router>

       <ToastContainer position="top-right" autoClose={3000} /> {/* ✅ đặt ngoài Routes */}
    </>
  )
}


export default App
