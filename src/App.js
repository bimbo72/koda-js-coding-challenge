import React from "react";
import { StyledEngineProvider } from "@mui/material";
import "./assets/css/style.css";
import BaseRouter from "./route/BaseRouter";

const App = () => {
  return (
    <>
      <StyledEngineProvider injectFirst>
        <BaseRouter />
      </StyledEngineProvider>
    </>
  );
};

export default App;
