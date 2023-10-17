import { Button, Col } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import useDataApi from '../CustomHook/useDataApi';
import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import SearchBox from './SearchBox';
import { render } from '@testing-library/react';
import avatar from '../asset/image/avatarSignIn.jpg'
import TextareaAutosize from 'react-textarea-autosize';
import { FileAttach, CheckListCom, DropDownMember, LabelList, ListTaskInJob } from './ActionForCard'
import { json, useOutletContext } from 'react-router-dom';
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import Moment from 'react-moment';
import moment, { now } from 'moment';
import DatePicker from "react-datepicker";
import { registerLocale, setDefaultLocale, } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import vi from 'date-fns/locale/vi';
import 'moment/locale/vi';
import ModelForView from './Model';
registerLocale('vi', vi)
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
            <SearchBox ListUser={Project ? ListUser.filter(x => Project.ProjectMember?.includes(x.UserId)) : []} userinPj={userinPj} setuserinPj={setuserinPj} Search={Search} setSearch={setSearch}></SearchBox>
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

const CardContent = (probs) => {
    const { CardData, handleClose } = probs
    const [Comment, setComment] = useState()
    // const [MemberS, setMemberS] = useState(false)
    const [CheckListName, setCheckListName] = useState()
    const [CheckListTitLE, setCheckListTitLE] = useState()
    // const [DateTi, setDateTi] = useState(false)
    // const [UpLoadFile, setUpLoadFile] = useState(false)
    const [ActionMember, setActionMember] = useState()
    const HandelCloseSide = () => {
        setActionMember(null)
    }
    let context = useOutletContext()
    const { Card, SetCard, CommentInCard, setCommentInCard, LoginId, ListUser, LabelListState, setCheckList, CheckList, noti, setnoti } = context
    const [showdes, setshowdes] = useState(false)
    const [CardUpDate, setCardUpdate] = useState(CardData)
    const [valueDate, setValueDate] = useState(CardData?.deadLine);
    useEffect(() => {
        let data = Card.find(x => x.cardId == CardUpDate.cardId && x.taskId == CardUpDate.taskId)
        if (valueDate !== data?.deadLine) {
            data.deadLine = valueDate
            data.Complete = false
            SetCard([...Card], data)
            let notiChill = {
                notiId: Math.floor(Math.random() * 100) + 1,
                taskId: data.taskId,
                JobId: data.JobId,
                cardId: data.cardId,
                actionName: "thay đổi hạn chót",
                creatDate: Date.now(),
                userCreateId: LoginId,
                checked: false
            }
            setnoti([...noti, notiChill])
        }


    }, [valueDate])
    const HandelCom = () => {
        let data = Card.find(x => x.cardId == CardUpDate.cardId && x.taskId == CardUpDate.taskId)
        data.Complete = !data.Complete
        SetCard([...Card], data)
        let notiChill = {
            notiId: Math.floor(Math.random() * 100) + 1,
            taskId: data.taskId,
            JobId: data.JobId,
            cardId: data.cardId,
            actionName: `thay đổi trạng thái sang ${data.Complete ? "hoàn thành" : "chưa hoàn thành"}`,
            creatDate: Date.now(),
            userCreateId: LoginId,
            checked: false
        }
        setnoti([...noti, notiChill])
    }
    const HandelMember = (id, code) => {
        let data = Card.find(x => x.cardId == CardUpDate.cardId && x.taskId == CardUpDate.taskId)
        if (code) {
            if (!data.MemberInCardId?.includes(id))
                data.MemberInCardId.push(id)
        }
        else {
            data.MemberInCardId = data.MemberInCardId.filter(x => x !== id)
        }
        SetCard([...Card], data)
        let notiChill = {
            notiId: Math.floor(Math.random() * 100) + 1,
            taskId: data.taskId,
            JobId: data.JobId,
            cardId: data.cardId,
            actionName: "thay đổi số thành viên",
            creatDate: Date.now(),
            userCreateId: LoginId,
            checked: false
        }
        setnoti([...noti, notiChill])
    }
    const handelLabel = (id, code) => {
        let data = Card.find(x => x.cardId == CardUpDate.cardId && x.taskId == CardUpDate.taskId)
        if (code) {
            if (!data.LabelInCard?.includes(id))
                data.LabelInCard?.push(id)
        }
        else {
            data.LabelInCard = data.LabelInCard.filter(x => x !== id)
        }
        SetCard([...Card], data)
        let notiChill = {
            notiId: Math.floor(Math.random() * 100) + 1,
            taskId: data.taskId,
            JobId: data.JobId,
            cardId: data.cardId,
            actionName: "thay đổi nhãn dán",
            creatDate: Date.now(),
            userCreateId: LoginId,
            checked: false
        }
        setnoti([...noti, notiChill])
    }
    const handelCheckList = (name) => {
        if (name) {
            let data = {
                CheckListName: name,
                CheckListId: Math.floor(Math.random() * 100) + 1,
                CardId: CardUpDate.cardId,
                TaskId: CardUpDate.taskId,
                CheckChill: [],
                createDate: Date.now(),
                userCreate: LoginId,
            }
            setCheckList([...CheckList, data])
            let datacard = Card.find(x => x.cardId == CardUpDate.cardId && x.taskId == CardUpDate.taskId)
            datacard.CheckListId?.push(data.CheckListId)
            SetCard([...Card], datacard)

            setActionMember(null)
            let notiChill = {
                notiId: Math.floor(Math.random() * 100) + 1,
                taskId: data.taskId,
                JobId: data.JobId,
                cardId: data.cardId,
                actionName: "thêm danh sách",
                creatDate: Date.now(),
                userCreateId: LoginId,
                checked: false
            }
            setnoti([...noti, notiChill])
        }
    }
    const LuuDes = () => {
        let data = Card.find(x => x.cardId == CardUpDate.cardId && x.taskId == CardUpDate.taskId)
        data.Describe = CardUpDate.Describe
        SetCard([...Card], data)
        let notiChill = {
            notiId: Math.floor(Math.random() * 100) + 1,
            taskId: data.taskId,
            JobId: data.JobId,
            cardId: data.cardId,
            actionName: "thay đổi miêu tả",
            creatDate: Date.now(),
            userCreateId: LoginId,
            checked: false
        }
        setnoti([...noti, notiChill])
    }
    const CommentHandel = () => {
        if (Comment) {
            let CommentUpdate = {
                commentId: Math.floor(Math.random() * 100) + 1,
                cardId: CardUpDate.cardId,
                CommentText: Comment,
                userCreateId: LoginId,
                createDate: Date.now(),
            }
            setCommentInCard([...CommentInCard, CommentUpdate])
            setComment("")
            let notiChill = {
                notiId: Math.floor(Math.random() * 100) + 1,
                taskId: CardUpDate.taskId,
                JobId: CardUpDate.JobId,
                cardId: CardUpDate.cardId,
                actionName: "bình luận",
                creatDate: Date.now(),
                userCreateId: LoginId,
                checked: false
            }
            setnoti([...noti, notiChill])
        }

    }
    const HandelAddCheck = (id) => {
        let data = CheckList.find(x => x.CheckListId == id)
        let check = {
            CheckId: Math.floor(Math.random() * 100) + 1,
            CheckTitle: CheckListTitLE,
            isDone: false
        }
        data.CheckChill.push(check)
        setCheckList([...CheckList], data)
    }
    const HandelChangeCheck = (CheckId, id) => {
        let data = CheckList.find(x => x.CheckListId == id)
        let check = data?.CheckChill.find(x => x.CheckId == CheckId)
        check.CheckTitle = CheckListTitLE
        setCheckList([...CheckList], data)
    }
    const handelCheck = (CheckId, id, chec) => {
        let data = CheckList.find(x => x.CheckListId == id)
        let check = data?.CheckChill.find(x => x.CheckId == CheckId)
        check.isDone = chec
        setCheckList([...CheckList], data)
    }
    const HandelCheckName = (id) => {
        let data = CheckList.find(x => x.CheckListId == id)
        data.CheckListName = CheckListName
        setCheckList([...CheckList], data)
    }
    const handelDeleTeCheck = (id) => {
        let data = CheckList.filter(x => x.CheckListId != id)
        setCheckList(data)
        let notiChill = {
            notiId: Math.floor(Math.random() * 100) + 1,
            taskId: CardUpDate.taskId,
            JobId: CardUpDate.JobId,
            cardId: CardUpDate.cardId,
            actionName: "xóa 1 danh sách công việc",
            creatDate: Date.now(),
            userCreateId: LoginId,
            checked: false
        }
        setnoti([...noti, notiChill])
        let datacard = Card.find(x => x.cardId == CardUpDate.cardId && x.taskId == CardUpDate.taskId)
        console.log(datacard.CheckListId)
        datacard.CheckListId = datacard.CheckListId.filter(x => x != id)
        SetCard([...Card], datacard)
    }
    const calPersen = (item) => {
        let done = item.filter(x => x.isDone == true).length
        let total = (Math.floor((done / item.length) * 100))
        return total ? total : 0
    }
    const MemberJoin = ListUser?.filter(x => CardUpDate?.MemberInCardId?.includes(x.UserId))
    const Label = LabelListState?.filter(x => CardUpDate?.LabelInCard?.includes(x.LabelId))
    const ButtonDate = forwardRef(({ value, onClick }, ref) => (
        <button className={CardUpDate.Complete ? "btn btn-sm btn-success" : "btn btn-sm btn-danger"} onClick={onClick} ref={ref} >
            {value ? value : CardUpDate.Complete ? "" : "Thêm thời hạn"}
            {CardUpDate.Complete && <p className='m-0'>Hoàn thành</p>
            }
        </button>

    ));
    const deleTeCard = () => {
        let data = Card.filter(x => x.cardId !== CardUpDate.cardId)
        SetCard(data)
        let notiChill = {
            notiId: Math.floor(Math.random() * 100) + 1,
            taskId: CardUpDate.taskId,
            JobId: CardUpDate.JobId,
            cardId: null,
            actionName: "đã xóa card trong",
            creatDate: Date.now(),
            userCreateId: LoginId,
            checked: false
        }
        setnoti([...noti, notiChill])
        handleClose()
    }

    const handelTranFCard = (tranFiD) => {
        if (tranFiD) {
            let data = Card.find(x => x.cardId == CardUpDate.cardId && x.taskId == CardUpDate.taskId)
            data.taskId = tranFiD
            SetCard([...Card], data)
            let notiChill = {
                notiId: Math.floor(Math.random() * 100) + 1,
                taskId: tranFiD,
                JobId: data.JobId,
                cardId: data.cardId,
                actionName: "đã chuyển sang task",
                creatDate: Date.now(),
                userCreateId: LoginId,
                checked: false
            }
            setnoti([...noti, notiChill])
        }

    }

    return (<>
        <div className='BodyContent d-flex justify-content-between' style={{ width: "60vw" }}>
            <div className='LeftCard'>
                <div className='d-flex headcard'>
                    <div className='MemberInCard '>
                        {MemberJoin?.length > 0 &&
                            <>
                                <h6>Thành viên</h6>
                            </>
                        }
                        <div className='d-flex wrapContent'>
                            {
                                MemberJoin.map((item, index) => {
                                    return (<>
                                        <div className='membercard'>{item.UserName}</div>
                                    </>)
                                })}
                        </div>
                    </div>
                    <div className='MemberInCard '>
                        {Label?.length > 0 &&
                            <>
                                <h6>Nhãn dán</h6>
                            </>
                        }
                        <div className='d-flex wrapContent'>
                            {
                                Label.map((item, index) => {
                                    return (<>
                                        <div title={item.LableColor} className='membercard label' style={{ backgroundColor: item.LableCode }}></div>
                                    </>)
                                })}
                        </div>
                    </div></div>
                <div className='Description'>
                    <div className='chillHeader'>
                        <i className="fa fa-align-left" aria-hidden="true"></i>
                        <h4>Mô tả</h4>
                        <button style={!showdes && CardUpDate?.Describe ? { display: "block" } : { display: "none" }} className='btn btn-outline-dark ml-auto btn-sm' onClick={() => setshowdes(true)}> Chỉnh sửa</button>
                    </div>
                    <div>
                        <span style={!showdes ? { cursor: "pointer", display: "block" } : { display: "none" }} onClick={() => setshowdes(true)}>
                            {CardUpDate?.Describe}
                        </span>
                        <div style={showdes || !CardUpDate?.Describe ? { display: "block" } : { display: "none" }}>
                            <TextareaAutosize value={CardUpDate?.Describe} onChange={(e) => {
                                setshowdes(true)
                                let data = CardUpDate
                                data.Describe = e.target.value
                                setCardUpdate({ ...CardUpDate, data })
                            }} className="form-control mb-2 focusnone" placeholder='Thêm mô tả...' id="exampleFormControlTextarea1" rows="3"></TextareaAutosize>
                            <div className='buttomComp'>
                                <button onClick={() => {
                                    LuuDes()
                                    setshowdes(false)
                                }} type='button' className='btn btn-sm btn-primary'>Lưu</button>

                            </div></div>
                    </div>
                </div>
                <div className='CustomAction'>
                    <div className='CheckListTag'>
                        {CheckList && CheckList.filter(x => x.CardId == CardUpDate.cardId && x.TaskId == CardUpDate.taskId)?.map((item) => {
                            return (<>
                                <div className='CheckListPar mt-4'>
                                    <div className='CheckListHeader d-flex mb-1'>
                                        <div className='CheckListHeader_0' ><i className="fa fa-check-square-o h5" aria-hidden="true"></i>
                                        </div>

                                        <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
                                            <div className='CheckListHeader_1' onClick={(e) => {
                                                e.target.parentElement.parentElement.nextElementSibling.style.display = "block"
                                                e.target.parentElement.parentElement.style.display = "none"
                                                setCheckListName(item.CheckListName)
                                            }} >
                                                <b className='h6'>{item.CheckListName}</b>
                                            </div>
                                            <div className='CheckListHeader_3 ml-auto' >
                                                <button onClick={() => { handelDeleTeCheck(item.CheckListId) }} className='btn btn-outline-dark btn-sm'>Xóa</button>
                                            </div>
                                        </div>
                                        <div className='editTitlecheck w-100' style={{ display: "none" }}>
                                            <TextareaAutosize value={CheckListName} onChange={(e) => { setCheckListName(e.target.value) }} className="form-control focusnone mb-2" rows="4"></TextareaAutosize>
                                            <button onClick={(e) => {
                                                e.target.parentElement.previousElementSibling.style.display = "flex"
                                                e.target.parentElement.style.display = "none"
                                                setCheckListName("")
                                                HandelCheckName(item.CheckListId)
                                            }} style={{ marginRight: "3px" }} className='btn btn-sm btn-primary'>Lưu</button>
                                            <button onClick={(e) => {
                                                e.target.parentElement.previousElementSibling.style.display = "flex"
                                                e.target.parentElement.style.display = "none"
                                                setCheckListName("")
                                            }} className='btn '>X </button>
                                        </div>

                                    </div>
                                    <div className='CheckListProcess mb-2 d-flex'>
                                        <span>{calPersen(item.CheckChill)}%</span>
                                        <div className="progress w-100" style={{ height: "10px" }}>
                                            <div className={"progress-bar"} role="progressbar"
                                                style={{ width: calPersen(item.CheckChill) + "%", backgroundColor: calPersen(item.CheckChill) < 100 ? "" : "green" }}
                                                aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                    <div className='CheckListChill mb-2'>
                                        {item.CheckChill?.map((item_chi, indexx) => {
                                            return (<>
                                                <div className='d-flex editchil mb-1'>
                                                    {item_chi.isDone ?
                                                        <input onChange={() => handelCheck(item_chi.CheckId, item.CheckListId, false)} key={item_chi.CheckId} className='form-controll ml-auto mr-auto ' type='checkbox' checked></input>
                                                        :
                                                        <input onChange={() => handelCheck(item_chi.CheckId, item.CheckListId, true)} className='form-controll ml-auto mr-auto' type='checkbox'></input>
                                                    }
                                                    <div className='editzone'>
                                                        <span className='titlecheck' onClick={(e) => {
                                                            setCheckListTitLE(item_chi.CheckTitle)
                                                            document.querySelectorAll(".editcheck").forEach(i => {
                                                                i.style.display = "none"
                                                            })
                                                            document.querySelectorAll(".titlecheck").forEach(i => {
                                                                i.style.display = "block"
                                                            })
                                                            e.target.nextElementSibling.style.display = "block"
                                                            e.target.style.display = "none"
                                                        }}>{item_chi.CheckTitle} </span>
                                                        <div className='editcheck ' style={{ display: "none" }}>
                                                            <TextareaAutosize onChange={(e) => {
                                                                setCheckListTitLE(e.target.value)
                                                            }} value={CheckListTitLE} className="form-control focusnone mb-2" rows="4"></TextareaAutosize>
                                                            <button onClick={(e) => {
                                                                e.target.parentElement.previousElementSibling.style.display = "block"
                                                                e.target.parentElement.style.display = "none"
                                                                HandelChangeCheck(item_chi.CheckId, item.CheckListId)
                                                            }} className='btn btn-sm btn-primary'>Lưu</button> <button onClick={(e) => {
                                                                e.target.parentElement.previousElementSibling.style.display = "block"
                                                                e.target.parentElement.style.display = "none"
                                                                setCheckListTitLE("")
                                                            }} className='btn btn-outline-dark btn-sm'>Đóng </button>
                                                        </div>
                                                    </div>

                                                </div>

                                            </>)

                                        })}
                                    </div>
                                    <div className='addCheckChill ml-auto' style={{ width: "90%" }} >
                                        <button className='btn btn-sm btn-secondary titlecheck' onClick={

                                            (e) => {
                                                setCheckListTitLE("")
                                                document.querySelectorAll(".editcheck").forEach(i => {
                                                    i.style.display = "none"
                                                })
                                                document.querySelectorAll(".titlecheck").forEach(i => {
                                                    i.style.display = "block"
                                                })
                                                e.target.nextElementSibling.style.display = "block"
                                                e.target.style.display = "none"
                                            }}>Thêm mới </button>
                                        <div className='editcheck ' style={{ display: "none" }}>
                                            <TextareaAutosize value={CheckListTitLE} onChange={(e) => { setCheckListTitLE(e.target.value) }} className="form-control focusnone mb-2" rows="4"></TextareaAutosize>
                                            <button onClick={(e) => {
                                                setCheckListTitLE("")
                                                e.target.parentElement.previousElementSibling.style.display = "block"
                                                e.target.parentElement.style.display = "none"
                                                HandelAddCheck(item.CheckListId)
                                            }} className='btn btn-sm btn-primary' style={{ marginRight: "3px" }}>Lưu</button>
                                            <button onClick={(e) => {
                                                e.target.parentElement.previousElementSibling.style.display = "block"
                                                e.target.parentElement.style.display = "none"
                                                setCheckListTitLE("")
                                            }} className='btn btn-outline-dark btn-sm'>Đóng </button>
                                        </div>
                                    </div>
                                </div>
                            </>)
                        })}
                    </div>
                </div>
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
                                        <button type='button' onClick={CommentHandel} className='btn btn-sm btn-primary'>Lưu</button>
                                    }
                                </div>
                            </div>
                        </div>
                        {
                            CommentInCard?.filter(x => x.cardId == CardUpDate.cardId)?.map((item, index) => {
                                return (<>
                                    <div className='CommentComp' >
                                        <div className='AvaPlace' style={{
                                            backgroundImage: `url(${avatar})`
                                        }}>
                                        </div>
                                        <div className='CommentPlace'>
                                            <div className='UserNameCom'>
                                                <b>{ListUser?.find(x => x.UserId == item.userCreateId)?.UserName}</b>
                                                <Moment locale='vi' fromNow>{item.createDate}</Moment>
                                            </div>
                                            <div className='CommentTag'>
                                                <span>{item.CommentText}</span>

                                            </div>

                                        </div>
                                    </div>
                                </>)
                            })
                        }
                    </div>
                </div>
            </div>
            <div className='RightCard'>
                <div className='ActionToCard mb-3'>
                    <div className='h6'>
                        <b>Thêm vào thẻ</b>
                    </div>
                    <div className={ActionMember == 0 ? 'actionChill Icon active' : 'actionChill Icon'} >
                        <div style={{ width: "100%" }} onClick={() => {
                            setActionMember(0)
                        }}>   <i className="fa fa-user-o" aria-hidden="true"></i>
                            <span>Thành viên</span></div>

                        <div className='HidenMember' style={ActionMember == 0 ? { display: "block" } : { display: "none" }}>
                            <DropDownMember HandelClose={HandelCloseSide} HandelMember={HandelMember
                            } UserInCard={CardUpDate.MemberInCardId}>
                            </DropDownMember>
                        </div>
                    </div>
                    <div className={ActionMember == 1 ? 'actionChill Icon active' : 'actionChill Icon'} >
                        <div style={{ width: "100%" }} onClick={() => {
                            setActionMember(1)
                        }}>
                            <i className="fa fa-tag" aria-hidden="true"></i>
                            <span>Nhãn</span>
                        </div>
                        <div className='HidenMember' style={ActionMember == 1 ? { display: "block" } : { display: "none" }}>
                            <LabelList HandelClose={HandelCloseSide} LabelInCard={CardUpDate.LabelInCard} handelLabel={handelLabel}>
                            </LabelList>
                        </div>
                    </div>
                    <div className={ActionMember == 2 ? 'actionChill Icon active' : 'actionChill Icon'} >
                        <div style={{ width: "100%" }} onClick={() => {
                            setActionMember(2)
                        }}>

                            <i className="fa fa-check-square-o" aria-hidden="true"></i>
                            <span>Việc cần thực hiện</span></div>
                        <div className='HidenMember' style={ActionMember == 2 ? { display: "block" } : { display: "none" }}>
                            <CheckListCom HandelClose={HandelCloseSide} handelCheckList={handelCheckList}>
                            </CheckListCom>
                        </div>
                    </div>

                    <div className='actionChill Icon'>
                        <div style={{ width: "100%" }} onClick={() => setActionMember(null)}>
                            <i className="fa fa-clock-o" aria-hidden="true"></i>
                            <span>Hạn chót</span>
                            <div className='d-flex  mt-2'>
                                {CardUpDate.Complete ?
                                    <input onChange={HandelCom} checked type='checkbox' style={{ marginRight: "10px" }} className=''></input>
                                    :
                                    <input onChange={HandelCom} type='checkbox' style={{ marginRight: "10px" }} className=''></input>
                                }

                                <DatePicker
                                    selected={valueDate}
                                    customInput={<ButtonDate />}
                                    onChange={(e) => { setValueDate(e) }}
                                    timeInputLabel="Thời gian:"
                                    dateFormat="dd/MM/yyyy h:mm aa"
                                    showTimeInput locale="vi"
                                />
                            </div>

                        </div>
                    </div>

                    {/* <div className={ActionMember == 4 ? 'actionChill Icon active' : 'actionChill Icon'} >
                        <div style={{ width: "100%" }} onClick={() => {
                            setActionMember(4)
                        }}>
                            <i className="fa fa-hand-o-right" aria-hidden="true"></i>
                            <span>Chuyển thẻ</span>
                            <div className='HidenMember' style={ActionMember == 4 ? { display: "block" } : { display: "none" }}>
                                <ListTaskInJob handelClose={HandelCloseSide} handelTranFCard={handelTranFCard} carddata={CardUpDate}>
                                </ListTaskInJob>
                            </div>
                        </div>
                    </div> */}
                    <div className='actionChill Icon d-none'>
                        <div style={{ width: "100%" }}>
                            <i className="fa fa-file-image-o" aria-hidden="true"></i>
                            <span>Đính kèm</span></div>
                    </div>
                </div>
                {CardUpDate.abledelete &&

                    <div className='DefaultAction'>
                        <div className='h6'>
                            <b>Thao tác thẻ</b>
                        </div>
                        <div className={ActionMember == 4 ? 'actionChill Icon active' : 'actionChill Icon'} >
                            <div style={{ width: "100%" }} onClick={() => {
                                setActionMember(4)
                            }}>

                                <i className="fa fa-hand-o-right" aria-hidden="true"></i>
                                <span>Chuyển thẻ</span>
                            </div>
                            <div className='HidenMember' style={ActionMember == 4 ? { display: "block" } : { display: "none" }}>
                                <ListTaskInJob handelClose={HandelCloseSide} handelTranFCard={handelTranFCard} carddata={CardUpDate}>
                                </ListTaskInJob>
                            </div>
                        </div>
                        <div className='actionChill Icon' onClick={deleTeCard}>
                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                            <span>Xóa thẻ</span>
                        </div>

                    </div>}
            </div>
        </div>
    </>)
}
const Noti = (probs) => {
    const { noti, jobId, handleShow } = probs
    let context = useOutletContext()
    const { JobinProject, setJobinProject, projectData, setprojectData, ListUser, setListUser, Task, setTask, SetCard, Card, LoginId, setnoti } = context
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    let { notiInProject } = {}
    let { cardSM, task, user } = {}
    notiInProject = noti.filter(x => x.JobId == jobId)
    const [CardDataSM, setCardDataSM] = useState()
    // const handleShow = (data) => {
    //     setCardDataSM(data)
    //     setShow(true);
    // }
    let CN2 = {
        codeName: "CT",
        Project: "",
        CardData: CardDataSM,
        jobId: jobId
    }
    return (<>
        <div className='BodyContent d-flex justify-content-between' style={{ width: "60vw" }}>
            <ul className='NotiList'>
                {notiInProject?.length > 0 && notiInProject.map((item) => {
                    cardSM = Card.find(x => x.cardId == item.cardId)
                    task = Task.find(x => x.taskId == item.taskId && x.JobId == item.JobId)
                    user = ListUser.find(x => x.UserId == item.userCreateId)
                    return (<>
                        <li className={notiInProject.checked ? "noti" : "noti text-dark"} ><div style={{
                            backgroundImage: `url(${require('../asset/image/avatarSignIn.jpg')})`
                        }} className="useimg"></div>
                            <span>  {user?.UserName} đã {item.actionName}
                                {task ? cardSM ? <a href='#' onClick={() => {
                                    handleShow(cardSM)
                                    item.Complete = true
                                    setnoti([...noti, item])
                                }}> {cardSM.cardName} thuộc task  {task.taskName}  </a>
                                    :
                                    <span> {task.taskName}</span> : ""}
                                &nbsp;
                                <span>(</span>
                                <Moment locale='vi' fromNow className='text-warning'>{notiInProject.createDate}</Moment>
                                <span>)</span>
                            </span>

                        </li>
                    </>)
                })}
            </ul>
            {/* <ModelForView handleShow={handleShow} handleClose={handleClose} Title={CardDataSM?.cardName} CN={CN2} show={show} ></ModelForView> */}
        </div>
    </>)
}
export { CardContent, AddNewProjectContent, AddNewMemberToProject, AddNewJobInProject, Noti }