import React, { Component } from 'react';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import { strings } from '../Localization/Localization';

class DialogeBox extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: true,
      error: {
        errorMessage: props.route.params.error
      }
    }
  }

  showDialog = async () => {
    await this.setState({
      visible: true
    })
  }

  hideDialog = async () => {
    await this.setState({
      visible: false
    })
  }

  render() {
    const { navigation } = this.props;
    return (
      <Portal>
        <Dialog visible={this.state.visible} onDismiss={this.hideDialog}>
          <Dialog.Title>{strings.error}</Dialog.Title>
          <Dialog.Content>
            <Paragraph>{this.state.error.errorMessage}</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>{strings.done}</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  };
}

export default DialogeBox;