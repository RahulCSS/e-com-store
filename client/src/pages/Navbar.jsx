import React, {useState, useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
//Components
import { Menu, Input, Button, Badge, message, Avatar, Space, Dropdown} from 'antd';
const { Search } = Input;
import { SearchOutlined, ShoppingCartOutlined, UserOutlined} from '@ant-design/icons';
import LoginModal from '../components/Home/LoginModal';
import SignupModal from '../components/Home/SignupModal';
// API
import { GetCurrentUser } from '../apicalls/users';
// Actions
import { showLoginModal } from '../store/ModalSlice';
import { setUser, clearUser } from '../store/UserSlice';


// Menu
const menuItems = [
    {
      label: (<Link to="/">Home</Link>),
      key: 1,
    },
    {
      label: 'Products',
      key: 2,
    },
    {
      label: 'Store',
      key: 3,
      children: [
        {
          type: 'group',
          label: 'Item 1',
          children: [
            {
              label: 'Option 1',
              key: 'setting:1',
            },
            {
              label: 'Option 2',
              key: 'setting:2',
            },
          ],
        },
        {
          type: 'group',
          label: 'Item 2',
          children: [
            {
              label: 'Option 3',
              key: 'setting:3',
            },
            {
              label: 'Option 4',
              key: 'setting:4',
            },
          ],
        },
      ],
    },
    {
      key: 4,
      label: "Getapp",
    },
  ];
  const onSearch = (value, _e, info) => console.log(info?.source, value);
  
  const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [current, setCurrent] = useState('1');
    const onClick = (e) => {setCurrent(e.key);};
    const {user,role,name} = useSelector((state)=> state.users);
    const showModal = () => {
      dispatch(showLoginModal());
    };

    // console.log(user);
    const getpresentUser = async () => {
      try {
        const response = await GetCurrentUser();
        if (response.success) {
          dispatch(setUser({user:response.data, role:response.data.role, name:response.data.name}));
        } else {
          message.error(response.message);
          handleClear();
        }
      } catch (error) {
        message.error('Failed to fetch user data, please try again later');
        handleClear();
      }
    };

    const handleClear =() => {
      dispatch(clearUser());
      localStorage.removeItem('token');
      navigate('/');
    };

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(clearUser());
    message.info({
      content: "You have been logged out successfully!",
      style: {
        marginTop: "30vh",
      },
    });
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };
  
  const items = [
    {
      label: "1st menu item",
      key: "1",
    },
    {
      label: "2nd menu item",
      key: "2",
    },
    {
      type: "divider",
    },
    {
      label: <a onClick={logout}>Log Out</a>,
      key: "3",
      danger: true,
    },
  ];
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      getpresentUser();
    } else {
      navigate('/');
    }
  },[]);

  useEffect(() => {
      if (role === 'admin') {
          navigate('/admin');
      } else if (role === 'seller') {
          navigate('/seller');
      } else if (role === 'delivery') {
          navigate('/delivery');
      }
  },[role]);

  return (
    <div className="flex justify-between items-center h-[4rem] py-[0.25rem]">

    {/* 1. Logo */}    
        <p className="text-[--logoColor] text-[3rem] tracking-[.5rem] w-[7rem] px-[.5rem]">Zip</p>
    {/* 2. Navigation Menu */}
        {!role && <Menu className="gap-[15px] text-[--menuColor] text-[1.25rem] px-[.5rem]" onClick={onClick} selectedKeys={[current]} mode="horizontal" items={menuItems} />}
    {/* 3. Search & Cart */}
        <div className="flex items-center gap-[10px]">
        {!role && <Search
              placeholder="Search Products..."
              allowClear
              enterButton={<SearchOutlined />}
              style={{ width: '15rem', height: '2rem'}}
              onSearch={onSearch}
            />}
            {!role && <Button onClick={showModal}>Login</Button>}
            {!role && <Badge count={1} size="small">
                <ShoppingCartOutlined style={{fontSize:'1.75rem', color:'#424246'}}/>
            </Badge>}
            {role && <Dropdown menu={{ items }} placement="bottomLeft">
                        <a onClick={(e) => e.preventDefault()}>
                          <Space>
                            <Avatar
                              style={{
                                backgroundColor: "#87d068",
                              }}
                              size="large"
                              icon={<UserOutlined />}
                            />
                          </Space>
                        </a>
                      </Dropdown>}
            <LoginModal />
            <SignupModal />
        </div>
    </div>
  )
}

export default Navbar