import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});
const cardStyle = {
  margin: "20px 10px"
}
function CardHero(props) {
    const classes = useStyles();

    return (
      <Card className={classes.root} style={cardStyle}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image={props.data.url}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
                {props.data.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
                {props.data.text}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Learn More
          </Button>
        </CardActions>
      </Card>
    );
}
CardHero.prototype = {
  data: PropTypes.array.isRequired
}
export default CardHero;