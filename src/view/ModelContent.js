import { Button, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import useDataApi from '../CustomHook/useDataApi';
import { useEffect, useMemo, useState } from 'react';
import SearchBox from './SearchBox';
import { render } from '@testing-library/react';

const AddNewProjectContent = (props) => {
    const { OnSubmit } = props
    const { UserSignInData } = useDataApi()
    return (<>
        <Form>
            <Form.Group className="mb-3 " controlId="ProjectName">
                <Form.Label>Tên project</Form.Label>
                <Form.Control name='ProjectName' type="text" className='formInput' placeholder="" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="Des">
                <Form.Label>Mô tả</Form.Label>
                <Form.Control name='ProjectDes' as="textarea" className='formInput' rows={3} placeholder="Nội dung ,mục đích project" />
            </Form.Group>
            <Form.Control name='CreateId' type='hidden' className='formInput' value={UserSignInData.UserId} />
            <Form.Control name='CreateName' type='hidden' className='formInput' value={UserSignInData.UserName} />
            <Button onClick={(e) => {
                OnSubmit(e)
            }} type='button' className='w-100 bg-success buttonSubmit'>Tiếp tục</Button>
        </Form>
    </>)
}
const AddNewManageContent = () => {
    return (<>Manage</>)
}
const AddNewTaskContent = () => {
    return (<>task</>)
}
const AddNewMemberToProject = (project) => {
    const { Project, OnSubmit } = project
    const [Search, setSearch] = useState()
    const [userinPj, setuserinPj] = useState([])
    let data = []
    useEffect(() => {
        setSearch("")
    }, [userinPj])
    const handleSetManager = (e, id, bool) => {
        let indexUser = userinPj.findIndex(x => x.UserId == id)
        userinPj[indexUser].fav = bool
        setuserinPj([...userinPj])
    }
    return (<>
        <SearchBox userinPj={userinPj} setuserinPj={setuserinPj} Search={Search} setSearch={setSearch}></SearchBox>

        <div className='ListUser'>
            <div className='DisplayUser mb-2 IconComp' >
                {userinPj && userinPj.length > 0 &&
                    userinPj.map((item, index) => {
                        return (<i title={item.UserName} className="fa fa-user-o" aria-hidden="true">
                            {item.fav ?
                                <i onClick={(e) => handleSetManager(e, item.UserId, false)} className="fa fa-star user_childElement" title='Đặt làm quản trị viên' aria-hidden="true"></i>
                                : <i onClick={(e) => handleSetManager(e, item.UserId, true)} className="fa fa-star-o user_childElement" title='Đặt làm quản trị viên' aria-hidden="true"></i>
                            }
                        </i>)
                    })

                }
            </div>

            <Form>
                <Form.Control name='ProjectName' type="hidden" className='formInput' value={Project.ProjectName} />
                <Form.Control name='ProjectDes' type="hidden" className='formInput' value={Project.ProjectDes} />
                <Form.Control name='ProjectId' type="hidden" className='formInput' value={Math.floor(Math.random() * 101)} />
                <Form.Control name='CreateId' type='hidden' className='formInput' value={Project.CreateName} />
                <Form.Control name='CreateName' type='hidden' className='formInput' value={Project.CreateName} />
                <Form.Control name='ProjectMember' value={userinPj.map(x => x.UserId)} type='hidden' className='formInput' />
                <Form.Control name='ManageUserId' value={userinPj.filter(x => x.fav == true).map(x => x.UserId)} type='hidden' className='formInput' />
                <Button onClick={(e) => {
                    OnSubmit(e)
                }} type='button' className='w-100 bg-success buttonSubmit'>Hoàn thành</Button>
            </Form>
        </div>
    </>
    );
}
export { AddNewManageContent, AddNewProjectContent, AddNewTaskContent, AddNewMemberToProject }