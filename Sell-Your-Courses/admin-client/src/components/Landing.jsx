import {Grid, Typography, Button} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {useRecoilValue} from 'recoil';
import {userEmailState} from '../store/selectors/userEmail.js';
import {isUserLoading} from '../store/selectors/isUserLoading.js';

function Landing(){
  const navigate = useNavigate()
  const userEmail = useRecoilValue(userEmailState);
  const userLoading = useRecoilValue(isUserLoading);

  return <div>
    <Grid container style={{padding: "4vw"}}>
      <Grid item sm={12} md={4} lg={5}>
        <div style={{marginTop: 100}}>
          <Typography variant={"h2"}>
            Coursera Admin
          </Typography>
          <Typography variant={"h5"}>
            A place to learn, earn and grow
          </Typography>
          {!userLoading && !userEmail && <div style={{display: "flex", marginTop: 20}}>
            <div style={{marginRight: 10}}>
              <Button
                size={"large"}
                variant={"contained"}
                onClick={() => {
                  navigate("/signup")
                }}
              >Signup</Button>
            </div>
            <div>
              <Button
                size={"large"}
                variant={"contained"}
                onClick={() => {
                  navigate("/signin")
                }}
              >Signin</Button>
            </div>
          </div>}
        </div>
      </Grid> 
      <Grid item sm={12} md={8} lg={7} style={{marginTop: 20}}>
        <img src={"/class.jpeg"} width={"100%"} />
      </Grid>
    </Grid>
  </div>
}

export default Landing;