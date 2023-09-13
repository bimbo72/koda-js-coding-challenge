import React, { useState } from "react";
import { Grid } from "@mui/material";
import { gridSpacing } from "./../store/constant";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const QuizScreen = () => {
  // State management using useState hook
  const [questions, setQuestions] = useState([]);
  const [current_question_index, setCurrentQuestionIndex] = useState(0);

  const navigate = useNavigate();

  const submitAnswer = (event, answer) => {
    // Check if current question is the last question
    if (current_question_index < questions.length - 1) {
      // Proceed to next question
      questions[current_question_index].answer = answer ? "True" : "False";
      setCurrentQuestionIndex(current_question_index + 1);
    } else {
      // Navigate to result screen
      navigate("/result-screen", {
        state: { questions },
      });
    }
  };
  // Navigate to homescreen
  const homeScreen = async () => {
    navigate("/");
  };
  // Get question from the api
  const fetchData = () => {
    var config = {
      method: "get",
      url: `https://opentdb.com/api.php?amount=10&difficulty=easy&type=boolean`,
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios(config)
      .then(function (response) {
        if (response.data) {
          var results = response.data.results;
          if (results.length > 0) {
            var _data = [];
            var index = 0;
            results.forEach((item) => {
              _data[index] = {
                category: item.category,
                type: item.type,
                difficulty: item.difficulty,
                question: item.question,
                incorrect_answers: item.incorrect_answers,
                correct_answer: item.correct_answer,
                answer: "False",
              };
              index++;
            });
            setQuestions(_data);
          }
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  useState(() => {
    fetchData();
  }, []);
  // Render view
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={gridSpacing}>
        <Grid container spacing={3}>
          <Grid item xs></Grid>
          <Grid item xs={6}>
            <div className="App">
              <div className="App-header">
                <Button onClick={homeScreen} variant="contained">
                  Home
                </Button>
                <h3>
                  {questions.length > 0 ? (
                    questions[current_question_index].category
                  ) : (
                    <Box sx={{ display: "flex" }}>
                      <CircularProgress />
                    </Box>
                  )}
                </h3>

                <Card sx={{ minWidth: 275, padding: 10 }}>
                  <CardContent>
                    {questions.length > 0 ? (
                      <p
                        sx={{ fontSize: 30, textAlign: "center" }}
                        xs={{ fontSize: 11, textAlign: "center" }}
                        color="text.secondary"
                        gutterBottom
                      >
                        <div
                          dangerouslySetInnerHTML={{
                            __html:
                              current_question_index +
                              1 +
                              ". " +
                              questions[current_question_index].question,
                          }}
                        />
                      </p>
                    ) : (
                      ""
                    )}
                  </CardContent>
                </Card>
                <div style={{ flexDirection: "column", marginTop: 5 }}>
                  {questions.length > 0 ? (
                    <>
                      <Button
                        variant="contained"
                        onClick={(e) => submitAnswer(e, true)}
                        color="success"
                      >
                        True
                      </Button>
                      <Button
                        variant="contained"
                        onClick={(e) => submitAnswer(e, false)}
                        style={{ marginLeft: 5 }}
                        color="error"
                      >
                        False
                      </Button>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </Grid>
          <Grid item xs></Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default QuizScreen;
