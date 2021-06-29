import {React, useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';

//Components
import DonorCard from "./DonorCard";

//CSS
import "../../css/AccessPanel/RequestDonor.css";
import "../../css/DonorsList.css";
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

    const [data, setData] = useState({        
        "place_of_residence": "",
        "blood_type": ""
    });
    const [donors, setDonors] = useState([]);

    const handleInputChange = (event) => {
        setData({
            ...data,
            [event.target.name] : event.target.value.trim()
        })
    }
    const sendData = (event) =>{
        event.preventDefault();
        console.log(data)
        if(event.target.blood_type.value !== "" && event.target.place_of_residence.value !== ""){
            const getData = async () =>
            {
                try {
                    const url = `https://blood-donors-v1.herokuapp.com/v1/donors`;
                    const response = await fetch(url, {
                        method: "GET",
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    });
                    const dataServ = await response.json();
                    const resp = await dataServ.filter((dat) => dat.blood_type === data.blood_type);
                    setDonors(resp);
                }
                catch(e) {
                    console.error(e);
                }
            }
            getData();
        }
        console.log(data);
    }
    return (
		<div className="RequestDonor">
            <div className="formRequestDonor">
                <form onSubmit={sendData}>
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
                                            <em> Seleccionar</em>
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
                                    value={data.place_of_residence}
                                    label="Hospital"
                                    onChange={handleInputChange}
                                >
                                    {
                                        Hospital.map( hos => 
                                            <MenuItem value={hos.clave} key={hos.clave}>{hos.name}</MenuItem>
                                        )
                                    }
                                    
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4} >
                            <FormControl className={classes.formControl}>
                                <InputLabel htmlFor="blood_type">Tipo de sangre</InputLabel>
                                <Select 
                                    id="blood_type"
                                    name="blood_type"
                                    value={data.blood_type}
                                    label="Grupo sanguíneo"
                                    onChange={handleInputChange}
                                >
                                    <MenuItem value="">
                                        <em>No  importa</em>
                                    </MenuItem>
                                    <MenuItem value={"A+"}>A+</MenuItem>
                                    <MenuItem value={"B+"}>B+</MenuItem>
                                    <MenuItem value={"AB+"}>AB+</MenuItem>
                                    <MenuItem value={"O+"}>O+</MenuItem>  
                                    <MenuItem value={"A-"}>A-</MenuItem>
                                    <MenuItem value={"B-"}>B-</MenuItem>
                                    <MenuItem value={"AB-"}>AB-</MenuItem>
                                    <MenuItem value={"O-"}>O-</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <button variant="contained" color="secondary">
                            Solicitar
                        </button>
                    </Grid>
                </form> 
            </div>
            <div className="list-container">
                <h1>Lista de donadores </h1>
                    {donors.map(donor => <DonorCard key={donor.id} donor={donor} />)}
            </div>
		</div>
    );
}
export default RequestDonor;
