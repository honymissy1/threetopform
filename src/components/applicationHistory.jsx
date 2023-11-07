import {Select, Radio, Table, Button, Typography, Form, Input,  DatePicker, Row, Col, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Tab } from '../reducer/TabReducer';
import { application } from '../reducer/DatabaseReducer';
import moment from 'moment';
const { TextArea } = Input;
const { Title } = Typography;

const ApplicationHistory = () => {
    const [form] = Form.useForm();
    const [extra] = Form.useForm();
    const formValues = Form.useWatch([], form);
    const extraValues = Form.useWatch([], extra);

    // -------------------------------------------------------------

    const [value, setValue] = useState(false);
    const [submittable, setSubmittable] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [travelList, setTravelList] = useState([])
    const dispatch = useDispatch();
    const database = useSelector((state) => state.Database.user.applicationHistory.applications);


    const handlePrev = () => {
        dispatch(Tab(2))
    }

    useEffect(() =>{
       if(formValues?.hasApplied === "No") {
         setSubmittable(true)
      }

    }, [formValues])

    useEffect(() => {
      extra.validateFields({  validateOnly: true  })
        .then((x) => {  
          setSubmittable(true);
          
        })
        .catch(err => {
          setSubmittable(false)
        })

      
    }, [extraValues]);

      const handleNext = () =>{
        dispatch(Tab(4))
      }

      // Modal Functions


      const openModal = () =>{
        extra.resetFields();

        if(travelList.length > 0){
          setSubmittable(true);
        }

        setIsModalOpen(true);
      }

      const handleOk = () => {
        extra.validateFields({  validateOnly: true  })
        .then((x) => {  
          dispatch(
            application({
            country: x.country,
            applicationDate: moment(x.applicationDate?.$d).format('DD/MM/YYYY'),
            status: x.status,
            issueDate:   x.issueDate ? moment(x?.issueDate?.$d).format('DD/MM/YYYY') : null,
            expiryDate:  x.expiryDate ? moment(x?.expiryDate?.$d).format('DD/MM/YYYY') : null,
            denialDate: x.denialDate ? moment(x?.denialDate?.$d).format('DD/MM/YYYY') : null,
            reason: x.reason ? x.reason : null
           })
          )

          setSubmittable(true);
          setIsModalOpen(false);

        })
        .catch(err => {
          setSubmittable(false);
          console.log(err);
        })  
      
      }


      const handleCancel = () =>{
        extra.validateFields({  validateOnly: true  })
        .then((x) => {  
          setSubmittable(true);
        })
        .catch(err => {
          setSubmittable(false);
          if(travelList.length > 0){
            setSubmittable(true);
          }
        })
        setIsModalOpen(false);
      }

      // Modal Function

      const travelBefore = (e) =>{
        if(e === 'Yes'){
          setValue(e);
          setIsModalOpen(true)
        }else{
          setValue(e);
          form.validateFields({  validateOnly: true  })
          .then((x) => {  
            setSubmittable(true)
          })
          .catch(err => {
            setSubmittable(false)
          })
        }
      }


     return(
        <div className="container">
            <Title level={3}>Application History </Title>
            <br />

            <Form form={form} layout="vertical">
            {/* Modal */}

            <Form.Item style={{ margin: "0px auto"}} layout="vertical" name="hasApplied" label="Have you ever applied for a visa" rules={[{  required: true }]}>
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

           <Modal title="Application History" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
              <Form form={extra} layout="vertical">
                <Row justify="space-between" gutter={[10, 0]}>

              <Col flex="50%">
                  <Form.Item name="country" label="Country" rules={[{  required: true }]}>
                    <Input placeholder="Country" />
                  </Form.Item>
              </Col>

              <Col flex="50%">
                  <Form.Item name="applicationDate" label="Date" tooltip="The date you started the application">
                    <DatePicker keyboard={false} style={{width: '100%'}} placeholder='Date of Application' />
                  </Form.Item>
              </Col>

              <Col flex="50%">
              <Form.Item name="status" label="Status" rules={[{ required: true }]}>
              <Select
                  style={{  width: "100%", textAlign: 'left' }} 
                  options={[
                      {
                        value: 'Approved',
                        label: 'Approved',
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
                extraValues?.status === "Approved" && (
                  <Row gutter={[10, 0]}>
                    <Col flex="50%">
                      <Form.Item name="issueDate" label="Issue Date"  rules={[{  required: true }]}>
                        <DatePicker keyboard={false} style={{width: '100%'}} placeholder='Issue Date' />
                      </Form.Item>
                    </Col>

                    <Col flex="50%">
                      <Form.Item name="expiryDate" label="Expiry Date"  rules={[{  required: true }]}>
                        <DatePicker keyboard={false} style={{width: '100%'}} placeholder='Expiry Date' />
                      </Form.Item>
                    </Col>
                  </Row>
                )
              }
              {
              extraValues?.status === "Denied" && (
                <Row gutter={[0, 10]}>
                  <Col flex="100%">
                      <Form.Item name="denialDate" label="Denial Date">
                        <DatePicker keyboard={false} style={{width: '100%'}} placeholder='Denial Date' />
                      </Form.Item>
                  </Col>
                  <Col flex="100%"> 
                    <Form.Item name="reason" label="Reason for Denial" rules={[{  required: true }]}>
                      <TextArea
                          autoSize={{ minRows: 3, maxRows: 5 }}
                      />
                    </Form.Item>
                  </Col>

                </Row>

              )
            }
              </Form>
            </Modal>

            {/* Table of application */}
            {
              formValues?.hasApplied === 'Yes' && (
                <Button onClick={openModal} type="dashed" style={{ margin: "10px 0px"}}>+ Other Application</Button>
              )
            }

            {
             database.length > 0 && (
                <div>
                 <Table columns={[
                    {
                      title: 'Country',
                      dataIndex: 'country',
                      key: 'country'
                    },

                    {
                      title: 'Date',
                      dataIndex: 'dateOfApplication',
                      key: 'dateOfApplication'
                    },

                    {
                      title: 'Status',
                      dataIndex: 'status',
                      key: 'status'
                    },


                  ]}
                  
                  dataSource={[...database]}

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

export default ApplicationHistory;