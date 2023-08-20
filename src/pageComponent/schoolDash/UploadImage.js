import React, { useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import ButtonGlobal from '../../component/ButtonGlobal';
import { ToastContainer, toast } from 'react-toastify';

const UploadImage = ({setIsUpload, croppedImage, setCroppedImage}) => {
  const editorRef = useRef();
  const fileInputRef = useRef();
  const [selectedImage, setSelectedImage] = useState(null);


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };

  const handleImageUpload = () => {
    if (editorRef.current) {
      const canvas = editorRef.current.getImageScaledToCanvas();
      const croppedImageData = canvas.toDataURL('image/jpeg');
      setCroppedImage(croppedImageData);
    }
  };

  const handleImageSave = () => {
    // Implement your save functionality here
    // You can send the croppedImage data to your server or save it locally
    console.log('Saving image:', croppedImage);
    toast.success('Image Saved SuccessFully', {autoClose: 2000, position: "top-center", className: 'customToast'});
              let timer = setTimeout(()=>{
                setIsUpload(false)
                clearTimeout(timer)
              },3000)

  };

  const handleSelectFile = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="image-uploader-container">
      <div className="file-input-container">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
          className="file-input"
        />
        <label className="file-input-label" onClick={handleSelectFile}>
          Select Image 
        </label>
      </div>

<div className='imageGroup'>
      {selectedImage && (
        <div className="editor-container">
          <AvatarEditor
            ref={editorRef}
            image={selectedImage}
            width={250}
            height={250}
            border={50}
            borderRadius={125}
            color={[255, 255, 255, 0.6]}
            scale={1}
            rotate={0}
          />
        </div>
      )}

      {selectedImage && (
        <div className="controls-container">
          <ButtonGlobal bgColor='green' size='small' onClick={handleImageUpload} title="Crop Image"></ButtonGlobal>
        </div>
      )}

      {croppedImage && (
        <div className="cropped-image-container">
          <h3>Cropped Image</h3>
          <img src={croppedImage} alt="Cropped" />
          <ButtonGlobal bgColor='green' size='small' onClick={handleImageSave} title="Save Image"></ButtonGlobal>
        </div>
      )}
      </div>
      <ToastContainer />
    </div>
  );
};

export default UploadImage;
