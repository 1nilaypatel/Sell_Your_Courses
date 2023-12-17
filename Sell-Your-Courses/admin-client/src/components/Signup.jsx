import {Card, Typography, Button, TextField} from '@mui/material';
import {useState} from 'react';
import axios from 'axios';
import {BASE_URL} from '../config.js';
import {useNavigate} from 'react-router-dom';
import {useSetRecoilState} from 'recoil';
import {userState} from "../store/atoms/user.js"


function Signup(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);

  return <div>
    <div style={{paddingTop: 150, marginBottom: 10, display: "flex", justifyContent: "center"}}>
      <Typography variant={"h6"}>
        Welcome to Coursera. SignUp below
      </Typography>
    </div>

    <div style={{display: "flex", justifyContent: "center"}}>
      <Card variant={"outlined"} style={{width: 400, padding: 20}}>
        <TextField 
          style={{marginBottom: 20}}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          fullWidth={true}
          label={"Email"}
          variant={"outlined"}
        />

        <TextField 
          style={{marginBottom: 20}}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          fullWidth={true}
          label={"Password"}
          variant={"outlined"}
          type={"password"}
        />

        <Button
          size={"large"}
          variant={"contained"}
          onClick={async() => {
            const response = await axios.post(`${BASE_URL}/admin/signup`, {
              username: email,
              password: password
            });
            let data = response.data;
            localStorage.setItem("token", data.token);
            setUser({userEmail: email, isLoading: false});
            navigate("/courses");
          }}
        >Signup</Button>
      </Card>
    </div>
  </div>
}

export default Signup;