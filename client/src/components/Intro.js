import React, { Component } from 'react';
import {
    Jumbotron, Container
} from 'reactstrap';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemActions';
import PropTypes from 'prop-types';

class Intro extends Component {
    static propTypes = {
        getItems: PropTypes.func.isRequired,
        item: PropTypes.object.isRequired,
        isAuthenticated: PropTypes.bool
    };

    componentDidMount() {
        this.props.getItems();
    }


    render() {
        const { items } = this.props.item;
        return (
            <Jumbotron fluid>
                <Container fluid>
                    <h3 className="display-4">Welcome to ShareMySlice!</h3>
                    <p className="lead">Are you trying to get rid of something or looking for an item? Post it here to exchange with your neighbor!</p>
                </Container>
            </Jumbotron>

        );
    }
}


const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { getItems, deleteItem })(Intro);