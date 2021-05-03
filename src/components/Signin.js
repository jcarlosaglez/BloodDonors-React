import React, {useState} from 'react';

import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline"
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Link from '@material-ui/core/Link';

import "../css/Form.css";
// import InputOfText from "./InputOfText";

const URL = "https://blood-donors-v1.herokuapp.com/v1/receivers/"
function Signin() {
    const [data, setData] = React.useState({});
    const [datos, setDatos] = useState({        
        "curp": "",
        "first_name": "",
        "last_name": "",
        "birthday": "",
        "gender": "",
        "email": "",
        "phone_number": "",
        "place_of_residence": "",
        "password":""        
    })
    const [birthday, setBirthday] = React.useState(new Date());
    const[showPassword, setShowPassword] = React.useState(false);
    const [errors, setErrors] = React.useState({
    });
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
    }
    const handleDateChange = (date) => {
        setBirthday(`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`);
    };
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    React.useEffect(()=> {
        const defaultDate = new Date(2000, 0, 1);
        setBirthday(`${defaultDate.getFullYear()}-${defaultDate.getMonth()+1}-${defaultDate.getDate()}`);
    }, [])

    React.useEffect(() => {
        datos.birthday = birthday;
    }, [birthday])

    const goToBackend = (config, data) => {
        return fetch(config.url, {
          method: config.method,
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(data)
        })
    }
    
    const enviarDatos = async (event) => {
        event.preventDefault()

        //Servidor
        const config ={
            url: URL,
            method: "POST"
        };
        try {
            const response = await goToBackend(config, data);
            if (!response.ok) /* throw new Error("Response not ok", response); */console.log(response);
            const todo = await response.json();
            setData(todo);
            console.log("data", data, datos, response);
        } catch (error) {
            console.error(error);
        }
    }

    const useStyles = makeStyles((theme) => ({
        paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        form: {
            width: '100%', // Fix IE 11 issue.
            marginTop: theme.spacing(3),
        },
        submit: {
            margin: theme.spacing(3, 0, 2),
        },
        verticalAlign: {
            alignSelf: "center",
        }
    }));

    const classes = useStyles();

    return (
        <>
            <Container component="main" maxWidth="sm">
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Registro de receptor
                    </Typography>
                    <form 
                        className={classes.form}
                        onSubmit={enviarDatos}
                    >
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="curp"
                                    name="curp"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="curp"
                                    label="CURP"
                                    autoFocus
                                    error={!!errors.curp}
                                    helperText={errors.curp}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item md={6} xs={12}>
                                <TextField
                                    autoComplete="first_name"
                                    name="first_name"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="first_name"
                                    label="Nombre(s)"
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item md={6} xs={12}>
                                <TextField
                                    autoComplete="last_name"
                                    name="last_name"
                                    variant="outlined"
                                    fullWidth
                                    id="last_name"
                                    label="Apellidos"
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid className={classes.verticalAlign} item md={6} xs={12}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        required
                                        fullWidth
                                        variant="inline"
                                        name="birthday"
                                        format="dd/MM/yyyy"
                                        margin="normal"
                                        id="birthday"
                                        label="Fecha de nacimiento:"
                                        value={birthday}
                                        onChange={handleDateChange}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>

                            <Grid item md={6} xs={12}>
                                <FormControl
                                    required
                                    component="fieldset"
                                >
                                    <FormLabel component="legend">Genero</FormLabel>
                                    <RadioGroup
                                        name="gender"
                                        onChange={handleInputChange}
                                    >
                                        <FormControlLabel
                                            value="female"
                                            control={<Radio />}
                                            label="Mujer" /
                                        >
                                        <FormControlLabel
                                            value="male"
                                            control={<Radio />}
                                            label="Hombre" /
                                        >
                                        <FormControlLabel
                                            value="non-binary"
                                            control={<Radio />}
                                            label="No Binario" /
                                        >
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                            
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="email"
                                    name="email"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Correo"
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl required fullWidth variant="outlined">
                                    <InputLabel htmlFor="password">Contraseña</InputLabel>
                                    <OutlinedInput
                                        autoComplete="password"
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={datos.password}
                                        onChange={handleInputChange}
                                        endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                // onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                        }
                                        labelWidth={83}
                                    />
                                </FormControl>
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="phone_number"
                                    name="phone_number"
                                    variant="outlined"
                                    fullWidth
                                    id="phone_number"
                                    label="Telefono:"
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="place_of_residence"
                                    name="place_of_residence"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="place_of_residence"
                                    label="Lugar de residencia"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Registrarme
                        </Button>
                        <Grid container alignItems="flex-end" direction="column">
                            <Grid item>
                                <Link href="#" variant="body1">
                                    Registrate como Donador
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="#" variant="body1">
                                    ¿Ya tienes una cuenta? Inicia sesión aquí
                                </Link>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Container>
        </>
    );
}


export default Signin;