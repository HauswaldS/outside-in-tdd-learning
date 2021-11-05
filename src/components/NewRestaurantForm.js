import TextField from '@material-ui/core/TextField';
import {Button} from '@material-ui/core';
import {useState} from 'react';

export const NewRestaurantForm = ({createRestaurant}) => {
  const [name, setName] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    createRestaurant(name);
  };
  return (
    <form onSubmit={handleSubmit}>
      <TextField
        placeholder="Add Restaurant"
        value={name}
        onChange={e => setName(e.target.value)}
        fullWidth
        variant="filled"
      />
      <Button
        type="submit"
        data-testid="new-restaurant-submit-button"
        variant="contained"
        color="primary"
      >
        Add
      </Button>
    </form>
  );
};

export default NewRestaurantForm;
