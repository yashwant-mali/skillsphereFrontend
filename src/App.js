import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import React, { Suspense, useEffect, useState } from 'react';


// const Home = React.lazy(() => import('./Components/Navbar/Home'));
import Home from './Components/Navbar/Home';
import Info from './Components/Navbar/Info';
import Navbar from './Components/Navbar/Navbar';
import Profile from './Components/Navbar/Profile';
import Login from './Components/Users/Login';
import Register from './Components/Users/Register';
import Details from './Components/Details/Details';
import Teacher from './Components/Details/Teacher';
import NewTeacher from './Components/Details/NewTeacher';
// 🧠 MUI imports
import { CssBaseline, Box } from '@mui/material';
import NewSkill from './Components/HomePage/Skill/NewSkill';
import SkillList from './Components/HomePage/SelectSkill/SkillList';
// import TeacherDetails from './Components/Details/TeacherDetails';
const TeacherDetails = React.lazy(() => import('./Components/Details/TeacherDetails')); //lazy Loaded


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [userData, setUserData] = useState({ name: '', email: '', dob: '', gender: '', country: '', password: '' });


  useEffect(() => {
    // changing this for temp  correct is -> setIsLoggedIn(!!formData.email && !!formData.password);
    setIsLoggedIn(!formData.email && !formData.password);
    // console.log(formData.email, formData.password + " from app now");
  }, [formData]);

  const updateFormData = ({ email, password }) => setFormData({ email, password });
  const updateRegisterUserData = user => setUserData(user);

  return (
    <Router>
      <CssBaseline />
      {isLoggedIn && <Navbar formData={formData} setFormData={setFormData} setIsLoggedIn={setIsLoggedIn} />}

      <Box
        sx={{
          width: '100%',
          minHeight: '100vh',
          background: 'linear-gradient(to right, #e0f7fa, #fce4ec)',
          backgroundAttachment: 'fixed',
        }}
      >
        <Routes>
          {isLoggedIn ? (
            <Route path="/" element={<Navigate to="/home" />} />
          ) : (
            <Route path="/" element={<Login onFormChange={updateFormData} />} />
          )}
          <Route path="/home" element={isLoggedIn ? <Home isLoggedIn={isLoggedIn} /> : <Login onFormChange={updateFormData} />} />
          <Route path="/info" element={isLoggedIn ? <Info /> : <Login onFormChange={updateFormData} />} />
          <Route path="/profile" element={isLoggedIn ? <Profile formData={formData} /> : <Login onFormChange={updateFormData} />} />
          <Route path="/register" element={<Register OnUserRegistered={updateRegisterUserData} />} />
          <Route path="/details/:name" element={isLoggedIn ? <Details /> : <Login onFormChange={updateFormData} />} />
          <Route path="/newSkill" element={isLoggedIn ? <NewSkill /> : <Login onFormChange={updateFormData} />} />
          <Route path="/newTeacher" element={isLoggedIn ? <NewTeacher /> : <Login onFormChange={updateFormData} />} />
          <Route path="/details/:name/:institute" element={
            <Suspense fallback={<div>Loading About...</div>}>
              {isLoggedIn ? <TeacherDetails /> : <Login onFormChange={updateFormData} />}
            </Suspense>
          } />
          <Route path="/SkillList/:skillType" element={isLoggedIn ? <SkillList /> : <Login onFormChange={updateFormData} />} />
          {/*- Techer Details component lazy loading is in its element content because we want to use lazy loading for only one component 
  - if we wanted to use lazy loading for all components then we directly bind all components in <suspend><allComponents/></suspend>
*/}
        </Routes>

      </Box>
    </Router>
  );
}

export default App;
