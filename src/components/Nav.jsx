import { Typography } from 'antd';

const Nav = () =>{
    const { Title, Text } = Typography;

    return (
        <div className="nav">
            <Title level={4} style={{color: 'white'}}>Threetop Ecclesia</Title>
        </div>
    )
}

export default Nav