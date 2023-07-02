import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

const HomeTask = (Props) => {

    const Nav = useNavigate()
    const { CodeName, ProjectId, title, Data, ChangeStar, userFav, handelTaskClick } = Props
    let datainProject = ProjectId ? Data.filter(x => x.ProjectId == parseInt(ProjectId)) : []
    if (CodeName == "_Star") {
        datainProject = Data
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
                        <div key={index} className="TaskComp_Child"  >
                            <div style={{ height: "75%" }} onClick={() => handelTaskClick(1)}>
                                <h5>{item.title}</h5>


                            </div>
                            <div className="Bottom">
                                <span className="author"> {item.CreatName} </span>
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
    else if (ProjectId)
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
                        <div key={index} className="TaskComp_Child"  >
                            <div style={{ height: "75%" }} onClick={() => handelTaskClick(1)}>
                                <h5>{item.title}</h5>
                            </div>
                            <div className="Bottom">
                                <span className="author"> {item.CreatName} </span>
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
            </div>
        </>)
}
export default HomeTask