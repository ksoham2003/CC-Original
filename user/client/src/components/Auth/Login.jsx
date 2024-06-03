import "./Auth.css";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import CodingLogo from "../../assets/Logo.png";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "../../config/Context";

function Login(){

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const {loginInfo, setLoginInfo} = useContext(Context);

    async function handleSubmit(){
        if(email==="" || password===""){
            alert("Please Fill All the Details");
        }
        else{
            await axios.post(process.env.REACT_APP_BASE_URL+"/auth/login", {email, password}).then((res)=>{
                setLoginInfo(res.data.user);
                navigate('/');
            }).catch((error)=>{
                alert(error?.response?.data?.message)
            })
        }
    }


    return(
        <div className="login-main-div">
            <div className="login-form">
                <div className="auth-heading">Login Here!</div>
                <div>
                    <div className="auth-box">
                        <MdOutlineEmail className="auth-icon"/>
                        <input onChange={(e)=>setEmail(e.target.value)} type="text" placeholder="Email" className="auth-inp"/>
                    </div>
                    <div className="auth-box">
                        <RiLockPasswordLine className="auth-icon"/>
                        <input onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Password" className="auth-inp"/>
                    </div>
                    <div className="auth-forgot-text">
                        Forgot your password?
                    </div>
                    <div className="auth-btn-box">
                        <span onClick={handleSubmit} className="auth-btn">Sign In</span>
                    </div>
                    <div className="auth-forgot-text1">
                        Don't have an Account? <Link to='/signup'>Create Account</Link>
                    </div>
                </div>
            </div>
            <div>
                <img className="coding-logo" src={CodingLogo} alt="" />
            </div>
        </div>
    )
}
export default Login;