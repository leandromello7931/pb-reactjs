import React, {  useEffect } from 'react';
import { makeStyles } from '@material-ui/styles';
import {  CategoryCard } from './components';
import api from '../../services/api';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

var categories = [];

const CategoriesList = () => {
  const classes = useStyles();

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const token = localStorage.getItem('token');

    categories = await api.get('/categories', {
      headers:{
        'Content-Type': 'application/json',
        'Authorization': token,
      }
    })

    console.log(categories);
  }

  return (
    <div className={classes.root}>
      {/* <CategoriesToolbar /> */}
      <div className={classes.content}>
        {/* {categories.length > 0  ? <CategoriesTable categories={categories} /> : <Typography variant="h1">Nenhuma Categoria encontrada.</Typography> } */}
        {/* <CategoriesMTable /> */}
        <CategoryCard />
        <CategoryCard />
      </div>
    </div>
  );
};

export default CategoriesList;
