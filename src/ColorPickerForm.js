import React, { Component } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { ChromePicker } from "react-color";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const styles = {
  picker: {
    width: "100% !important",
    marginTop: "2rem",
  },
  pickerForm: {
    width: "100% !important",
  },
  addColor: {
    width: "100%",
    padding: "1rem",
    marginTop: "1rem",
    fontSize: "1.5rem",
  },
  newColorForm: {
    width: "100%",
    fontSize: "1.5rem",
    marginTop: "1rem",
  },
};
class ColorPickerForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hex: "#712626",
      hsl: { h: 0, s: 0.49499177754522344, l: 0.29592136, a: 1 },
      hsv: { h: 0, s: 0.6621999999999999, v: 0.4424, a: 1 },
      oldHue: 0,
      rgb: { r: 113, g: 38, b: 38, a: 1 },
      colorInput: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount() {
    ValidatorForm.addValidationRule("isColorNameUnique", (value) => {
      if (
        this.props.colors.some(
          (color) => color.name.toLowerCase() === value.toLowerCase()
        )
      ) {
        return false;
      }
      return true;
    });

    ValidatorForm.addValidationRule("isColorUnique", (value) => {
      if (this.props.colors.some((color) => color.color === this.state.hex)) {
        return false;
      }
      return true;
    });
  }
  handleChange(color, event) {
    this.setState({
      hex: color.hex,
      rgb: color.rgb,
    });
  }

  handleInputChange(e) {
    this.setState({
      colorInput: e.target.value,
    });
  }
  handleSubmit() {
    let newColor = {
      name: this.state.colorInput,
      color: this.state.hex,
    };
    this.setState({
      colorInput: "",
    });
    this.props.addNewColor(newColor);
  }
  render() {
    const { colorInput } = this.state;
    const { classes, paletteFullConditon } = this.props;

    return (
      <div className={classes.pickerForm}>
        <ChromePicker
          color={this.state.rgb}
          onChangeComplete={this.handleChange}
          className={classes.picker}
        />
        <ValidatorForm
          onSubmit={() => this.handleSubmit(colorInput)}
          onError={(error) => console.log(error)}
          ref="form"
        >
          <TextValidator
            label="Color Name"
            onChange={this.handleInputChange}
            validators={["required", "isColorNameUnique", "isColorUnique"]}
            value={colorInput}
            name="colorInput"
            errorMessages={[
              "Every color needs a name!",
              "This color name already exists.",
              "This color already exists.",
            ]}
            className={classes.newColorForm}
            variant="filled"
            margin="normal"
          />

          <Button
            variant="contained"
            color="primary"
            size="large"
            style={{
              backgroundColor: paletteFullConditon
                ? "grey"
                : `${this.state.hex}`,
            }}
            // onClick={this.addNewColor}
            disabled={paletteFullConditon}
            type="submit"
            className={classes.addColor}
          >
            {paletteFullConditon ? "Palette Full" : "Add Color"}
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}

export default withStyles(styles)(ColorPickerForm);
