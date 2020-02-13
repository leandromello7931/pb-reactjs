import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Skeleton from  '@material-ui/lab/Skeleton';
import {baseURL} from '../../../../services/api';
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


const CategoriesCard = ({ category, handleDelete }) => {

  const classes = useStyles();
  

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
      
      <Card className={classes.card}>
    
        <CardActionArea>
          {category ? (
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
            {category ? (
              <Typography
                component="h2"
                gutterBottom
                variant="h5"
              >
                {category.name}
              </Typography>) : (
              <Skeleton />
            )}
            {category ? (
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

      
    </>
  );
};

export default CategoriesCard;
