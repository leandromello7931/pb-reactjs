import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';
import {  CategoryCard, CategoriesToolbar } from './components';
import { Grid, Fab, Dialog, 
  DialogActions, 
  DialogTitle, 
  DialogContent, 
  DialogContentText,
  TextField,
  Button
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import api from '../../services/api';
import CustomizedSnackbar from '../../components/Snackbar';
const token = localStorage.getItem('token');

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  },
  margin: {
    margin: theme.spacing(1),
  },
  fab: {
    position: 'fixed',
    bottom: theme.spacing(4),
    right: theme.spacing(4),
  },
}));


const CategoriesList = () => {
  const classes = useStyles();
 
  const [categories, setCategories] = useState([]);
  const [snack, setSnack] = useState({
    open: false,
    message: '',
    severity: ''
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    getCategories();
  }, []);



  // CRUD Funcionts
  const getCategories = async () => {
    const response = await api.get('/categories', {
      headers:{
        'Content-Type': 'application/json',
        'Authorization': token,
      }
    }).then(response => {
      return response;
    }).catch(err => {
      return err.response;
    });

    if(response)
      if(response.status === 200){
        setCategories(response.data);
      }else{
        console.log(response);
      }
  }

  const handleNewCategory = async () => {
    console.log('new');
  };

  const handleDelete = async (id) => {
    const response = await api.delete(`/categories/${id}`, {
      headers:{
        'Content-Type': 'application/json',
        'Authorization': token,
      }
    }).then(response => {
      return response;
    }).catch(err => {
      return err.response;
    });
    if (response)
      if(response.status === 200){
        setCategories(categories.filter(category => {
          return category.id !== id
        })
        )
        setSnack(snack => ({
          ...snack,
          open: true,
          message: 'Registro deletado com sucesso',
          severity: 'success'
        }));
      }else{
        setSnack(snack => ({
          ...snack,
          open: true,
          message: 'Ocorreu algum erro inesperado, tente novamente',
          severity: 'error'
        }));
      }
  }
  //End Crud Functions

  //Snackbar Functions
  const handleSnackBarClose = () => {
    setSnack( snack => ({
      ...snack,
      open: false,
    }));
  }

  //Dialog functions 
  const handleDialogClickOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClickClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <div className={classes.root}>
        <CategoriesToolbar />
        <div className={classes.content}>
          {/* {categories.length > 0  ? <CategoriesTable categories={categories} /> : <Typography variant="h1">Nenhuma Categoria encontrada.</Typography> } */}
          {/* <CategoriesMTable /> */}
          
          <Grid
            container
            direction="row"
            justify="center"
            spacing={2}
            wrap="wrap"
          >
            
            {categories.map(category => {
              return (
                <Grid
                  item
                  key={category.id}
             
                > 
                  <CategoryCard
                    category={category}
                    handleDelete={handleDelete}
                  />
                </Grid>
              )}
            )}
          </Grid>
          <Fab
            aria-label="add"
            className={classes.fab}
            color="secondary"
            onClick={handleDialogClickOpen}
            position="right-bottom"
            slot="fixed"
          >
            <AddIcon />
          </Fab>
        </div>
      </div>
      <CustomizedSnackbar
        duration={5000}
        handleClose={handleSnackBarClose}
        horizontal="right"
        message={snack.message}
        open={snack.open}
        severity={snack.severity}
        variant= "outlined"
        vertical="top"
      />

      <Dialog
        aria-labelledby="form-dialog-title"
        onClose={handleDialogClickClose}
        open={dialogOpen}
      >
        <DialogTitle id="form-dialog-title">Incluir Categoria</DialogTitle>
        <DialogContent>
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
            type="text"
            variant="filled"
          />
        </DialogContent>
        <DialogActions>
          <Button
            color="primary"
            onClick={handleDialogClickClose}
          >
            Cancelar
          </Button>
          <Button
            color="primary"
            onClick={handleDialogClickClose}
          >
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CategoriesList;
