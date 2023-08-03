import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

const HomeTask = (Props) => {

    const Nav = useNavigate()
    const { handleShow, CodeName, Project, title, Data, ChangeStar, userFav, handelTaskClick } = Props
    let datainProject = Project ? Data.filter(x => x.ProjectId == parseInt(Project.ProjectId)) : []
    if (CodeName == "_Star") {
        datainProject = Data
        if (datainProject.length > 0)
            return (<>
                <div className="Star rightcontent d-flex">
                    <i className="fa fa-star-o" aria-hidden="true"></i>
                    &nbsp;
                    <h2>{title}
                    </h2>
                </div>
                <div className="TaskComp d-flex">
                    {datainProject.map((item, index) => {
                        return (<>
                            <div key={1 + index} className="TaskComp_Child"  >
                                <div style={{ height: "75%" }} onClick={() => handelTaskClick(item.id)}>
                                    <h5>{item.title}</h5>
                                </div>
                                <div className="Bottom">
                                    <span className="author"> {item.CreateName} </span>
                                    {
                                        !userFav.includes(item.id) ? <i className="fa fa-star-o" title="Star" onClick={(e) => {

                                            ChangeStar({ data: item })
                                        }} aria-hidden="true"></i>
                                            :
                                            <i className="fa fa-star" onClick={(e) => {
                                                ChangeStar({ data: item })
                                            }} title="Unstar" style={{ color: "yellow" }} aria-hidden="true"></i>

                                    }
                                </div>
                            </div></>)
                    })
                    }
                </div></>)
    }
    else if (Project && Project.ProjectId)
        return (<>
            <div className="Star rightcontent d-flex">
                <i className="fa fa-users" aria-hidden="true"></i>
                &nbsp;
                <div className="d-flex justify-content-between w-100">
                    <h2>{title}
                    </h2>
                    {/* add member log */}
                </div>

            </div>
            <div className="TaskComp d-flex">
                {datainProject.map((item, index) => {
                    return (<>
                        <div key={1 + index} className="TaskComp_Child"  >
                            <div style={{ height: "75%" }} onClick={() => handelTaskClick(item.id)}>
                                <h5>{item.title}</h5>
                            </div>
                            <div className="Bottom">
                                <span className="author"> {item.CreateName} </span>
                                {
                                    !userFav.includes(item.id) ? <i className="fa fa-star-o" title="Star" onClick={(e) => {
                                        ChangeStar({ data: item })
                                    }} aria-hidden="true"></i>
                                        :
                                        <i className="fa fa-star" onClick={(e) => {
                                            ChangeStar({ data: item })
                                        }} title="Unstar" style={{ color: "yellow" }} aria-hidden="true"></i>
                                }
                            </div>
                        </div></>)
                })
                }
                <div className="TaskComp_Child bg-secondary" onClick={() => handleShow("JIP", Project)} >
                    <h5>Tạo công việc mới </h5>
                    <div className="Bottom">
                        <i className="fa fa-arrow-right" aria-hidden="true"></i>
                    </div>
                </div>
            </div>
        </>)
}
export default HomeTask