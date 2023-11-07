import {Button, Form, Input, Typography, Row, Col, Modal, DatePicker } from 'antd';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tab } from '../reducer/TabReducer';
import db from '../firebaseConfig';
import {  started } from '../reducer/DatabaseReducer';
import { collection, addDoc, query, getDocs, where } from "firebase/firestore";
import moment from 'moment';
const GetStarted = () =>{
  // const [tabState, setTabState] = useState(0);
  const [modal] = Form.useForm();
  const modalValue = Form.useWatch([], modal);
  const user = useSelector((state) => state.Database);
  
  const { Title, Text } = Typography;
  const TabNumber = useSelector((state) => state.ActiveTab);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { RangePicker } = DatePicker;
  const [validity, setvalidity] = useState([])


  const handleOk =  () =>{
    modal.validateFields({  validateOnly: true  })
    .then(async(x) => { 
      console.log(x.from.$d);
       dispatch(started({
          passportNumber: x.passport, 
          issueDate: moment(x.from.$d).format('DD/MM/YYYY'),
          expiryDate: moment(x.to.$d).format('DD/MM/YYYY')
        }))

       dispatch(Tab(2));
       setIsModalOpen(false);
    })
    .catch(err =>{
      console.log(err);
      if(err?.errorFields?.length > 0){
        alert('Please Fill the required fields')
      }
    })

  }

  const openModal = () =>{
    setIsModalOpen(true)
  }

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

      <Modal title="Passport Details" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        
                <Form form={modal} layout="vertical">
                    <Row justify="space-between" gutter={[10, 0]}>

                      <Col flex="100%">
                          <Form.Item name="passport" label="Passport Number"  rules={[{  required: true }]}>
                              <Input placeholder="Passport Number" />
                          </Form.Item>
                      </Col>

                      <Col flex="50%">
                        <Form.Item name="from" label="From"  rules={[{  required: true }]}>
                          <DatePicker keyboard={false} style={{width: '100%'}} placeholder='Issue Date' />
                        </Form.Item>
                  
                      </Col>

                      <Col flex="50%">
                        <Form.Item name="to" label="To"  rules={[{  required: true }]}>
                          <DatePicker keyboard={false} style={{width: '100%'}} placeholder='Expiry Date' />
                        </Form.Item>
                  
                      </Col>

                    </Row>

                </Form>

        </Modal>

      <br />

      <Button style={{color: 'white', background: 'rgb(40,204,41)', fontWeight:'bolder'}}
              onClick={openModal}>Let's Get Started!</Button>
    </div>
  )
}

export default GetStarted