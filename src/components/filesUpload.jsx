import {Button, Upload, Space, Input, Typography, Row, Col, Modal, DatePicker } from 'antd';
import {UploadOutlined,PlusOutlined} from '@ant-design/icons';
import { useState } from 'react';
const FilesUpload = () => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    const [fileList, setFileList] = useState([]);
    const [marriageFile, setMarriageFile] = useState([]);
    const [otherList, setOtherList] = useState([]);

    const handleChange = ({ fileList: newFileList }) =>{
        setFileList(newFileList)
    }

    const handleChange1 = ({ fileList: newFileList }) =>{
        setMarriageFile(newFileList)
    }

    const handleChange2 = ({ fileList: newFileList }) =>{
        setOtherList(newFileList)
    }
    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
    });

        const handleRemove = (file) => {
            // Run your custom function here when a file is removed
            console.log(`File ${file.name} removed from the preview.`);
          }

        
        const handlePreview = async (file) => {
            if (!file.url && !file.preview) {
              file.preview = await getBase64(file.originFileObj);
            }
            setPreviewImage(file.url || file.preview);
            setPreviewOpen(true);
            setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
          };



        const customRequest = async ({ file, onSuccess, onError }) => {
          try {
            // Generate a unique file name (you can use your own logic here)
            const fileName = `${Date.now()}_${file.name}`;
            console.log('Updated');
            onError();
            // Create a reference to Firebase Storage
            // const storageRef = ref(storage, fileName);
            
            // // Upload the file to Firebase Storage
            // await uploadBytes(storageRef, file.originFileObj);
      
            // Handle the successful upload
            // onSuccess();
            console.log(`${file.name} file uploaded successfully.`);
          } catch (error) {
            // Handle upload error
            // onError(error);
            console.error(`${file.name} file upload failed.`, error);
          }
        }

        const uploadButton = (
            <div>
              <PlusOutlined />
              <div
                style={{
                  marginTop: 8,
                }}
              >
                Upload
              </div>
            </div>
          );


    return (
        <div className="container">
          <div className="file">

            <div className='outer'>
                <h3>Passport Page (with Visa Page)</h3>
                <>
                    <Upload
                    //  {...props}
                    onRemove={handleRemove}
                    customRequest={customRequest}
                    listType="picture-card"
                    fileList={fileList}
                    onPreview={handlePreview}
                    onChange={handleChange}
                    >
                        {fileList.length >= 15 ? null : uploadButton}
                    </Upload>
                </>

            </div>
            
            <div  className='outer'>
                <h3>Marriage Documents </h3>
                <>
                    <Upload
                        customRequest={customRequest}
                        listType="picture-card"
                        fileList={marriageFile}
                        onPreview={handlePreview}
                        onChange={handleChange1}
                    >
                        {fileList.length >= 15 ? null : uploadButton}
                    </Upload>
                </>
            </div>

            <div className='outer'>
                <h3>Other Documents</h3>
                <>
                    <Upload
                        customRequest={customRequest}
                        listType="picture-card"
                        fileList={otherList}
                        onPreview={handlePreview}
                        onChange={handleChange2}
                    >
                        {fileList.length >= 15 ? null : uploadButton}
                    </Upload>
                </>
                
            </div>
          </div>
          <Row justify="space-between">
                <Col>
                  <Button className='button'>Prev</Button>
                </Col>

                <Col><Button htmlType="submit" className='button'>Finish</Button></Col>
            </Row>
        </div>
      );
}
 
export default FilesUpload;