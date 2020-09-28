import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Picker } from "emoji-mart";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import "emoji-mart/css/emoji-mart.css";

class PaletteMetaForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paletteNameInput: "",
      stage: "form",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.savePalette = this.savePalette.bind(this);
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.showEmoji = this.showEmoji.bind(this);
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
  savePalette(emoji) {
    let newPalette = {
      paletteName: this.state.paletteNameInput,
      emoji: emoji.native,
    };
    this.props.savePalette(newPalette);
    console.log(newPalette);
    this.props.handleClose();
  }
  showEmoji() {
    this.setState({
      stage: "emoji",
    });
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
    const { paletteNameInput, stage } = this.state;
    return (
      <div>
        <Dialog
          open={this.state.stage === "emoji"}
          onClose={this.props.handleClose}
        >
          <DialogTitle id="form-dialog-title">Pick an emoji!</DialogTitle>
          <Picker onSelect={this.savePalette} title="Pick your emoji…" />
          <Button onClick={this.props.handleClose} color="primary">
            Cancel
          </Button>
        </Dialog>
        <Dialog
          open={this.state.stage === "form"}
          onClose={this.props.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">
            Choose a palette name.
          </DialogTitle>
          <ValidatorForm
            // onSubmit={this.savePalette}
            onSubmit={this.showEmoji}
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
              <Button onClick={this.props.handleClose} color="secondary">
                Cancel
              </Button>
              <Button type="submit" color="primary">
                Next
              </Button>
            </DialogActions>
          </ValidatorForm>
        </Dialog>
      </div>
    );
  }
}

export default PaletteMetaForm;
