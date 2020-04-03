import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import { Button, Typography } from '@material-ui/core';
const useStyles = makeStyles(() => ({
  fileUpload: {
    display: 'flex',
    margin: '0 auto',
    alignItems: 'center',
    justifyContent: 'center',
    height: '200px',
  },
  imageUploadWrap: {
    width: '100%',
    height: '100%',
    border: '2px dashed rgba(0, 0, 0, 0.095);',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  fileUploadInput: {
    position: 'absolute',
    margin: '0',
    padding: '0',
    width: '100%',
    height: '100%',
    outline: 'none',
    opacity: '0',
    cursor: 'pointer',
  },
  fileUploadImage : {
    maxHeight: '200px',
    maxWidth: '200px',
    margin: 'auto',
    padding: '20px',
  },
  fileUploadedContent : {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }

})
);

const FileUpload = ({ handleFileUpload, handleRemoveUploadedFile, file }) => {
  const classes = useStyles();
  const [image, setImage] = useState('');


  useEffect(() => {
    if (file){
      setImage(URL.createObjectURL(file));
    }
  }, [file]);

  const handleFileChange = (e) => {
    if (e.target.files[0]){
      handleFileUpload(e.target.files[0]);
    }else{
      handleFileUpload('');
    }
  }

  const handleRemoveFile = () => {
    handleRemoveUploadedFile();
  }

  return (
    <div className={classes.fileUpload} >
      { !file ? (<div className={classes.imageUploadWrap}>
        <input 
          accept="image/*" 
          className={classes.fileUploadInput} 
          id="raised-button-file" 
          onChange={handleFileChange} 
          type="file"
        /> 
        <div className="drag-text">
          <Typography
            variant="h4"
          >Selecione uma imagem</Typography>
        </div>
      </div>) : ''}
      {file ? (<div className={classes.fileUploadedContent}>
        <img
          alt="your"
          className={classes.fileUploadImage}
          src={image}
        />
        <div className="image-title-wrap">
          <Button
            className="remove-image"
            onClick={handleRemoveFile}
            type="button"
          >Remove <span className="image-title">Uploaded Image</span></Button>
        </div>
      </div>) : ''}
    </div>
  );
};

FileUpload.propTypes = {
  // file: PropTypes.string,
  handleFileChange : PropTypes.func,
  handleFileUpload: PropTypes.func,
  handleRemoveUploadedFile: PropTypes.func,
  image: PropTypes.object,
}

export default FileUpload;
