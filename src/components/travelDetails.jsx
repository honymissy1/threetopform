import {Select, Radio, Table, Button, Typography, Form, Input, Space, DatePicker, Row, Col, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { Tab } from '../reducer/TabReducer';
const { TextArea } = Input;

const TravelDetails = () => {
    const [form] = Form.useForm();
    const [extra] = Form.useForm();
    const { Title } = Typography;
    const [value, setValue] = useState(false);
    const [submittable, setSubmittable] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const formValues = Form.useWatch([], form);
    const extraValues = Form.useWatch([], extra);
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
          setSubmittable(true)
        })
        .catch(err => {
          setSubmittable(false)
        })
    }, [formValues]);

      const handleNext = () =>{
        dispatch(Tab(8))
      }

      // Modal Functions


      const openModal = () =>{
        setIsModalOpen(true)
      }

      const handleOk = () => {
        setIsModalOpen(false);
        extra.resetFields()
        console.log(extraValues);
        console.log(formValues);
      }


      const handleCancel = () =>{
        setIsModalOpen(false);
      }

      // Modal Function

      const travelBefore = (e) =>{
        if(e.target.value){
          console.log(value);
          setValue(e.target.value);
          setIsModalOpen(true)
        }else{
          setValue(e.target.value);
          console.log('Wati happem');
        }
      }

      // const onChange = (e) => {
      //   console.log('radio checked', e.target.value);
      //   setValue(e.target.value);
      // };


     return(
        <div className="container">
            <Title level={3}>Travel Detail </Title>
            <br />

            <Form>
            <Form.Item style={{width: '500px', margin: "0px auto"}} layout="vertical" name="plan" label="Have you applied for a visa previously?" rules={[{  required: true }]}>
            <Radio.Group onChange={travelBefore} value={value}>
              <Radio value={true}>Yes</Radio>
              <Radio value={false}>No</Radio>
            </Radio.Group>
            </Form.Item>

            </Form>
            
            <Form form={form} layout="vertical">
            <Row justify="space-between" gutter={[10, 0]}>
                <Col flex="100%" >
                  <Form.Item name="plan" label="Are you travelling with your family" rules={[{  required: true }]}>
                  <Select
                    initialvalues={""}
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

                {/* <Col flex="100%" >
                    <Form.Item name="travels" label="Have you ever applied for a visa" rules={[{  required: true }]}>
                    <Select
                    onChange={travelBefore}
                    initialvalues={""}
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
                </Col> */}
            </Row>

            {/* Modal */}

           <Modal title="Travel Details" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
              <Form form={extra} layout="vertical">
                <Row justify="space-between" gutter={[10, 0]}>

              <Col flex="30%">
                  <Form.Item name="country" label="Country">
                    <Input placeholder="Country" />
                  </Form.Item>
              </Col>

              <Col flex="40%">
                  <Form.Item name="applicationDate" label="Date"  rules={[{  required: true }]}>
                    <DatePicker style={{width: '100%'}} placeholder='Date of Application' />
                  </Form.Item>
              </Col>

              <Col flex="30%">
              <Form.Item name="applicationStatus" label="Status" rules={[{ required: true }]}>
              <Select
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
                </Row>
              {
              extraValues?.applicationStatus === "Denied" && (
                <Form.Item name="denialReason" label="Reason for Denial" rules={[{  required: true }]}>
                  <TextArea
                      autoSize={{ minRows: 3, maxRows: 5 }}
                   />
                </Form.Item>
              )
            }
              </Form>
            </Modal>

            {/* Table of application */}
            {
              value && (
                <div>
                  <Title level={3}>Previous Application</Title>
                  <Table columns={[
                    {
                      title: 'Country',
                      dataIndex: 'country',
                      key: 'country'
                    },

                    {
                      title: 'Date',
                      dataIndex: 'date',
                      key: 'date'
                    },

                    {
                      title: 'Status',
                      dataIndex: 'status',
                      key: 'status'
                    },


                  ]}
                  
                  dataSource={[
                    {
                      key: 1,
                      country: 'Ghana',
                      date: '12-4-1990',
                      status: 'Denied'
                    }
                  ]}

                  pagination={false}
                  
                  />
                </div>
              )
            }



            <Row justify="space-between" style={{marginTop: '15px'}}>
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