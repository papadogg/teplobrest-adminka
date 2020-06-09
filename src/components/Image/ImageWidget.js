import React, { useState } from 'react';
import axios from 'axios';
import Resizer from 'react-image-file-resizer';
import { endPoint } from '../../config';

const resizeImage = ({ file, size }) =>
  new Promise((resolve) => {
    Resizer.imageFileResizer(
      file,
      size,
      size,
      'JPEG',
      100,
      0,
      (uri) => {
        resolve(uri);
      },
      'blob'
    );
  });

const uploadImage = async (image) => {
  const uploadConfig = await axios.get(`${endPoint}upload`, {
    headers: {
      authorization: localStorage.getItem('token'),
    },
  });

  const { url, key } = uploadConfig.data;

  await axios.put(url, image, {
    headers: {
      'Content-Type': image.type,
    },
  });
  return key;
};

const ImageWidget = ({ setImages }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const onChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    setError(false);
    try {
      const image256 = await resizeImage({ file, size: 256 });
      const image512 = await resizeImage({ file, size: 512 });
      const image256Url = await uploadImage(image256);
      const image512Url = await uploadImage(image512);

      setImages({
        id: Math.random(),
        small: `https://kotly.s3.eu-central-1.amazonaws.com/${image256Url}`,
        medium: `https://kotly.s3.eu-central-1.amazonaws.com/${image512Url}`,
      });
    } catch (err) {
      console.log(err);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <input type="file" onChange={onChange} />
      {loading && <span>Загрузка</span>}
      {error && <span>Ошибка. Попробуйте еще раз</span>}
    </div>
  );
};

export default ImageWidget;
