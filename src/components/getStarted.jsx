import { Button, Typography } from 'antd';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tab } from '../reducer/TabReducer';

const GetStarted = () =>{
  // const [tabState, setTabState] = useState(0);
  const { Title, Text } = Typography;
  const TabNumber = useSelector((state) => state.ActiveTab);
  const dispatch = useDispatch()
  return (
    <div className='container'>
      <div style={{width: '70vw', margin: '0px auto'}}>

       <Title level={4}>Welcome to Your Ultimate Travel Form &#9989; &#9989;</Title>
       <Text>
         Our user-friendly travel form is your gateway to planning trip &#9992;. 
         Whether you're a frequent traveller or a first-time explorer, we've got you covered every step of the way.
        </Text>

        <Title level={4} style={{marginTop: '40px'}}>Why Fill Out This Travel Form?</Title>
        <Text>Your travel experience matters to us. By providing us with a few essential details, you're enabling us to tailor your 
          itinerary to your preferences, ensuring you make the most of every moment. Think of this form as your 
          personalized travel concierge – the more we know about you, the better we can create a seamless, stress-free adventure.</Text>
              
      </div>

      <br />

      <Button style={{color: 'white', background: 'rgb(40,204,41)', fontWeight:'bolder'}}
              onClick={() => dispatch(Tab(2))}>Let's Get Started!</Button>
    </div>
  )
}

export default GetStarted