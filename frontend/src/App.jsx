import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import Exam from './pages/Admin/Exam';
import Attendance from './pages/Admin/Attendance';
import Performance from './pages/Admin/Performance';
import Teachers from './pages/Admin/Teachers';
import Students from './pages/Admin/Students';
import Assignments from './pages/Admin/Assignment';
import Library from './pages/Admin/Library';
import EventCalender from './pages/Admin/EventCalender';
import SettingsProfile from './pages/Admin/SettingsProfile';
import Announcement from './pages/Admin/Announcement';
import AdminExtracurricularSection from './pages/Admin/AdminExtracurricularSection';

//import Student Section
import StudentAssignments from './pages/Students/Assignments';
import ExamSection from './pages/Students/Exams';
import PerformanceSection from './pages/Students/Performance';
import AttendanceSection from './pages/Students/Attendance';
import LibrarySection from '../src/pages/Students/Library';
import AnnouncementSection from './pages/Students/Announcement';
import ProfileSection from './pages/Students/Profile';
import ExtracurricularSection from './pages/Students/ExtracurricularSection';


//import Teacher Section
import ClassSection from './pages/Teachers/Classes';
import StudentSection from './pages/Teachers/Students';
import TeacherSection from './pages/Teachers/Teachers';
import CheckPerformanceSection from './pages/Teachers/Performance';
import EventSection from './pages/Teachers/Events';
import TeacherProfileSection from './pages/Teachers/Profile';
import CheckAnnouncementSection from './pages/Teachers/Announcement';
import AssignmentSection from './pages/Teachers/Assignments';
import CheckAttendanceSection from './pages/Teachers/Attendance';
import CheckExamSection from './pages/Teachers/Exams';


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
        <Route exact path='/admin/exams' element={<Exam/>} />
        <Route exact path='/admin/attendance' element={<Attendance/>} />
        <Route exact path='/admin/performance' element={<Performance/>} />
        <Route exact path='/admin/teachers' element={<Teachers/>} />
        <Route exact path='/admin/students' element={<Students/>} />
        <Route exact path='/admin/assignments' element={<Assignments/>} />
        <Route exact path='/admin/library' element={<Library/>} />
        <Route exact path='/admin/communication' element={<Announcement/>} />
        <Route exact path='/admin/events' element={<EventCalender/>} />
        <Route exact path='/admin/settings' element={<SettingsProfile/>} />
        <Route exact path="/admin/extracurricular" element={<AdminExtracurricularSection />} />



{/*student section */}
        <Route exact path='/student/assignments' element={<StudentAssignments/>} />   
        <Route exact path='/student/exams' element={<ExamSection/>} />
        <Route exact path='/student/performance' element={<PerformanceSection/>} />
        <Route exact path='/student/attendance' element={<AttendanceSection/>} />
        <Route exact path="/student/library" element={<LibrarySection />} />
        <Route exact path='/student/communication' element={<AnnouncementSection/>} />
        <Route exact path='/student/settings' element={<ProfileSection/>} />
        <Route exact path='/student/extracurricular' element={<ExtracurricularSection />} />
  

  {/*teacher section */}
        <Route exact path='/teacher/classes' element={<ClassSection />} />
        <Route exact path='/teacher/students' element={<StudentSection />} />
        <Route exact path='/teacher/teachers' element={<TeacherSection />} />
        <Route exact path='/teacher/assignments' element={<AssignmentSection />} />
        <Route exact path='/teacher/exams' element={<CheckExamSection />} />
        <Route exact path='/teacher/performance' element={<CheckPerformanceSection />} />
        <Route exact path='/teacher/attendance' element={<CheckAttendanceSection />} />
        <Route exact path='/teacher/communication' element={<CheckAnnouncementSection />} />
        <Route exact path='/teacher/events' element={<EventSection />} />
        <Route exact path='/teacher/settings' element={<TeacherProfileSection/>} />
        </Routes>
       </Router>
    </>
  )
}


export default App
