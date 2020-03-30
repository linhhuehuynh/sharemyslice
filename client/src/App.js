import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/itemModal';
import Intro from './components/Intro';
import { Container } from 'reactstrap';
import { loadUser } from './actions/authActions';

import { Provider } from 'react-redux';
import store from './store';

class App extends Component {
  componentDidMount() {

    //dispatch trigger a state change
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container>
            <Intro />
            <ItemModal />
            <ShoppingList />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
