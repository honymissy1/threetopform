import {Select, Button, Typography, Form, Input, Space, DatePicker, Row, Col } from 'antd';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { Tab } from '../reducer/TabReducer';
const PersonalInfo = () => {
    const { Title, Text } = Typography;
    const [submittable, setSubmittable] = useState(false);
    const [form] = Form.useForm();
    const values = Form.useWatch([], form);
    const dispatch = useDispatch();

    // const handlePrev = () => {
    //     dispatch(Tab(2))
    // }
    useEffect(() => {
      form.validateFields({  validateOnly: true })
        .then(() => { setSubmittable(true)},
          () => {
            setSubmittable(false);
          });
    }, [values]);

      const handleNext = () =>{
        dispatch(Tab(3))
      }
     const handlePrev = () => {
        dispatch(Tab(1))
      }
    return(
        <div className="container">
            <Title level={3}> Personal Info </Title>
            <br />
            <Form form={form} layout="vertical">
            <Row justify="space-between" gutter={[10, 0]}>
                <Col flex="50%" >
                 <Form.Item label="Full Name" name="FullName" rules={[{  required: true }]}> 
                    
                   <Input placeholder="" />
                  </Form.Item>
                </Col>

                <Col flex="50%" >
                    <Form.Item label="Phone" name="Phone" rules={[{  required: true }]}>
                     <Input placeholder="" required/>
                    </Form.Item>
                </Col>

                <Col flex="50%">
                 <Form.Item label="Date Of Birth" name="Dob" rules={[{  required: true }]}>
                    <DatePicker style={{width: '100%'}} placeholder='Date of Birth' />
                  </Form.Item>
                </Col>

                <Col flex="50%">
                 <Form.Item label="Gender">
                   <Select
                    name="Gender"
                    defaultValue={"Male"}
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

                <Col flex="100%" >
                  <Form.Item label="Address" rules={[{  required: true }]} name="Address">
                   <Input placeholder="" />
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