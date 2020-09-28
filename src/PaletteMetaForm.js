import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class PaletteMetaForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paletteNameInput: "",
      open: true,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.savePalette = this.savePalette.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }
  componentDidMount() {
    ValidatorForm.addValidationRule("isPaletteNameUnique", (value) => {
      if (
        this.props.palettes.every(
          (palette) => palette.paletteName.toLowerCase() !== value.toLowerCase()
        )
      ) {
        return true;
      }
      return false;
    });
  }
  handleInputChange(e) {
    this.setState({
      paletteNameInput: e.target.value,
    });
  }
  savePalette() {
    this.props.savePalette(this.state.paletteNameInput);
    this.props.handleClose();
  }
  handleClickOpen() {
    this.setState({
      open: true,
    });
  }
  handleClose() {
    this.setState({
      open: false,
    });
  }
  render() {
    // const {  } = this.props;
    const { paletteNameInput, open } = this.state;
    return (
      <Dialog
        open={open}
        onClose={this.props.handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Choose a palette name.</DialogTitle>
        <ValidatorForm
          onSubmit={this.savePalette}
          onError={(error) => console.log(error)}
          ref="form"
          autoFocus
        >
          <DialogContent>
            <DialogContentText>
              Please enter the name of palette you want to save.
            </DialogContentText>
            <TextValidator
              label="Palette Name"
              onChange={this.handleInputChange}
              validators={["required", "isPaletteNameUnique"]}
              value={paletteNameInput}
              name="paletteNameInput"
              fullWidth
              margin="normal"
              errorMessages={[
                "Every Palette needs a name!",
                "This palette name already exists.",
              ]}
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit" color="secondary">
              Save Palette
            </Button>
            <Button onClick={this.props.handleClose} color="primary">
              Cancel
            </Button>
          </DialogActions>
        </ValidatorForm>
      </Dialog>
    );
  }
}

export default PaletteMetaForm;
