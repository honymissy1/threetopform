import {Button, Form, Input, Typography, Row, Col, Modal, DatePicker } from 'antd';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tab } from '../reducer/TabReducer';
import db from '../firebaseConfig';
import {  started } from '../reducer/DatabaseReducer';
import image from '../assets/correct.gif'

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
        <div style={{width: '100%', overflow: 'hidden'}}>
         <img src={image} alt="" />

        </div>
       <Title level={5}>Application Data Submission Completed</Title>
      </div>

      <br />

 
    </div>
  )
}

export default Finish