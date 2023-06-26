import { useEffect, useState } from "react"
import DropListComp from "./DropListComp"
import HomeTask from "./HomeTask"
import { NavLink } from "react-router-dom"
import ModelForView from "./Model"

const Home = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { UserData, HandleChangeFav } = props
    const [starChange, setStarChange] = useState(null)
    const [fakeData, setfakeData] = useState([
        {
            id: 1,
            title: "Thiet ke ky thuat",
            CreatId: 1,
            CreatName: "Luong Hung"
        },
        {
            id: 2,
            title: "Thiet ke ky thuat true",
            CreatId: 1,
            CreatName: "Luong Hung"
        }, {
            id: 0,
            title: "Thiet ke ky thuat",
            CreatId: 1,
            CreatName: "Luong Hung"
        }, {
            id: 3,
            title: "Thiet ke ky thuat true 2",
            CreatId: 2,
            CreatName: "Luong Hung"
        }, {
            id: 4,
            title: "Thiet ke ky thuat",
            CreatId: 1,
            CreatName: "Luong Hung"
        },

    ])
    const handelTaskClick = () => {

    }
    return (<>
        <div className="topbar"></div>

        <div className="Content-Home m-auto  container d-flex">
            {UserData ? <>            <div className="LeftHomeContent">
                <div className="LeftContent_top">
                    <NavLink to="/" className="ListStyle">

                        <i className="fa fa-tasks mr-2" aria-hidden="true"></i>
                        &nbsp;
                        <span>
                            Projects
                        </span>
                    </NavLink>
                    <NavLink to="/Home" className="ListStyle">
                        <i className="fa fa-home mr-2" aria-hidden="true"></i>
                        &nbsp;
                        <span>
                            Home
                        </span>

                    </NavLink>
                </div>
                <div className="LeftContent_bottom">
                    <div className="NewWork ListStyle d-flex justify-content-between"><span>Thêm Mới Project</span><i className="fa fa-plus-circle" onClick={handleShow} aria-hidden="true"></i>
                    </div>
                    <div className="DropDownList ListStyle">

                        <DropListComp fakeData={fakeData.filter(x => UserData.ProjectJoin.includes(x.id))}>
                        </DropListComp>
                    </div>
                    {/* <div className="ListStyle" style={{ cursor: "pointer" }}>
                        <i className="fa fa-cog" aria-hidden="true"></i>
                        &nbsp;
                        setting
                    </div> */}
                </div>
            </div>
                <div className="LeftBar"></div>

                <div className="RightHomeContent">
                    {!UserData && UserData.ProjectJoin && UserData.ProjectJoin.length > 0 ?
                        <>
                            <HomeTask handelTaskClick={handelTaskClick} CodeName="_Star" title="Starred Tasks" favList={UserData.ProjectFav} fakeData={fakeData.filter(x => UserData.ProjectFav.includes(x.id))} ChangeStar={HandleChangeFav}></HomeTask>
                            <h2 >WorkSpaces
                            </h2>
                            <hr></hr>
                            <HomeTask handelTaskClick={handelTaskClick} title="Manage" CodeName="_Manage" favList={UserData.ProjectFav} fakeData={fakeData.filter(x => UserData.CreatedProject.includes(x.id))} ChangeStar={HandleChangeFav}></HomeTask>
                            <HomeTask handelTaskClick={handelTaskClick} title="Join" CodeName="_Join" favList={UserData.ProjectFav} fakeData={fakeData.filter(x => UserData.ProjectJoin.includes(x.id))} ChangeStar={HandleChangeFav}></HomeTask>
                        </>
                        :
                        <>

                            <HomeTask handelTaskClick={handelTaskClick} title="Tạo mới project" CodeName="_Create" favList={UserData.ProjectFav} fakeData={fakeData.filter(x => UserData.CreatedProject.includes(x.id))} ChangeStar={HandleChangeFav}></HomeTask>
                            <div className="Star rightcontent d-flex">
                                <i class="fa fa-plus" aria-hidden="true"></i>

                                &nbsp;
                                <h2>Bạn chưa tham gia project nào?
                                </h2>

                            </div>
                            <div className="TaskComp d-flex">
                                <div className="TaskComp_Child bg-secondary" onClick={() => handleShow()} >
                                    <h5>Tạo project mới </h5>
                                    <div className="Bottom">
                                        <i class="fa fa-arrow-right" aria-hidden="true"></i>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                </div></> : "dang nhap di"}
            <ModelForView codeName={"CP"} handleShow={handleShow} handleClose={handleClose} Title={"Thêm mới dự án "} show={show} ></ModelForView>
        </div>


    </>)
}
export default Home