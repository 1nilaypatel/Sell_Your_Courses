import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import axios from 'axios';
import {RecoilRoot, useSetRecoilState} from 'recoil';
import {useEffect} from 'react';
import {BASE_URL} from './config.js';
import {userState} from './store/atoms/user.js';

import Appbar from './components/Appbar.jsx';
import Signup from './components/Signup.jsx';
import Signin from './components/Signin.jsx';
import AddCourse from './components/AddCourse.jsx';
import Courses from './components/Courses.jsx';
import Course from './components/Course.jsx';
import Landing from './components/Landing.jsx';

function App(){
  return (
    <RecoilRoot>
      <div style={{width: "100vw", height: "100vh", backgroundColor: "#eeeeee"}}>
        <Router>
          <Appbar />
          <InitUser />
          <Routes>
            <Route path={"/signup"} element={<Signup />} />
            <Route path={"/signin"} element={<Signin />} />
            <Route path={"/addcourse"} element={<AddCourse />} />
            <Route path={"/courses"} element={<Courses />} />
            <Route path={"/course/:courseId"} element={<Course />} />
            <Route path={"/"} element={<Landing />} />
          </Routes>
        </Router>
      </div>
    </RecoilRoot>
  );
}

function InitUser(){
  const setUser = useSetRecoilState(userState);
  const init = async() => {
    try{
      const response = await axios.get(`${BASE_URL}/admin/me`, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      })
      if(response.data.username){
        setUser({
          isLoading: false,
          userEmail: response.data.username
        })
      }
    }catch(err){
      setUser({
        isLoading: false,
        userEmail: null
      })
    }
  };

  useEffect(() => {
    init();
  }, []);

  return <div></div>
}

export default App;
