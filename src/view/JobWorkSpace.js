import { useEffect, useRef, useState } from "react"
import { useNavigate, useOutletContext, useParams } from "react-router-dom"
import DeleteComf from "./DeleteComf"
import ModelForView from "./Model"
import TextareaAutosize from 'react-textarea-autosize';
const TaskManage = (props) => {
    const [ShowaddCard, setShowaddCard] = useState(false)
    const [Show, setShow] = useState(false)
    // const [ShowCard, setShowCard] = useState(false)
    const ShowCard = useRef(false)
    const [inputData, setinputData] = useState()
    const { handleShow, taskData, handelDupTask, handelDeleteCard, handelDeleteTask, handleAddNewCard, handleUpdateCardName, handleUpdateTaskName, setref } = props
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
                        {taskData.CardList.length > 0 &&
                            taskData.CardList.map((item, index) => {
                                return (<>
                                    <div style={{ alignItems: "center" }} key={"card_" + item.cardId} className="Card ">
                                        <div onClick={() => handleShow(item.cardName)} style={{ width: "90%" }} className="d-flex justify-content-between">
                                            <span key={"span_" + item.cardId}>
                                                {item.cardName}
                                            </span>


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
    const { handleShow, taskData, handelDupTask, handelDeleteCard, handelDeleteTask, handleAddNewCard, handleUpdateCardName, handleUpdateTaskName, setref } = props
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
                        {taskData.CardList.length > 0 &&
                            taskData.CardList.map((item, index) => {
                                return (<>
                                    <div style={{ alignItems: "center" }} key={"card_" + item.cardId} className="Card ">
                                        <div onClick={() => handleShow(item.cardName)} style={{ width: "90%" }} className="d-flex justify-content-between">
                                            <span key={"span_" + item.cardId}>
                                                {item.cardName}
                                            </span>


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
    const [CardName, setCardName] = useState()
    const handleShow = (CardName) => {
        setCardName(CardName)
        setShow(true);
    }
    let context = useOutletContext()
    const { LoginId, JobinProject, Task, setTask } = context
    const { id } = useParams()
    const [ShowAddTask, setShowAddTask] = useState(false)
    const [inputData, setinputData] = useState()
    const scrollBt = useRef();
    const MainContent = useRef();

    const handleAddNewCard = (data, text) => {
        if (text) {
            let List = Task.find(x => x.taskId == data.taskId)
            let cardData = {
                cardId: Math.floor(Math.random() * 100) + 1,
                cardName: text,
                taskId: data.taskId,
                abledelete: true,
                userCreateId: LoginId,
                createDate: Date.now(),
            }
            List.CardList = [...List.CardList, cardData]
            setTask([...Task], List)
        }

    }
    const handleAddNewTask = () => {
        if (inputData) {
            let TaskData = {
                taskName: inputData.trim(),
                taskId: Math.floor(Math.random() * 100) + 1,
                JobId: id,
                ManageTask: false,
                createDate: Date.now(),
                userCreateId: LoginId,
                CardList: []
            }
            setTask([...Task, TaskData])
        }
    }
    const handleUpdateTaskName = (data, text) => {
        if (text) {
            let List = Task.find(x => x.taskId == data.taskId)
            List.taskName = text.trim()
            setTask([...Task], List)
        }
    }
    const handleUpdateCardName = (text, data, cardid) => {
        if (text) {
            let List = Task.find(x => x.taskId == data.taskId)?.CardList?.find(x => x.cardId == cardid)
            List.cardName = text
            setTask([...Task], List)
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
        let listCard = []
        data.CardList.map((item, index) => {
            let cardData = {
                cardId: Math.floor(Math.random() * 100) + 1,
                cardName: item.cardName,
                taskId: DataChange.taskId,
                userCreateId: LoginId,
                abledelete: true,
                createDate: Date.now(),
            }
            listCard.push(cardData)
        })
        DataChange.CardList = listCard
        setTask([...Task, DataChange])
    }
    const handelDeleteTask = (id) => {
        let List = [...Task]
        List = List.filter(x => x.taskId != id)
        setTask(List)
    }
    const handelDeleteCard = (data, cardid) => {
        if (cardid) {
            let List = Task.find(x => x.taskId == data.taskId)
            List.CardList = List?.CardList?.filter(x => x.cardId !== cardid)
            setTask([...Task], List)
        }
    }
    let CN = {
        codeName: "CT",
        Project: ""
    }
    // useEffect(() => {
    //     console.log(Task)

    // })
    return (<>
        <div ref={MainContent} className="ContentJob_DisplayBackGround d-flex">
            {Task &&
                Task.length > 0
                &&
                Task.filter(x => x.JobId == id).map((item, index) => {
                    return (
                        item.ManageTask ?
                            <TaskManage handleShow={handleShow} handelDeleteCard={handelDeleteCard} handelDeleteTask={handelDeleteTask} handelDupTask={handelDupTask} handleAddNewCard={handleAddNewCard} handleUpdateCardName={handleUpdateCardName} handleUpdateTaskName={handleUpdateTaskName} setref={scrollBt} taskData={item}></TaskManage>
                            :
                            <TaskNormal handleShow={handleShow} handelDeleteCard={handelDeleteCard} handelDeleteTask={handelDeleteTask} handelDupTask={handelDupTask} handleAddNewCard={handleAddNewCard} handleUpdateCardName={handleUpdateCardName} handleUpdateTaskName={handleUpdateTaskName} setref={scrollBt} taskData={item} ></TaskNormal>
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
        <ModelForView handleShow={handleShow} handleClose={handleClose} Title={CardName} CN={CN} show={show} ></ModelForView>
    </>)
}
export default JobWorkSpace