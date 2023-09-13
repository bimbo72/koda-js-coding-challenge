import React, { Suspense } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";

import HomeScreen from "./../pages/HomeScreen";
import QuizScreen from "./../pages/QuizScreen";
import ResultScreen from "./../pages/ResultScreen";
const BaseRouter = (props) => {
  return (
    <>
      <Suspense fallback={<div></div>}>
        <Router>
          <Routes>
            {/* <Route path="/" exact element={<AdminLogin />} /> */}
            <Route path="/" exact element={<HomeScreen />} />
            <Route path="/quiz-screen" exact element={<QuizScreen />} />
            <Route path="/result-screen" exact element={<ResultScreen />} />
          </Routes>
        </Router>
      </Suspense>
    </>
  );
};
export default BaseRouter;
