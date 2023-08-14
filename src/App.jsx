import React from 'react';
import { Tabs } from 'antd';
import Nav from './components/Nav';
import { Tab } from './reducer/TabReducer';
import { useSelector, useDispatch } from 'react-redux';
import GetStarted from './components/getStarted';
import PersonalInfo from './components/PersonalInfo';
import PassportInfo from './components/passportInfo';
import TravelDetails from './components/travelDetails';
import ParentInfo from './components/parentInfo';

const App = () => {
  const TabNumber = useSelector((state) => state.ActiveTab);
  const dispatch = useDispatch()
  return(
  <>
   <Nav />
  <Tabs className='tabs'
    defaultActiveKey="1"
    activeKey={String(TabNumber.value)}
    onTabClick={(x) => dispatch(Tab(String(x)))}
    animated={{tabPane: true}}
    items={[
      {
        label: 'Start Application',
        key: '1',
        children: <GetStarted />,
      },
      {
        label: 'Personal Profile',
        key: '2',
        children: <PersonalInfo />,
      },
      {
        label: 'Passport Info',
        key: '3',
        children: <PassportInfo />,
      },

      {
        label: 'Travel Details',
        key: '4',
        children: <TravelDetails />,
      },

      // {
      //   label: 'Education',
      //   key: '5',
      //   children: 'Tab 5',
      // },

      // {
      //   label: 'Occupation',
      //   key: '6',
      //   children: 'Tab 6',
      // },

      // {
      //   label: 'Family',
      //   key: '7',
      //   children: 'Tab 7'
      // },

      {
        label: 'Parent',
        key: '8',
        children: <ParentInfo />
      },
    ]}
  />
  </>
)};

export default App