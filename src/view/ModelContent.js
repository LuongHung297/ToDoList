import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
const AddNewProjectContent = () => {
    return (<>
        <Form>
            <Form.Group className="mb-3 " controlId="ProjectName">
                <Form.Label>Tên project</Form.Label>
                <Form.Control type="text" className='formInput' placeholder="" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="Des">
                <Form.Label>Mô tả</Form.Label>
                <Form.Control as="textarea" className='formInput' rows={3} placeholder="Nội dung ,mục đích project" />
            </Form.Group>
            <Button className='w-100 bg-success buttonSubmit disabled'>Tiếp tục</Button>
        </Form>
    </>)
}
const AddNewManageContent = () => {
    return (<>Managesad</>)
}
const AddNewTaskContent = () => {
    return (<>task</>)
}
export { AddNewManageContent, AddNewProjectContent, AddNewTaskContent }