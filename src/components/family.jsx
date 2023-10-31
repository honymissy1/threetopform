import {Select, Button, Typography, Form, Input, Space, DatePicker, Row, Col, InputNumber } from 'antd';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { Tab } from '../reducer/TabReducer';
const { Title } = Typography;


const Family = () =>{
    const [form] = Form.useForm();
    const formValues = Form.useWatch([], form);
    const dispatch = useDispatch();
    const [sameAddress, setSameAddress] = useState(true)
    const [submittable, setSubmittable] = useState(false);

    useEffect(() =>{
      form.validateFields({ validateOnly: true})
       .then(() => setSubmittable(true))
       .catch(() => setSubmittable(false))
    }, [formValues])

    const handlePrev = () =>{
        console.log('Prev');
    }

    const handleNext = () =>{
        console.log(formValues);
        console.log('Next');
    }
    return(
          <div className="container">
            <Form className="family" form={form} layout="vertical">
               <Title level={3}> Family Info </Title>
               <Row justify="space-between" gutter={[10, 0]}>
                    <Col flex="100%">
                    <Form.Item name="maritalStatus" label="Marital Status" rules={[{ required: true }]}>
                    <Select
                        
                        style={{  width: "100%", textAlign: 'left' }} 
                        options={[
                            {
                                value: 'Single',
                                label: 'Single',
                                },
                                {
                                value: 'Married',
                                label: 'Married',
                                },

                                {
                                value: 'Divorced',
                                label: 'Divorced',
                                }
                        ]}
                        ></Select>
                        </Form.Item>
                    </Col>

                    {
                        formValues?.maritalStatus !== "Single" && (
                            <Row gutter={[10, 10]}>

                                    <Col flex="100%" >
                                        <Form.Item label="Spouse Name" name="FullName" rules={[{  required: true }]}>    
                                          <Input placeholder="" />
                                        </Form.Item>
                                    </Col>
                                   <Col flex="50%">
                                    <Form.Item label="Marriage Date" name="marriageDate" rules={[{  required: true }]}>
                                        <DatePicker style={{width: '100%'}} placeholder='Date' />
                                    </Form.Item>
                                    </Col>

                                    {
                                        formValues?.maritalStatus === 'Divorced' && (
                                            <Col flex="50%">
                                            <Form.Item label="Divorce Date" name="divorceDate" rules={[{  required: true }]}>
                                                <DatePicker style={{width: '100%'}} placeholder='Date' />
                                            </Form.Item>
                                            </Col>
                                        )
                                    }

                                    
                                    <Col flex="50%">
                                            <Form.Item label="Spouse DOB" name="spouseDob" rules={[{  required: true }]}>
                                                <DatePicker style={{width: '100%'}} placeholder='Spouse Date of Birth' />
                                            </Form.Item>
                                    </Col>

                                    <Col flex="100%" >
                                        <Form.Item label="Spouse Occupation"  name="occupation" rules={[{  required: true }]}>    
                                          <Input placeholder='Spouse Job / Occupation'/>
                                        </Form.Item>
                                    </Col>

                            </Row>
                        )
                    }


                    <Col flex="100%">
                            <Button>+ Add Child</Button>

                    </Col>
                </Row>


            
            <Row className="parent" justify="space-between" gutter={[10, 0]}>
                <Col flex="100%">
                  <Title level={3}> Father's Info </Title>
                </Col>
                <Col flex="50%" >
                 <Form.Item label="Full Name" name="FullName" rules={[{  required: true }]}>    
                   <Input placeholder="" />
                  </Form.Item>
                </Col>

                <Col flex="50%">
                 <Form.Item label="Date Of Birth" name="Dob" rules={[{  required: true }]}>
                    <DatePicker style={{width: '100%'}} placeholder='Date of Birth' />
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

                <Col flex="100%">
                  <Title level={3}>Mother's Info </Title>
                </Col>
                <Col flex="50%" >
                 <Form.Item label="Full Name" name="motherFullName" rules={[{  required: true }]}>    
                   <Input placeholder="" />
                  </Form.Item>
                </Col>

                <Col flex="50%">
                 <Form.Item label="Date Of Birth" name="motherDob" rules={[{  required: true }]}>
                    <DatePicker style={{width: '100%'}} placeholder='Date of Birth' />
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

export default Family