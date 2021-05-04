import React from 'react';
import Container from '@material-ui/core/Container';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 220,
  },
}));

function Request(props) {
  const classes = useStyles();
  const [group, setGroup] = React.useState({
      type:"",
      RH:""
  })
  const handleInputChange = (event) => {
    setGroup({
        ...group,
        [event.target.name] : event.target.value
        })
    }
    const sendData = (event) => {
        event.preventDefault();
        const todo = group.type + group.RH;
        console.log(todo)
        if(group.type !== "") {
            props.setData(todo)
            console.log(props.data)
        }
    }
  return (
    <Container>
        <FormControl className={classes.formControl}>
            <InputLabel htmlFor="grouped-native-select">Grupo sanguineo</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={handleInputChange}
            >
            <MenuItem value={"AB"}>O</MenuItem>
            <MenuItem value={"A"}>A</MenuItem>
            <MenuItem value={"B"}>B</MenuItem>
            <MenuItem value={"AB"}>AB</MenuItem>
            </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
            <InputLabel htmlFor="grouped-select">RH</InputLabel>
            <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            onChange={handleInputChange}
            >
            <MenuItem value={"+"}>+</MenuItem>
            <MenuItem value={"-"}>-</MenuItem>
            </Select>
        </FormControl>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={sendData}
            >
                Buscar
            </Button>
    </Container>
  );
}
export default Request;