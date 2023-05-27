import React, { createContext, useContext, useState } from 'react';

const SchoolIdContext = createContext();

export const useSchoolId = () => {
  const [schoolId, setSchoolId] = useState(null);

  const setSelectedSchoolId = (id) => {
    setSchoolId(id);
  };

  return { schoolId, setSelectedSchoolId };
};

export const SchoolIdProvider = ({ children }) => {
  const { schoolId, setSelectedSchoolId } = useSchoolId();

  return (
    <SchoolIdContext.Provider value={{ schoolId, setSelectedSchoolId }}>
      {children}
    </SchoolIdContext.Provider>
  );
};

export const useSchoolIdContext = () => {
  return useContext(SchoolIdContext);
};
