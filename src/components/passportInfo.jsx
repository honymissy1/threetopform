import {Select, Button, Typography, Form, Input, Space, DatePicker, Row, Col } from 'antd';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { Tab } from '../reducer/TabReducer';
const PassportInfo = () => {
    const { Title, Text } = Typography;
    const [submittable, setSubmittable] = useState(false);
    const [form] = Form.useForm();
    const values = Form.useWatch([], form);
    const dispatch = useDispatch();

    const handlePrev = () => {
        dispatch(Tab(2))
    }

    useEffect(() => {
        form.validateFields({  validateOnly: true })
          .then(() => {  
            setSubmittable(true)
  
         },
            () => {
              setSubmittable(false);
            },
          );
      }, [values]);

      const handleNext = () =>{
        dispatch(Tab(4))
      }
    return(
        <div className="container">
            <Title level={3}> Passport Info </Title>
            <br />
            <Form form={form} layout="vertical">
            <Row justify="space-between" gutter={[10, 0]}>
                <Col flex="50%" >
                 <Form.Item name="Passport Number" label="Passport No" rules={[{  required: true }]}>
                   <Input />
                  </Form.Item>
                </Col>

                <Col flex="50%" >
                    <Form.Item name="placeofBirth" label="City of Birth"  rules={[{  required: true }]}>
                     <Input placeholder="" />
                    </Form.Item>
                </Col>

                <Col flex="50%">
                 <Form.Item label="Issue Date">
                    <DatePicker style={{width: '100%'}} placeholder='Date of Birth' />
                  </Form.Item>
                </Col>

                <Col flex="50%">
                 <Form.Item label="Expiry Date">
                    <DatePicker style={{width: '100%'}} placeholder='Date of Birth' />
                  </Form.Item>
                </Col>

            </Row>

            <Row justify="space-between">
                <Col>
                  <Button onClick={handlePrev} className='button'>Prev</Button>
                </Col>

                <Col><Button onClick={handleNext} disabled={!submittable} htmlType="submit" className='button'>Next</Button></Col>
            </Row>
            </Form>
        </div>
    )
}

export default PassportInfo;