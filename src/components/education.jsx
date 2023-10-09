import {Select, Button, Form, Input, Space, Typography, DatePicker, Row, Col, Modal } from 'antd';
import {useState, useEffect} from 'react';
import { useDispatch } from 'react-redux';
import { Tab } from '../reducer/TabReducer';
    

const Education = () =>{
    const [form] = Form.useForm();
    const formValues = Form.useWatch([], form);

    const [modal] = Form.useForm();
    const modalValues = Form.useWatch([], modal);


    const [isModalOpen, setIsModalOpen] = useState(false);
    const { Title } = Typography;
    const [submittable, setSubmittable] = useState(false);
    const dispatch = useDispatch();

    const [educationList, setEducationList] = useState([])

    const { RangePicker } = DatePicker;
    const certs = (x) =>{
       if(x === 'Yes'){
        setIsModalOpen(true);

        modal.validateFields({  validateOnly: true })
        .then(() => { setSubmittable(true)},
          () => {
            setSubmittable(false);
          });
       }
    }

    useEffect(() => {
      form.validateFields({  validateOnly: true })
        .then(() => { setSubmittable(true)},
          () => {
            setSubmittable(false);
          });
    }, [formValues, modalValues]);

    // Modal Functions
    const openModal = () =>{
        setIsModalOpen(true)
      }

      const handleOk = () => {
        setIsModalOpen(false);

        modal.validateFields({  validateOnly: true })
        .then(() => {
          setSubmittable(true);
           setEducationList([...educationList, modalValues])
          //  Send Data to the Database -> Firestore
          //  Sending data to the array of education object
          // If it's successful then give the use a prompt of the success
          
          modal.resetFields()
          },
          () => {
            alert('Fill required fields')
            if(educationList.length > 0){
               setSubmittable(true);
            }else{
              setSubmittable(false);
            }
          });
      }

      const handleCancel = () =>{
        setIsModalOpen(false);

        // modal.validateFields({  validateOnly: true })
        // .then(() => { 
        //   setSubmittable(true)
        // },
        //   () => {
        //     setSubmittable(false);
        //     if(educationList.length > 0){
        //       setSubmittable(true);
        //     }
        //   });


      }

      const handlePrev = () =>{
        dispatch(Tab(3))
      }

      const handleNext = () => {
        dispatch(Tab(5))
      }


    return(
        <div className="container">
        <Title level={3}>EDUCATION</Title>
      
        <br />
        <Form form={form} layout="vertical">
        <Row justify="space-between" gutter={[10, 0]}>
            <Col flex="100%" >
              <Form.Item name="isEducated" label="Do you have any formal education" rules={[{  required: true }]}>
              <Select
                initialvalues={""}
                onChange={certs}
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

        {/* Modal */}

       <Modal title="Education" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          {
            formValues?.isEducated === "Yes" && (
                <Form form={modal} layout="vertical">
                    <Row justify="space-between" gutter={[10, 0]}>

                <Col flex="100%">
                    <Form.Item name="Instition" label="Country">
                        <Input placeholder="School" />
                    </Form.Item>
                </Col>

                <Col flex="100%" >
                    <Form.Item name="certification" label="Certification" rules={[{  required: true }]}>
                    <Select
                        initialvalues={""}
                        style={{  width: "100%", textAlign: 'left' }} 
                        
                        options={[
                            {
                                value: 'Secondary School',
                                label: 'Secondary School',
                            },
                            {
                                value: "Banchelor's Degree",
                                label: "Banchelor's Degree",
                            },
                            {
                                value: "Masters",
                                label: "Masters",
                            },
                            {
                                value: "PhD",
                                label: "PhD",
                            }
                        ]}
                        >


                        </Select>
                    </Form.Item>
                    </Col>
                        {
                            modalValues?.certification === "Secondary School" || formValues?.certification !== "Primary School"  && (
                            <Col flex="50%">
                                <Form.Item name="Course" label="Course of Study" rules={[{  required: true }]}>
                                <Input placeholder="Course" />
                                </Form.Item>
                            </Col>
                
                            )
                        }

                    <Col flex="40%">
                        <Form.Item name="" tooltip="From the beginning of the academic programme to the end" label="Select Year"  rules={[{  required: true }]}>
                          <RangePicker /> 
                        </Form.Item>
                    </Col>

                    </Row>

                </Form>
            )
          }
        </Modal>

        {/* Table of application */}
        {
          formValues?.isEducated === "Yes" && (
            <div>
              <Button onClick={openModal} type="dashed">+ More Education</Button>
            </div>
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

export default Education