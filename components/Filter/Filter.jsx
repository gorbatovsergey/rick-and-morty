import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Filter = ({
  inputLabelName,
  selectName,
  id,
  selectValue,
  addFiltres,
  children,
}) => (
  <Box sx={{ width: 250, marginBottom: 2 }}>
    <FormControl fullWidth>
      <InputLabel id={id}>{inputLabelName}</InputLabel>
      <Select
        labelId={id}
        id={id}
        value={selectValue}
        label={inputLabelName}
        onChange={addFiltres}
        name={selectName}
      >
        {children}
      </Select>
    </FormControl>
  </Box>
);

export default Filter;
