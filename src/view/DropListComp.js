import { useState } from "react"

const DropListComp = (props) => {
    const { JobinProject, handelTaskClick } = props
    const [Toggle, setToggle] = useState(true)
    if (JobinProject && JobinProject.length > 0)
        return (<>
            <div onClick={() => {
                setToggle(!Toggle)
            }} className="HeaderDropList d-flex justify-content-between" style={{ cursor: "pointer" }}><span>
                    Công việc đang thực hiện
                </span>
                {Toggle ?
                    <i className="fa fa-angle-down" aria-hidden="true"></i>
                    : <i className="fa fa-angle-up" aria-hidden="true"></i>
                }
            </div>
            {
                Toggle && (
                    <>
                        <div className="DropDownList">
                            <ul key={1} className="DropDownList_chill">
                                {JobinProject && JobinProject.length > 0 &&
                                    JobinProject.map((item, index) => {
                                        return (<>
                                            <li onClick={handelTaskClick} key={item.id} className="WorkingTask">
                                                {item.title}
                                            </li>
                                        </>)
                                    })


                                }
                            </ul>
                        </div>
                    </>)


            }
        </>)
}
export default DropListComp