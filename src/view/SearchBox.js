
import React, { useState, useRef, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../Custom.css';
import { Form } from 'react-router-dom';
import useDataApi from '../CustomHook/useDataApi';
function SearchBox(props) {
    const { ListUser, setSearch, Search, setuserinPj, userinPj } = props
    const SetData = (item) => {
        let data = [...userinPj]
        if (!data.find(x => x.UserId == item.UserId)) {
            data.push({
                UserId: item.UserId,
                UserName: item.UserName,
                fav: false
            })
            setuserinPj(data)
        }
    }
    return (
        <div className="Searchbox">
            <input onChange={(e) => setSearch(e.target.value)} value={Search} type="text" className="form-control" placeholder="Thêm thành viên" aria-label="addUser" aria-describedby="basic-addon1" />
            <div className='Select-Value'>
                {Search && ListUser.filter(x => x.UserName.toUpperCase().includes(Search.toUpperCase())).map((item, index) => {
                    return <button onClick={(e) => SetData(item)} className='ChilToSelect'> {item.UserName}</button>
                })}
            </div>
        </div>
    );
}

export default SearchBox