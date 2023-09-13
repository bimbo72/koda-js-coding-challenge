import * as React from "react";
import { Grid } from "@mui/material";
import { gridSpacing } from "./../store/constant";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useLocation, useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";

//Container Component
const Container = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
}));

const ResultScreen = () => {
  const navigate = useNavigate();
  //get questions from state
  const location = useLocation();
  const { state } = location;
  const questions = state && state.questions ? state.questions : [];
  var correct_answers = 0;
  // Check total corrent answers
  if (questions.length > 0) {
    questions.forEach((question) => {
      if (question.answer == question.correct_answer) {
        correct_answers++;
      }
    });
  }
  // Navigate to home screen
  const playAgain = () => {
    navigate("/");
  };
  // Render row question list
  const rowQuestion = (question, index) => {
    return (
      <ListItem>
        <ListItemIcon>
          {question.answer == question.correct_answer ? (
            <CheckIcon sx={{ color: "green" }} />
          ) : (
            <ClearIcon sx={{ color: "red" }} />
          )}
        </ListItemIcon>
        <ListItemText
          style={{ color: "black" }}
          primary={
            <div
              dangerouslySetInnerHTML={{
                __html: index + 1 + ". " + question.question,
              }}
            />
          }
        />
      </ListItem>
    );
  };
  // Render view
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={gridSpacing}>
        <Grid container spacing={3}>
          <Grid item xs></Grid>
          <Grid item xs={6}>
            <div className="App">
              <div className="App-header">
                <h2>
                  You scored {correct_answers}/{questions.length}
                </h2>
                <h3 sx={{ mt: 4, mb: 2 }}>Result</h3>
                <Container>
                  <List>
                    {questions.map((question, index) => {
                      return rowQuestion(question, index);
                    })}
                  </List>
                </Container>
                <Button
                  sx={{ mt: 4, mb: 2 }}
                  variant="contained"
                  onClick={playAgain}
                >
                  PLAY AGAIN?
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

export default ResultScreen;
