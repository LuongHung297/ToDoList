import Home from "./view/Home";
import NavComp from "./view/NavComp";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'font-awesome/css/font-awesome.min.css';
import { useEffect, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
import useDataApi from "./CustomHook/useDataApi";
function App() {
  const { JobinProject, UserSignInData, projectData, setprojectData, ListUser, setUserSignInData } = useDataApi()
  let HandleChangeFav = (data) => {
    let ListFav = { ...UserSignInData }
    if (data) {
      if (data && ListFav.JobFav.includes(data.data.id)) {
        const index = ListFav.JobFav.indexOf(data.data.id);
        if (index > -1) {
          ListFav.JobFav.splice(index, 1);
        }
      } else if (data && !ListFav.JobFav.includes(data.data.id)) {
        ListFav.JobFav.push(data.data.id)
      }
      setUserSignInData(ListFav)
    }
  }
  return (

    <div className="App">
      <header className="App-header">
        <NavComp UserData={UserSignInData}></NavComp>
      </header>
      <Routes>
        <Route path="/" element={<Home JobinProject={JobinProject} setprojectData={setprojectData} UserSignInData={UserSignInData} projectData={projectData} ListUser={ListUser} HandleChangeFav={HandleChangeFav}></Home>}>
        </Route>
        <Route path="/Home" element={<Home HandleChangeFav={HandleChangeFav}></Home>}>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
