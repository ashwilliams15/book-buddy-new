import React from 'react';
import { connect } from 'react-redux';
import { addItem, fetchItems } from '../store/pantry';

class Pantry extends React.Component {
  constructor() {
    super()
    this.state = {
      itemName: ''
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.bake = this.bake.bind(this);
  }

  componentDidMount() {
    this.props.fetchItems()
  }

  bake() {
    const eggsArr = this.props.items.filter((item) => item.itemName === 'eggs');
    const flourArr = this.props.items.filter((item) => item.itemName === 'flour');
    const milkArr = this.props.items.filter((item) => item.itemName === 'milk');

    if (eggsArr.length > 0 && flourArr.length > 0 && milkArr.length > 0) {
      window.alert('Let\'s bake!')
    }
  }

  handleChange(evt) {
    this.setState({
      itemName: evt.target.value
    })
  }

  async handleSubmit(evt) {
    evt.preventDefault();
    await this.props.addItem({...this.state})
    this.setState({
      itemName: ''
    })
    this.bake();
  }

  render() {
    return (
      <div>
        <div>
          <p>Try to add the correct ingredients to your pantry.</p>
          <p>If you have the right stuff, you will get an alert to start baking!</p>
          <h1>Current Pantry Items</h1>
        </div>
        <ul>
          {this.props.items.map((item) => {
            return (
              <li key={item.id}>
                {item.itemName}
              </li>
            )
          })}
        </ul>
        <h3>Buy Ingredient</h3>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor='itemName'>Ingredient</label>
          <input name='itemName' onChange={this.handleChange} value={this.state.itemName} />
          <button type='submit'>Purchase</button>
        </form>
      </div>
    )
  }
}

const mapState = (state) => {
  // console.log(state)
  return {
    items: state.pantry
  }
}

const mapDispatch = (dispatch) => {
  return {
    addItem: (item) => dispatch(addItem(item)),
    fetchItems: () => dispatch(fetchItems())
  }
}

export default connect(mapState, mapDispatch)(Pantry);
