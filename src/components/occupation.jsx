import {Select, Button, Form, Input, Table, Typography, DatePicker, Row, Col, Modal } from 'antd';
import {useState, useEffect} from 'react';
import { occupation } from '../reducer/DatabaseReducer';
import { useDispatch, useSelector } from 'react-redux';
import { Tab } from '../reducer/TabReducer'
import moment from 'moment';
const { RangePicker } = DatePicker;
const Occupation = () =>{
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const formValues = Form.useWatch([], form);
    const database = useSelector((state) => state.Database.user.jobs);


    const [modal] = Form.useForm();
    const modalValues = Form.useWatch([], modal);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { Title } = Typography;
    const [submittable, setSubmittable] = useState(false);

    const [occupationList, setOccupationList] = useState([])

    useEffect(() =>{
      if(formValues?.workHistory === 'Yes'){
        setIsModalOpen(true)
      }
     
      form.validateFields({  validateOnly: true })
      .then(() => { setSubmittable(true)},
        () => {
          setSubmittable(false);
        });

    }, [formValues])

    const handleWork = (x) =>{
       if(x === 'Yes'){
        setIsModalOpen(true)
        modal.validateFields({  validateOnly: true })
        .then(() => { setSubmittable(true)},
          () => {
            setSubmittable(false);
          });
       }
    }

    // Modal Functions
    const openModal = () =>{
        setIsModalOpen(true)
      }

      const handleOk = () => {
        setIsModalOpen(false);
        modal.validateFields({  validateOnly: true })
        .then((x) => {
           setSubmittable(true);
           console.log(x);
           dispatch(occupation({
            company: x.company,
            position: x.position,
            jobTitle: x.jobTitle,
            from: moment(x.from.$d).format('DD/MM/YYYY'),
            to: moment(x.to.$d).format('DD/MM/YYYY'),
            jobAddress: x.jobAddress
           }))


           modal.resetFields();
        },
          () => {     
            alert('Fill required fields')
            if(occupationList.length > 0){
               setSubmittable(true);
            }else{
              setSubmittable(false);
            }
          });
      }

      const handleCancel = () =>{
        setIsModalOpen(false);
      }

      const handlePrev = () =>{
        dispatch(Tab(5))
      }

      const handleNext = () =>{
        dispatch(Tab(7))
      }


    return(
        <div className="container">
        <Title level={3}>WORK / OCCUPATION</Title>

        <br />
        <Form form={form} layout="vertical">
        <Row justify="space-between" gutter={[10, 0]}>
            <Col flex="100%" >
              <Form.Item name="workHistory" label="Are you working / Business" rules={[{  required: true }]}>
              <Select
                initialvalues={""}
                onSelect={handleWork}
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

       <Modal title="Work / Occupation" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          {
            formValues?.workHistory === "Yes" && (
                <Form form={modal} layout="vertical">
                    <Row justify="space-between" gutter={[10, 0]}>

                <Col flex="100%">
                    <Form.Item name="company" label="Company" tooltip="The name of your Employer or Business Name" rules={[{  required: true }]}>
                        <Input placeholder="Glo Nigeria" />
                    </Form.Item>
                </Col>

                <Col flex="50%">
                    <Form.Item name="position" label="Position" tooltip="The position you hold in your work place, if it's a personal business you are the owner" rules={[{  required: true }]}>
                        <Input placeholder="General Manager" />
                    </Form.Item>
                </Col>

                <Col flex="50%">
                    <Form.Item name="jobTitle" label="Description" rules={[{  required: true }]} tooltip="What you do in the Job e.g As a sales manager I ensure better sale">
                        <Input placeholder="I manage sales in the company" />
                    </Form.Item>

               </Col>

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

               <Col flex="100%" >
                    <Form.Item name="jobAddress" label="Work Address" rules={[{  required: true }]}>
                        <Input placeholder="Address" />
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
              <Button onClick={openModal} type="dashed">+ Add Job</Button>
          )
        }

        {
          database.length > 0 && (
            <Table columns={[
              {
                title: 'Company',
                dataIndex: 'company',
                key: 'company'
              },

              {
                title: 'Position',
                dataIndex: 'position',
                key: 'position'
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

export default Occupation
