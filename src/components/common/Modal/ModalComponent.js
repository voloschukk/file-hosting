import './ModalComponent.css';
import React, { Component } from 'react'

export default class ModalComponent extends Component {
    render() {

        let hiddenClass = this.props.isVisible ? "": "-hidden";

        return (
            <>
                <div className={"modal" + hiddenClass}>
                    <div className="container modal-content" >
                        {this.props.isVisible && this.props.children}
                    </div>
                </div>
            </>
        )
    }
}
