import { useEffect, useRef, useState } from "react"
import DropListComp from "./DropListComp"
import HomeTask from "./HomeTask"
import { NavLink, Outlet, useNavigate, useOutletContext, useParams } from "react-router-dom"
import ModelForView from "./Model"
import useDataApi from "../CustomHook/useDataApi"
import useGroupList from "../CustomHook/useGroupList"
const Home = (props) => {
    let context = useOutletContext()
    var { id } = useParams()
    const { JobinProject, setJobinProject, setprojectData, setListUser, projectData, ListUser, LoginId } = context
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
    const [CN, setCN] = useState("");
    let Nav = useNavigate()
    const [show, setShow] = useState(false);
    //Project tham gia cua nguoi dang nhap
    const ProjectJoin = UserSignInData ? projectData.filter(x => UserSignInData.ProjectJoin.includes(parseInt(x.ProjectId))) : []
    //Job trong project co nguoi dung join
    const ListJobJoin = UserSignInData ? JobinProject.filter(x => UserSignInData.JobJoin.includes(x.id)) : []
    //danh sach job gan tag quan trong
    const FavJobList = ListJobJoin ? ListJobJoin.filter(x => UserSignInData.JobFav.includes(x.id)) : []
    const handelTaskClick = (JobId) => {
        Nav("/WorkSpace/" + JobId)
    }
    const handleClose = () => setShow(false);
    const handleShow = (e, project) => {
        setCN({
            codeName: e,
            Project: project


        })
        setShow(true);
    }
    let group = useGroupList(ListJobJoin)
    useEffect(() => {
    }, [projectData])
    return (<>
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
                        <DropListComp handelTaskClick={handelTaskClick} JobinProject={ListJobJoin}>
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
                                ProjectJoin.reverse().map((i, index) => {
                                    return (<>
                                        <HomeTask key={i.project} handleShow={handleShow} handelTaskClick={handelTaskClick} CodeName="" title={i.ProjectName} Project={i} Data={ListJobJoin} userFav={UserSignInData.JobFav} ChangeStar={HandleChangeFav} ></HomeTask>
                                    </>
                                    )
                                })
                            }

                        </>
                        :
                        <>

                            <HomeTask handelTaskClick={handelTaskClick} title="Tạo mới project" CodeName="_Create" Data={null} userFav={UserSignInData.JobFav} ChangeStar={HandleChangeFav}></HomeTask>
                            <div className="Star rightcontent d-flex">
                                <i className="fa fa-plus" aria-hidden="true"></i>

                                &nbsp;
                                <h2>Bạn chưa tham gia project nào?
                                </h2>

                            </div>
                            <div className="TaskComp d-flex">
                                <div className="TaskComp_Child bg-secondary" onClick={() => handleShow('CP')} >
                                    <h5>Tạo project mới </h5>
                                    <div className="Bottom">
                                        <i className="fa fa-arrow-right" aria-hidden="true"></i>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                </div></> : "dang nhap di"}
            <ModelForView handleShow={handleShow} handleClose={handleClose} Title={"Thêm mới "} CN={CN} show={show} ></ModelForView>
        </div>
    </>)
}
export default Home