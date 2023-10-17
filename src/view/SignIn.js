import { Nav } from "react-bootstrap"
import { BrowserRouter, Link, NavLink, Outlet, Route, Routes } from "react-router-dom"
import useHashCode from "../CustomHook/HashCode"
import useSubmiFormCustom from "../CustomHook/SubmitFormCustom"
import useDataApi from "../CustomHook/useDataApi"
import { useEffect, useState } from "react"
import { ToastContainer, toast } from 'react-toastify';
const SignModul = () => {
    return (<>
        <Outlet></Outlet>
        <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
        />
        <ToastContainer /></>)
}
const SignIn = () => {
    let api = useDataApi()
    const { setListUser, ListUser, setLoginId, LoginId } = api
    const { handleSubmit, inputs } = useSubmiFormCustom(false)
    const supmitSign = async (e) => {
        e.preventDefault()
        let data = handleSubmit(e)
        ListUser.find(x => x.UserName == data.UserName && x.Password == data.Password)
        setLoginId(data.UserId)
    }
    useEffect(() => { console.log(LoginId) }, [LoginId])
    return (<>
        <section>
            <div className="signin">
                <div className="content" >
                    <h2>Đăng nhập</h2>
                    <form className=" form" onSubmit={supmitSign} novalidate="novalidate">
                        <div className="inputBox">
                            <input type="text" name="UserName" className="formInput" required /> <i>Tài khoản</i>
                        </div>
                        <div className="inputBox">

                            <input type="password" name="Password" className="formInput" required /> <i>Mật khẩu</i>

                        </div>
                        <div className="links"> <NavLink to="/ForgotPass">Quên mật khẩu</NavLink><NavLink to="/SignUp">Chưa có tài khoản?</NavLink>
                        </div>
                        <div className="inputBox">
                            <input type="submit" value="Đăng nhập" />
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </>)
}
const SignUp = () => {
    let api = useDataApi()
    const { setListUser, ListUser, setLoginId, LoginId } = api
    const { handleSubmit, inputs } = useSubmiFormCustom(false)
    const [checkPass, setcheckPass] = useState()
    const supmitSignup = async (e) => {
        e.preventDefault()
        let check = document.querySelector("input[type='password'].formInput")
        let data = handleSubmit(e)
        console.log(data)
        if (data) {
            if (checkPass == check.value) {
                check.style.color = "white"
                check.parentElement.classList.remove("SaiMatKhau")
                check.parentElement.classList.add("DungMk")
                data.UserId = Math.floor(Math.random() * 100) + 1
                data.Password = (await data.Password)
                data.ProjectJoin = []
                data.JobJoin = []
                data.JobFav = []
                data.CreatedProject = []
                data.ManageProjectId = []
                setListUser([...ListUser, data])
                toast.success("Tạo mới thành công !")

            } else {
                check.style.color = "red"
                check.parentElement.classList.remove("DungMk")
                check.parentElement.classList.add("SaiMatKhau")
            }
        }

    }

    return (<>        <section>
        <div className="signin">
            <div className="content">
                <h2>Đăng ký</h2>
                <form className="form" onSubmit={supmitSignup} noValidate="novalidate">
                    <div className="inputBox">
                        <input className="formInput" type="text" name="UserName" required /> <i>Tài khoản</i>
                    </div>
                    <div className="inputBox">
                        <input type="text" required /> <i>Họ và tên</i>
                    </div>
                    <div className="inputBox">
                        <input type="text" required /> <i>Email</i>
                    </div>
                    <div className="inputBox">
                        <input type="password" onChange={(e) => { setcheckPass(e.target.value) }} required /> <i>Mật khẩu</i>
                    </div>
                    <div className="inputBox">
                        <input type="password" name="Password" className="formInput" required /> <i>Nhập lại mật khẩu</i>
                    </div>
                    <div className="links"> <NavLink to="/">Đăng nhập</NavLink>
                    </div>
                    <div className="inputBox">
                        <input type="submit" value="Đăng ký" />
                    </div>
                </form>
            </div>
        </div>
    </section>


    </>)

}
const ForgotPass = () => {
    return (<>        <section>
        <div className="signin">
            <div className="content">
                <h2>Quên mật khẩu</h2>
                <div className="form">
                    <div className="inputBox">
                        <input type="text" required /> <i>Tài khoản</i>
                    </div>
                    <div className="links"> <NavLink to="/">Đăng nhập</NavLink> <NavLink to="/SignUp">Chưa có tài khoản?</NavLink>
                    </div>
                    <div className="inputBox">
                        <input type="submit" value="Lấy lại mật khẩu" />
                    </div>
                </div>
            </div>
        </div>
    </section></>)
}
export { SignModul, SignIn, SignUp, ForgotPass } 