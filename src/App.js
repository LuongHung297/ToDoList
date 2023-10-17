import Home from "./view/Home";
import NavComp from "./view/NavComp";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'font-awesome/css/font-awesome.min.css';
import { useEffect, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import useDataApi from "./CustomHook/useDataApi";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import JobWorkSpace from "./view/JobWorkSpace";

function App() {
  const { noti, setnoti,
    fileAttach, setFileAttach, CheckList, setCheckList, Card, SetCard, LabelListState, setLabelListState,
    projectData, setprojectData, Task, setTask, CommentInCard, setCommentInCard, ListUser, setListUser, JobinProject, setJobinProject, LoginId } = useDataApi()
  const ApiData = useDataApi()
  // UserSignInData, setUserSignInData,
  const UserSignInData = ListUser.find(x => x.UserId == LoginId)
  return (
    <div className="App">
      <header className="App-header">
        <NavComp UserData={UserSignInData}></NavComp>
      </header>
      <div className="topbar"></div>
      <Outlet context={ApiData}></Outlet>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer /></div>
  );
}

export default App;
