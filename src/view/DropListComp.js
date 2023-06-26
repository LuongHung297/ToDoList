import { useState } from "react"

const DropListComp = (props) => {
    const { fakeData } = props

    const [Toggle, setToggle] = useState(true)
    if (fakeData && fakeData.length > 0)
        return (<>
            <div onClick={() => {
                setToggle(!Toggle)
            }} className="HeaderDropList d-flex justify-content-between" style={{ cursor: "pointer" }}><span>
                    Task đang thực hiện
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
                            <ul className="DropDownList_chill">
                                {fakeData && fakeData.length > 0 &&

                                    fakeData.map((item) => {
                                        return (<>
                                            <li className="WorkingTask">
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