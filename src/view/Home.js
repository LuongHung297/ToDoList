import { useEffect, useRef, useState } from "react"
import DropListComp from "./DropListComp"
import HomeTask from "./HomeTask"
import { NavLink, useNavigate } from "react-router-dom"
import ModelForView from "./Model"
import useDataApi from "../CustomHook/useDataApi"
import useGroupList from "../CustomHook/useGroupList"
import useSubmiFormCustom from "../CustomHook/SubmitFormCustom"
import { Nav } from "react-bootstrap"
const Home = (props) => {
    const [CN, setCN] = useState("");
    let Nav = useNavigate()
    const [show, setShow] = useState(false);
    const { LoginId, JobinProject, UserSignInData, ListUser, setListUser, setprojectData, projectData, HandleChangeFav } = props
    //Project tham gia cua nguoi dang nhap
    const ProjectJoin = UserSignInData ? projectData.filter(x => UserSignInData.ProjectJoin.includes(parseInt(x.ProjectId))) : []
    //Job trong project co nguoi dung join
    const ListJobJoin = UserSignInData ? JobinProject.filter(x => UserSignInData.JobJoin.includes(x.id)) : []
    //danh sach job gan tag quan trong
    const FavJobList = ListJobJoin ? ListJobJoin.filter(x => UserSignInData.JobFav.includes(x.id)) : []
    const handelTaskClick = () => {
        console.log(
            "help"
        )
        Nav("/Project/Insite")
    }
    const handleClose = () => setShow(false);
    const handleShow = (e) => {
        setCN(e)
        setShow(true);
    }
    let group = useGroupList(ListJobJoin)
    useEffect(() => {
    }, [projectData])
    return (<>
        <div className="topbar"></div>
        <div className="Content-Home m-auto  container d-flex">
            {UserSignInData ? <> <div className="LeftHomeContent">
                <div className="LeftContent_top">
                    <NavLink to="/" className="ListStyle">
                        <i className="fa fa-home mr-2" aria-hidden="true"></i>
                        &nbsp;
                        <span>
                            Home
                        </span>
                    </NavLink>
                    <NavLink to={"/ProjectPage/" + LoginId} className="ListStyle">
                        <i className="fa fa-tasks mr-2" aria-hidden="true"></i>
                        &nbsp;
                        <span>
                            Projects
                        </span>
                    </NavLink>

                </div>
                <div className="LeftContent_bottom">
                    <div className="NewWork ListStyle d-flex justify-content-between"><span>Thêm Mới Project</span><i className="fa fa-plus-circle" onClick={() => handleShow('CP')} aria-hidden="true"></i>
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
                                ProjectJoin.map((i, index) => {
                                    if (i.JobinProject)
                                        return <HomeTask handelTaskClick={handelTaskClick} CodeName="" title={i.ProjectName} ProjectId={i.ProjectId} Data={ListJobJoin} userFav={UserSignInData.JobFav} ChangeStar={HandleChangeFav} ></HomeTask>
                                    else {
                                        return (<>

                                            <div className="Star rightcontent d-flex">
                                                <i class="fa fa-plus" aria-hidden="true"></i>
                                                &nbsp;
                                                <h2>{i.ProjectName}
                                                </h2>
                                            </div>
                                            <div className="TaskComp d-flex">
                                                <div className="TaskComp_Child bg-secondary" onClick={() => handleShow("JIP")} >
                                                    <h5>Tạo công việc mới </h5>
                                                    <div className="Bottom">
                                                        <i class="fa fa-arrow-right" aria-hidden="true"></i>
                                                    </div>
                                                </div>
                                            </div></>)
                                    }

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
                                <div className="TaskComp_Child bg-secondary" onClick={() => handleShow('CP')} >
                                    <h5>Tạo project mới </h5>
                                    <div className="Bottom">
                                        <i class="fa fa-arrow-right" aria-hidden="true"></i>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                </div></> : "dang nhap di"}
            <ModelForView setListUser={setListUser} ListUser={ListUser} projectData={projectData} setprojectData={setprojectData} handleShow={handleShow} handleClose={handleClose} Title={"Thêm mới "} CN={CN} show={show} ></ModelForView>
        </div>


    </>)
}
export default Home