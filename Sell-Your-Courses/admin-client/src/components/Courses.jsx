import {Card, Typography, Button} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import {useEffect, useState} from 'react';
import axios from 'axios';
import {BASE_URL} from '../config.js';
import {useNavigate} from 'react-router-dom';

function Courses(){
  const [courses, setCourses] = useState([]);

  const init = async() => {
    const response = await axios.get(`${BASE_URL}/admin/courses`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    setCourses(response.data.courses);
  }

  useEffect(() => {
    init();
  }, []);

  return <div style={{display: "flex", flexWrap: "wrap", justifyContent: "center"}}>
    {courses.map(course => {
      return <Course course={course} />
    })}
  </div>
}

function Course(props){
  const navigate = useNavigate();

  return <Card style={{margin: 10, width: 300, minHeight: 200, padding: 10}}>
    <Typography textAlign={"center"} variant="h5">{props.course.title}</Typography>
    <Typography textAlign={"center"} variant="subtitle1">{props.course.description}</Typography>
    <img src={props.course.imageLink} style={{width: 300}} ></img>
    <div style={{display: "flex", justifyContent: "center", marginTop: 20}}>
      <div style={{marginRight: "10px"}}>
        <Button 
          variant="contained"
          onClick={() => {
            navigate("/course/" + props.course._id);
          }}
        >Edit</Button>
      </div>
      <Button 
        startIcon={<DeleteIcon/>}
        color="error"
        variant="contained"
        onClick={() => {
          // navigate("/course/" + props.course._id);
        }}
      >Delete</Button>
    </div>
  </Card>
}

export default Courses;