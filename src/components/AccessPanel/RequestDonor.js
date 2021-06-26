import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
//Components
import DonorsList from './DonorsList';
//CSS
import "../../css/AccessPanel/RequestDonor.css";

const useStyles = makeStyles((theme) => ({
    formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    },
}));
const RequestDonor = () => {    
    const classes = useStyles();
    
    return (
		<div className="RequestDonor">
            <div className="formRequestDonor">
                <form >
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="grouped-native-select">Estado</InputLabel>
                        <Select native defaultValue="" id="grouped-native-select">
                            <option aria-label="None" value="" />
                            <option value="no">Seleccione uno...</option>
                            <option value="Aguascalientes">Aguascalientes</option>
                            <option value="Baja California">Baja California</option>
                            <option value="Baja California Sur">Baja California Sur</option>
                            <option value="Campeche">Campeche</option>
                            <option value="Chiapas">Chiapas</option>
                            <option value="Chihuahua">Chihuahua</option>
                            <option value="CDMX">Ciudad de México</option>
                            <option value="Coahuila">Coahuila</option>
                            <option value="Colima">Colima</option>
                            <option value="Durango">Durango</option>
                            <option value="Estado de México">Estado de México</option>
                            <option value="Guanajuato">Guanajuato</option>
                            <option value="Guerrero">Guerrero</option>
                            <option value="Hidalgo">Hidalgo</option>
                            <option value="Jalisco">Jalisco</option>
                            <option value="Michoacán">Michoacán</option>
                            <option value="Morelos">Morelos</option>
                            <option value="Nayarit">Nayarit</option>
                            <option value="Nuevo León">Nuevo León</option>
                            <option value="Oaxaca">Oaxaca</option>
                            <option value="Puebla">Puebla</option>
                            <option value="Querétaro">Querétaro</option>
                            <option value="Quintana Roo">Quintana Roo</option>
                            <option value="San Luis Potosí">San Luis Potosí</option>
                            <option value="Sinaloa">Sinaloa</option>
                            <option value="Sonora">Sonora</option>
                            <option value="Tabasco">Tabasco</option>
                            <option value="Tamaulipas">Tamaulipas</option>
                            <option value="Tlaxcala">Tlaxcala</option>
                            <option value="Veracruz">Veracruz</option>
                            <option value="Yucatán">Yucatán</option>
                            <option value="Zacatecas">Zacatecas</option>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="grouped-native-select">Ciudad</InputLabel>
                        <Select native defaultValue="" id="grouped-native-select">
                        <option aria-label="None" value="" />
                        <optgroup label="Category 1">
                            <option value={1}>Option r</option>
                            <option value={2}>Option 2</option>
                        </optgroup>
                        <optgroup label="Category 2">
                            <option value={3}>Option 3</option>
                            <option value={4}>Option 4</option>
                        </optgroup>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="grouped-hospital">Hospital</InputLabel>
                        <Select defaultValue="" id="grouped-hospital">
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <ListSubheader>Category 1</ListSubheader>
                        <MenuItem value={1}>Option 1</MenuItem>
                        <MenuItem value={2}>Option 2</MenuItem>
                        <ListSubheader>Category 2</ListSubheader>
                        <MenuItem value={3}>Option 3</MenuItem>
                        <MenuItem value={4}>Option 4</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                        <InputLabel htmlFor="grouped-blood">Tipo de sangre</InputLabel>
                        <Select defaultValue="" id="grouped-blood">
                        <MenuItem value="">
                            <em>No  importa</em>
                        </MenuItem>
                        <MenuItem value={"A"}>A</MenuItem>
                        <MenuItem value={"B"}>B</MenuItem>
                        <MenuItem value={"AB"}>AB</MenuItem>
                        <MenuItem value={"O"}>O</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="contained" color="secondary">
                        Solicitar
                    </Button>
                </form> 
            </div>
			<DonorsList />
		</div>
    );
}
export default RequestDonor;
