import React, { useState } from 'react';

const Demo = () => {
  const [text, setText] = useState('');
  const [textList, setTextList] = useState([]);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && text.trim() !== '') {
      setTextList([...textList, text.trim()]);
      setText('');
    }
  };

  const handleRemove = (index) => {
    const updatedList = [...textList];
    updatedList.splice(index, 1);
    setTextList(updatedList);
  };

  return (
    <div>
      <input
        type="text"
        value={textList.join(', ')}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      <ul>
        {textList.map((item, index) => (
          <li key={index}>
            {item}
            <button onClick={() => handleRemove(index)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Demo;
