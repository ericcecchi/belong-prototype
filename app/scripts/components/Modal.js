import React from 'react';
import Dialog from 'material-ui/Dialog';
import Button from './Button';

/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
export default class Modal extends React.Component {
    render() {
        const actions = [
            <Button
                label="Done"
                primary={true}
                onTouchTap={this.props.handleClose}
            />
        ];

        return (
            <Dialog
                {...this.props}
                actions={actions}
                modal={true}
                onRequestClose={this.props.handleClose}
            />
        );
    }
}
