import { useCallback, useRef } from "react";
import Webcam from "react-webcam";
import ButtonGlobal from "../../component/ButtonGlobal";

const videoConstraints = {
    width: 540,
    facingMode: "environment"
}

const Camera = ({setImgSrc}) => {
    const webCamRef = useRef(null);
    const urlRef = useRef(null);

    const capturePhoto = useCallback(async () => {
        const imageSrc = webCamRef.current.getScreenshot();
        urlRef.current = imageSrc;
        setImgSrc(urlRef.current)
    }, [webCamRef]);

    const onUserMedia = (e) => {
        console.log(e);
    }





    return (
        <div className="videoCamera">
            
            <section>
            <Webcam
                ref={webCamRef}
                audio={false}
                screenshotFormat="image/png"
                videoConstraints={videoConstraints}
                onUserMedia={onUserMedia}
                mirrored={true}
            />
             <hgroup>
                <ButtonGlobal  className="captureBtn" bgColor="green" onClick={capturePhoto} title="Capture"></ButtonGlobal>
              
            </hgroup>
            </section>
           
            <cite>
            <label>Visitor Image <em>*</em></label>
           {urlRef.current &&  
           <>
           <button className="refreshBtn" size="small" bgColor="red" width="auto" onClick={() => urlRef.current = null}>x</button>
           <b><img src={urlRef.current} alt="" /></b>
           </>
           }
            
            </cite>
            
        </div>
    );
}

export default Camera;
