import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import useSubmiFormCustom from '../CustomHook/SubmitFormCustom';
import { AddNewManageContent, AddNewProjectContent, AddNewTaskContent, AddNewMemberToProject, AddNewJobInProject } from './ModelContent';
import useDataApi from '../CustomHook/useDataApi';
import { useEffect, useRef, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const ModelForView = (props) => {
    // UserSignInData, setUserSignInData,
    const { Task, setTask, JobinProject, setJobinProject } = useDataApi()
    let { handleShow, projectData, setprojectData, ListUser, setListUser, handleClose, show, CN, Title } = props
    const { handleSubmit, inputs } = useSubmiFormCustom(handleClose)
    const [stateCodeName, setStateCodeName] = useState()
    useEffect(() => {
        setStateCodeName(CN)

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
            toast.success("Tạo mới project !")
            setprojectData(prj)
            handleClose()
            setsaveProject(null)
            setStateCodeName(CN)
        }

    }
    return (
        <>
            <Modal show={show} onHide={() => {
                handleClose()
                setsaveProject(null)
                setStateCodeName(CN)
            }}>
                <Modal.Header closeButton>
                    <Modal.Title>{Title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        {
                            'CP': <AddNewProjectContent OnSubmit={OnSubmit} />,
                            'CM': <AddNewManageContent OnSubmit={OnSubmit} />,
                            'CT': <AddNewTaskContent OnSubmit={OnSubmit} />,
                            'JIP': <AddNewJobInProject OnSubmit={OnSubmit} />,
                            'PJMB': <AddNewMemberToProject Project={saveProject} OnSubmit={OnSubmit} />
                        }[stateCodeName]
                    }
                </Modal.Body>
            </Modal>
        </>
    );
}
export default ModelForView