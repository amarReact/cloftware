
import React, {useCallback, useEffect, useRef, useState} from "react"
import Webcam from "react-webcam";
const AllCamera = ()=>{
    const [devices, setDevices] = useState([])
    const handleDevices = useCallback(
        (mediaDevices) => 

        setDevices(mediaDevices.filter(({ kind }) => kind  === "videoinput")),
        [setDevices]
    );

    useEffect(()=>{
      navigator.mediaDevices.enumerateDevices().then(handleDevices)
    },[handleDevices])

    return(
        <section>
            {devices.map((device, key)=>{
                return(
                   <div>
                     <Webcam
                     audio={false} 
                     videoConstraints={{deviceId:device.deviceId}}
                     />
                     {device.label || `Device ${key + 1}`}
                   </div>
                )
            })}
        </section>
    )
}

export default AllCamera;