import React from 'react';
import styled from 'styled-components';

const Image = styled.img`
  width: 100%;
  height: auto;
`;

const ImagePicker = ({ src, alt, onClick }) => {
  return <Image src={src} alt={alt} onClick={onClick} style={{ width: '80px', height: '80px'}} />;
};

export default ImagePicker;
