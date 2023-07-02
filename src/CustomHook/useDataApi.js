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
    const [Task, setTask] = useState()
    return {
        projectData, LoginId: 1, setprojectData, Task, setTask, ListUser, setListUser, JobinProject, setJobinProject
    }
    // UserSignInData, setUserSignInData,
}
export default useDataApi