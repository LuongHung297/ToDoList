import { useEffect, useRef, useState } from "react"
import { useNavigate, useOutletContext, useParams } from "react-router-dom"
import DeleteComf from "./DeleteComf"
import ModelForView from "./Model"
import TextareaAutosize from 'react-textarea-autosize';
import { registerLocale, setDefaultLocale, } from "react-datepicker";
import Moment from "react-moment";
import 'moment/locale/vi';
const TaskManage = (props) => {

    const [ShowaddCard, setShowaddCard] = useState(false)
    const [Show, setShow] = useState(false)
    // const [ShowCard, setShowCard] = useState(false)
    const ShowCard = useRef(false)
    const [inputData, setinputData] = useState()
    const { LabelListState, cardList, handleShow, taskData, handelDupTask, handelDeleteCard, handelDeleteTask, handleAddNewCard, handleUpdateCardName, handleUpdateTaskName, setref } = props
    const [taskName, settaskName] = useState()
    const [CardUpdate, setCardUpdate] = useState()
    const handleUpdateCardNameIn = (e) => {
        var arr = document.querySelectorAll('.changeName');
        var arr2 = document.querySelectorAll('.Card');

        arr.forEach(i => {
            i.style.display = "none"
        })
        arr2.forEach(i => {
            i.style.display = "block"
        })
        e.target.parentElement.parentElement.style.display = "none"
        e.target.parentElement.parentElement.nextElementSibling.style.display = "block"
    }
    return (<>
        <div className="TaskModul TaskManage mt-3">
            <div className="BackGround_Task">
                <div className="head p-2 d-flex">
                    <div className="TitleName">
                        <TextareaAutosize maxRows={6} style={{
                            resize: "none"
                        }} spellCheck="false" className="titlename_input" onChange={(e) => {
                            handleUpdateTaskName(taskData, e.target.value)
                            settaskName(e.target.value)
                        }} value={taskData.taskName}></TextareaAutosize>
                    </div>

                </div>
                <div className="body mt-2">
                    <div ref={setref} className="Body_ScollBar  d-flex">
                        {cardList.length > 0 &&
                            cardList.map((item, index) => {
                                return (<>
                                    <div style={{ alignItems: "center" }} key={"card_" + item.cardId} className="Card ">
                                        <div onClick={() => handleShow(item)} style={{ width: "90%" }} className=" justify-content-between">
                                            <div className="labelDis mb-2">
                                                {
                                                    LabelListState.filter(x => item.LabelInCard.includes(x.LabelId))?.map(i => {
                                                        return (<>

                                                            <div
                                                                style={{ backgroundColor: i.LableCode }}>
                                                            </div></>)
                                                    })}
                                            </div>
                                            <div>
                                                <span key={"span_" + item.cardId}>
                                                    {item.cardName}
                                                </span>
                                            </div>

                                            <div className="bottomDis mt-2">
                                                {item.CheckListId.length > 0 &&
                                                    <span><i className="fa fa-check-square-o" aria-hidden="true"></i>
                                                        {item.CheckListId?.length}</span>
                                                }

                                                <div className={item.Complete ? "bg-success" : "bg-danger"}><i className="fa fa-clock-o" aria-hidden="true"></i>
                                                    {item.deadLine != null ? <Moment format="DD/MM" locale='vi'>{item.deadLine}</Moment>
                                                        : ""}

                                                </div>
                                                {
                                                    item.MemberInCardId.length > 0 &&
                                                    <span> <i className="fa fa-users" aria-hidden="true"></i>
                                                        {item.MemberInCardId?.length}</span>
                                                }
                                                {!item.abledelete &&
                                                    <span><i className="fa fa-lock text-success" aria-hidden="true"></i>
                                                    </span>
                                                }

                                            </div>


                                        </div>
                                        <div className="Icon iconCard">
                                            <i onClick={(e) => {
                                                setCardUpdate(item.cardName)
                                                handleUpdateCardNameIn(e)
                                            }
                                            } key={item.cardId} className="fa fa-pencil" aria-hidden="true"></i>

                                            {item.abledelete ?
                                                <i className="fa fa-trash" onClick={() => { handelDeleteCard(item, item.cardId) }} aria-hidden="true"></i>
                                                : ""
                                            }
                                        </div>
                                    </div>
                                    <div style={{ display: "none" }} className="changeName form-group">
                                        <TextareaAutosize placeholder="Đổi tên card" onChange={(e) => { setCardUpdate(e.target.value) }} value={CardUpdate} className="form-control focusnone" rows="3"></TextareaAutosize>
                                        <div className="form-group pt-2">
                                            <button className="addCard btn btn-primary" onClick={(e) => {
                                                handleUpdateCardName(CardUpdate, item, item.cardId)
                                                setCardUpdate("")
                                                if (CardUpdate) {
                                                    e.target.parentElement.parentElement.style.display = "none"
                                                    e.target.parentElement.parentElement.previousElementSibling.style.display = "block"
                                                }
                                            }}>Lưu</button>
                                            <i onClick={(e) => {
                                                setCardUpdate("")
                                                e.target.parentElement.parentElement.style.display = "none"
                                                e.target.parentElement.parentElement.previousElementSibling.style.display = "block"
                                            }} className="fa fa-times Icon" style={{ marginLeft: "10px" }} aria-hidden="true"></i></div>
                                    </div>

                                </>)
                            })
                        }
                        <div style={ShowaddCard ? { display: "block" } : { display: "none" }} className="form-group">
                            <TextareaAutosize placeholder="Tạo mới thẻ" onChange={(e) => { setinputData(e.target.value) }} value={inputData} className="form-control focusnone" rows="3"></TextareaAutosize>
                            <div className="form-group pt-2">
                                <button className="addCard btn btn-primary" onClick={() => {
                                    handleAddNewCard(taskData, inputData)
                                    setinputData("")
                                }}>Thêm mới</button>
                                <i onClick={() => {
                                    setShowaddCard(!ShowaddCard)
                                    setinputData("")
                                }} className="fa fa-times Icon" style={{ marginLeft: "10px" }} aria-hidden="true"></i></div>
                        </div>
                    </div>

                </div>
                <div className="footer p-2 mt-1">
                    <div style={!ShowaddCard ? { display: "block" } : { display: "none" }} onClick={() => {
                        setShowaddCard(!ShowaddCard)
                    }} className="addCard"><i className="fa fa-plus m-1" aria-hidden="true">
                        </i><span>Thêm thẻ mới</span>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
const TaskNormal = (props) => {
    const [ShowaddCard, setShowaddCard] = useState(false)
    const [Show, setShow] = useState(false)
    // const [ShowCard, setShowCard] = useState(false)
    const ShowCard = useRef(false)
    const [inputData, setinputData] = useState()
    const { LabelListState, cardList, handleShow, taskData, handelDupTask, handelDeleteCard, handelDeleteTask, handleAddNewCard, handleUpdateCardName, handleUpdateTaskName, setref } = props
    const [taskName, settaskName] = useState()
    const [CardUpdate, setCardUpdate] = useState()
    const handleUpdateCardNameIn = (e) => {
        var arr = document.querySelectorAll('.changeName');
        var arr2 = document.querySelectorAll('.Card');

        arr.forEach(i => {
            i.style.display = "none"
        })
        arr2.forEach(i => {
            i.style.display = "block"
        })
        e.target.parentElement.parentElement.style.display = "none"
        e.target.parentElement.parentElement.nextElementSibling.style.display = "block"
    }
    return (<>
        <div className="TaskModul mt-3">
            <div className="BackGround_Task">
                <div className="head p-2 d-flex">
                    <div className="TitleName">
                        <TextareaAutosize maxRows={6} style={{
                            resize: "none"
                        }} spellCheck="false" className="titlename_input" onChange={(e) => {
                            handleUpdateTaskName(taskData, e.target.value)
                            settaskName(e.target.value)
                        }} value={taskData.taskName}></TextareaAutosize>
                    </div>
                    <div className="option ">
                        <div className="Icon" onClick={() => {
                            if (!Show) {
                                var arr = document.querySelectorAll('.listToHide');
                                arr.forEach(i => {
                                    i.style.display = "none"
                                })
                            }
                            setShow(!Show)
                        }} >
                            <i className="fa fa-ellipsis-h" aria-hidden="true"></i>
                            <div className="DropDownList listToHide col-sm-2" style={Show ? { display: "block" } : { display: "none" }}>
                                <ul>
                                    <div className="LabelName p-2">Thao tác
                                        <div className="Close"><i onClick={(e) => {
                                            setShow(false)
                                        }} className="fa fa-times" aria-hidden="true"></i>
                                        </div>
                                    </div>
                                    <li className="p-2" onClick={() => setShowaddCard(true)}>Thêm thẻ</li>
                                    <li className="p-2" onClick={() => { handelDupTask(taskData) }}>Nhân đôi task</li>
                                    <li className="p-2" onClick={() => { handelDeleteTask(taskData.taskId) }}>Xóa task</li>

                                </ul>


                            </div>
                        </div>

                    </div>
                </div>
                <div className="body mt-2">
                    <div ref={setref} className="Body_ScollBar  d-flex">
                        {cardList.length > 0 &&
                            cardList.map((item, index) => {
                                return (<>
                                    <div style={{ alignItems: "center" }} key={"card_" + item.cardId} className="Card ">
                                        <div onClick={() => handleShow(item)} style={{ width: "90%" }} className=" justify-content-between">
                                            <div className="labelDis mb-2">
                                                {
                                                    LabelListState.filter(x => item.LabelInCard.includes(x.LabelId))?.map(i => {
                                                        return (<>

                                                            <div
                                                                style={{ backgroundColor: i.LableCode }}>
                                                            </div></>)
                                                    })}
                                            </div>
                                            <div>
                                                <span key={"span_" + item.cardId}>
                                                    {item.cardName}
                                                </span>
                                            </div>

                                            <div className="bottomDis mt-2">
                                                {item.CheckListId.length > 0 &&
                                                    <span><i className="fa fa-check-square-o" aria-hidden="true"></i>
                                                        {item.CheckListId?.length}</span>
                                                }

                                                <div className={item.Complete ? "bg-success" : "bg-danger"}><i className="fa fa-clock-o" aria-hidden="true"></i>
                                                    {item.deadLine != null ? <Moment format="DD/MM" locale='vi'>{item.deadLine}</Moment>
                                                        : ""}

                                                </div>
                                                {
                                                    item.MemberInCardId.length > 0 &&
                                                    <span> <i className="fa fa-users" aria-hidden="true"></i>
                                                        {item.MemberInCardId?.length}</span>
                                                }
                                                {!item.abledelete &&
                                                    <span><i className="fa fa-lock text-success" aria-hidden="true"></i>
                                                    </span>
                                                }

                                            </div>


                                        </div>
                                        <div className="Icon iconCard">
                                            <i onClick={(e) => {
                                                setCardUpdate(item.cardName)
                                                handleUpdateCardNameIn(e)
                                            }
                                            } key={item.cardId} className="fa fa-pencil" aria-hidden="true"></i>
                                            <i className="fa fa-trash" onClick={() => { handelDeleteCard(item, item.cardId) }} aria-hidden="true"></i>
                                        </div>
                                    </div>
                                    <div style={{ display: "none" }} className="changeName form-group">
                                        <TextareaAutosize placeholder="Đổi tên card" onChange={(e) => { setCardUpdate(e.target.value) }} value={CardUpdate} className="form-control focusnone" rows="3"></TextareaAutosize>
                                        <div className="form-group pt-2">
                                            <button className="addCard btn btn-primary" onClick={(e) => {
                                                handleUpdateCardName(CardUpdate, item, item.cardId)
                                                setCardUpdate("")
                                                if (CardUpdate) {
                                                    e.target.parentElement.parentElement.style.display = "none"
                                                    e.target.parentElement.parentElement.previousElementSibling.style.display = "block"
                                                }
                                            }}>Lưu</button>
                                            <i onClick={(e) => {
                                                setCardUpdate("")
                                                e.target.parentElement.parentElement.style.display = "none"
                                                e.target.parentElement.parentElement.previousElementSibling.style.display = "block"
                                            }} className="fa fa-times Icon" style={{ marginLeft: "10px" }} aria-hidden="true"></i></div>
                                    </div>

                                </>)
                            })
                        }
                        <div style={ShowaddCard ? { display: "block" } : { display: "none" }} className="form-group">
                            <TextareaAutosize placeholder="Tạo mới thẻ" onChange={(e) => { setinputData(e.target.value) }} value={inputData} className="form-control focusnone" rows="3"></TextareaAutosize>
                            <div className="form-group pt-2">
                                <button className="addCard btn btn-primary" onClick={() => {
                                    handleAddNewCard(taskData, inputData)
                                    setinputData("")
                                }}>Thêm mới</button>
                                <i onClick={() => {
                                    setShowaddCard(!ShowaddCard)
                                    setinputData("")
                                }} className="fa fa-times Icon" style={{ marginLeft: "10px" }} aria-hidden="true"></i></div>
                        </div>
                    </div>

                </div>
                <div className="footer p-2 mt-1">
                    <div style={!ShowaddCard ? { display: "block" } : { display: "none" }} onClick={() => {
                        setShowaddCard(!ShowaddCard)
                    }} className="addCard"><i className="fa fa-plus m-1" aria-hidden="true">
                        </i><span>Thêm thẻ mới</span>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
const JobWorkSpace = (props) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [CardData, setCardData] = useState()

    const handleShow = (data) => {
        setCardData(data)
        setShow(true);
    }
    let context = useOutletContext()
    const { LoginId, JobinProject, Task, setTask, Card, SetCard, noti, setnoti, LabelListState } = context
    const { id } = useParams()
    const JobId = parseInt(id)
    const [ShowAddTask, setShowAddTask] = useState(false)
    const [inputData, setinputData] = useState()
    const scrollBt = useRef();
    const MainContent = useRef();

    const handleAddNewCard = (data, text) => {
        if (text) {
            let cardData = {
                cardId: Math.floor(Math.random() * 100) + 1,
                taskId: data.taskId,
                JobId: data.JobId,
                Describe: "",
                cardName: text,
                CheckListId: [],
                LabelInCard: [],
                AttachFileId: [],
                MemberInCardId: [],
                deadLine: null,
                Complete: false,
                createDate: Date.now(),
                userCreateId: LoginId,
                abledelete: true
            }
            SetCard([...Card, cardData])
            let notiChill = {
                notiId: Math.floor(Math.random() * 100) + 1,
                taskId: cardData.taskId,
                JobId: cardData.JobId,
                cardId: cardData.cardId,
                actionName: "thêm mới card",
                creatDate: Date.now(),
                userCreateId: LoginId,
                checked: false
            }
            setnoti([...noti, notiChill])
        }
    }
    const handleAddNewTask = () => {
        if (inputData) {
            let TaskData = {
                taskName: inputData.trim(),
                taskId: Math.floor(Math.random() * 100) + 1,
                JobId: JobId,
                ManageTask: false,
                createDate: Date.now(),
                userCreateId: LoginId,
            }
            setTask([...Task, TaskData])
            let notiChill = {
                notiId: Math.floor(Math.random() * 100) + 1,
                taskId: TaskData.taskId,
                JobId: TaskData.JobId,
                cardId: null,
                actionName: "thêm mới task",
                creatDate: Date.now(),
                userCreateId: LoginId,
                checked: false
            }
            setnoti([...noti, notiChill])
        }
    }
    const handleUpdateTaskName = (data, text) => {
        if (text) {
            let List = Task.find(x => x.taskId == data.taskId)
            if (List.taskName !== text.trim()) {
                List.taskName = text.trim()
                setTask([...Task], List)
                let notiChill = {
                    notiId: Math.floor(Math.random() * 100) + 1,
                    taskId: List.taskId,
                    JobId: List.JobId,
                    cardId: null,
                    actionName: "đổi tên task",
                    creatDate: Date.now(),
                    userCreateId: LoginId,
                    checked: false
                }
                setnoti([...noti, notiChill])
            }
        }
    }
    const handleUpdateCardName = (text, data, cardid) => {
        if (text) {
            let List = Card.find(x => x.cardId == cardid && x.taskId == data.taskId && x.JobId == data.JobId)
            List.cardName = text
            SetCard([...Card], List)
            let notiChill = {
                notiId: Math.floor(Math.random() * 100) + 1,
                taskId: List.taskId,
                JobId: List.JobId,
                cardId: List.cardId,
                actionName: "đổi tên card",
                creatDate: Date.now(),
                userCreateId: LoginId,
                checked: false
            }
            setnoti([...noti, notiChill])
        }
    }
    const handelDupTask = (data) => {
        let DataChange = []
        DataChange.taskId = Math.floor(Math.random() * 100) + 1
        DataChange.JobId = id
        DataChange.createDate = Date.now()
        DataChange.userCreateId = LoginId
        DataChange.taskName = data.taskName.trim()
        DataChange.ManageTask = false
        let listCard = [...Card]
        Card.filter(x => x.taskId == data.taskId && x.JobId == data.JobId).map((item, index) => {
            let cardData = {
                cardId: Math.floor(Math.random() * 100) + 1,
                cardName: item.cardName,
                taskId: DataChange.taskId,
                JobId: JobId,
                Describe: "",
                CheckListId: [],
                AttachFileId: [],
                MemberInCardId: [],
                LabelInCard: [],
                deadLine: null,
                Complete: false,
                userCreateId: LoginId,
                abledelete: true,
                createDate: Date.now(),
            }
            listCard.push(cardData)
        })
        setTask([...Task, DataChange])
        SetCard(listCard)
        let notiChill = {
            notiId: Math.floor(Math.random() * 100) + 1,
            taskId: data.taskId,
            JobId: data.JobId,
            cardId: null,
            actionName: "nhân đôi task",
            creatDate: Date.now(),
            userCreateId: LoginId,
            checked: false
        }
        setnoti([...noti, notiChill])

    }
    const handelDeleteTask = (id) => {
        let List = [...Task]
        List = List.filter(x => x.taskId != id)
        setTask(List)
        let notiChill = {
            notiId: Math.floor(Math.random() * 100) + 1,
            taskId: null,
            JobId: JobId,
            cardId: null,
            actionName: "xóa task trong công việc",
            creatDate: Date.now(),
            userCreateId: LoginId,
            checked: false
        }
        setnoti([...noti, notiChill])
    }
    const handelDeleteCard = (data, cardid) => {
        if (cardid) {
            let List = Card.filter(x => x.cardId !== cardid)
            SetCard(List)
            let notiChill = {
                notiId: Math.floor(Math.random() * 100) + 1,
                taskId: data.taskId,
                JobId: data.JobId,
                cardId: null,
                actionName: "xóa card trong task",
                creatDate: Date.now(),
                userCreateId: LoginId,
                checked: false
            }
            setnoti([...noti, notiChill])
        }
    }
    let CN = {
        codeName: "CT",
        Project: "",
        CardData: CardData,
        jobId: JobId
    }
    return (<>
        <div ref={MainContent} className="ContentJob_DisplayBackGround d-flex">
            {Task &&
                Task.length > 0
                &&
                Task.filter(x => x.JobId == id).map((item, index) => {
                    return (
                        item.ManageTask ?
                            <TaskManage LabelListState={LabelListState} handleShow={handleShow} handelDeleteCard={handelDeleteCard} handelDeleteTask={handelDeleteTask} handelDupTask={handelDupTask} handleAddNewCard={handleAddNewCard} handleUpdateCardName={handleUpdateCardName} handleUpdateTaskName={handleUpdateTaskName} setref={scrollBt} cardList={Card.filter(x => x.JobId == item.JobId && x.taskId == item.taskId)} taskData={item}></TaskManage>
                            :
                            <TaskNormal LabelListState={LabelListState} handleShow={handleShow} handelDeleteCard={handelDeleteCard} handelDeleteTask={handelDeleteTask} handelDupTask={handelDupTask} handleAddNewCard={handleAddNewCard} handleUpdateCardName={handleUpdateCardName} handleUpdateTaskName={handleUpdateTaskName} setref={scrollBt} cardList={Card.filter(x => x.JobId == item.JobId && x.taskId == item.taskId)} taskData={item} ></TaskNormal>
                    )
                })
            }
            <div className="TaskModul mt-3">
                <div className="BackGround_Task">
                    <div style={!ShowAddTask ? { display: "block" } : { display: "none" }} className="form-group">
                        <div className="addTask Icon p-3" onClick={() => setShowAddTask(!ShowAddTask)}>
                            <i className="fa fa-plus" aria-hidden="true"></i>
                            <span>Thêm mới Task</span>


                        </div>
                    </div>
                    <div style={ShowAddTask ? { display: "block" } : { display: "none" }} className="form-group p-2">
                        <TextareaAutosize placeholder="Tạo mới task" onChange={(e) => { setinputData(e.target.value) }} value={inputData} className="form-control focusnone" rows="3" />
                        <div className="form-group pt-2">
                            <button className="addCard btn btn-primary" onClick={() => {
                                handleAddNewTask()
                                setinputData("")
                            }}>Thêm mới</button>
                            <i onClick={() => {
                                setShowAddTask(!ShowAddTask)
                                setinputData("")
                            }} className="fa fa-times Icon" style={{ marginLeft: "10px" }} aria-hidden="true"></i></div>
                    </div>

                </div>
            </div>

        </div>
        <ModelForView handleShow={handleShow} handleClose={handleClose} Title={CardData?.cardName} CN={CN} show={show} ></ModelForView>
    </>)
}
export default JobWorkSpace