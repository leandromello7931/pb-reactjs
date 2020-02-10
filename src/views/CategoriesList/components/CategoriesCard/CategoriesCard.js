import React, {useState, useEffect} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Skeleton from  '@material-ui/lab/Skeleton';

import CustomizedSnackbar from '../../../../components/Snackbar';
import {baseURL} from '../../../../services/api';
import api from '../../../../services/api';
import Moment from 'react-moment';
import 'moment-timezone';
import 'moment/locale/pt-br';


Moment.globalLocale = 'pt-br';


const useStyles = makeStyles({
  card: {
    maxWidth: 280,
    minWidth: 280,
  },
  button: {
    color: '#333',
  }
});

const token = localStorage.getItem('token');
const CategoriesCard = () => {

  const classes = useStyles();
  const [categories, setCategories] = useState([]);
  const [snack, setSnack] = useState({
    open: false,
    message: '',
    severity: ''
  });
  useEffect(() => {
    getCategories();
  }, []);

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
        console.log(response);
        setSnack(snack => ({
          ...snack,
          open: true,
          message: 'Ocorreu algum erro inesperado, tente novamente',
          severity: 'error'
        }));
      }
  }

  const handleSnackBarClose = () => {
    setSnack( snack => ({
      ...snack,
      open: false,
    }));
  }


  const calendarString = {
    lastDay: '[ontem às] LT',
    sameDay: '[hoje às] LT',
    nextDay: '[amanhã às] LT',
    lastweek: '[última] dddd [às] LT',
    nextWeek: 'dddd [às] LT',
    sameElse: 'L'
  }

  return (
    <>
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
              <Card className={classes.card}>
    
                <CardActionArea>
                  {categories ? (
                    <CardMedia
                      alt="Contemplative Reptile"
                      component="img"
                      height="200"
                      image= {`${baseURL}/files/${category.image}`}
                      width="200"
                    />) : (
                    <Skeleton
                      height={200}
                      variant="rect"
                      width={200}
                    />
                  )}
                  <CardContent>
                    {categories ? (
                      <Typography
                        component="h2"
                        gutterBottom
                        variant="h5"
                      >
                        {category.name}
                      </Typography>) : (
                      <Skeleton />
                    )}
                    {categories ? (
                      <Typography
                        color="textSecondary"
                        component="p"
                        variant="body2"
                      >
                        {'Incluído  '}
                        <Moment
                          calendar={calendarString}
                          local
                        >{category.updatedAt}</Moment>
                      </Typography>) : (
                      <Skeleton />
                    )}
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button
                    className={classes.button}
                    size="small"
                  >
                  Editar
                  </Button>
                  <Button
                    color="primary"
                    onClick={() => {handleDelete(category.id)}}
                    size="small"
                  >
                  Excluir
                  </Button>
   
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
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
    </>
  );
};

export default CategoriesCard;
