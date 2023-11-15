import {Select, Button, Form, Input, Table, Typography, DatePicker, Row, Col, Modal } from 'antd';
import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tab } from '../reducer/TabReducer';
import { eductionHistory } from '../reducer/DatabaseReducer';
import moment from 'moment';
    

const Education = () =>{
    const [form] = Form.useForm();
    const formValues = Form.useWatch([], form);

    const [modal] = Form.useForm();
    const modalValues = Form.useWatch([], modal);


    const [isModalOpen, setIsModalOpen] = useState(false);
    const { Title } = Typography;
    const [submittable, setSubmittable] = useState(false);
    const dispatch = useDispatch();
    const database = useSelector((state) => state.Database.user.education);


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
        .then((x) => {
          dispatch(eductionHistory({
            school: x.school,
            certification: x.certification,
            course: x.course || null,
            from: moment(x.from.$d).format('DD/MM/YYYY'),
            to: moment(x.to.$d).format('DD/MM/YYYY')
          }))

          setSubmittable(true);
          modal.resetFields()
          },
          () => {
            alert('Fill required fields')
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
        dispatch(Tab(4))
      }

      const handleNext = () => {
        dispatch(Tab(6))
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
                    <Form.Item name="school" label="Institution">
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
                            <Col flex="100%">
                                <Form.Item name="course" label="Course of Study" rules={[{  required: true }]}>
                                <Input placeholder="Course" />
                                </Form.Item>
                            </Col>
                
                            )
                        }

                    <Col flex="50%">
                        <Form.Item name="from" label="From"  rules={[{  required: true }]}>
                          <DatePicker format={'DD/MM/YYYY'} keyboard={false} style={{width: '100%'}}  />
                        </Form.Item>
                    </Col>

                    <Col flex="50%">
                        <Form.Item name="to" label="To"  rules={[{  required: true }]}>
                          <DatePicker format={'DD/MM/YYYY'} keyboard={false} style={{width: '100%'}} />
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

        {
          database.length > 0 && (
            <Table 
             style={{width: '100%'}}
            columns={[
              {
                title: 'Institution',
                dataIndex: 'school',
                key: 'school'
              },

              {
                title: 'Certification',
                dataIndex: 'certification',
                key: 'certification'
              },

              {
                title: 'From',
                dataIndex: 'from',
                key: 'from'
              }


            ]}

            dataSource={
              [...database]
            }

            pagination={false}
            
            />
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