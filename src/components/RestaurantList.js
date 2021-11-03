import {useEffect} from 'react';
import {connect} from 'react-redux';
import {loadRestaurants} from '../store/restaurants/actions';
import {List, ListItem, ListItemText} from '@material-ui/core';

export const RestaurantList = ({loadRestaurants, restaurants}) => {
  useEffect(() => {
    loadRestaurants();
  }, [loadRestaurants]);

  return (
    <List>
      {restaurants.map(restaurant => (
        <ListItem key={restaurant.id}>
          <ListItemText>{restaurant.name}</ListItemText>
        </ListItem>
      ))}
    </List>
  );
};
const mapDispatchToProps = {loadRestaurants};
const mapStateToProps = state => ({
  restaurants: state.restaurants.records,
});

export default connect(mapStateToProps, mapDispatchToProps)(RestaurantList);
