import { useState } from "react"

const useDataApi = () => {
    const [LabelListState, setLabelListState] = useState([
        {
            LabelId: 1,
            LableColor: "Primary",
            LableCode: "#0d6efd"
        }, {
            LabelId: 2,
            LableColor: "Info",
            LableCode: "#0dcaf0"
        },
        {
            LabelId: 3,
            LableColor: "indigo",
            LableCode: "#6610f2"
        },
        {
            LabelId: 4,
            LableColor: "Success",
            LableCode: "#198754"
        },
        {
            LabelId: 5,
            LableColor: "Secondary",
            LableCode: "#6c757d"
        },

        {
            LabelId: 6,
            LableColor: "Warning",
            LableCode: "#ffc107"
        },
        {
            LabelId: 7,
            LableColor: "orange",
            LableCode: "#fd7e14"
        },
        , {
            LabelId: 8,
            LableColor: "Danger",
            LableCode: "#dc3545"
        },
        {
            LabelId: 9,
            LableColor: "pink",
            LableCode: "#d63384"
        }

    ])
    const [JobinProject, setJobinProject] = useState([
        {
            id: 1,
            title: "Main Test",
            CreatId: 1,
            CreateName: "Luong Hung",
            Member: [1, 3, 4],
            JobManageId: [1, 3],
            ProjectId: 1
        },
    ])

    // const [UserSignInData, setUserSignInData] = useState({
    //     UserId: 2,
    //     UserName: "Luong Trung Hung",
    //     ProjectJoin: [1, 2, 3, 4, 0],
    //     JobJoin: [1, 2, 3, 4],
    //     JobFav: [1],
    //     CreatedProject: [3]
    // })
    const [ListUser, setListUser] = useState([])
    const [projectData, setprojectData] = useState([{
        ProjectName: "TestProjectMain",
        ProjectDes: "",
        ProjectId: 1,
        CreateId: "1",
        CreateName: "Luong Trung Hung",
        ProjectMember: [4, 1, 3],
        ManageUserId: [1],
        JobinProject: [1, 2, 3]
    }, {
        ProjectName: "TestProject14",
        ProjectDes: "",
        ProjectId: 4,
        CreateId: "1",
        CreateName: "Luong Trung Hung",
        ProjectMember: [4, 1],
        ManageUserId: [],
        JobinProject: [4]
    }])
    const [Card, SetCard] = useState([
        {
            cardId: 1,
            taskId: 3,
            JobId: 1,
            cardName: "The quan ly",
            CheckListId: [],
            Describe: "",
            AttachFileId: [],
            MemberInCardId: [1, 3, 4],
            LabelInCard: [],
            deadLine: Date.now(),
            createDate: Date.now(),
            userCreateId: 1,
            Complete: false,
            abledelete: false
        }
    ])
    const [CommentInCard, setCommentInCard] = useState([
        // {
        //     // commentId:1
        //     //     cardId: 1,
        //     //     CommentText: "card1",
        //     //     userCreateId: 1,
        //     //     createDate: Date.now(),
        // }
    ])
    const [CheckList, setCheckList] = useState([
        // {
        //     CheckListName: "check1",
        //     CheckListId: 1,
        //     CardId: 1,
        //     TaskId: 1,
        //     CheckChill: [{
        //         CheckId: 1,
        //         CheckTitle: "viec1",
        //         isDone: false
        //     }],
        //     createDate: Date.now(),
        //     userCreate: 1,
        // }
    ])
    const [fileAttach, setFileAttach] = useState([
        // {
        //     CardId: 1,
        //     taskId: 1,
        //     FileId: 1,
        //     FileUrl: 'sklJS',
        //     CreateDate: Date.now(),
        //     UserCreate: 1,
        // }
    ])
    const [Task, setTask] = useState([
        {
            taskName: "TaskManege",
            taskId: 3,
            JobId: 1,
            ManageTask: true,
            createDate: Date.now(),
            userCreateId: 1
        }
    ])
    const [LoginId, setLoginId] = useState()
    const [noti, setnoti] = useState([])
    return {
        noti, setnoti,
        fileAttach, setFileAttach, CheckList, setCheckList, Card, SetCard, LabelListState, setLabelListState,
        projectData, setprojectData, Task, setTask, CommentInCard, setCommentInCard, ListUser, setListUser, JobinProject, setJobinProject,
        LoginId, setLoginId
    }
    // UserSignInData, setUserSignInData,
}
export default useDataApi