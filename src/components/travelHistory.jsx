import {Select,  Table, Button, Typography, Form, Input, Space, DatePicker, Row, Col, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Tab } from '../reducer/TabReducer';
import { travels  } from '../reducer/DatabaseReducer';
import moment from 'moment';

const { TextArea } = Input;
const { RangePicker } = DatePicker;


const TravelHistory = () => {
    const database = useSelector((state) => state.Database.user.travelDetails);

    const [form] = Form.useForm();
    const [extra] = Form.useForm();
    const { Title } = Typography;
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
    }, [formValues])

      const handleNext = () =>{
        dispatch(Tab(5))
      }

      // Modal Functions


      const openModal = () =>{
        extra.resetFields()
        if(travelList.length > 0){
          setSubmittable(true);
        }
        setIsModalOpen(true)
      }

      const handleOk = () => {

        extra.validateFields({  validateOnly: true  })
        .then((x) => {  
          dispatch(travels({
            country: x.country,
            purpose: x.purpose,
            from: moment(x.from.$d).format('DD/MM/YYYY'),
            to: moment(x.to.$d).format('DD/MM/YYYY')
          }));

          console.log(database);
          setSubmittable(true);
          setIsModalOpen(false)

        })
        .catch(err => {
          console.log(err);
          setSubmittable(false)
        })

      }


      const handleCancel = () =>{
        setIsModalOpen(false);

        extra.validateFields({  validateOnly: true  })
        .then((x) => {  
          setSubmittable(true)
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
          setIsModalOpen(true);
        }else{
          form.validateFields({  validateOnly: true  })
           .then((x) => {  
             setSubmittable(true)
           })
           .catch(err => {
             setSubmittable(false)
           })
            setTravelList([])
            console.log(travelList);
        }
      }

     return(
        <div className="container">
            <Title level={3}>Travel Detail </Title>
            <br />

            <Form form={form} layout="vertical">
            {/* Modal */}

            <Form.Item style={{width: '100%', margin: "0px auto"}} layout="vertical" name="hasTravelled" label="Have you ever travelled outside Nigeria" rules={[{  required: true }]}>
                <Select onSelect={travelBefore}
                        placeholder="No"
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
                        <Form.Item name="purpose" label="Purpose" rules={[{  required: true }]} tooltip="The reason you travelled out of the country">
                            <Input placeholder="Purpose of Travel" />
                        </Form.Item>
                    </Col>

                    
                   <Col flex="50%">
                        <Form.Item name="from" label="From"  rules={[{  required: true }]}>
                          <DatePicker keyboard={false} style={{width: '100%'}}  />
                        </Form.Item>
                    </Col>

                    <Col flex="50%">
                        <Form.Item name="to" label="To"  rules={[{  required: true }]}>
                          <DatePicker keyboard={false} style={{width: '100%'}} />
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
             (formValues?.hasTravelled === "Yes" && database.length > 0) && (
                <div>
                 <Table columns={[
                    {
                      title: 'Country',
                      dataIndex: 'country',
                      key: 'country'
                    },

                    {
                      title: 'From',
                      dataIndex: 'from',
                      key: 'from'
                    },

                    {
                      title: 'To',
                      dataIndex: 'to',
                      key: 'to'
                    },


                  ]}

                  dataSource={
                    [...database]
                  }

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