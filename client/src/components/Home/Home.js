import React from "react";
import homeLogo from "../../Assets/informatio_technology.png";

// import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import ProgressLine from "./ProgressLine";
import AccordionGroup from "./AccordionGroup";

function Home() {
  const [checked, setChecked] = React.useState(false);
  React.useEffect(() => {
    setChecked(true);
  }, []);

  return (
    <>
      <div style={{
        display: "flex", justifyContent: 'space-between', height: '91vh'
      }}>
          <Grid style={{
            padding: "180px 80px", width: "50%",
            backgroundColor: '#27005D',
            borderBottomRightRadius: '70%',
            borderBottomLeftRadius: '5%'

          }} item xs={12} md={6}>
            <Typography variant="h4" style={{ color: 'white' }} gutterBottom>
              Welcome to Department of Information Technology
              <div class="animation-container">
                <div class="lightning-container">
                  <div class="lightning white"></div>
                  <div class="lightning red"></div>
                </div>
                <div class="boom-container">
                  <div class="shape circle big white"></div>
                  <div class="shape circle white"></div>
                  <div class="shape triangle big yellow"></div>
                  <div class="shape disc white"></div>
                  <div class="shape triangle blue"></div>
                </div>
                <div class="boom-container second">
                  <div class="shape circle big white"></div>
                  <div class="shape circle white"></div>
                  <div class="shape disc white"></div>
                  <div class="shape triangle blue"></div>
                </div>
              </div>
            </Typography>
            <Typography style={{ marginTop: "40px", color: 'white' }} variant="body1" paragraph>
              The Department is established in 2014 with intake capacity of 60. In Information Technology Department besides imparting theoretical knowledge, a lot of stress is laid on hands-on training and overall development of the individual's personality.
            </Typography>
            <Button variant="contained" color="primary" size="large">
              Get Started
            </Button>
          </Grid>
        <Grid item xs={12} md={6}>
          <img
            src={homeLogo}
            alt="IT"
            style={{ width: '100%', height: '80vh' }}
          />
        </Grid>
      </div>
      <ProgressLine />
      <AccordionGroup />
    </>
  );
}

export default Home;
