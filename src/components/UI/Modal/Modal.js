import React, { Component } from 'react';
import classes from './Modal.module.css'
import Backdrop from '../Backdrop/Backdrop'
import Aux from '../../../hoc/Aux'
import CloseButton from '../Button/CloseButton/CloseButton'
import PropTypes from 'prop-types'
import FocusTrap from 'focus-trap-react'

class Modal extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.show !== this.props.show || this.props.children !== nextProps.children
    }

    render() {
        return (

            <Aux>
                <Backdrop show={this.props.show} style={this.props.style} clicked={() => this.props.updateModal(0)} />
                <FocusTrap active={this.props.show} focusTrapOptions={{clickOutsideDeactivates: true}}>
                    <div className={classes.modal} style={{ ...this.props.style, transform: (this.props.show === 0) ? "translateY(-100vh)" : "translateY(0)" }}>
                        <div className={classes.closeButton}>
                            <CloseButton clicked={() => this.props.updateModal(0)} label="Close modal" title="Close modal" />
                        </div>
                        {this.props.children}
                    </div>
                </FocusTrap>
            </Aux >

        )
    }
}

Modal.propTypes = {
    show: PropTypes.number.isRequired,
    style: PropTypes.object,
}

export default Modal;
