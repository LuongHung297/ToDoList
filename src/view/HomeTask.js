import { useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"

const HomeTask = (Props) => {

    const Nav = useNavigate()
    const { CodeName, title, Data, ChangeStar, userFav } = Props
    const handelTaskClick = () => {
    }
    if (Data && Data.length > 0)
        return (<>
            <div className="Star rightcontent d-flex">
                {CodeName == "_Star" ? <i className="fa fa-star-o" aria-hidden="true"></i> : <i className="fa fa-users" aria-hidden="true"></i>}
                &nbsp;
                <h2>{title}
                </h2>

            </div>
            <div className="TaskComp d-flex">
                {Data.map((item, index) => {
                    return (<>
                        <div key={index} className="TaskComp_Child" onClick={() => handelTaskClick(1)} >
                            <h5>{item.title}</h5>
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
export default HomeTask