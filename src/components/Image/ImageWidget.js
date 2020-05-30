import React from 'react';

const ImageWidget = ({ setImages }) => {
  const onChange = async (e) => {
    const { files } = e.target;
    const formData = new FormData();
    Array.from(files).forEach((file) => formData.append('images', file));
    const response = await fetch('http://localhost:4000/upload', {
      method: 'POST',
      headers: {
        authorization: localStorage.getItem('token'),
      },
      body: formData,
    });
    const json = await response.json();
    json.forEach((img) => {
      setImages({
        id: Math.random(),
        small: img.small,
        big: img.big,
      });
    });
  };
  return <input type="file" multiple onChange={onChange} />;
};

export default ImageWidget;
