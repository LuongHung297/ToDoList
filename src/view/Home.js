import { useEffect, useState } from "react"
import DropListComp from "./DropListComp"
import HomeTask from "./HomeTask"
import { NavLink } from "react-router-dom"
import ModelForView from "./Model"
import useDataApi from "../CustomHook/useDataApi"
import useGroupList from "../CustomHook/useGroupList"
import useSubmiFormCustom from "../CustomHook/SubmitFormCustom"
const Home = (props) => {
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { JobinProject, UserSignInData, ListUser, setprojectData, projectData, HandleChangeFav } = props
    const ListJobJoin = JobinProject.filter(x => UserSignInData.JobJoin.includes(x.id))
    const FavJobList = JobinProject.filter(x => UserSignInData.JobJoin.includes(x.id) && UserSignInData.JobFav.includes(x.id))
    const handelTaskClick = () => {

    }
    let group = useGroupList(ListJobJoin)
    const [show, setShow] = useState(false);
    useEffect(() => {
        console.log(projectData)


    }, [projectData])
    return (<>
        <div className="topbar"></div>

        <div className="Content-Home m-auto  container d-flex">
            {UserSignInData ? <>            <div className="LeftHomeContent">
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
                        <DropListComp JobinProject={ListJobJoin}>
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
                    {UserSignInData && UserSignInData.ProjectJoin && UserSignInData.ProjectJoin.length > 0 ?
                        <>
                            <HomeTask handelTaskClick={handelTaskClick} CodeName="_Star" title="Starred Jobs" Data={FavJobList} userFav={UserSignInData.JobFav} ChangeStar={HandleChangeFav}></HomeTask>
                            <h2 >WorkSpaces
                            </h2>
                            <hr></hr>
                            {
                                group.map((i, index) => {
                                    return <HomeTask handelTaskClick={handelTaskClick} CodeName="" title={projectData.find(x => x.ProjectId == index).ProjectName} Data={i} userFav={UserSignInData.JobFav} ChangeStar={HandleChangeFav} ></HomeTask>
                                })
                            }

                        </>
                        :
                        <>

                            <HomeTask handelTaskClick={handelTaskClick} title="Tạo mới project" CodeName="_Create" Data={null} userFav={UserSignInData.JobFav} ChangeStar={HandleChangeFav}></HomeTask>
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
            <ModelForView codeName={"CP"} projectData={projectData} setprojectData={setprojectData} handleShow={handleShow} handleClose={handleClose} Title={"Thêm mới dự án "} show={show} ></ModelForView>
        </div>


    </>)
}
export default Home