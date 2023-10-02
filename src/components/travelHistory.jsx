import {Select,  Table, Button, Typography, Form, Input, Space, DatePicker, Row, Col, Modal } from 'antd';
import { useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { Tab } from '../reducer/TabReducer';
const { TextArea } = Input;
const { RangePicker } = DatePicker;

const TravelHistory = () => {

    const [form] = Form.useForm();
    const [extra] = Form.useForm();
    const { Title } = Typography;
    const [value, setValue] = useState(false);
    const [submittable, setSubmittable] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const formValues = Form.useWatch([], form);
    const extraValues = Form.useWatch([], extra);

    const [travelList, setTravelList] = useState([])
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
      extra.validateFields({  validateOnly: true  })
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
        extra.validateFields({  validateOnly: true  })
        .then((x) => {  
          setSubmittable(true);
          setTravelList([...travelList, {
            country: extraValues.country,
          }]);
          extra.resetFields()
        })
        .catch(err => {
          setSubmittable(false);
          alert('Complete the required fields')
        })

        console.log(travelList);
        
      }


      const handleCancel = () =>{
        setIsModalOpen(false);
      }

      // Modal Function

      const travelBefore = (e) =>{
        if(e === 'Yes'){
          setValue(e);
          console.log(e);
          setIsModalOpen(true)
        }else{
          setValue(e);
          setTravelList([])
          console.log(travelList);
        }
      }

      // const onChange = (e) => {
      //   console.log('radio checked', e.target.value);
      //   setValue(e.target.value);
      // };


     return(
        <div className="container">
            <Title level={3}>Travel Detail </Title>
            <p>{JSON.stringify(travelList)}</p>
            <br />

            <Form form={form} layout="vertical">
            {/* Modal */}

            <Form.Item style={{width: '100%', margin: "0px auto"}} layout="vertical" name="hasTravelled" label="Have you ever travelled outside Nigeria" rules={[{  required: true }]}>
                <Select onSelect={travelBefore}
                        defaultValue={"No"}
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
                ></Select>
            </Form.Item>

           <Modal title="Travel Details" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
              <Form form={extra} layout="vertical">
                <Row justify="space-between" gutter={[10, 0]}>

                    <Col flex="50%">
                        <Form.Item name="country" label="Country" rules={[{  required: true }]}>
                            <Input placeholder="Country" />
                        </Form.Item>
                    </Col>

                    <Col flex="50%">
                        <Form.Item name="purpose" label="Purpose of Travel" rules={[{  required: true }]}>
                            <Input placeholder="Purpose of Travel" />
                        </Form.Item>
                    </Col>

                    
                    <Col flex="50%">
                        <Form.Item name="duration" label="Duration" rules={[{  required: true }]}>
                           <RangePicker />
                        </Form.Item>
                    </Col>

                    

 
                </Row>

              </Form>
            </Modal>

            {/* Table of application */}
            {
              formValues?.hasTravelled === 'Yes' && (
                <Button onClick={openModal} type="dashed" style={{ margin: "10px 0px"}}>+ Add Travel</Button>
              )
            }

            {
             (formValues?.hasTravelled === "Yes" && travelList.length > 0) && (
                <div>
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

export default TravelHistory;