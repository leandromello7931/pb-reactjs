import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/styles';
import {  CategoryCard, CategoriesToolbar, CategoryModal } from './components';
import { Grid, Fab } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import api from '../../services/api';
import CustomizedSnackbar from '../../components/Snackbar';

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
  const [category, setCategory] = useState({
    name: '',
    file: ''
  });

  const [snack, setSnack] = useState({
    open: false,
    message: '',
    severity: ''
  });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getCategories();
  }, []);

  // CRUD Funcionts
  const getCategories = async () => {
    const response = await api.get('/categories', {
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(response => {
      return response;
    }).catch(err => {
      return err.response;
    });

    if(response)
      if(response.status === 200){
        setCategories(response.data);
        console.log(response.data);
      }else{
        console.log(response);
      }
  }

  const handleFileUpload = (file) => {
    setCategory(category => ({
      ...category,
      file: file
    }));
  }

  const handleRemoveUploadedFile = () => {
    setCategory(category => ({
      ...category,
      file: ''
    }));
  }
  const handleChange = (event) => {
    event.persist();
    setCategory(category => 
      ({...category, 
        [event.target.name]: event.target.value
      }));
  }

  const handleNewCategory = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const formData = new FormData();

    formData.append('name', category.name);
    formData.append('image', category.file);
    formData.append('active', true);

    const response = await api.post('categories', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then( response => {
      return response;
    }).catch( err => {
      return err.response;
    });
    setIsLoading(false);
    if(response){
      if(response.status === 200){
        handleDialogClickClose();
        setCategory( () => ({
          name: '',
          file: '',
        }));
        const newCategory = response.data;
        console.log(newCategory);
        const newCategoriesList = [...categories, newCategory.category ]
        setCategories(newCategoriesList);
        console.log(categories);
        setSnack( snack => ({
          ...snack,
          message: 'Categoria incluída com sucesso.',
          open: true,
          severity: 'success'
        }));
      }else{
        setSnack( snack => ({
          ...snack,
          message: 'Parece que algo deu errado. Tente novamente.',
          open: true,
          severity: 'error'
        }));
      }
    }
  };

  const handleDelete = async (id) => {
    const response = await api.delete(`/categories/${id}`, {
      headers:{
        'Content-Type': 'application/json'
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
  const handleSnackBarClose = (event, reason) => {
    if (reason === 'clickaway'){
      return;
    }
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

      <CategoryModal
        category = {category}
        dialogOpen = {dialogOpen}
        handleChange = {handleChange} 
        handleDialogClickClose = {handleDialogClickClose}
        handleFileUpload = {handleFileUpload}
        handleRemoveUploadedFile = {handleRemoveUploadedFile}
        handleSubmit = {handleNewCategory}
        isLoading = {isLoading}
      />
    </>
  );
};

export default CategoriesList;
