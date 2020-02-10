import React from 'react';
import { makeStyles } from '@material-ui/styles';
import {  CategoryCard } from './components';




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
 

  return (
    <div className={classes.root}>
      {/* <CategoriesToolbar /> */}
      <div className={classes.content}>
        {/* {categories.length > 0  ? <CategoriesTable categories={categories} /> : <Typography variant="h1">Nenhuma Categoria encontrada.</Typography> } */}
        {/* <CategoriesMTable /> */}
        <CategoryCard />
      </div>
    </div>
  );
};

export default CategoriesList;
