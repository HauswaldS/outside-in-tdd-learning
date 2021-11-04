import {render} from '@testing-library/react';
import {RestaurantList} from '../RestaurantList';

describe('RestaurantList', () => {
  const restaurants = [
    {id: 1, name: 'Sushi Place'},
    {id: 2, name: 'Pizza Place'},
  ];

  let loadRestaurants;
  let context;

  const renderWithProps = (propsOverrides = {}) => {
    const props = {
      loadRestaurants: jest.fn().mockName('loadRestaurants'),
      restaurants,
      loading: false,
      ...propsOverrides,
    };
    loadRestaurants = props.loadRestaurants;

    context = render(<RestaurantList {...props} />);
  };
  it('loads restaurants on first render', () => {
    renderWithProps();
    expect(loadRestaurants).toHaveBeenCalled();
  });
  it('display the loading indcator while loading', () => {
    renderWithProps({loading: true});
    const {queryByTestId} = context;
    expect(queryByTestId('loading-indicator')).not.toBeNull();
  });

  describe('when loading successed', () => {
    beforeEach(() => {
      renderWithProps();
    });

    it('displays the restaurants', () => {
      const {queryByText} = context;
      expect(queryByText('Sushi Place')).not.toBeNull();
      expect(queryByText('Pizza Place')).not.toBeNull();
    });

    it('does not display the loading indcator while not loading', () => {
      renderWithProps();
      const {queryByTestId} = context;
      expect(queryByTestId('loading-indicator')).toBeNull();
    });
  });

  describe('when loading failed', () => {
    it('display the error message', () => {
      renderWithProps({loadError: true});
      const {queryByText} = context;
      expect(queryByText('Restaurant could not be loaded')).not.toBeNull();
    });
  });
});
