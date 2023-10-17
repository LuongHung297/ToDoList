import { useState } from 'react'
import { useOutletContext, useParams } from 'react-router-dom'
const ListTaskInJob = (Probs) => {
    let context = useOutletContext()
    const { JobinProject, ListUser, LabelListState, Task } = context
    const { handelClose, handelTranFCard, carddata } = Probs
    return (<>
        <div className='ModelHeader'>
            <div className='TitleHead w-80'>
                <h5>Danh sách task</h5>
            </div>
            <div className='w-10' onClick={() => {
                handelClose()
            }}>
                <i className="fa fa-times icon" aria-hidden="true"></i>
            </div>
        </div>
        <div className="memb">
            <div className="SearchBoxMem">
                <select onChange={(e) => handelTranFCard(e.target.value)} className="form-select form-select-sm" style={{ cursor: "pointer" }} aria-label=".form-select-sm example">
                    {Task?.filter(x => x.JobId == carddata.JobId).map(i => {
                        return (<>
                            {i.taskId == carddata.taskId ?
                                <option style={{ cursor: "pointer" }} selected value={i.taskId}>{i.taskName}</option>
                                :
                                <option style={{ cursor: "pointer" }} value={i.taskId}>{i.taskName}</option>
                            }
                        </>)
                    })}

                </select>

            </div>
        </div>
    </>)
}
const LabelList = (Probs) => {
    let context = useOutletContext()
    const { JobinProject, ListUser, LabelListState } = context
    const { HandelClose, LabelInCard, handelLabel } = Probs
    return (<>
        <div className='ModelHeader'>
            <div className='TitleHead w-80'>
                <h5>Nhãn dán</h5>
            </div>
            <div className='w-10' onClick={() => {
                HandelClose()
            }}>
                <i className="fa fa-times icon" aria-hidden="true"></i>
            </div>
        </div>
        <div className="memb">
            <div className="ListMem">

                {LabelListState.map((item, index) => {
                    return (<>
                        <div className="ListMemChill_Label" >
                            <div className='checkboxColor'>{
                                LabelInCard?.includes(item.LabelId) ?
                                    <input checked onChange={() => handelLabel(item.LabelId, false)} className="form-check-input focusnone" type="checkbox" value="" />
                                    :
                                    <input onChange={() => handelLabel(item.LabelId, true)} className="form-check-input focusnone" type="checkbox" value="" />

                            }
                            </div>
                            <div style={{ backgroundColor: item.LableCode }} title={item.LableColor} className='ColorDiv'></div>
                        </div>
                    </>)
                })
                }
            </div>

        </div>
    </>)

}
const CheckListCom = (Probs) => {
    let context = useOutletContext()
    const { JobinProject, ListUser, LabelListState } = context
    const { HandelClose, handelCheckList } = Probs
    const [inputval, setinputval] = useState("Danh sách công việc")
    return (<>
        <div className='ModelHeader'>
            <div className='TitleHead w-80'>
                <h5>Danh sách công việc</h5>
            </div>
            <div className='w-10' onClick={() => {
                HandelClose()
                setinputval("")
            }}>
                <i className="fa fa-times icon" aria-hidden="true"></i>
            </div>
        </div>
        <div className="memb">
            <label >Tên danh sách</label>
            <input onChange={(e) => { setinputval(e.target.value) }} value={inputval} className='form-control'></input>
            <button onClick={() => {
                setinputval("")
                handelCheckList(inputval)

            }} className=' mt-2 btn btn-sm btn-primary'>Lưu</button>
        </div>
    </>)
}
const FileAttach = () => {

}
const DropDownMember = (Probs) => {
    let context = useOutletContext()
    const { JobinProject, ListUser } = context
    const [Search, setSearch] = useState()
    const { id } = useParams()
    const JobId = parseInt(id)
    const { HandelClose, UserInCard, HandelMember } = Probs
    const ListMember = ListUser.filter(x => JobinProject?.find(x => x.id == JobId)?.Member?.includes(x.UserId))
    const listSearch = ListMember.filter(x => Search && x.UserName.toLowerCase().includes(Search?.toLowerCase()))
    return (<>
        <div className='ModelHeader'>
            <div className='TitleHead w-80'>
                <h5>Thành viên</h5>
            </div>
            <div className='w-10' onClick={() => {
                HandelClose()
                setSearch("")
            }}>
                <i className="fa fa-times icon" aria-hidden="true"></i>
            </div>
        </div>
        <div className="memb">
            <div className="SearchBoxMem">
                <input className="form-control" value={Search} onChange={(e) => { setSearch(e.target.value) }} placeholder="Tìm thành viên"></input>
                {listSearch && listSearch.map((item) => {
                    return (<>
                        <div className="ListMemChill" onClick={() => HandelMember(item.UserId, true)}>
                            <div style={{
                                backgroundImage: `url(${require('../asset/image/avatarSignIn.jpg')})`
                            }} className="useimg"></div>
                            <span>{item.UserName}</span>
                            {UserInCard.includes(item.UserId) &&
                                <div className="isIn"><i className="fa fa-check" aria-hidden="true"></i>
                                </div>
                            }

                        </div>
                    </>)
                })}

            </div>
            <div className="ListMem">
                <span className="h6">Thành viên</span>
                {ListUser?.filter(x => UserInCard.includes(x.UserId))?.map((item, index) => {
                    return (<>
                        <div className="ListMemChill" onClick={() => HandelMember(item.UserId, false)}>
                            <div style={{
                                backgroundImage: `url(${require('../asset/image/avatarSignIn.jpg')})`
                            }} className="useimg"></div>
                            <span >{item.UserName}</span>
                            <div className="isIn"><i className="fa fa-check" aria-hidden="true"></i>
                            </div>
                        </div>

                    </>)
                })
                }
            </div>

        </div>
    </>)
}
export { FileAttach, CheckListCom, DropDownMember, LabelList, ListTaskInJob }