import React from 'react';
import TextField from "@material-ui/core/TextField";
import {ReplaceSpaceToT} from "../../../utils/Time";

interface SelectDateTimeProps {
  handleChange: (event: React.ChangeEvent<{ name?: string; value: unknown }>) => void;
  name: string;
  label: string;
  value: string;
}

const SelectDateTime: React.FC<SelectDateTimeProps> = (props) => {
  return <>
    <TextField
      id={props.name}
      label={props.label}
      name={props.name}
      type="datetime-local"
      defaultValue={ReplaceSpaceToT(props.value)}
      margin="normal"
      variant="outlined"
      onChange={props.handleChange}
    />
  </>;
};

export default SelectDateTime;
