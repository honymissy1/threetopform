import {Button, Form, Input, Typography, Row, Col, Modal, DatePicker } from 'antd';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tab } from '../reducer/TabReducer';
import db from '../firebaseConfig';
import {  started } from '../reducer/DatabaseReducer';


const Finish = () =>{  
  const { Title, Text } = Typography;

  const handleCancel = () =>{
    setIsModalOpen(false)
  }

  const handleDateChange = (e, str) =>{
    console.log(str);
    setvalidity(str)
  }

 
  return (
    <div className='container'>
      <div style={{width: '70vw', margin: '0px auto'}}>

       <Title level={2}>Application Data Submission Completed</Title>
        <Text>
          If you're travelling with anyone click the button below to fill there data
        </Text>
         <br /><br /> 
        <Button type={'dashed'}>Start Form Submission for travel partner</Button>
      </div>

      <br />

 
    </div>
  )
}

export default Finish