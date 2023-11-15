import {Select, Button, Typography, Form, Input, Space, DatePicker, Row, Col } from 'antd';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import {  personal } from '../reducer/DatabaseReducer';
import { Tab } from '../reducer/TabReducer';
import moment from 'moment';
import { getDoc, getDocs, doc, query, updateDoc, collection, where } from 'firebase/firestore';
import db from '../firebaseConfig';
const PersonalInfo = () => {
    const { Title } = Typography;
    const [submittable, setSubmittable] = useState(false);
    const [form] = Form.useForm();
    const values = Form.useWatch([], form);
    const dispatch = useDispatch();  
    const [dobDate, setDobDate] = useState('')



    // Local
    const localData = JSON.parse(localStorage.getItem('data'));
    const localNavigated = JSON.parse(localStorage.getItem('navigated'));
    // local


    useEffect(() => {
      form.validateFields({  validateOnly: true })
        .then((x) => {
          dispatch(personal({
             fullname: x.fullName,
             phone:  x.phone,
             dob: moment(x.dob.$d).format('DD/MM/YYYY') ,
             gender: x.gender,
             cityOfBirth: x.placeofBirth,
             address: x.address
          }))
          setSubmittable(true)
        },
          () => {
            setSubmittable(false);
          });;
      
    }, [values]);



  const handleNext = () =>{
      dispatch(Tab(3))
  }


     const handlePrev = () => {
        dispatch(Tab(1))
      }

      const handleChange =(e) =>{
       console.log(e);
      }

      const dateChange =(e, str) =>{
        console.log(str);
        setDobDate(str)
       }

    
  
    return(
        <div className="container">
            <Title level={3}> Personal Info </Title>
            <br />
            <Form form={form} layout="vertical">
            <Row justify="space-between" gutter={[10, 0]}>
                <Col flex="100%" >
                 <Form.Item label="Full Name" name="fullName" rules={[{  required: true }]}> 
                    
                   <Input placeholder="Adegoke Babatunde Cole"/>
                  </Form.Item>
                </Col>

                <Col flex="50%" >
                    <Form.Item label="Phone" name="phone" rules={[{  required: true }]}>
                     <Input  placeholder="08022334455" required/>
                    </Form.Item>
                </Col>

                <Col flex="50%">
                 <Form.Item label="Date Of Birth" name="dob" rules={[{  required: true }]}>
                    <DatePicker format={'DD/MM/YYYY'} keyboard={false} onChange={dateChange} style={{width: '100%'}} placeholder='Date of Birth' />
                  </Form.Item>
                </Col>

            </Row>

            <Row justify="space-between" gutter={[10, 0]}>
                <Col flex="50%">
                 <Form.Item name="gender" label="Gender">
                   <Select
                   
                    onSelect={handleChange}
                    name="gender"
                    style={{  width: "100%", textAlign: 'left' }} 
                     options={[
                         {
                         value: 'Male',
                         label: 'Male',
                         },
                         {
                            value: 'Female',
                            label: 'Female',
                         }
                     ]}
                   >

                   </Select>
                  </Form.Item>
                </Col>

                <Col flex="50%" >
                    <Form.Item name="placeofBirth" label="City of Birth"  rules={[{  required: true }]}>
                     <Input placeholder="" />
                    </Form.Item>
                </Col>

                <Col flex="100%" >
                  <Form.Item label="Address" rules={[{  required: true }]} name="address" required>
                   <Input placeholder="No 10 Shonuga Street VI Lagos" />
                  </Form.Item>
                </Col>

            </Row>

            <Row justify="space-between">
                <Col>
                  <Button onClick={handlePrev} className='button'>Prev</Button>
                </Col>

                <Col>
                  <Button onClick={handleNext} htmlType="submit" className='button' disabled={!submittable}>Next</Button>
                </Col>


            </Row>
            </Form>
        </div>
    )
}

export default PersonalInfo;