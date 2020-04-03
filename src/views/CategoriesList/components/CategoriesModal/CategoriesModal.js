import React from 'react';
import { FileUpload } from '../../../../components';
import BeatLoader from 'react-spinners/BeatLoader';
import { css } from '@emotion/core';

import { Dialog, 
  DialogActions, 
  DialogTitle, 
  DialogContent, 
  DialogContentText,
  TextField,
  Button
} from '@material-ui/core';

const override = css`
  border-color: #fff;
  display: flex;
  padding: 3.5px 0;
`;


const CategoriesModal = ({ handleDialogClickClose, 
  dialogOpen, handleSubmit, handleChange, 
  handleFileUpload, handleRemoveUploadedFile, category, isLoading}) => {
  return (
    <Dialog
      aria-labelledby="form-dialog-title"
      onClose={handleDialogClickClose}
      open={dialogOpen}
    >
      <form
        onSubmit={handleSubmit}
      >
        <DialogTitle id="form-dialog-title">Incluir Categoria</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
        Para cadastrar uma nova categoria, preencha os campos abaixo.
          </DialogContentText>
          <TextField
            autoFocus
            color="secondary"
            fullWidth
            id="name"
            label="Nome"
            margin="dense"
            name="name"
            onChange={handleChange}
            type="text"
            value={category.name || ''}
            variant="filled"
          />

          <FileUpload
            file = {category.file || ''}
            handleFileUpload = {handleFileUpload}
            handleRemoveUploadedFile = {handleRemoveUploadedFile}
          />
        </DialogContent>
        <DialogActions>
          <Button
            disabled={isLoading}
            onClick={handleDialogClickClose}
          >
        Cancelar
          </Button>
          <Button
            color="primary"
            disabled={isLoading}
            type="submit"
            variant="contained"
          >
            {  isLoading ? (
              <BeatLoader
                color={'#fff'}
                css={override}
                size={15}
              /> ) : 'Salvar'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default CategoriesModal;
