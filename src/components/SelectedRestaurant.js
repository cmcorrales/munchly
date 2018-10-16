import React from 'react';
import { connect } from 'react-redux';
import { Segment, Rating, Button, Icon, Label } from 'semantic-ui-react';
import { addReview } from '../actions/restaurants';
import NavigationBar from './NavigationBar'
import axios from 'axios';

class SelectedRestaurant extends React.Component {
  state = {
    dishes: [],
    rating: '',
    dishId: ''
  }

  componentDidMount() {
    const menusArray = this.props.selectedRestaurant.selectedRestaurant.menus[0]
    const currentMenu = menusArray ? menusArray.dishes.map(dish => dish) : "There are no menus to display"
    this.setState({
      dishes: currentMenu
    })
  }

  handleRate = (e, {rating}) => {
    this.setState({
      rating: rating
    })
  }

  getDish = (dishId) => {
    this.setState({
      dishId: dishId
    })
  }

  render() {
    console.log(this.props.review)
    // console.log(this.props.selectedRestaurant.selectedRestaurant.menus[0].dishes.map(dish => dish.name))
    return (
      <React.Fragment>
        <NavigationBar />
        <div className="menuItems">
          <h1 className="heading">{this.props.selectedRestaurant.selectedRestaurant.name}</h1>
          {this.state.dishes.map(dish => {
            return <Segment color='red' raised>{dish.name}<br/>
                <Rating icon='star' defaultRating={0} maxRating={4} size='massive' onRate={this.handleRate} onClick={() => this.getDish(this.props.review)}/><br/>
                <Button color='red'>view feedback </Button><Button color='blue'>give feedback </Button>

              </Segment>
          })}
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    selectedRestaurant: state.selectedRestaurant,
    review: {
      rating: state.rating,
      dish_id: state.dishId
    }
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAddReview: ( review ) => {
      dispatch(addReview( review ));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectedRestaurant)