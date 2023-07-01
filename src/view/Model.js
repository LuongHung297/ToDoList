import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import useSubmiFormCustom from '../CustomHook/SubmitFormCustom';
import { AddNewManageContent, AddNewProjectContent, AddNewTaskContent, AddNewMemberToProject } from './ModelContent';
import useDataApi from '../CustomHook/useDataApi';
import { useEffect, useState } from 'react';
const ModelForView = (props) => {
    const { Task, setTask, ListUser, setListUser, UserSignInData, setUserSignInData, JobinProject, setJobinProject } = useDataApi()
    let { handleShow, projectData, setprojectData, handleClose, show, Title, codeName } = props
    const { handleSubmit, inputs } = useSubmiFormCustom(handleClose)
    let status = false
    const [stateCodeName, setStateCodeName] = useState(codeName)
    const [saveProject, setsaveProject] = useState({})
    const OnSubmit = (e) => {
        let data = handleSubmit(e)
        if (data && !data.ProjectMember) {
            // let PJData = [...projectData, data]
            setsaveProject(data)
            setStateCodeName("PJMB")
        }
        else if (data && data.ProjectMember) {
            let prj = [...projectData]
            prj.push(data)
            setprojectData(prj)
            handleClose()
            setsaveProject(null)
            setStateCodeName("CP")
        }

    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{Title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        {
                            'CP': <AddNewProjectContent OnSubmit={OnSubmit} />,
                            'CM': <AddNewManageContent OnSubmit={OnSubmit} />,
                            'CT': <AddNewTaskContent OnSubmit={OnSubmit} />,
                            'PJMB': <AddNewMemberToProject Project={saveProject} OnSubmit={OnSubmit} />
                        }[stateCodeName]
                    }
                </Modal.Body>
            </Modal>
        </>
    );
}
export default ModelForView