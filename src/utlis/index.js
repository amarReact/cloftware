
import { useEffect, useState } from "react";
import { BASE_URL } from "../redux/constants/constants";
import Cookies from "js-cookie";
import axios from "axios";

export const useAuthData = () => {
  const [authList, setAuthList] = useState({});

  useEffect(() => {
    const stored = localStorage.getItem("user");
    setAuthList(stored ? JSON.parse(stored) : {});
  }, []);

  return { authList };
};


// export const useUserDetailData = () => {
//   const token = Cookies.get('jwtToken');
//   const [userDataGlobal, setUserDataGlobal] = useState({loading: true, user: null, error: null });

//   const userDetailFunc = async () => {
//     const config = {
//       headers: { Authorization: `Bearer ${token}` }
//     };
//     const bodyParameters = {
//       key: "value"
//     };

//     try {
//       const response = await axios.post(
//         `${BASE_URL}/get_profile`,
//         bodyParameters,
//         config
//       );
//       setUserDataGlobal({loading: false, user: response?.data});
//     } catch (error) {
//       console.log(error);
//       setUserDataGlobal({loading: false, user: null, error: error.message});
//     }
//   };

//   useEffect(() => {
//     userDetailFunc();
//   }, [token]);

//   return { ...userDataGlobal };
// };


export const useUserDetailData = () => {
  const token = Cookies.get('jwtToken');
  const [userDataGlobal, setUserDataGlobal] = useState({});

  const userDetailFunc = async () => {
    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    const bodyParameters = {
      key: "value"
    };

    try {
      const response = await axios.post(
        `${BASE_URL}/get_profile`,
        bodyParameters,
        config
      );
      setUserDataGlobal(response?.data);
    } catch (error) {
      console.log(error);
      // setUserDataGlobal({loading: false, user: null, error: error.message});
    }
  };

  useEffect(() => {
    userDetailFunc();
  }, [token]);

  return { userDataGlobal };
};



