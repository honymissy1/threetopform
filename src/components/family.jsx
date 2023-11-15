import {Select, Button, Table, Typography, Form, Input, Space, DatePicker, Row, Col, Modal } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Tab } from '../reducer/TabReducer';
import { familyDetails, childDetails } from '../reducer/DatabaseReducer';
import moment from 'moment';
const { Title } = Typography;


const Family = () =>{
    const [form] = Form.useForm();
    const formValues = Form.useWatch([], form);


    const [child] = Form.useForm();
    const childValues = Form.useWatch([], child);

    const dispatch = useDispatch();
    const [sameAddress, setSameAddress] = useState(true)
    const [submittable, setSubmittable] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false)
    const database = useSelector((state) => state.Database.user.family);
    const children = useSelector((state) => state.Database.user.childDetail);
    useEffect(() =>{
      form.validateFields({ validateOnly: true})
       .then(() => setSubmittable(true))
       .catch(() => setSubmittable(false))
    }, [formValues])

    const handlePrev = () =>{
        console.log('Prev');
        dispatch(Tab(6))
    }

    const handleNext = () =>{
        form.validateFields({validateOnly: true})
        .then(x =>{
          dispatch(familyDetails({
            maritalStatus: x.maritalStatus || null,
            spouseName: x.spouseName || null,
            spouseDob: x.spouseDob ? moment(x.spouseDob.$d).format('DD/MM/YYYY') : null,
            marriageDate: x.marriageDate ? moment(x.marriageDate.$d).format('DD/MM/YYYY') : null,
            divorceDate:  x.divorceDate ? moment(x.divorceDate.$d).format('DD/MM/YYYY') : null,
            spouseOccupation: x.spouseOccupation || null,
            fatherName: x.fatherName,
            fatherDob: moment(x.fatherDob.$d).format('DD/MM/YYYY'),
            fatherOccupation: x.fatherOccupation,
            fatherAddress: x.fatherAddress,
            motherName: x.motherName,
            motherDob: moment(x.motherDob.$d).format('DD/MM/YYYY') ,
            motherOccupation: x.motherOccupation,
            motherAddress: x.motherAddress,
          }))

          dispatch(Tab(8))
        })

        console.log(database);
    }

    const handleOk = () =>{
      child.validateFields({ validateOnly: true})
      .then((x) => {
        dispatch(childDetails({
          childName: x.childName || null,
          childDob: x.childDob ? moment(x.childDob.$d).format('DD/MM/YYYY') : null,
          childGender: x.childGender
        }))
        // setSubmittable(true);
        setIsModalOpen(false);
        console.log(database);

        child.resetFields();
      })
      .catch((e) => {
        console.log(e);
        alert('Fill the required field for this child')
        setSubmittable(false)
      })
    }

    const handleCancel = () =>{
      setIsModalOpen(false)
    }

    const handleChild = (x) =>{
       if(x){
        setIsModalOpen(true)
       } 
    }

    // childName: action.payload.childName,
    // childDob: action.payload.childDob,
    // childGender:  action.payload.childGender 
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
                                        <Form.Item label="Spouse Name" name="spouseName" rules={[{  required: true }]}>    
                                          <Input placeholder="" />
                                        </Form.Item>
                                    </Col>
                                   <Col flex="50%">
                                    <Form.Item label="Marriage Date" name="marriageDate" rules={[{  required: true }]}>
                                        <DatePicker format={'DD/MM/YYYY'} keyboard={false} style={{width: '100%'}} placeholder='Date' />
                                    </Form.Item>
                                    </Col>

                                    {
                                        formValues?.maritalStatus === 'Divorced' && (
                                            <Col flex="50%">
                                            <Form.Item label="Divorce Date" name="divorceDate" rules={[{  required: true }]}>
                                                <DatePicker format={'DD/MM/YYYY'} keyboard={false} style={{width: '100%'}} placeholder='Date' />
                                            </Form.Item>
                                            </Col>
                                        )
                                    }

                                    
                                    <Col flex="50%">
                                            <Form.Item label="Spouse DOB" name="spouseDob" rules={[{  required: true }]}>
                                                <DatePicker format={'DD/MM/YYYY'} keyboard={false} style={{width: '100%'}} placeholder='Spouse Date of Birth' />
                                            </Form.Item>
                                    </Col>

                                    <Col flex="50%" >
                                        <Form.Item label="Occupation"  name="spouseOccupation" rules={[{  required: true }]}>    
                                          <Input placeholder='Spouse Job / Occupation'/>
                                        </Form.Item>
                                    </Col>

                                    {/* <Col flex="50%">
 
                                      <Form.Item label="Children"> 
                                          <Button onClick={() => setIsModalOpen(true)} type={'primary'} style={{width: '100%',alignSelf: 'left', justifySelf: "flex-start"}}>+ Add Child</Button>
                                      </Form.Item>
                                    </Col> */}

                            </Row>

                        )
                    }


                  <Col flex="100%">
                    <Form.Item name="childrens" label="Do you have a child / children" rules={[{ required: true }]}>
                    <Select
                        onSelect={handleChild}
                        style={{  width: "100%", textAlign: 'left' }} 
                        options={[
                            {
                                value: true,
                                label: 'Yes',
                                },
                                {
                                value: false,
                                label: 'No',
                                }
                        ]}
                        ></Select>
                        </Form.Item>

                        
                    </Col>


                </Row>
  

            {
             children?.length > 0 &&formValues?.childrens && (
                <div>
                 <Table
                  // style={{width: '100%'}}
                  columns={[
                    {
                      title: 'Name',
                      dataIndex: 'childName',
                      // ellipsis: true,
                      key: 'childName'
                    },

                    {
                      title: 'Date of Birth',
                      dataIndex: 'childDob',
                      key: 'childDob'
                    },

                    {
                      title: 'Gender',
                      dataIndex: 'childGender',
                      ellipsis: true,
                      key: 'childGender'
                    },


                  ]}
                  
                  dataSource={[...children]}

                  pagination={false}
                  
                  />
                </div>
              )

            }

                {
                  formValues?.childrens && (
                    <Button onClick={() => setIsModalOpen(true)} type={'primary'} style={{width: 'max-content', position: 'relative', left: '0'}}>+ Add Child</Button>
                  )
                }


            

            <div style={{ boxShadow: '.4px .5px 5px black', marginTop: '30px'}}>
              <h4 style={{background: 'black', color:'white', padding: '10px'}}>Parent Info</h4>

              <Row className="parent" justify="space-between" gutter={[10, 0]}>
                  <Col flex="100%">
                    <Title style={{color: 'white', width:'max-content', textAlign:'left', padding: '5px', background: 'black'}} level={5}> Father's Info </Title>
                  </Col>
                  <Col flex="50%" >
                  <Form.Item label="Full Name" name="fatherName" rules={[{  required: true }]}>    
                    <Input placeholder="" />
                    </Form.Item>

                  </Col>

                  <Col flex="50%">
                  <Form.Item label="Dob" name="fatherDob" rules={[{  required: true }]}>
                      <DatePicker format={'DD/MM/YYYY'} keyboard={false} style={{width: '100%'}} placeholder='Date Of Birth' />
                    </Form.Item>
                  </Col>

                  <Col flex="50%" >
                      <Form.Item label="Occupation" name="fatherOccupation" rules={[{  required: true }]}>
                      <Input placeholder="Work / Job" required/>
                      </Form.Item>
                  </Col>

                  <Col flex="50%" >
                  <Form.Item label="Address" name="fatherAddress" rules={[{  required: true }]}>    
                    <Input placeholder="" />
                    </Form.Item>
                  </Col>

                  <Col flex="100%">
                    <Title style={{color: 'white', width:'max-content', textAlign:'left', padding: '5px', background: 'black'}} level={5}>Mother's Info </Title>
                  </Col>
                  <Col flex="50%" >
                  <Form.Item label="Full Name" name="motherName" rules={[{  required: true }]}>    
                    <Input placeholder="" />
                    </Form.Item>
                  </Col>

                  <Col flex="50%">
                  <Form.Item label="Dob" name="motherDob" rules={[{  required: true }]}>
                      <DatePicker format={'DD/MM/YYYY'} keyboard={false} style={{width: '100%'}} placeholder='Date of Birth' />
                    </Form.Item>
                  </Col>

                  <Col flex="50%" >
                      <Form.Item label="Occupation" name="motherOccupation" rules={[{  required: true }]}>
                      <Input placeholder="Work / Job" required/>
                      </Form.Item>
                  </Col>

                  <Col flex="50%" >
                  <Form.Item label="Address" name="motherAddress" rules={[{  required: true }]}>    
                    <Input placeholder="" />
                    </Form.Item>
                  </Col>
              </Row>
            </div>
            

            <Modal title="Child" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                          
                          <Form form={child} layout="vertical">
                            <Col flex="50%" >
                              <Form.Item label="Full Name" name="childName" rules={[{  required: true }]}>    
                                <Input placeholder="Olabode Daniel" />
                              </Form.Item>
                            </Col>

                            <Col flex="50%" >
                              <Form.Item label="Dob" name="childDob" rules={[{  required: true }]}>    
                               <DatePicker format={'DD/MM/YYYY'} keyboard={false} style={{width: '100%'}} placeholder='Date of Birth' />
                              </Form.Item>
                            </Col>


                            <Col flex="50%">
                                <Form.Item name="childGender" label="Gender" rules={[{  required: true }]}>
                                  <Select
                                  
         
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


                          </Form>

                  </Modal>

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