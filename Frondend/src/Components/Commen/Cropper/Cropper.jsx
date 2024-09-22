  import React, { useRef, useState } from "react";
  import Cropper from "react-cropper";
  import "cropperjs/dist/cropper.css";

  const ImageCroper = ({image,onCropComplete,originalFileName }) => {
    const cropRef = useRef(null);
    const [croppedImage, setCroppedImage] = useState(false);

    const onCrop = () => {
      const cropper = cropRef.current?.cropper
      if(cropper){
          const cropUrl = cropper.getCroppedCanvas({
              width: 960,
              height: 1280
          }).toDataURL()
          setCroppedImage(cropUrl)
          onCropComplete(cropUrl,originalFileName)
      }
    }

    return (
      <div className="flex">
        <Cropper
          src={image}
          style={{ height: 200, width: "200%" }}
          initialAspectRatio={3 / 4}
          guides={false}
          ref={cropRef}
          crop={onCrop}
        />
        {croppedImage && (
          <div className="flex justify-center items-center">
            <img
              src={croppedImage}
              alt="Cropped"
              className="m-1 w-[245%] h-[6rem] object-cover rounded-sm shadow-lg"
            />
          </div>
        )}
      </div>
    );
  };

  export default ImageCroper;
