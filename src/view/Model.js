import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import useSubmiFormCustom from '../CustomHook/SubmitFormCustom';
import { CardContent, AddNewProjectContent, AddNewMemberToProject, AddNewJobInProject, Noti } from './ModelContent';
import useDataApi from '../CustomHook/useDataApi';
import { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useOutletContext } from 'react-router-dom';
import { Alert } from 'bootstrap';

const ModelForView = (props) => {
    // UserSignInData, setUserSignInData,
    let context = useOutletContext()
    const { JobinProject, setJobinProject, projectData, setprojectData, ListUser, setListUser, Task, setTask, SetCard, Card, noti, setnoti, LoginId } = context
    let { handleShow, handleClose, show, CN, Title, DataCard } = props
    const { handleSubmit, inputs } = useSubmiFormCustom(handleClose)
    const [stateCodeName, setStateCodeName] = useState()
    useEffect(() => {
        setStateCodeName(CN.codeName)
    }, [CN])
    const [saveProject, setsaveProject] = useState({})
    const convertArrayToint = (array) => {
        let IntType = []
        array.map(item => {
            IntType.push(parseInt(item))
        })
        return IntType;

    }
    const OnSubmit = (e, valid) => {
        let data = handleSubmit(e)
        if (data && !data.ProjectMember) {
            if (data.ProjectName) {
                setsaveProject(data)
                setStateCodeName("PJMB")
                valid.current.nextElementSibling.style.display = "none"
            } else {
                valid.current.nextElementSibling.style.display = "block"
            }

        }
        else if (data && data.ProjectMember) {
            let prj = [...projectData]
            if (data.ProjectMember) {
                data.ProjectMember = convertArrayToint(data.ProjectMember.split(","))
                data.ManageUserId = convertArrayToint(data.ManageUserId.split(","))
                prj.push(data)
                data.ProjectMember.map((item) => {
                    let index = ListUser.findIndex(x => x.UserId == item)
                    if (index > -1) {
                        ListUser[index].ProjectJoin.push(parseInt(data.ProjectId))
                        if (data.ManageUserId.includes(ListUser[index].UserId)) {
                            ListUser[index].ManageProjectId.push(parseInt(data.ProjectId))
                        }
                        setListUser([...ListUser])
                    }
                })
            }
            toast.success("Tạo mới thành công project !")
            setprojectData(prj)
            handleClose()
            setsaveProject(null)
            setStateCodeName(CN.codeName)
        }
    }
    const OnSubmitJob = (e, valid) => {
        let JobData = handleSubmit(e)
        if (JobData.title) {
            valid.current.nextElementSibling.style.display = "none"
            let JobList = [...JobinProject]
            if (JobData.Member) {
                JobData.id = parseInt(JobData.id)
                JobData.ProjectId = parseInt(JobData.ProjectId)
                JobData.CreateId = parseInt(JobData.CreateId)
                JobData.Member = convertArrayToint(JobData.Member.split(","))
                JobData.JobManageId = convertArrayToint(JobData.JobManageId.split(","))
                JobData.Member.map((item) => {
                    let index = ListUser.findIndex(x => x.UserId == item)
                    if (index > -1) {
                        ListUser[index].JobJoin.push(parseInt(JobData.id))
                        setListUser([...ListUser])
                    }
                })
            }
            JobList.push(JobData)
            setJobinProject(JobList)
            let taskId = Math.floor(Math.random() * 100) + 1;
            let TaskData = {
                taskName: "Task quản lý",
                taskId: taskId,
                JobId: JobData.id,
                ManageTask: true,
                createDate: Date.now(),
                userCreateId: JobData.CreateId,
            }
            setTask([...Task, TaskData])
            let CardList = {
                cardId: Math.floor(Math.random() * 100) + 1,
                taskId: taskId,
                JobId: JobData.id,
                Describe: "",
                cardName: "Thẻ chính",
                CheckListId: [],
                AttachFileId: [],
                LabelInCard: [],
                MemberInCardId: JobData.JobManageId,
                deadLine: null,
                Complete: false,
                userCreateId: JobData.CreateId,
                createDate: Date.now(),
                abledelete: false,

            }
            SetCard([...Card, CardList])
            let notiChill = {
                notiId: Math.floor(Math.random() * 100) + 1,
                taskId: null,
                JobId: JobData.id,
                cardId: null,
                actionName: "project được tạo",
                creatDate: Date.now(),
                userCreateId: LoginId,
                checked: false
            }
            setnoti([...noti, notiChill])
            toast.success("Tạo mới thành công công việc !")
            handleClose()
        } else {
            valid.current.nextElementSibling.style.display = "block"
        }
    }
    return (
        <>
            <Modal show={show} onHide={() => {
                handleClose()
                setsaveProject(null)
                setStateCodeName(CN.codeName)
            }}>
                <Modal.Header style={CN.CardData?.abledelete ? {} : { width: "100%", border: "none" }} closeButton>
                    <Modal.Title >{Title}</Modal.Title>
                </Modal.Header>
                {
                    CN.CardData && !CN.CardData.abledelete &&
                    <div className='manegeTab'>
                        <ul className="nav nav-tabs" style={{ width: "100%" }}>
                            <li className="nav-item">
                                <a className={stateCodeName == "CT" ? "nav-link active" : "nav-link"} onClick={() => setStateCodeName("CT")} href="#">Thẻ chính</a>
                            </li>
                            <li className="nav-item">
                                <a className={stateCodeName == "CT_NT" ? "nav-link active" : "nav-link"} onClick={() => setStateCodeName("CT_NT")} href="#">Thông báo</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled" onClick={() => { alert("workingg") }} href="#">Phê duyệt</a>
                            </li>
                        </ul>
                    </div>
                }
                <Modal.Body>
                    {
                        {
                            'CP': <AddNewProjectContent OnSubmit={OnSubmit} />,
                            'CT': <CardContent OnSubmit={OnSubmit} handleClose={handleClose} CardData={CN.CardData} />,
                            'JIP': <AddNewJobInProject Project={CN.Project} OnSubmit={OnSubmitJob} />,
                            'PJMB': <AddNewMemberToProject Project={saveProject} OnSubmit={OnSubmit} />,
                            "CT_NT": <Noti handleShow={handleShow} noti={noti} jobId={CN.jobId}></Noti>
                        }[stateCodeName]
                    }
                </Modal.Body>
            </Modal>
        </>
    );
}
export default ModelForView