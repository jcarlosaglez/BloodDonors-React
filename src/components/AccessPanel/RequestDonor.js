import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

//Components
import DonorsList from './DonorsList';
//CSS
import "../../css/AccessPanel/RequestDonor.css";
//Data
import Hospital from '../../assets/data/HospitalCdMx';

const useStyles = makeStyles((theme) => ({
    formControl: {
    margin: theme.spacing(1),
    minWidth: 250,
    },
}));
const RequestDonor = () => {    
    const classes = useStyles();
    
    return (
		<div className="RequestDonor">
            <div className="formRequestDonor">
                <form >
                    <Grid container spacing={3}>
                        {/* <FormControl className={classes.formControl}>
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
                        </FormControl> */}
                        <Grid item xs={12} md={4}>
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="Ciudad">Ciudad</InputLabel>
                                    <Select defaultValue="" id="Ciudad">
                                        <MenuItem value="">
                                            <em>No  importa</em>
                                        </MenuItem>
                                        <MenuItem value={"Cd-Mx"}>Ciudad de México</MenuItem>
                                    </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="place_of_residence">Hospital</InputLabel>
                                <Select
                                    id="place_of_residence"
                                    name="place_of_residence"
                                    defaultValue=""
                                    label="Hospital"
                                >
                                    {
                                        Hospital.map( hos => 
                                            <MenuItem value={hos.clave}>{hos.name}</MenuItem>
                                        )
                                    }
                                    
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4} >
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
                        </Grid>
                        <Button variant="contained" color="secondary">
                            Solicitar
                        </Button>
                    </Grid>
                </form> 
            </div>
			<DonorsList />
		</div>
    );
}
export default RequestDonor;
