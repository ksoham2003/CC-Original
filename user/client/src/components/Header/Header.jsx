import "./Header.css";
import LogoImg from "../../assets/Logo.png";
import Logoimg2 from "../../assets/2.png";
import AccountImg from "../../assets/user2.png";

import { VscAccount } from "react-icons/vsc";
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { useContext } from "react";
import { Context } from "../../config/Context";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const { loginInfo, setLoginInfo } = useContext(Context);
  const navigate = useNavigate();

  const handleLogout = () => {
    setLoginInfo(null); // Clear the login information
    navigate('/'); // Redirect to home page
  };

  const items = [
    {
      key: '1',
      label: (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img className="dropdown-img" src={LogoImg} />
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <span>Name: {loginInfo?.name}</span>
      ),
      disabled: false,
    },
    {
      key: '3',
      label: (
        <span>Email: {loginInfo?.email}</span>
      ),
      disabled: false,
    },
    {
      key: '4',
      label: (
        <span>Department: {loginInfo?.department}</span>
      ),
      disabled: false,
    },
    {
      key: '5',
      label: (
        <span>Year: {loginInfo?.year}</span>
      ),
      disabled: false,
    },
    {
      key: '6',
      label: (
        <span>Div: {loginInfo?.div}</span>
      ),
      disabled: false,
    },
    {
      key: '7',
      label: (
        <span>Mobile: {loginInfo?.mobile}</span>
      ),
      disabled: false,
    },
    {
      key: '8',
      danger: true,
      label: (
        <span onClick={handleLogout}>Logout</span>
      ),
    }
  ];

  const item = [
    {
      key: '1',
      danger: true,
      label: (
        <Link to={'/login'}>Login</Link>
      )
    },
  ];

  return (
    <div className="header-main-div">
      <img src={Logoimg2} style={{ height: 80 }} alt="" className="header-img" />
      <img src={LogoImg} alt="" className="header-img" />

      <Dropdown
        menu={
          loginInfo ?
            { items: items }
            : { items: item }
        }
      >
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            {/* <VscAccount className="profile-icon"/> */}
            <img className="account-img" src={AccountImg} />
          </Space>
        </a>
      </Dropdown>
    </div>
  )
}

export default Header;