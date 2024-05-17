import React from 'react';
import styled from 'styled-components';

interface FileDownloaderProps {
  filename: string;
  url?: string;
  getUrl?: () => Promise<string>;
}

const StyledButton = styled.button`
  margin-top:20px;
  width: 120px;
  height: 35px;
  border-radius: 15px;
  border: 1px solid black;
  background-color: #0245D1;
  color: white;
`

const FileDownloader: React.FC<FileDownloaderProps> = ({ filename, url, getUrl }) => {
  const downloadFile = (url: string, filename: string) => {
    fetch(url)
      .then(response => {
        if (response.ok) return response.blob();
        
        throw new Error('Network response was not ok.');
      })
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename || 'download';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      })
      .catch(error => {
        alert('Error while downloading. Try again later');
      });
  };
  
  const handleDownload = () => {

    if (getUrl) {
      getUrl().then(url => downloadFile(url, filename))
      .catch(_ => alert('Error while downloading. Try again later'));
    } else if (url) {
      downloadFile(url, filename);
    }
  };

  return (
    <StyledButton onClick={handleDownload}>Download result</StyledButton>
  );
};

export default FileDownloader;
