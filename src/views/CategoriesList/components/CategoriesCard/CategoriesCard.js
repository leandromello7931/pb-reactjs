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
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  }
});

const CategoriesCard = ({ loading=false, item}) => {
  const classes = useStyles();
  return (
    
    <Card className={classes.root}>
    
      <CardActionArea>
        {item ? (<CardMedia
          alt="Contemplative Reptile"
          component="img"
          height="200"
          image= {`${baseURL}/files/${item.image}`}

          width="240"
        />) : (
          <Skeleton
            height={200}
            variant="rect"
            width={200}
          />
        )}
        <CardContent>
          {item ? (<Typography
            component="h2"
            gutterBottom
            variant="h5"
          >
            {item.name}
          </Typography>) : (
            <Skeleton />
          )}
          
        </CardContent>
      </CardActionArea>
      <CardActions>
        {item ? (<Button
          color={classes.color}
          size="small"
        >
          Editar
        </Button>) : 
          (<Skeleton width={50} />)}
        {item ? (<Button
          color="primary"
          size="small"
        >
          Excluir
        </Button>) : 
          (<Skeleton width={70} />)}
      </CardActions>
    </Card>
  );
};

export default CategoriesCard;
