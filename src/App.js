import Home from "./view/Home";
import NavComp from "./view/NavComp";
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import 'font-awesome/css/font-awesome.min.css';
import { useEffect, useState } from "react";
import { Outlet, Route, Routes } from "react-router-dom";
function App() {
  let [UserData, setUserData] = useState({
    UserId: 2,
    UserName: "Luong Trung Hung",
    ProjectJoin: [1, 2, 3, 4, 0],
    ProjectFav: [3],
    CreatedProject: [3]
  })

  let HandleChangeFav = (data) => {
    let ListFav = { ...UserData }
    if (data) {
      if (data && ListFav.ProjectFav.includes(data.data.id)) {
        const index = ListFav.ProjectFav.indexOf(data.data.id);
        if (index > -1) {
          ListFav.ProjectFav.splice(index, 1);
        }
      } else if (data && !ListFav.ProjectFav.includes(data.data.id)) {
        ListFav.ProjectFav.push(data.data.id)
      }
      setUserData(ListFav)
    }


  }
  return (

    <div className="App">
      <header className="App-header">
        <NavComp UserData={UserData}></NavComp>
      </header>
      <Routes>
        <Route path="/" element={<Home UserData={UserData} HandleChangeFav={HandleChangeFav}></Home>}>
        </Route>
        <Route path="/Home" element={<Home UserData={null} HandleChangeFav={HandleChangeFav}></Home>}>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
