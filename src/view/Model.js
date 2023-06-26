import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { AddNewManageContent, AddNewProjectContent, AddNewTaskContent } from './ModelContent';
const ModelForView = (props) => {
    const { handleShow, handleClose, show, Title, codeName } = props
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{Title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        {
                            'CP': <AddNewProjectContent />,
                            'CM': <AddNewManageContent />,
                            'CT': <AddNewTaskContent />
                        }[codeName]
                    }
                </Modal.Body>
            </Modal>
        </>
    );
}
export default ModelForView