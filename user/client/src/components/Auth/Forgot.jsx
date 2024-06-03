import "./Auth.css";
import { MdOutlineEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import CodingLogo from "../../assets/Logo.png";


function Forgot(){
    return(
        <div className="login-main-div">
            <div className="login-form">
                <div className="auth-heading">Reset Password</div>
                <div>
                    <div className="auth-box">
                        <MdOutlineEmail className="auth-icon"/>
                        <input type="text" placeholder="Email" className="auth-inp"/>
                    </div>
                    <div className="auth-btn-box">
                        <span className="auth-btn">Submit</span>
                    </div>
                </div>
            </div>
            <div>
                <img className="coding-logo" src={CodingLogo} alt="" />
            </div>
        </div>
    )
}
export default Forgot;