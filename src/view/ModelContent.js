import { Button, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import useDataApi from '../CustomHook/useDataApi';
import { useEffect, useMemo, useRef, useState } from 'react';
import SearchBox from './SearchBox';
import { render } from '@testing-library/react';
import avatar from '../asset/image/avatarSignIn.jpg'
import TextareaAutosize from 'react-textarea-autosize';

const AddNewProjectContent = (props) => {
    const { OnSubmit } = props
    const { LoginId, ListUser } = useDataApi()
    const valid = useRef(false)
    const UserSignInData = ListUser.find(x => x.UserId == LoginId)
    return (<>
        <Form style={{ width: "35vw" }}>
            <Form.Group className="mb-3 " controlId="ProjectName">
                <Form.Label>Tên project</Form.Label>
                <Form.Control ref={valid} name='ProjectName' type="text" className='formInput' placeholder="" />
                <i className='error text-danger' style={{ display: "none" }}>Nhập giá trị</i>
            </Form.Group>
            <Form.Group className="mb-3" controlId="Des">
                <Form.Label>Mô tả</Form.Label>
                <TextareaAutosize name='ProjectDes' className='formInput form-control' rows={3} placeholder="Nội dung ,mục đích project" />
                {/* <Form.Control name='ProjectDes' as="textarea" className='formInput' rows={3} placeholder="Nội dung ,mục đích project" /> */}
            </Form.Group>
            <Form.Control name='CreateId' type='hidden' className='formInput' value={UserSignInData.UserId} />
            <Form.Control name='CreateName' type='hidden' className='formInput' value={UserSignInData.UserName} />
            <Button onClick={(e) => {
                if (e.which == 13) {
                    e.preventDefault();
                    //do something   
                }
                OnSubmit(e, valid)
            }} type='button' className='w-100 bg-success buttonSubmit'>Tiếp tục</Button>
        </Form>
    </>)
}


const AddNewJobInProject = (props) => {
    const { OnSubmit, Project } = props
    const { LoginId, ListUser, projectData } = useDataApi()
    const valid = useRef(false)
    const UserSignInData = ListUser.find(x => x.UserId == LoginId)
    const [userinPj, setuserinPj] = useState([{
        UserId: LoginId,
        UserName: ListUser.find(x => x.UserId == LoginId).UserName,
        fav: true
    }])
    const [Search, setSearch] = useState()
    let data = []
    useEffect(() => {
        setSearch("")
    }, [userinPj])
    const handleSetManager = (e, id, bool) => {
        let indexUser = userinPj.findIndex(x => x.UserId == id)
        userinPj[indexUser].fav = bool
        setuserinPj([...userinPj])
    }
    return (
        <div style={{ width: "35vw" }} >
            <SearchBox ListUser={Project ? ListUser.filter(x => Project.ProjectMember.includes(JSON.stringify(x.UserId))) : []} userinPj={userinPj} setuserinPj={setuserinPj} Search={Search} setSearch={setSearch}></SearchBox>
            <div className='ListUser'>
                <div className='DisplayUser mt-2 mb-2 IconComp' >
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
            </div>
            <Form >
                <Form.Group className="mb-3 " controlId="ProjectName">
                    <Form.Label>Tên công việc</Form.Label>
                    <Form.Control ref={valid} name='title' type="text" className='formInput' placeholder="" />
                    <i className='error text-danger' style={{ display: "none" }}>Nhập giá trị</i>
                </Form.Group>
                <Form.Control name='CreateId' type='hidden' className='formInput' value={UserSignInData.UserId} />
                <Form.Control name='CreateName' type='hidden' className='formInput' value={UserSignInData.UserName} />
                <Form.Control name='ProjectId' type='hidden' className='formInput' value={Project ? Project.ProjectId : null} />
                <Form.Control name='id' type="hidden" className='formInput' value={Math.floor(Math.random() * 100) + 1} />
                <Form.Control name='Member' value={userinPj.map(x => x.UserId)} type='hidden' className='formInput' />
                <Form.Control name='JobManageId' value={userinPj.filter(x => x.fav == true).map(x => x.UserId)} type='hidden' className='formInput' />
                <Button onClick={(e) => {
                    if (e.which == 13) {
                        e.preventDefault();
                        //do something   
                    } OnSubmit(e, valid)
                }} type='button' className='w-100 bg-success buttonSubmit'>Tiếp tục</Button>
            </Form>
        </div>)

}
const AddNewMemberToProject = (project) => {
    const { LoginId, ListUser } = useDataApi()
    const { Project, OnSubmit } = project
    const [Search, setSearch] = useState()
    const [userinPj, setuserinPj] = useState([{
        UserId: LoginId,
        UserName: ListUser.find(x => x.UserId == LoginId).UserName,
        fav: true


    }])
    let data = []
    useEffect(() => {
        setSearch("")
    }, [userinPj])
    const handleSetManager = (e, id, bool) => {
        let indexUser = userinPj.findIndex(x => x.UserId == id)
        userinPj[indexUser].fav = bool
        setuserinPj([...userinPj])
    }
    return (
        <div style={{ width: "35vw" }} >
            <SearchBox ListUser={ListUser} userinPj={userinPj} setuserinPj={setuserinPj} Search={Search} setSearch={setSearch}></SearchBox>

            <div className='ListUser'>
                <div className='DisplayUser mt-2 mb-2 IconComp' >
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

                <Form >
                    <Form.Control name='ProjectName' type="hidden" className='formInput' value={Project.ProjectName} />
                    <Form.Control name='ProjectDes' type="hidden" className='formInput' value={Project.ProjectDes} />
                    <Form.Control name='ProjectId' type="hidden" className='formInput' value={Math.floor(Math.random() * 100) + 1} />
                    <Form.Control name='CreateId' type='hidden' className='formInput' value={Project.CreateId} />
                    <Form.Control name='CreateName' type='hidden' className='formInput' value={Project.CreateName} />
                    <Form.Control name='ProjectMember' value={userinPj.map(x => x.UserId)} type='hidden' className='formInput' />
                    <Form.Control name='ManageUserId' value={userinPj.filter(x => x.fav == true).map(x => x.UserId)} type='hidden' className='formInput' />
                    <Button onClick={(e) => {
                        if (e.which == 13) {
                            e.preventDefault();
                            //do something   
                        }
                        OnSubmit(e)
                    }} type='button' className='w-100 bg-success buttonSubmit'>Hoàn thành</Button>
                </Form>
            </div>
        </div>
    );
}
const CardContent = () => {
    const [Comment, setComment] = useState()
    return (<>
        <div className='BodyContent d-flex justify-content-between' style={{ width: "60vw" }}>
            <div className='LeftCard'>
                <div className='MemberInCard'></div>
                <div className='Description'>
                    <div className='chillHeader'>
                        <i className="fa fa-align-left" aria-hidden="true"></i>
                        <h4>Mô tả</h4>
                    </div>
                    <div>
                        <TextareaAutosize className="form-control focusnone" placeholder='Thêm mô tả...' id="exampleFormControlTextarea1" rows="3"></TextareaAutosize>
                    </div>



                </div>
                <div className='CustomAction'></div>
                <div className='Comment'>
                    <div className='chillHeader'>
                        <i className="fa fa-comments-o" aria-hidden="true"></i>
                        <h4>Bình luận</h4>
                    </div>
                    <div className='ListComment'>
                        <div className='CommentComp withTextarea'>
                            <div className='AvaPlace' style={{
                                backgroundImage: `url(${avatar})`
                            }}>
                            </div>
                            <div className='CommentPlace'>
                                <TextareaAutosize onChange={(e) => { setComment(e.target.value) }} value={Comment} className=" mb-2 form-control focusnone" placeholder='Bình luận' rows="1" />
                                <div className='buttomComp'>
                                    {Comment &&
                                        <button type='button' className='btn h6 btn-primary'>Lưu</button>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='CommentComp'>
                            <div className='AvaPlace' style={{
                                backgroundImage: `url(${avatar})`
                            }}>
                            </div>
                            <div className='CommentPlace'>
                                <div className='UserNameCom'>
                                    <b>Luong Trung Hung</b>
                                    <i>12/20/2222</i>
                                </div>
                                <div className='CommentTag'>
                                    <span> Commment thu phat</span>

                                </div>

                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className='RightCard'>
                <div className='ActionToCard mb-3'>
                    <div className='h6'>
                        <b>Thêm vào thẻ</b>
                    </div>
                    <div onClick={() => HandelMember()} className='actionChill Icon'>
                        <i className="fa fa-user-o" aria-hidden="true"></i>
                        <span>Thành viên</span>
                    </div>
                    <div className='actionChill Icon'>
                        <i className="fa fa-tag" aria-hidden="true"></i>
                        <span>Nhãn</span>
                    </div>
                    <div className='actionChill Icon'>
                        <i className="fa fa-check-square-o" aria-hidden="true"></i>
                        <span>Check list</span>
                    </div>
                    <div className='actionChill Icon'>
                        <i className="fa fa-clock-o" aria-hidden="true"></i>
                        <span>Deadline</span>
                    </div>
                    <div className='actionChill Icon'>
                        <i className="fa fa-file-image-o" aria-hidden="true"></i>
                        <span>Đính kèm</span>
                    </div>
                </div>
                <div className='DefaultAction'>
                    <div className='h6'>
                        <b>Thao tác thẻ</b>
                    </div>
                    <div className='actionChill Icon'>
                        <i className="fa fa-hand-o-right" aria-hidden="true"></i>
                        <span>Chuyển thẻ</span>
                    </div>
                    <div className='actionChill Icon'>
                        <i className="fa fa-trash-o" aria-hidden="true"></i>
                        <span>Xóa thẻ</span>
                    </div>
                </div>
            </div>
        </div>

    </>)
}
export { CardContent, AddNewProjectContent, AddNewMemberToProject, AddNewJobInProject }