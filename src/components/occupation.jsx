import {Select, Button, Form, Input, Space, Typography, DatePicker, Row, Col, Modal } from 'antd';
import {useState} from 'react'

const Occupation = () =>{
    const [form] = Form.useForm();
    const formValues = Form.useWatch([], form);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { Title } = Typography;


    const { RangePicker } = DatePicker;
    const handleWork = (x) =>{
       if(x === 'Yes'){
        console.log('Ok');
        setIsModalOpen(true)
       }else{
        console.log('Move');
       }
    }

    // Modal Functions
    const openModal = () =>{
        setIsModalOpen(true)
      }

      const handleOk = () => {
        setIsModalOpen(false);
        console.log(formValues);
        form.resetFields()
      }

      const handleCancel = () =>{
        setIsModalOpen(false);
      }


    return(
        <div className="container">
        <Title level={3}>WORK / OCCUPATION</Title>

        <br />
        <Form form={form} layout="vertical">
        <Row justify="space-between" gutter={[10, 0]}>
            <Col flex="100%" >
              <Form.Item name="workHistory" label="Do you have any formal education" rules={[{  required: true }]}>
              <Select
                initialvalues={""}
                onChange={handleWork}
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
            formValues?.workHistory === "Yes" && (
                <Form form={form} layout="vertical">
                    <Row justify="space-between" gutter={[10, 0]}>

                <Col flex="100%">
                    <Form.Item name="Name of School / Instition" label="Country">
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
                            value: 'Primary School',
                            label: 'Primary School',
                            },
                            {
                                value: 'Secondary School',
                                label: 'Secondary School',
                            },
                            {
                                value: "Banchelor's Degree",
                                label: "Banchelor's Degree",
                            },
                            {
                                value: "Msc",
                                label: "Msc",
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
                            formValues?.certification === "Secondary School" || formValues?.certification !== "Primary School"  && (
                            <Col flex="50%">
                                <Form.Item name="Course" label="Course of Study">
                                <Input placeholder="Course" />
                                </Form.Item>
                            </Col>
                
                            )
                        }

                    <Col flex="40%">
                        <Form.Item name="" label="Select Year"  rules={[{  required: true }]}>
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
          formValues?.workHistory === "Yes" && (
            <div>
              <h1>Table here</h1>
              <button onClick={openModal}>Add More travel history</button>
            </div>
          )
        }



        <Row justify="space-between">
            {/* <Col>
              <Button onClick={handlePrev} className='button'>Prev</Button>
            </Col>

            <Col><Button onClick={handleNext} disabled={!submittable} htmlType="submit" className='button'>Next</Button></Col> */}
        </Row>
        </Form>
    </div>
    )
}

export default Occupation