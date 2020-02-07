import React, {  useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/styles';
import {  CategoryCard } from './components';
import api from '../../services/api';
import { Grid } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3)
  },
  content: {
    marginTop: theme.spacing(2)
  }
}));

const CategoriesList = () => {
  const classes = useStyles();
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    const token = localStorage.getItem('token');

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

    console.log(response);
    if(response)
      if(response.status === 200){
        setCategories(response.data);
      }else{
        console.log(response);
      }

  }

  return (
    <div className={classes.root}>
      {/* <CategoriesToolbar /> */}
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
                  item={category}
                  key={category.id}
                />
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
};

export default CategoriesList;
