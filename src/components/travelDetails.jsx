import {Select, Button, Typography, Form, Input, Space, DatePicker, Row, Col } from 'antd';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { Tab } from '../reducer/TabReducer';
const { TextArea } = Input;

const TravelDetails = () => {
    const [form] = Form.useForm();
    const { Title } = Typography;
    const [submittable, setSubmittable] = useState(false);
    const formValues = Form.useWatch([], form);
    const dispatch = useDispatch();


    const handlePrev = () => {
        dispatch(Tab(3))
    }

    useEffect(() =>{
       if(formValues?.travels === "No") {
        setSubmittable(true)
      }

    }, [])

    useEffect(() => {
      form.validateFields({  validateOnly: true  })
        .then((x) => {  
          console.log(x);
          setSubmittable(true)
        })
        .catch(err => {
          setSubmittable(false)
        })
    }, [formValues]);

      const handleNext = () =>{
        dispatch(Tab(5))
      }


     return(
        <div className="container">
            <Title level={3}>Travel Detail </Title>
            <br />
            <Form form={form} layout="vertical">
            <Row justify="space-between" gutter={[10, 0]}>
                <Col flex="100%" >
                  <Form.Item name="plan" label="Are you travelling with your family" rules={[{  required: true }]}>
                  <Select
                    defaultValue={""}
                    style={{  width: "100%", textAlign: 'left' }} 
                      options={[
                          {
                          value: 'Yes',
                          label: 'Yes',
                          },
                          {
                            value: 'No',
                            label: 'No',
                          }
                      ]}
                    >

                    </Select>
                  </Form.Item>
                </Col>

                <Col flex="100%" >
                    <Form.Item name="travels" label="Have you ever applied for a visa" rules={[{  required: true }]}>
                    <Select
                    defaultValue={""}
                    style={{  width: "100%", textAlign: 'left' }} 
                     options={[
                         {
                         value: 'Yes',
                         label: 'Yes',
                        },
                         {
                           value: 'No',
                           label: 'No',
                          }
                        ]}
                   >

                   </Select>
                    </Form.Item>
                </Col>
            </Row>

            {
              formValues?.travels === 'Yes' && (
                <>
                <hr />
                <Row justify="space-between" gutter={[10, 0]}>

                <Col flex="30%">
                    <Form.Item name="country" label="Country">
                      <Input placeholder="Country" />
                  
                     </Form.Item>
                 </Col>

                 <Col flex="30%">
                    <Form.Item name="applicationDate" label="Date"  rules={[{  required: true }]}>
                      <DatePicker style={{width: '100%'}} placeholder='Date of Application' />
                    </Form.Item>
                 </Col>

                <Col flex="30%">
                 <Form.Item name="applicationStatus" label="Status" rules={[{  required: true }]}>
                 <Select
                    defaultValue=""
                    style={{  width: "100%", textAlign: 'left' }} 
                     options={[
                         {
                           value: 'Granted',
                           label: 'Granted',
                          },
                          {
                            value: 'Denied',
                            label: 'Denied',
                          }
                     ]}
                   ></Select>
                  </Form.Item>
                </Col>

                {/* <Col flex="100%" ></Col> */}
                </Row>
                </>
              )
            }

            {
              formValues?.applicationStatus === "Denied" && (
                <Form.Item name="denialReason" label="Reason for Denial" rules={[{  required: true }]}>
                  <TextArea
                      autoSize={{ minRows: 3, maxRows: 5 }}
                   />
                </Form.Item>
              )
            }

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

export default TravelDetails;