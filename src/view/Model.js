import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import useSubmiFormCustom from '../CustomHook/SubmitFormCustom';
import { CardContent, AddNewProjectContent, AddNewMemberToProject, AddNewJobInProject } from './ModelContent';
import useDataApi from '../CustomHook/useDataApi';
import { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useOutletContext } from 'react-router-dom';

const ModelForView = (props) => {
    // UserSignInData, setUserSignInData,
    let context = useOutletContext()
    const { JobinProject, setJobinProject, projectData, setprojectData, ListUser, setListUser, Task, setTask } = context
    let { handleShow, handleClose, show, CN, Title } = props
    const { handleSubmit, inputs } = useSubmiFormCustom(handleClose)
    const [stateCodeName, setStateCodeName] = useState()
    useEffect(() => {
        setStateCodeName(CN.codeName)
    }, [CN])
    const [saveProject, setsaveProject] = useState({})
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
                data.ProjectMember = data.ProjectMember.split(",")
                data.ManageUserId = data.ManageUserId.split(",")
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
                JobData.Member = JobData.Member.split(",")
                JobData.JobManageId = JobData.JobManageId.split(",")
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
                CardList: [{
                    cardId: Math.floor(Math.random() * 100) + 1,
                    taskId: taskId,
                    cardName: "Thẻ chính",
                    abledelete: false,
                    userCreateId: JobData.CreateId,
                    createDate: Date.now(),
                }]
            }
            setTask([...Task, TaskData])
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
                <Modal.Header closeButton>
                    <Modal.Title>{Title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        {
                            'CP': <AddNewProjectContent OnSubmit={OnSubmit} />,
                            'CT': <CardContent OnSubmit={OnSubmit} />,
                            'JIP': <AddNewJobInProject Project={CN.Project} OnSubmit={OnSubmitJob} />,
                            'PJMB': <AddNewMemberToProject Project={saveProject} OnSubmit={OnSubmit} />
                        }[stateCodeName]
                    }
                </Modal.Body>
            </Modal>
        </>
    );
}
export default ModelForView