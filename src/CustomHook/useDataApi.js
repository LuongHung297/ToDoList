import { useState } from "react"

const useDataApi = () => {
    const [JobinProject, setJobinProject] = useState([
        {
            id: 1,
            title: "Thiet ke ky thuat",
            CreatId: 1,
            CreateName: "Luong Hung",
            Member: [2, 3],
            JobManageId: [],
            ProjectId: 1
        }, {
            id: 2,
            title: "Thiet ke ky thuat",
            CreatId: 1,
            CreateName: "Luong Hung",
            Member: [2, 3],
            JobManageId: [],
            ProjectId: 1
        }, {
            id: 3,
            title: "Thiet ke ky thuat",
            CreatId: 1,
            CreateName: "Luong Hung",
            Member: [2, 3],
            JobManageId: [],
            ProjectId: 1
        }, {
            id: 4,
            title: "Thiet ke ky thuat",
            CreatId: 1,
            CreateName: "Luong Hung",
            Member: [2, 3],
            JobManageId: [],
            ProjectId: 4
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
    const [ListUser, setListUser] = useState([{
        UserId: 1,
        UserName: "Luong Trung Hung",
        ProjectJoin: [1, 4],
        JobJoin: [1, 2, 3, 4],
        JobFav: [3],
        CreatedProject: [3], ManageProjectId: []
    }, {
        UserId: 3,
        UserName: "Geo",
        ProjectJoin: [],
        JobJoin: [],
        JobFav: [3],
        CreatedProject: [3], ManageProjectId: []
    }, {
        UserId: 4,
        UserName: "Tester",
        ProjectJoin: [],
        JobJoin: [],
        JobFav: [3],
        CreatedProject: [3], ManageProjectId: []
    }])
    const [projectData, setprojectData] = useState([{
        ProjectName: "TestProject1",
        ProjectDes: "",
        ProjectId: 1,
        CreateId: "1",
        CreateName: "Luong Trung Hung",
        ProjectMember: [4, 1],
        ManageUserId: [],
        JobinProject: [1, 2, 3]
    }, {
        ProjectName: "TestProject14",
        ProjectDes: "",
        ProjectId: 4,
        CreateId: "1",
        CreateName: "Luong Trung Hung",
        ProjectMember: [1],
        ManageUserId: [],
        JobinProject: [4]
    }])
    const [Task, setTask] = useState([
        // {
        //     taskName: "TaskManege",
        //     taskId: 3,
        //     JobId: 3,
        //     ManageTask: true,
        //     createDate: Date.now(),
        //     userCreateId: 1,
        //     CardList: [{
        //         cardId: 1,
        //         taskId: 1,
        //         cardName: "card1",
        //         userCreateId: 1,
        //         createDate: Date.now(),
        //     }, {
        //         cardId: 2,
        //         cardName: "card2",
        //         taskId: 1,
        //         userCreateId: 1,
        //         createDate: Date.now(),
        //     }]
        // },
        // {
        //     taskName: "Task1",
        //     taskId: 1,
        //     JobId: 2,
        //     ManageTask: false,
        //     createDate: Date.now(),
        //     userCreateId: 1,
        //     CardList: [{
        //         cardId: 1,
        //         taskId: 1,
        //         cardName: "card1",
        //         userCreateId: 1,
        //         createDate: Date.now(),
        //     }, {
        //         cardId: 2,
        //         cardName: "card2",
        //         taskId: 1,
        //         userCreateId: 1,
        //         createDate: Date.now(),
        //     }]
        // }, {
        //     taskName: "Task2",
        //     taskId: 2,
        //     JobId: 3,
        //     ManageTask: true,
        //     createDate: Date.now(),
        //     userCreateId: 1,
        //     CardList: [{
        //         cardId: 3,
        //         taskId: 2,
        //         cardName: "card3",
        //         userCreateId: 1,
        //         createDate: Date.now(),
        //     }, {
        //         cardId: 4,
        //         cardName: "card4",
        //         taskId: 2,
        //         userCreateId: 1,
        //         createDate: Date.now(),
        //     }]
        // }
    ])
    return {
        projectData, LoginId: 1, setprojectData, Task, setTask, ListUser, setListUser, JobinProject, setJobinProject
    }
    // UserSignInData, setUserSignInData,
}
export default useDataApi