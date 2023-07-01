import { useState } from "react"

const useDataApi = () => {
    const [JobinProject, setJobinProject] = useState([
        {
            id: 1,
            title: "Thiet ke ky thuat",
            CreatId: 1,
            CreatName: "Luong Hung",
            Member: [2, 3],
            JobManageId: [],
            ProjectId: 1
        }, {
            id: 2,
            title: "Thiet ke ky thuat",
            CreatId: 1,
            CreatName: "Luong Hung",
            Member: [2, 3],
            JobManageId: [],
            ProjectId: 1
        }, {
            id: 3,
            title: "Thiet ke ky thuat",
            CreatId: 1,
            CreatName: "Luong Hung",
            Member: [2, 3],
            JobManageId: [],
            ProjectId: 1
        }, {
            id: 4,
            title: "Thiet ke ky thuat",
            CreatId: 1,
            CreatName: "Luong Hung",
            Member: [2, 3],
            JobManageId: [],
            ProjectId: 4
        },
    ])
    const [UserSignInData, setUserSignInData] = useState({
        UserId: 2,
        UserName: "Luong Trung Hung",
        ProjectJoin: [1, 2, 3, 4, 0],
        JobJoin: [1, 2, 3, 4],
        JobFav: [1],
        CreatedProject: [3]
    })
    const [ListUser, setListUser] = useState([{
        UserId: 1,
        UserName: "Luong Trung Hung",
        ProjectJoin: [1, 2, 3, 4, 0],
        JobJoin: [],
        JobFav: [3],
        CreatedProject: [3]
    }, {
        UserId: 3,
        UserName: "Geo",
        ProjectJoin: [],
        JobJoin: [],
        JobFav: [3],
        CreatedProject: [3]
    }, {
        UserId: 4,
        UserName: "Tester",
        ProjectJoin: [],
        JobJoin: [],
        JobFav: [3],
        CreatedProject: [3]
    }])
    const [projectData, setprojectData] = useState([{
        ProjectName: "TestProject1",
        ProjectDes: "",
        ProjectId: 1,
        CreateId: "1",
        CreateName: "Luong Trung Hung",
        ProjectMember: [],
        ManageUserId: [],
        JobinProject: []
    }, {
        ProjectName: "TestProject14",
        ProjectDes: "",
        ProjectId: 4,
        CreateId: "1",
        CreateName: "Luong Trung Hung",
        ProjectMember: [],
        ManageUserId: [],
        JobinProject: []
    }])
    const [Task, setTask] = useState()
    return {
        projectData, setprojectData, Task, setTask, ListUser, setListUser, UserSignInData, setUserSignInData, JobinProject, setJobinProject
    }
}
export default useDataApi