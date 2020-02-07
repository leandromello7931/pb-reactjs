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
const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  backgroundColor: {
    backgroundColor: '#3ff',
  }
});

const CategoriesCard = ({ loading=false, item}) => {
  const classes = useStyles();
  return (
    
    <Card className={classes.root}>
      <img src={URL.createObjectURL(new Blob([item.image.data], {'type': 'image/png'}))} />

      <CardActionArea>
        {item ? (<CardMedia
          alt="Contemplative Reptile"
          component="img"d
          height="130"
          title="Contemplative Reptile"
          width="320"
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
