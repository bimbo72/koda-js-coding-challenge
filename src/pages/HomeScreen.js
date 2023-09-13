import { Grid } from "@mui/material";
import { gridSpacing } from "./../store/constant";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const HomeScreen = () => {
  const navigate = useNavigate();
  // Navigate to quiz screen
  const quizScreen = async () => {
    navigate("/quiz-screen");
  };
  //Render view
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={gridSpacing}>
        <Grid container spacing={3}>
          <Grid item xs></Grid>
          <Grid item xs={6}>
            <div className="App">
              <div className="App-header">
                <h3>Welcome to the Trivia Challenge</h3>
                <p>
                  You will be presented with 10
                  <span className="primary"> True</span> or
                  <span className="danger"> False</span> questions.
                </p>
                <p>Can you score 100%?</p>
                <Button variant="contained" onClick={quizScreen}>
                  BEGIN
                </Button>
              </div>
            </div>
          </Grid>
          <Grid item xs></Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomeScreen;
