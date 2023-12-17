import {Card, Typography, Button, TextField, Grid} from '@mui/material';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import {BASE_URL} from '../config.js';
import Loading from './Loading.jsx';
import {courseState} from '../store/atoms/course.js';
import {useSetRecoilState, useRecoilValue, useRecoilState} from 'recoil';
import {courseTitle, coursePrice, isCourseLoading, courseImage, courseDescription} from '../store/selectors/course';

function Course(){
  let {courseId} = useParams();
  const setCourse = useSetRecoilState(courseState);
  const courseLoading = useRecoilValue(isCourseLoading);

  const init = async () => {
    const response = await axios.get(`${BASE_URL}/admin/courses/${courseId}`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      }
    });
    setCourse({isLoading: false, course: response.data.course});
  }

  useEffect(() => {
    init();
  }, []);

  if(courseLoading){
    return <Loading />
  }

  return <div>
    <GrayTopper />
    <Grid container>
      <Grid item lg={8} md={12} sm={12}>
        <UpdateCard />
      </Grid>
      <Grid item lg={4} md={12} sm={12}>
        <CourseCard />
      </Grid>
    </Grid>
  </div>
}

function GrayTopper(){
  const title = useRecoilValue(courseTitle);
  return <div style={{height: 250, background: "#212121", top: 0, width: "100vw", zIndex: 0, marginBottom: -250}}>
    <div style={{height: 250, display: "flex", justifyContent: "center", alignItems: "center"}}>
      <Typography style={{color: "white", fontWeight: 600}} variant={"h3"}>
        {title}
      </Typography>
    </div>
  </div>
}

function UpdateCard(){
  const[courseDetails, setCourse] = useRecoilState(courseState);
  const[title, setTitle] = useState(useRecoilValue(courseTitle));
  const [description, setDescription] = useState(courseDetails.course.description);
  const [image, setImage] = useState(courseDetails.course.imageLink);
  const [price, setPrice] = useState(courseDetails.course.price);

  return <div style={{display: "flex", justifyContent: "center"}}>
    <Card variant={"outlined"} style={{maxWidth: 600, marginTop: 200}}>
      <div style={{padding: 20}}>
        <Typography style={{marginBottom: 10}}>
          Update Course Details
        </Typography>

        <TextField
          value={title}
          style={{marginBottom: 10}}
          onChange={(e) => {
              setTitle(e.target.value)
          }}
          fullWidth={true}
          label={"Title"}
          variant={"outlined"}
        />

        <TextField
          value={description}
          style={{marginBottom: 10}}
          onChange={(e) => {
              setDescription(e.target.value)
          }}
          fullWidth={true}
          label={"Description"}
          variant={"outlined"}
        />

        <TextField
          value={image}
          style={{marginBottom: 10}}
          onChange={(e) => {
              setImage(e.target.value)
          }}
          fullWidth={true}
          label={"Image Link"}
          variant={"outlined"}
        />

        <TextField
          value={price}
          style={{marginBottom: 10}}
          onChange={(e) => {
              setPrice(e.target.value)
          }}
          fullWidth={true}
          label={"Price"}
          variant={"outlined"}
          type={"number"}
        />
        
        <Button
          variant="contained"
          onClick={async () => {
            axios.put(`${BASE_URL}/admin/courses/${courseDetails.course._id}`, {
              title: title,
              description: description,
              imageLink: image,
              published: true,
              price: price
            }, {
              headers: {
                "Content-type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`
              }
            });
            let updatedCourse = {
              _id: courseDetails.course._id, // id will be same as previous
              title: title,
              description: description,
              imageLink: image,
              price: price
            };
            setCourse({course: updatedCourse, isLoading: false});
          }}
        > Update course</Button>
      </div>
    </Card>
  </div>
}

function CourseCard(){
  const title = useRecoilValue(courseTitle);
  const imageLink = useRecoilValue(courseImage);
  const price = useRecoilValue(coursePrice);
  const description = useRecoilValue(courseDescription);

  return <div style={{display: "flex",  marginTop: 50, justifyContent: "center", width: "100%"}}>
    <Card style={{margin: 10, marginRight: 50, width: 350, minHeight: 200, borderRadius: 20, paddingBottom: 15, zIndex: 2}}>
      <div style={{ display: "flex" ,justifyContent: "center", flexDirection: "column", marginLeft: "25px", marginTop: "10px"}}>
        <Typography variant={"h5"}>
          {title}
        </Typography>
        <Typography variant={"subtitle1"}>
          {description}
        </Typography>
        <Typography variant={"subtitle1"}>
          <b>Rs {price} </b>
        </Typography>
        <img src={imageLink} style={{width: 300}} />
      </div>
    </Card>
  </div>
}

export default Course;