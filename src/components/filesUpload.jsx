import {Button, Upload, Space, Input, Typography, Row, Col, Modal, DatePicker } from 'antd';
import {UploadOutlined,PlusOutlined} from '@ant-design/icons';
import { useState } from 'react';
import { storage } from '../firebaseConfig';
import {  ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { filesFunc } from '../reducer/DatabaseReducer';
import db from '../firebaseConfig';
import {  collection, addDoc } from 'firebase/firestore';
import { useDispatch, useSelector } from 'react-redux';
import { Tab } from '../reducer/TabReducer';

const FilesUpload = () => {
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');

    const [fileList, setFileList] = useState([]);
    const [marriageFile, setMarriageFile] = useState([]);
    const [workFile, setWorkFile] = useState([]);
    const [schoolFile, setSchoolFile] = useState([]);
    const [otherList, setOtherList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [imageLoad, setImageLoad] = useState(false)

    const database = useSelector((state) => state.Database.user);
    const dispatch = useDispatch();

    const handleChange = ({ fileList: newFileList }) =>{
        setFileList(newFileList)
    }

    const handleChange1 = ({ fileList: newFileList }) =>{
        setMarriageFile(newFileList)
    }

    const handleChange2 = ({ fileList: newFileList }) =>{
        setOtherList(newFileList)
    }

    const handleChange3 = ({ fileList: newFileList }) =>{
      setSchoolFile(newFileList)
    }

    const handleChange4 = ({ fileList: newFileList }) =>{
      setWorkFile(newFileList)
    }

    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () =>{
               console.log('Loading...');
               resolve(reader.result)};
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

          const getFileExtension = (filename) => {
            return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
          };
          



        const customRequest = async ({ file, onSuccess, onError }) => {
          try {
            // Generate a unique file name (you can use your own logic here)
            setImageLoad(true)
            const fileName = `${Date.now()}_${file.name}`;
            const fileExtension = getFileExtension(file.name);
            const storageRef = ref(storage, fileName);
            
            
            uploadBytes(storageRef, file)
              .then(snapshot => {

                setImageLoad(false)
                return getDownloadURL(snapshot.ref)
              })
              .then(downloadURL => {
                onSuccess();
                const fileExtension = getFileExtension(file.name);
                setImageLoad(false);
                console.log({url: downloadURL, ext: fileExtension})
                dispatch(filesFunc({url: downloadURL, ext: fileExtension}))
              })

            // Handle the successful upload
          } catch (error) {
            // Handle upload error
            setImageLoad(false)
            onError(error);
            handleRemove(file)
            alert('File Upload Failed')
            console.log(error);
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



          const handleFinish = async () =>{
            setLoading(true)
            try{
              const docRef = await addDoc(collection(db, "users"),  database);
              console.log("Document written with ID: ", docRef.id);
              setLoading(false)
              dispatch(Tab(9));

            }catch(err){
              setLoading(false)
              alert(err);
              console.log(err);
            }
          }


    return (
        <div className="container">
          {
            loading && (
              <div className="absolute">
                <h2 style={{color: 'white'}}>Loading...</h2>
              </div>
            )
          }
          <h1>{imageLoad ? 'Loading Image..': ''}</h1>
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

            {
              database?.family?.maritalStatus !== "Single" && (
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
              )
            }

           {
              database?.jobs.length > 0 && (
                <div  className='outer'>
                    <h3>Work Job Documents </h3>
                    <>
                        <Upload
                            customRequest={customRequest}
                            listType="picture-card"
                            fileList={workFile}
                            onPreview={handlePreview}
                            onChange={handleChange4}
                        >
                            {fileList.length >= 30 ? null : uploadButton}
                        </Upload>
                    </>
                </div>
              )
            }

{
              database?.education.length > 0 && (
                <div  className='outer'>
                    <h3>Educational Institution Documents </h3>
                    <>
                        <Upload
                            customRequest={customRequest}
                            listType="picture-card"
                            fileList={schoolFile}
                            onPreview={handlePreview}
                            onChange={handleChange3}
                        >
                            {fileList.length >= 30 ? null : uploadButton}
                        </Upload>
                    </>
                </div>
              )
            }
            

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
                        {fileList.length >= 30 ? null : uploadButton}
                    </Upload>
                </>
                
            </div>
          </div>
          <Row justify="space-between">
                <Col>
                  <Button className='button'>Prev</Button>
                </Col>

                <Col><Button onClick={handleFinish} disabled={imageLoad} htmlType="submit" className='button'>Finish</Button></Col>
            </Row>
        </div>
      );
}
 
export default FilesUpload;