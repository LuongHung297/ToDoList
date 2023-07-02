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

function App() {
  const { JobinProject, setprojectData, setListUser, projectData, ListUser, LoginId } = useDataApi()
  // UserSignInData, setUserSignInData,
  const UserSignInData = ListUser.find(x => x.UserId == LoginId)
  let HandleChangeFav = (data) => {
    let index = ListUser.findIndex(x => x.UserId == LoginId)
    if (data) {
      if (!ListUser[index].JobFav.includes(data.data.id))
        ListUser[index].JobFav.push(data.data.id)
      else {
        let indexDl = ListUser[index].JobFav.indexOf(data.data.id)
        if (indexDl > -1)
          ListUser[index].JobFav.splice(indexDl, 1)
      }
      setListUser([...ListUser])
    }
  }
  return (

    <div className="App">
      <header className="App-header">
        <NavComp UserData={UserSignInData}></NavComp>
      </header>
      <Routes>
        <Route path="/" element={<Home></Home>}>
        </Route>
        <Route path={`/ProjectPage/` + LoginId} element={<Home JobinProject={JobinProject} LoginId={LoginId} setprojectData={setprojectData} UserSignInData={UserSignInData} projectData={projectData} setListUser={setListUser} ListUser={ListUser} HandleChangeFav={HandleChangeFav}></Home>}>
        </Route>

      </Routes>
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
      <ToastContainer />    </div>
  );
}

export default App;
