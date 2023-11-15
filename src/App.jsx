import React from 'react';
import { Tabs } from 'antd';
import Nav from './components/Nav';
import { Tab } from './reducer/TabReducer';
import { useSelector, useDispatch } from 'react-redux';
import GetStarted from './components/getStarted';
import PersonalInfo from './components/personalInfo';
import Education from './components/education';
import Occupation from './components/occupation';
import Family from './components/family';
import FilesUpload from './components/filesUpload';
import TravelHistory from './components/travelHistory';
import ApplicationHistory from './components/applicationHistory';
import Finish from './components/finish';

const App = () => {
  const TabNumber = useSelector((state) => state.ActiveTab);
  const dispatch = useDispatch();
  let doSomething = false
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
        children: <PersonalInfo />
      },

      {
        label: 'Application History',
        key: '3',
        children: <ApplicationHistory />,
      },

      {
        label: 'Travel History',
        key: '4',
        children: <TravelHistory />,
      },

      {
        label: 'Education',
        key: '5',
        children: <Education />,
      },

      {
        label: 'Occupation / Job',
        key: '6',
        children: <Occupation />,
      },

      {
        label: 'Family',
        key: '7',
        children: <Family />,


      },

      {
        label: 'File Uploads',
        key: '8',
        children: <FilesUpload />
      },

      {
        label: 'Finish',
        key: '9',
        children: <Finish />
      },

    ]}
  />
  </>
)};

export default App