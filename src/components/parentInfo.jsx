import {Select, Button, Typography, Form, Input, Space, DatePicker, Row, Col } from 'antd';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { Tab } from '../reducer/TabReducer';
const ParentInfo = () => {
    const { Title, Text } = Typography;
    const [submittable, setSubmittable] = useState(false);
    const [form] = Form.useForm();
    const values = Form.useWatch([], form);
    const dispatch = useDispatch();
    const [sameAddress, setSameAddress] = useState(true)

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
            {/* <Title level={3}> Parent Info </Title> */}
            <br />

            <Title level={3}> Father's Info </Title>
            <Form  form={form} layout="vertical">
            <Row justify="space-between" gutter={[10, 0]}>
                <Col flex="50%" >
                 <Form.Item label="Full Name" name="FullName" rules={[{  required: true }]}>    
                   <Input placeholder="" />
                  </Form.Item>
                </Col>

                <Col flex="50%">
                 <Form.Item label="Date Of Birth" name="Dob" rules={[{  required: true }]}>
                    <DatePicker format={'DD/MM/YYYY'} keyboard={false} style={{width: '100%'}} placeholder='Date of Birth' />
                  </Form.Item>
                </Col>

                <Col flex="50%" >
                    <Form.Item label="Occupation" name="occupation" rules={[{  required: true }]}>
                     <Input placeholder="Work / Job" required/>
                    </Form.Item>
                </Col>

                <Col flex="50%" >
                 <Form.Item label="Address" name="Address" rules={[{  required: true }]}>    
                   <Input placeholder="" />
                  </Form.Item>
                </Col>
            </Row>
            <br /><br />

            <Title level={3}> Mother's Info </Title>

            <Row justify="space-between" gutter={[10, 0]}>
                <Col flex="50%" >
                 <Form.Item label="Full Name" name="motherFullName" rules={[{  required: true }]}>    
                   <Input placeholder="" />
                  </Form.Item>
                </Col>

                <Col flex="50%">
                 <Form.Item label="Date Of Birth" name="motherDob" rules={[{  required: true }]}>
                    <DatePicker format={'DD/MM/YYYY'} style={{width: '100%'}} placeholder='Date of Birth' />
                  </Form.Item>
                </Col>

                <Col flex="50%" >
                    <Form.Item label="Occupation" name="motherOccupation" rules={[{  required: true }]}>
                     <Input placeholder="Work / Job" required/>
                    </Form.Item>
                </Col>

                <Col flex="50%" >
                 <Form.Item label="Address" name={sameAddress ? "Address" :"motherAddress"} rules={[{  required: true }]}>    
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

export default ParentInfo;