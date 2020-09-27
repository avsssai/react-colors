import React, { Component } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { ChromePicker } from "react-color";
import DragableColorList from "./DragableColorList";
import { withStyles } from "@material-ui/core/styles";
import PaletteFormNav from "./PaletteFormNav";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import { arrayMove } from "react-sortable-hoc";
import { Divider } from "@material-ui/core";

const styles = {};
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
  }
  handleChange(e) {
    this.setState({
      colorInput: e.target.change,
    });
  }
  render() {
    const { colorInput } = this.state;
    return (
      <div>
        <Typography variant="h4">Design your palette</Typography>

        <ChromePicker
          color={this.state.rgb}
          onChangeComplete={this.handleChange}
        />
        <ValidatorForm
          onSubmit={this.handleSubmit}
          onError={(error) => console.log(error)}
          ref="form"
        >
          <TextValidator
            label="New Color"
            onChange={this.handleInputChange}
            validators={["required", "isColorNameUnique", "isColorUnique"]}
            value={colorInput}
            name="colorInput"
            errorMessages={[
              "Every color needs a name!",
              "This color name already exists.",
              "This color already exists.",
            ]}
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
          >
            {paletteFullConditon ? "Palette Full" : "Add Color"}
          </Button>
        </ValidatorForm>
      </div>
    );
  }
}

export default withStyles(styles)(ColorPickerForm);
