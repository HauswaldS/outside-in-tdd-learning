import TextField from '@material-ui/core/TextField';
import {Button} from '@material-ui/core';
import {useState} from 'react';
import {createRestaurant} from '../store/restaurants/actions';
import {connect} from 'react-redux';
import Alert from '@material-ui/lab/Alert';

export const NewRestaurantForm = ({createRestaurant}) => {
  const [name, setName] = useState('');
  const [validationError, setValidationError] = useState(false);
  const [serverError, setServerError] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();

    if (!name) {
      setValidationError(true);
    } else {
      setValidationError(false);
      createRestaurant(name)
        .then(() => {
          setServerError(false);
          setName('');
        })
        .catch(() => setServerError(true));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {serverError && (
        <Alert severity="error">
          The restaurant could not be saved. Please try again
        </Alert>
      )}
      {validationError && <Alert severity="error">Name is required</Alert>}
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

const mapStateToProps = null;
const mapDispatchToProps = {createRestaurant};

export default connect(mapStateToProps, mapDispatchToProps)(NewRestaurantForm);
