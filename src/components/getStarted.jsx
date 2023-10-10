import {Button, Form, Input, Typography, Row, Col, Modal, DatePicker } from 'antd';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tab } from '../reducer/TabReducer';
import db from '../firebaseConfig';

import { collection, addDoc, query, getDocs, where } from "firebase/firestore";

const GetStarted = () =>{
  // const [tabState, setTabState] = useState(0);
  const [modal] = Form.useForm();
  const modalValue = Form.useWatch([], modal);

  const { Title, Text } = Typography;
  const TabNumber = useSelector((state) => state.ActiveTab);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { RangePicker } = DatePicker;


  const handleOk =  () =>{
    modal.validateFields({  validateOnly: true  })
    .then(async(x) => { 
      console.log('Hello how are u');
       const q = query(collection(db, 'user'), where('passportNumber', '==', 'S23424'));
       const querySnapshot = await getDocs(q);
       console.log(querySnapshot.empty);

       if(querySnapshot.empty){
         console.log('Nthing dey');
        }else{
        console.log('something dey');
       }
       querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data().issueDate);
        if(doc){
          console.log('It is there');
        }else{
          console.log('E no dey');
        }
      });
 
      // try {
      //   const docRef = await addDoc(collection(db, "user"), {
      //     passportNumber: modalValue.passport,
      //     issueDate: modalValue.validity[0].$d,
      //     expiryDate: modalValue.validity[1].$d,
      //     name: null,
      //     age: null,
      //     family: {
      //       name: null,
      //       spouse: null,
      //       friends: [null, null],
      //       adds: [{name: null}, {name: null}]
      //     }

      //   });
      //   console.log("Document written with ID: ", docRef.id);
      // } catch (e) {
      //   console.error("Error adding document: ", e);
      // }
     
      // setIsModalOpen(false);
    })
    // .catch(err => {
    //   alert('Please kindly complete the form')
    // })
    
    
    // console.log();
  }
  const openModal = () =>{
    setIsModalOpen(true)
  }



  const handleCancel = () =>{
    setIsModalOpen(false)
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


                      <Col flex="100%">
                          <Form.Item name="validity" tooltip="" label="Validity date" rules={[{  required: true }]}>
                            <RangePicker style={{width: "100%"}} /> 
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