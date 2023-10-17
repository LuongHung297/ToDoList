import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './Custom.css'
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './view/Home';
import JobWorkSpace from './view/JobWorkSpace';
import 'typeface-roboto'
import { SignModul, SignIn, SignUp, ForgotPass } from './view/SignIn';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<SignModul></SignModul>}>
          <Route path={"/"} element={<SignIn />} />
          <Route path={"/SignUp"} element={<SignUp />} />
          <Route path={"/ForgotPass"} element={<ForgotPass />} />
        </Route>
        <Route path='/ProjectPage' element={<App></App>}>
          <Route path={`/ProjectPage/WorkSpace/:id`} element={<JobWorkSpace></JobWorkSpace>}>
          </Route>
          <Route path={`/ProjectPage/:id`} element={<Home ></Home>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
