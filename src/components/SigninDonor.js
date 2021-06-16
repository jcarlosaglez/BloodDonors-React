import React, {useState} from 'react';
import Redirect from "react-router-dom/Redirect";

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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import FormHelperText from '@material-ui/core/FormHelperText';

//Autenticación
import useAuth from "./Auth/useAuth";
//Estilos css
import "../css/Form.css";

function SigninDonor() {
    const [datos, setDatos] = useState({        
        "curp": "",
        "first_name": "",
        "last_name": "",
        "birthday": "",
        "gender": "",
        "email": "",
        "phone_number": "",
        "place_of_residence": "",
        "password":"",
        "blood_type": "",
        "form_answers": {}
    })
    const [birthday, setBirthday] = React.useState(new Date());
    const[showPassword, setShowPassword] = React.useState(false);
    const [formAnswers, setFormAnswers] = React.useState({});
    const [errors, setErrors] = React.useState({
    });
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value.trim()
        })
    }
    const handleFormAnswers = (event) => {
        setFormAnswers({
            ...formAnswers,
            [event.target.name] : event.target.value.trim()
        });
    }
    React.useEffect(() => {
        setDatos({
            ...datos,
            "form_answers" : formAnswers
        })
    }, [formAnswers]);
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
				"Accept": "application/json",
			},
			body: JSON.stringify(data),
		});
	};
	const sendData = async (event) => {
		event.preventDefault();

		//Servidor
		const config = {
			url: "https://blood-donors-v1.herokuapp.com/v1/donors/",
			method: "POST",
		};
		try {
			const response = await goToBackend(config, datos);
			if (!response.ok) {
                const errorss = await response.json();
				setErrors({...errorss.errors});
                return;
			}
			const user = await response.json();
            setErrors({});
            auth.login(user.user.token);
		} catch (error) {
			console.error(error);
		}
	};

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
        },
        divider: {
            marginTop: "1em",
            marginBottom: "1em",
        }
    }));

    const classes = useStyles();
    const auth = useAuth();
    return (
        <>
            <Container component="main" maxWidth="sm">
			    {auth.isLogged() ? <Redirect to="/panel" /> : ""}
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Registro de donador
                    </Typography>
                    <form 
                        className={classes.form}
                        onSubmit={sendData}
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
                                    error={!!errors.first_name}
                                    helperText={errors.first_name}
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
                                    error={!!errors.last_name}
                                    helperText={errors.last_name}
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
                                        error={!!errors.birthday}
                                        helperText={errors.birthday}
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
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl
                                    required
                                    fullWidth
                                    variant="outlined"
                                    error={!!errors.password}
                                >
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
                                    <FormHelperText>{errors.password}</FormHelperText>
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
                            <Grid item xs={4}>
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.blood_type}
                                    required
                                >
                                    <InputLabel htmlFor="blood_type">Tipo de sangre</InputLabel>
                                    <Select
                                        id="blood_type"
                                        name="blood_type"
                                        value={datos.blood_type}
                                        label="Tipo de sangre"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="A+">A+</MenuItem>
                                        <MenuItem value="A-">A-</MenuItem>
                                        <MenuItem value="B+">B+</MenuItem>
                                        <MenuItem value="B-">B-</MenuItem>
                                        <MenuItem value="AB+">AB+</MenuItem>
                                        <MenuItem value="AB-">AB-</MenuItem>
                                        <MenuItem value="O+">O+</MenuItem>
                                        <MenuItem value="O-">O-</MenuItem>
                                    </Select>

                                    <FormHelperText>{errors.blood_type}</FormHelperText>
                                </FormControl>                
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    autoComplete="certified_file"
                                    name="certified_file"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="certified_file"
                                    label="Certificado médico"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Divider className={classes.divider} />
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question1"
                                    name="question1"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question1"
                                    label="Pregunta 1"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question2"
                                    name="question2"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question2"
                                    label="Pregunta 2"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question3"
                                    name="question3"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question3"
                                    label="Pregunta 3"
                                    onChange={handleFormAnswers}
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
                                <Link href="SignIn" variant="body1">
                                    ¿Necesitas a un donador? Registrate como Receptor aquí
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="LogIn" variant="body1">
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


export default SigninDonor;


//------------------------------------------------------------------


import React, {useState} from 'react';
import Redirect from "react-router-dom/Redirect";

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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import FormHelperText from '@material-ui/core/FormHelperText';

//Autenticación
import useAuth from "./Auth/useAuth";
//Estilos css
import "../css/Form.css";

function SigninDonor() {
    const [datos, setDatos] = useState({        
        "curp": "",
        "first_name": "",
        "last_name": "",
        "birthday": "",
        "gender": "",
        "email": "",
        "phone_number": "",
        "place_of_residence": "",
        "password":"",
        "blood_type": "",
        "form_answers": {}
    })
    const [birthday, setBirthday] = React.useState(new Date());
    const[showPassword, setShowPassword] = React.useState(false);
    const [formAnswers, setFormAnswers] = React.useState({});
    const [errors, setErrors] = React.useState({
    });
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value.trim()
        })
    }
    const handleFormAnswers = (event) => {
        setFormAnswers({
            ...formAnswers,
            [event.target.name] : event.target.value.trim()
        });
    }
    React.useEffect(() => {
        setDatos({
            ...datos,
            "form_answers" : formAnswers
        })
    }, [formAnswers]);
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
				"Accept": "application/json",
			},
			body: JSON.stringify(data),
		});
	};
	const sendData = async (event) => {
		event.preventDefault();

		//Servidor
		const config = {
			url: "https://blood-donors-v1.herokuapp.com/v1/donors/",
			method: "POST",
		};
		try {
			const response = await goToBackend(config, datos);
			if (!response.ok) {
                const errorss = await response.json();
				setErrors({...errorss.errors});
                return;
			}
			const user = await response.json();
            setErrors({});
            auth.login(user.user.token);
		} catch (error) {
			console.error(error);
		}
	};

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
        },
        divider: {
            marginTop: "1em",
            marginBottom: "1em",
        }
    }));

    const classes = useStyles();
    const auth = useAuth();
    return (
        <>
            <Container component="main" maxWidth="sm">
			    {auth.isLogged() ? <Redirect to="/panel" /> : ""}
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Registro de donador
                    </Typography>
                    <form 
                        className={classes.form}
                        onSubmit={sendData}
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
                                    error={!!errors.first_name}
                                    helperText={errors.first_name}
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
                                    error={!!errors.last_name}
                                    helperText={errors.last_name}
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
                                        error={!!errors.birthday}
                                        helperText={errors.birthday}
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
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl
                                    required
                                    fullWidth
                                    variant="outlined"
                                    error={!!errors.password}
                                >
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
                                    <FormHelperText>{errors.password}</FormHelperText>
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
                            <Grid item xs={4}>
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.blood_type}
                                    required
                                >
                                    <InputLabel htmlFor="blood_type">Tipo de sangre</InputLabel>
                                    <Select
                                        id="blood_type"
                                        name="blood_type"
                                        value={datos.blood_type}
                                        label="Tipo de sangre"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="A+">A+</MenuItem>
                                        <MenuItem value="A-">A-</MenuItem>
                                        <MenuItem value="B+">B+</MenuItem>
                                        <MenuItem value="B-">B-</MenuItem>
                                        <MenuItem value="AB+">AB+</MenuItem>
                                        <MenuItem value="AB-">AB-</MenuItem>
                                        <MenuItem value="O+">O+</MenuItem>
                                        <MenuItem value="O-">O-</MenuItem>
                                    </Select>

                                    <FormHelperText>{errors.blood_type}</FormHelperText>
                                </FormControl>                
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    autoComplete="certified_file"
                                    name="certified_file"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="certified_file"
                                    label="Certificado médico"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Divider className={classes.divider} />
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question1"
                                    name="question1"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question1"
                                    label="Pregunta 1"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question2"
                                    name="question2"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question2"
                                    label="Pregunta 2"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question3"
                                    name="question3"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question3"
                                    label="Pregunta 3"
                                    onChange={handleFormAnswers}
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
                                <Link href="SignIn" variant="body1">
                                    ¿Necesitas a un donador? Registrate como Receptor aquí
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="LogIn" variant="body1">
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


export default SigninDonor;
import React, {useState} from 'react';
import Redirect from "react-router-dom/Redirect";

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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import FormHelperText from '@material-ui/core/FormHelperText';

//Autenticación
import useAuth from "./Auth/useAuth";
//Estilos css
import "../css/Form.css";

function SigninDonor() {
    const [datos, setDatos] = useState({        
        "curp": "",
        "first_name": "",
        "last_name": "",
        "birthday": "",
        "gender": "",
        "email": "",
        "phone_number": "",
        "place_of_residence": "",
        "password":"",
        "blood_type": "",
        "form_answers": {}
    })
    const [birthday, setBirthday] = React.useState(new Date());
    const[showPassword, setShowPassword] = React.useState(false);
    const [formAnswers, setFormAnswers] = React.useState({});
    const [errors, setErrors] = React.useState({
    });
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value.trim()
        })
    }
    const handleFormAnswers = (event) => {
        setFormAnswers({
            ...formAnswers,
            [event.target.name] : event.target.value.trim()
        });
    }
    React.useEffect(() => {
        setDatos({
            ...datos,
            "form_answers" : formAnswers
        })
    }, [formAnswers]);
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
				"Accept": "application/json",
			},
			body: JSON.stringify(data),
		});
	};
	const sendData = async (event) => {
		event.preventDefault();

		//Servidor
		const config = {
			url: "https://blood-donors-v1.herokuapp.com/v1/donors/",
			method: "POST",
		};
		try {
			const response = await goToBackend(config, datos);
			if (!response.ok) {
                const errorss = await response.json();
				setErrors({...errorss.errors});
                return;
			}
			const user = await response.json();
            setErrors({});
            auth.login(user.user.token);
		} catch (error) {
			console.error(error);
		}
	};

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
        },
        divider: {
            marginTop: "1em",
            marginBottom: "1em",
        }
    }));

    const classes = useStyles();
    const auth = useAuth();
    return (
        <>
            <Container component="main" maxWidth="sm">
			    {auth.isLogged() ? <Redirect to="/panel" /> : ""}
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Registro de donador
                    </Typography>
                    <form 
                        className={classes.form}
                        onSubmit={sendData}
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
                                    error={!!errors.first_name}
                                    helperText={errors.first_name}
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
                                    error={!!errors.last_name}
                                    helperText={errors.last_name}
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
                                        error={!!errors.birthday}
                                        helperText={errors.birthday}
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
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl
                                    required
                                    fullWidth
                                    variant="outlined"
                                    error={!!errors.password}
                                >
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
                                    <FormHelperText>{errors.password}</FormHelperText>
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
                            <Grid item xs={4}>
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.blood_type}
                                    required
                                >
                                    <InputLabel htmlFor="blood_type">Tipo de sangre</InputLabel>
                                    <Select
                                        id="blood_type"
                                        name="blood_type"
                                        value={datos.blood_type}
                                        label="Tipo de sangre"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="A+">A+</MenuItem>
                                        <MenuItem value="A-">A-</MenuItem>
                                        <MenuItem value="B+">B+</MenuItem>
                                        <MenuItem value="B-">B-</MenuItem>
                                        <MenuItem value="AB+">AB+</MenuItem>
                                        <MenuItem value="AB-">AB-</MenuItem>
                                        <MenuItem value="O+">O+</MenuItem>
                                        <MenuItem value="O-">O-</MenuItem>
                                    </Select>

                                    <FormHelperText>{errors.blood_type}</FormHelperText>
                                </FormControl>                
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    autoComplete="certified_file"
                                    name="certified_file"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="certified_file"
                                    label="Certificado médico"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Divider className={classes.divider} />
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question1"
                                    name="question1"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question1"
                                    label="Pregunta 1"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question2"
                                    name="question2"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question2"
                                    label="Pregunta 2"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question3"
                                    name="question3"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question3"
                                    label="Pregunta 3"
                                    onChange={handleFormAnswers}
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
                                <Link href="SignIn" variant="body1">
                                    ¿Necesitas a un donador? Registrate como Receptor aquí
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="LogIn" variant="body1">
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


export default SigninDonor;
import React, {useState} from 'react';
import Redirect from "react-router-dom/Redirect";

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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import FormHelperText from '@material-ui/core/FormHelperText';

//Autenticación
import useAuth from "./Auth/useAuth";
//Estilos css
import "../css/Form.css";

function SigninDonor() {
    const [datos, setDatos] = useState({        
        "curp": "",
        "first_name": "",
        "last_name": "",
        "birthday": "",
        "gender": "",
        "email": "",
        "phone_number": "",
        "place_of_residence": "",
        "password":"",
        "blood_type": "",
        "form_answers": {}
    })
    const [birthday, setBirthday] = React.useState(new Date());
    const[showPassword, setShowPassword] = React.useState(false);
    const [formAnswers, setFormAnswers] = React.useState({});
    const [errors, setErrors] = React.useState({
    });
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value.trim()
        })
    }
    const handleFormAnswers = (event) => {
        setFormAnswers({
            ...formAnswers,
            [event.target.name] : event.target.value.trim()
        });
    }
    React.useEffect(() => {
        setDatos({
            ...datos,
            "form_answers" : formAnswers
        })
    }, [formAnswers]);
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
				"Accept": "application/json",
			},
			body: JSON.stringify(data),
		});
	};
	const sendData = async (event) => {
		event.preventDefault();

		//Servidor
		const config = {
			url: "https://blood-donors-v1.herokuapp.com/v1/donors/",
			method: "POST",
		};
		try {
			const response = await goToBackend(config, datos);
			if (!response.ok) {
                const errorss = await response.json();
				setErrors({...errorss.errors});
                return;
			}
			const user = await response.json();
            setErrors({});
            auth.login(user.user.token);
		} catch (error) {
			console.error(error);
		}
	};

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
        },
        divider: {
            marginTop: "1em",
            marginBottom: "1em",
        }
    }));

    const classes = useStyles();
    const auth = useAuth();
    return (
        <>
            <Container component="main" maxWidth="sm">
			    {auth.isLogged() ? <Redirect to="/panel" /> : ""}
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Registro de donador
                    </Typography>
                    <form 
                        className={classes.form}
                        onSubmit={sendData}
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
                                    error={!!errors.first_name}
                                    helperText={errors.first_name}
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
                                    error={!!errors.last_name}
                                    helperText={errors.last_name}
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
                                        error={!!errors.birthday}
                                        helperText={errors.birthday}
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
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl
                                    required
                                    fullWidth
                                    variant="outlined"
                                    error={!!errors.password}
                                >
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
                                    <FormHelperText>{errors.password}</FormHelperText>
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
                            <Grid item xs={4}>
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.blood_type}
                                    required
                                >
                                    <InputLabel htmlFor="blood_type">Tipo de sangre</InputLabel>
                                    <Select
                                        id="blood_type"
                                        name="blood_type"
                                        value={datos.blood_type}
                                        label="Tipo de sangre"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="A+">A+</MenuItem>
                                        <MenuItem value="A-">A-</MenuItem>
                                        <MenuItem value="B+">B+</MenuItem>
                                        <MenuItem value="B-">B-</MenuItem>
                                        <MenuItem value="AB+">AB+</MenuItem>
                                        <MenuItem value="AB-">AB-</MenuItem>
                                        <MenuItem value="O+">O+</MenuItem>
                                        <MenuItem value="O-">O-</MenuItem>
                                    </Select>

                                    <FormHelperText>{errors.blood_type}</FormHelperText>
                                </FormControl>                
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    autoComplete="certified_file"
                                    name="certified_file"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="certified_file"
                                    label="Certificado médico"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Divider className={classes.divider} />
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question1"
                                    name="question1"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question1"
                                    label="Pregunta 1"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question2"
                                    name="question2"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question2"
                                    label="Pregunta 2"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question3"
                                    name="question3"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question3"
                                    label="Pregunta 3"
                                    onChange={handleFormAnswers}
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
                                <Link href="SignIn" variant="body1">
                                    ¿Necesitas a un donador? Registrate como Receptor aquí
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="LogIn" variant="body1">
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


export default SigninDonor;
import React, {useState} from 'react';
import Redirect from "react-router-dom/Redirect";

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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import FormHelperText from '@material-ui/core/FormHelperText';

//Autenticación
import useAuth from "./Auth/useAuth";
//Estilos css
import "../css/Form.css";

function SigninDonor() {
    const [datos, setDatos] = useState({        
        "curp": "",
        "first_name": "",
        "last_name": "",
        "birthday": "",
        "gender": "",
        "email": "",
        "phone_number": "",
        "place_of_residence": "",
        "password":"",
        "blood_type": "",
        "form_answers": {}
    })
    const [birthday, setBirthday] = React.useState(new Date());
    const[showPassword, setShowPassword] = React.useState(false);
    const [formAnswers, setFormAnswers] = React.useState({});
    const [errors, setErrors] = React.useState({
    });
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value.trim()
        })
    }
    const handleFormAnswers = (event) => {
        setFormAnswers({
            ...formAnswers,
            [event.target.name] : event.target.value.trim()
        });
    }
    React.useEffect(() => {
        setDatos({
            ...datos,
            "form_answers" : formAnswers
        })
    }, [formAnswers]);
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
				"Accept": "application/json",
			},
			body: JSON.stringify(data),
		});
	};
	const sendData = async (event) => {
		event.preventDefault();

		//Servidor
		const config = {
			url: "https://blood-donors-v1.herokuapp.com/v1/donors/",
			method: "POST",
		};
		try {
			const response = await goToBackend(config, datos);
			if (!response.ok) {
                const errorss = await response.json();
				setErrors({...errorss.errors});
                return;
			}
			const user = await response.json();
            setErrors({});
            auth.login(user.user.token);
		} catch (error) {
			console.error(error);
		}
	};

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
        },
        divider: {
            marginTop: "1em",
            marginBottom: "1em",
        }
    }));

    const classes = useStyles();
    const auth = useAuth();
    return (
        <>
            <Container component="main" maxWidth="sm">
			    {auth.isLogged() ? <Redirect to="/panel" /> : ""}
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Registro de donador
                    </Typography>
                    <form 
                        className={classes.form}
                        onSubmit={sendData}
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
                                    error={!!errors.first_name}
                                    helperText={errors.first_name}
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
                                    error={!!errors.last_name}
                                    helperText={errors.last_name}
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
                                        error={!!errors.birthday}
                                        helperText={errors.birthday}
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
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl
                                    required
                                    fullWidth
                                    variant="outlined"
                                    error={!!errors.password}
                                >
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
                                    <FormHelperText>{errors.password}</FormHelperText>
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
                            <Grid item xs={4}>
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.blood_type}
                                    required
                                >
                                    <InputLabel htmlFor="blood_type">Tipo de sangre</InputLabel>
                                    <Select
                                        id="blood_type"
                                        name="blood_type"
                                        value={datos.blood_type}
                                        label="Tipo de sangre"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="A+">A+</MenuItem>
                                        <MenuItem value="A-">A-</MenuItem>
                                        <MenuItem value="B+">B+</MenuItem>
                                        <MenuItem value="B-">B-</MenuItem>
                                        <MenuItem value="AB+">AB+</MenuItem>
                                        <MenuItem value="AB-">AB-</MenuItem>
                                        <MenuItem value="O+">O+</MenuItem>
                                        <MenuItem value="O-">O-</MenuItem>
                                    </Select>

                                    <FormHelperText>{errors.blood_type}</FormHelperText>
                                </FormControl>                
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    autoComplete="certified_file"
                                    name="certified_file"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="certified_file"
                                    label="Certificado médico"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Divider className={classes.divider} />
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question1"
                                    name="question1"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question1"
                                    label="Pregunta 1"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question2"
                                    name="question2"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question2"
                                    label="Pregunta 2"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question3"
                                    name="question3"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question3"
                                    label="Pregunta 3"
                                    onChange={handleFormAnswers}
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
                                <Link href="SignIn" variant="body1">
                                    ¿Necesitas a un donador? Registrate como Receptor aquí
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="LogIn" variant="body1">
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


export default SigninDonor;
import React, {useState} from 'react';
import Redirect from "react-router-dom/Redirect";

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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import FormHelperText from '@material-ui/core/FormHelperText';

//Autenticación
import useAuth from "./Auth/useAuth";
//Estilos css
import "../css/Form.css";

function SigninDonor() {
    const [datos, setDatos] = useState({        
        "curp": "",
        "first_name": "",
        "last_name": "",
        "birthday": "",
        "gender": "",
        "email": "",
        "phone_number": "",
        "place_of_residence": "",
        "password":"",
        "blood_type": "",
        "form_answers": {}
    })
    const [birthday, setBirthday] = React.useState(new Date());
    const[showPassword, setShowPassword] = React.useState(false);
    const [formAnswers, setFormAnswers] = React.useState({});
    const [errors, setErrors] = React.useState({
    });
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value.trim()
        })
    }
    const handleFormAnswers = (event) => {
        setFormAnswers({
            ...formAnswers,
            [event.target.name] : event.target.value.trim()
        });
    }
    React.useEffect(() => {
        setDatos({
            ...datos,
            "form_answers" : formAnswers
        })
    }, [formAnswers]);
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
				"Accept": "application/json",
			},
			body: JSON.stringify(data),
		});
	};
	const sendData = async (event) => {
		event.preventDefault();

		//Servidor
		const config = {
			url: "https://blood-donors-v1.herokuapp.com/v1/donors/",
			method: "POST",
		};
		try {
			const response = await goToBackend(config, datos);
			if (!response.ok) {
                const errorss = await response.json();
				setErrors({...errorss.errors});
                return;
			}
			const user = await response.json();
            setErrors({});
            auth.login(user.user.token);
		} catch (error) {
			console.error(error);
		}
	};

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
        },
        divider: {
            marginTop: "1em",
            marginBottom: "1em",
        }
    }));

    const classes = useStyles();
    const auth = useAuth();
    return (
        <>
            <Container component="main" maxWidth="sm">
			    {auth.isLogged() ? <Redirect to="/panel" /> : ""}
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Registro de donador
                    </Typography>
                    <form 
                        className={classes.form}
                        onSubmit={sendData}
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
                                    error={!!errors.first_name}
                                    helperText={errors.first_name}
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
                                    error={!!errors.last_name}
                                    helperText={errors.last_name}
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
                                        error={!!errors.birthday}
                                        helperText={errors.birthday}
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
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl
                                    required
                                    fullWidth
                                    variant="outlined"
                                    error={!!errors.password}
                                >
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
                                    <FormHelperText>{errors.password}</FormHelperText>
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
                            <Grid item xs={4}>
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.blood_type}
                                    required
                                >
                                    <InputLabel htmlFor="blood_type">Tipo de sangre</InputLabel>
                                    <Select
                                        id="blood_type"
                                        name="blood_type"
                                        value={datos.blood_type}
                                        label="Tipo de sangre"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="A+">A+</MenuItem>
                                        <MenuItem value="A-">A-</MenuItem>
                                        <MenuItem value="B+">B+</MenuItem>
                                        <MenuItem value="B-">B-</MenuItem>
                                        <MenuItem value="AB+">AB+</MenuItem>
                                        <MenuItem value="AB-">AB-</MenuItem>
                                        <MenuItem value="O+">O+</MenuItem>
                                        <MenuItem value="O-">O-</MenuItem>
                                    </Select>

                                    <FormHelperText>{errors.blood_type}</FormHelperText>
                                </FormControl>                
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    autoComplete="certified_file"
                                    name="certified_file"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="certified_file"
                                    label="Certificado médico"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Divider className={classes.divider} />
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question1"
                                    name="question1"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question1"
                                    label="Pregunta 1"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question2"
                                    name="question2"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question2"
                                    label="Pregunta 2"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question3"
                                    name="question3"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question3"
                                    label="Pregunta 3"
                                    onChange={handleFormAnswers}
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
                                <Link href="SignIn" variant="body1">
                                    ¿Necesitas a un donador? Registrate como Receptor aquí
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="LogIn" variant="body1">
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


export default SigninDonor;
import React, {useState} from 'react';
import Redirect from "react-router-dom/Redirect";

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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import FormHelperText from '@material-ui/core/FormHelperText';

//Autenticación
import useAuth from "./Auth/useAuth";
//Estilos css
import "../css/Form.css";

function SigninDonor() {
    const [datos, setDatos] = useState({        
        "curp": "",
        "first_name": "",
        "last_name": "",
        "birthday": "",
        "gender": "",
        "email": "",
        "phone_number": "",
        "place_of_residence": "",
        "password":"",
        "blood_type": "",
        "form_answers": {}
    })
    const [birthday, setBirthday] = React.useState(new Date());
    const[showPassword, setShowPassword] = React.useState(false);
    const [formAnswers, setFormAnswers] = React.useState({});
    const [errors, setErrors] = React.useState({
    });
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value.trim()
        })
    }
    const handleFormAnswers = (event) => {
        setFormAnswers({
            ...formAnswers,
            [event.target.name] : event.target.value.trim()
        });
    }
    React.useEffect(() => {
        setDatos({
            ...datos,
            "form_answers" : formAnswers
        })
    }, [formAnswers]);
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
				"Accept": "application/json",
			},
			body: JSON.stringify(data),
		});
	};
	const sendData = async (event) => {
		event.preventDefault();

		//Servidor
		const config = {
			url: "https://blood-donors-v1.herokuapp.com/v1/donors/",
			method: "POST",
		};
		try {
			const response = await goToBackend(config, datos);
			if (!response.ok) {
                const errorss = await response.json();
				setErrors({...errorss.errors});
                return;
			}
			const user = await response.json();
            setErrors({});
            auth.login(user.user.token);
		} catch (error) {
			console.error(error);
		}
	};

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
        },
        divider: {
            marginTop: "1em",
            marginBottom: "1em",
        }
    }));

    const classes = useStyles();
    const auth = useAuth();
    return (
        <>
            <Container component="main" maxWidth="sm">
			    {auth.isLogged() ? <Redirect to="/panel" /> : ""}
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Registro de donador
                    </Typography>
                    <form 
                        className={classes.form}
                        onSubmit={sendData}
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
                                    error={!!errors.first_name}
                                    helperText={errors.first_name}
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
                                    error={!!errors.last_name}
                                    helperText={errors.last_name}
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
                                        error={!!errors.birthday}
                                        helperText={errors.birthday}
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
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl
                                    required
                                    fullWidth
                                    variant="outlined"
                                    error={!!errors.password}
                                >
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
                                    <FormHelperText>{errors.password}</FormHelperText>
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
                            <Grid item xs={4}>
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.blood_type}
                                    required
                                >
                                    <InputLabel htmlFor="blood_type">Tipo de sangre</InputLabel>
                                    <Select
                                        id="blood_type"
                                        name="blood_type"
                                        value={datos.blood_type}
                                        label="Tipo de sangre"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="A+">A+</MenuItem>
                                        <MenuItem value="A-">A-</MenuItem>
                                        <MenuItem value="B+">B+</MenuItem>
                                        <MenuItem value="B-">B-</MenuItem>
                                        <MenuItem value="AB+">AB+</MenuItem>
                                        <MenuItem value="AB-">AB-</MenuItem>
                                        <MenuItem value="O+">O+</MenuItem>
                                        <MenuItem value="O-">O-</MenuItem>
                                    </Select>

                                    <FormHelperText>{errors.blood_type}</FormHelperText>
                                </FormControl>                
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    autoComplete="certified_file"
                                    name="certified_file"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="certified_file"
                                    label="Certificado médico"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Divider className={classes.divider} />
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question1"
                                    name="question1"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question1"
                                    label="Pregunta 1"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question2"
                                    name="question2"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question2"
                                    label="Pregunta 2"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question3"
                                    name="question3"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question3"
                                    label="Pregunta 3"
                                    onChange={handleFormAnswers}
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
                                <Link href="SignIn" variant="body1">
                                    ¿Necesitas a un donador? Registrate como Receptor aquí
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="LogIn" variant="body1">
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


export default SigninDonor;
import React, {useState} from 'react';
import Redirect from "react-router-dom/Redirect";

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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import FormHelperText from '@material-ui/core/FormHelperText';

//Autenticación
import useAuth from "./Auth/useAuth";
//Estilos css
import "../css/Form.css";

function SigninDonor() {
    const [datos, setDatos] = useState({        
        "curp": "",
        "first_name": "",
        "last_name": "",
        "birthday": "",
        "gender": "",
        "email": "",
        "phone_number": "",
        "place_of_residence": "",
        "password":"",
        "blood_type": "",
        "form_answers": {}
    })
    const [birthday, setBirthday] = React.useState(new Date());
    const[showPassword, setShowPassword] = React.useState(false);
    const [formAnswers, setFormAnswers] = React.useState({});
    const [errors, setErrors] = React.useState({
    });
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value.trim()
        })
    }
    const handleFormAnswers = (event) => {
        setFormAnswers({
            ...formAnswers,
            [event.target.name] : event.target.value.trim()
        });
    }
    React.useEffect(() => {
        setDatos({
            ...datos,
            "form_answers" : formAnswers
        })
    }, [formAnswers]);
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
				"Accept": "application/json",
			},
			body: JSON.stringify(data),
		});
	};
	const sendData = async (event) => {
		event.preventDefault();

		//Servidor
		const config = {
			url: "https://blood-donors-v1.herokuapp.com/v1/donors/",
			method: "POST",
		};
		try {
			const response = await goToBackend(config, datos);
			if (!response.ok) {
                const errorss = await response.json();
				setErrors({...errorss.errors});
                return;
			}
			const user = await response.json();
            setErrors({});
            auth.login(user.user.token);
		} catch (error) {
			console.error(error);
		}
	};

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
        },
        divider: {
            marginTop: "1em",
            marginBottom: "1em",
        }
    }));

    const classes = useStyles();
    const auth = useAuth();
    return (
        <>
            <Container component="main" maxWidth="sm">
			    {auth.isLogged() ? <Redirect to="/panel" /> : ""}
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Registro de donador
                    </Typography>
                    <form 
                        className={classes.form}
                        onSubmit={sendData}
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
                                    error={!!errors.first_name}
                                    helperText={errors.first_name}
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
                                    error={!!errors.last_name}
                                    helperText={errors.last_name}
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
                                        error={!!errors.birthday}
                                        helperText={errors.birthday}
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
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl
                                    required
                                    fullWidth
                                    variant="outlined"
                                    error={!!errors.password}
                                >
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
                                    <FormHelperText>{errors.password}</FormHelperText>
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
                            <Grid item xs={4}>
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.blood_type}
                                    required
                                >
                                    <InputLabel htmlFor="blood_type">Tipo de sangre</InputLabel>
                                    <Select
                                        id="blood_type"
                                        name="blood_type"
                                        value={datos.blood_type}
                                        label="Tipo de sangre"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="A+">A+</MenuItem>
                                        <MenuItem value="A-">A-</MenuItem>
                                        <MenuItem value="B+">B+</MenuItem>
                                        <MenuItem value="B-">B-</MenuItem>
                                        <MenuItem value="AB+">AB+</MenuItem>
                                        <MenuItem value="AB-">AB-</MenuItem>
                                        <MenuItem value="O+">O+</MenuItem>
                                        <MenuItem value="O-">O-</MenuItem>
                                    </Select>

                                    <FormHelperText>{errors.blood_type}</FormHelperText>
                                </FormControl>                
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    autoComplete="certified_file"
                                    name="certified_file"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="certified_file"
                                    label="Certificado médico"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Divider className={classes.divider} />
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question1"
                                    name="question1"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question1"
                                    label="Pregunta 1"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question2"
                                    name="question2"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question2"
                                    label="Pregunta 2"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question3"
                                    name="question3"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question3"
                                    label="Pregunta 3"
                                    onChange={handleFormAnswers}
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
                                <Link href="SignIn" variant="body1">
                                    ¿Necesitas a un donador? Registrate como Receptor aquí
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="LogIn" variant="body1">
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


export default SigninDonor;
import React, {useState} from 'react';
import Redirect from "react-router-dom/Redirect";

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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import FormHelperText from '@material-ui/core/FormHelperText';

//Autenticación
import useAuth from "./Auth/useAuth";
//Estilos css
import "../css/Form.css";

function SigninDonor() {
    const [datos, setDatos] = useState({        
        "curp": "",
        "first_name": "",
        "last_name": "",
        "birthday": "",
        "gender": "",
        "email": "",
        "phone_number": "",
        "place_of_residence": "",
        "password":"",
        "blood_type": "",
        "form_answers": {}
    })
    const [birthday, setBirthday] = React.useState(new Date());
    const[showPassword, setShowPassword] = React.useState(false);
    const [formAnswers, setFormAnswers] = React.useState({});
    const [errors, setErrors] = React.useState({
    });
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value.trim()
        })
    }
    const handleFormAnswers = (event) => {
        setFormAnswers({
            ...formAnswers,
            [event.target.name] : event.target.value.trim()
        });
    }
    React.useEffect(() => {
        setDatos({
            ...datos,
            "form_answers" : formAnswers
        })
    }, [formAnswers]);
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
				"Accept": "application/json",
			},
			body: JSON.stringify(data),
		});
	};
	const sendData = async (event) => {
		event.preventDefault();

		//Servidor
		const config = {
			url: "https://blood-donors-v1.herokuapp.com/v1/donors/",
			method: "POST",
		};
		try {
			const response = await goToBackend(config, datos);
			if (!response.ok) {
                const errorss = await response.json();
				setErrors({...errorss.errors});
                return;
			}
			const user = await response.json();
            setErrors({});
            auth.login(user.user.token);
		} catch (error) {
			console.error(error);
		}
	};

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
        },
        divider: {
            marginTop: "1em",
            marginBottom: "1em",
        }
    }));

    const classes = useStyles();
    const auth = useAuth();
    return (
        <>
            <Container component="main" maxWidth="sm">
			    {auth.isLogged() ? <Redirect to="/panel" /> : ""}
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Registro de donador
                    </Typography>
                    <form 
                        className={classes.form}
                        onSubmit={sendData}
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
                                    error={!!errors.first_name}
                                    helperText={errors.first_name}
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
                                    error={!!errors.last_name}
                                    helperText={errors.last_name}
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
                                        error={!!errors.birthday}
                                        helperText={errors.birthday}
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
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl
                                    required
                                    fullWidth
                                    variant="outlined"
                                    error={!!errors.password}
                                >
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
                                    <FormHelperText>{errors.password}</FormHelperText>
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
                            <Grid item xs={4}>
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.blood_type}
                                    required
                                >
                                    <InputLabel htmlFor="blood_type">Tipo de sangre</InputLabel>
                                    <Select
                                        id="blood_type"
                                        name="blood_type"
                                        value={datos.blood_type}
                                        label="Tipo de sangre"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="A+">A+</MenuItem>
                                        <MenuItem value="A-">A-</MenuItem>
                                        <MenuItem value="B+">B+</MenuItem>
                                        <MenuItem value="B-">B-</MenuItem>
                                        <MenuItem value="AB+">AB+</MenuItem>
                                        <MenuItem value="AB-">AB-</MenuItem>
                                        <MenuItem value="O+">O+</MenuItem>
                                        <MenuItem value="O-">O-</MenuItem>
                                    </Select>

                                    <FormHelperText>{errors.blood_type}</FormHelperText>
                                </FormControl>                
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    autoComplete="certified_file"
                                    name="certified_file"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="certified_file"
                                    label="Certificado médico"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Divider className={classes.divider} />
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question1"
                                    name="question1"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question1"
                                    label="Pregunta 1"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question2"
                                    name="question2"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question2"
                                    label="Pregunta 2"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question3"
                                    name="question3"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question3"
                                    label="Pregunta 3"
                                    onChange={handleFormAnswers}
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
                                <Link href="SignIn" variant="body1">
                                    ¿Necesitas a un donador? Registrate como Receptor aquí
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="LogIn" variant="body1">
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


export default SigninDonor;
import React, {useState} from 'react';
import Redirect from "react-router-dom/Redirect";

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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import FormHelperText from '@material-ui/core/FormHelperText';

//Autenticación
import useAuth from "./Auth/useAuth";
//Estilos css
import "../css/Form.css";

function SigninDonor() {
    const [datos, setDatos] = useState({        
        "curp": "",
        "first_name": "",
        "last_name": "",
        "birthday": "",
        "gender": "",
        "email": "",
        "phone_number": "",
        "place_of_residence": "",
        "password":"",
        "blood_type": "",
        "form_answers": {}
    })
    const [birthday, setBirthday] = React.useState(new Date());
    const[showPassword, setShowPassword] = React.useState(false);
    const [formAnswers, setFormAnswers] = React.useState({});
    const [errors, setErrors] = React.useState({
    });
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value.trim()
        })
    }
    const handleFormAnswers = (event) => {
        setFormAnswers({
            ...formAnswers,
            [event.target.name] : event.target.value.trim()
        });
    }
    React.useEffect(() => {
        setDatos({
            ...datos,
            "form_answers" : formAnswers
        })
    }, [formAnswers]);
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
				"Accept": "application/json",
			},
			body: JSON.stringify(data),
		});
	};
	const sendData = async (event) => {
		event.preventDefault();

		//Servidor
		const config = {
			url: "https://blood-donors-v1.herokuapp.com/v1/donors/",
			method: "POST",
		};
		try {
			const response = await goToBackend(config, datos);
			if (!response.ok) {
                const errorss = await response.json();
				setErrors({...errorss.errors});
                return;
			}
			const user = await response.json();
            setErrors({});
            auth.login(user.user.token);
		} catch (error) {
			console.error(error);
		}
	};

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
        },
        divider: {
            marginTop: "1em",
            marginBottom: "1em",
        }
    }));

    const classes = useStyles();
    const auth = useAuth();
    return (
        <>
            <Container component="main" maxWidth="sm">
			    {auth.isLogged() ? <Redirect to="/panel" /> : ""}
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Registro de donador
                    </Typography>
                    <form 
                        className={classes.form}
                        onSubmit={sendData}
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
                                    error={!!errors.first_name}
                                    helperText={errors.first_name}
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
                                    error={!!errors.last_name}
                                    helperText={errors.last_name}
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
                                        error={!!errors.birthday}
                                        helperText={errors.birthday}
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
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl
                                    required
                                    fullWidth
                                    variant="outlined"
                                    error={!!errors.password}
                                >
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
                                    <FormHelperText>{errors.password}</FormHelperText>
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
                            <Grid item xs={4}>
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.blood_type}
                                    required
                                >
                                    <InputLabel htmlFor="blood_type">Tipo de sangre</InputLabel>
                                    <Select
                                        id="blood_type"
                                        name="blood_type"
                                        value={datos.blood_type}
                                        label="Tipo de sangre"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="A+">A+</MenuItem>
                                        <MenuItem value="A-">A-</MenuItem>
                                        <MenuItem value="B+">B+</MenuItem>
                                        <MenuItem value="B-">B-</MenuItem>
                                        <MenuItem value="AB+">AB+</MenuItem>
                                        <MenuItem value="AB-">AB-</MenuItem>
                                        <MenuItem value="O+">O+</MenuItem>
                                        <MenuItem value="O-">O-</MenuItem>
                                    </Select>

                                    <FormHelperText>{errors.blood_type}</FormHelperText>
                                </FormControl>                
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    autoComplete="certified_file"
                                    name="certified_file"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="certified_file"
                                    label="Certificado médico"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Divider className={classes.divider} />
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question1"
                                    name="question1"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question1"
                                    label="Pregunta 1"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question2"
                                    name="question2"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question2"
                                    label="Pregunta 2"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question3"
                                    name="question3"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question3"
                                    label="Pregunta 3"
                                    onChange={handleFormAnswers}
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
                                <Link href="SignIn" variant="body1">
                                    ¿Necesitas a un donador? Registrate como Receptor aquí
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="LogIn" variant="body1">
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


export default SigninDonor;
import React, {useState} from 'react';
import Redirect from "react-router-dom/Redirect";

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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import FormHelperText from '@material-ui/core/FormHelperText';

//Autenticación
import useAuth from "./Auth/useAuth";
//Estilos css
import "../css/Form.css";

function SigninDonor() {
    const [datos, setDatos] = useState({        
        "curp": "",
        "first_name": "",
        "last_name": "",
        "birthday": "",
        "gender": "",
        "email": "",
        "phone_number": "",
        "place_of_residence": "",
        "password":"",
        "blood_type": "",
        "form_answers": {}
    })
    const [birthday, setBirthday] = React.useState(new Date());
    const[showPassword, setShowPassword] = React.useState(false);
    const [formAnswers, setFormAnswers] = React.useState({});
    const [errors, setErrors] = React.useState({
    });
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value.trim()
        })
    }
    const handleFormAnswers = (event) => {
        setFormAnswers({
            ...formAnswers,
            [event.target.name] : event.target.value.trim()
        });
    }
    React.useEffect(() => {
        setDatos({
            ...datos,
            "form_answers" : formAnswers
        })
    }, [formAnswers]);
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
				"Accept": "application/json",
			},
			body: JSON.stringify(data),
		});
	};
	const sendData = async (event) => {
		event.preventDefault();

		//Servidor
		const config = {
			url: "https://blood-donors-v1.herokuapp.com/v1/donors/",
			method: "POST",
		};
		try {
			const response = await goToBackend(config, datos);
			if (!response.ok) {
                const errorss = await response.json();
				setErrors({...errorss.errors});
                return;
			}
			const user = await response.json();
            setErrors({});
            auth.login(user.user.token);
		} catch (error) {
			console.error(error);
		}
	};

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
        },
        divider: {
            marginTop: "1em",
            marginBottom: "1em",
        }
    }));

    const classes = useStyles();
    const auth = useAuth();
    return (
        <>
            <Container component="main" maxWidth="sm">
			    {auth.isLogged() ? <Redirect to="/panel" /> : ""}
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Registro de donador
                    </Typography>
                    <form 
                        className={classes.form}
                        onSubmit={sendData}
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
                                    error={!!errors.first_name}
                                    helperText={errors.first_name}
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
                                    error={!!errors.last_name}
                                    helperText={errors.last_name}
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
                                        error={!!errors.birthday}
                                        helperText={errors.birthday}
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
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl
                                    required
                                    fullWidth
                                    variant="outlined"
                                    error={!!errors.password}
                                >
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
                                    <FormHelperText>{errors.password}</FormHelperText>
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
                            <Grid item xs={4}>
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.blood_type}
                                    required
                                >
                                    <InputLabel htmlFor="blood_type">Tipo de sangre</InputLabel>
                                    <Select
                                        id="blood_type"
                                        name="blood_type"
                                        value={datos.blood_type}
                                        label="Tipo de sangre"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="A+">A+</MenuItem>
                                        <MenuItem value="A-">A-</MenuItem>
                                        <MenuItem value="B+">B+</MenuItem>
                                        <MenuItem value="B-">B-</MenuItem>
                                        <MenuItem value="AB+">AB+</MenuItem>
                                        <MenuItem value="AB-">AB-</MenuItem>
                                        <MenuItem value="O+">O+</MenuItem>
                                        <MenuItem value="O-">O-</MenuItem>
                                    </Select>

                                    <FormHelperText>{errors.blood_type}</FormHelperText>
                                </FormControl>                
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    autoComplete="certified_file"
                                    name="certified_file"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="certified_file"
                                    label="Certificado médico"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Divider className={classes.divider} />
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question1"
                                    name="question1"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question1"
                                    label="Pregunta 1"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question2"
                                    name="question2"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question2"
                                    label="Pregunta 2"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question3"
                                    name="question3"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question3"
                                    label="Pregunta 3"
                                    onChange={handleFormAnswers}
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
                                <Link href="SignIn" variant="body1">
                                    ¿Necesitas a un donador? Registrate como Receptor aquí
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="LogIn" variant="body1">
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


export default SigninDonor;
import React, {useState} from 'react';
import Redirect from "react-router-dom/Redirect";

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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import FormHelperText from '@material-ui/core/FormHelperText';

//Autenticación
import useAuth from "./Auth/useAuth";
//Estilos css
import "../css/Form.css";

function SigninDonor() {
    const [datos, setDatos] = useState({        
        "curp": "",
        "first_name": "",
        "last_name": "",
        "birthday": "",
        "gender": "",
        "email": "",
        "phone_number": "",
        "place_of_residence": "",
        "password":"",
        "blood_type": "",
        "form_answers": {}
    })
    const [birthday, setBirthday] = React.useState(new Date());
    const[showPassword, setShowPassword] = React.useState(false);
    const [formAnswers, setFormAnswers] = React.useState({});
    const [errors, setErrors] = React.useState({
    });
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value.trim()
        })
    }
    const handleFormAnswers = (event) => {
        setFormAnswers({
            ...formAnswers,
            [event.target.name] : event.target.value.trim()
        });
    }
    React.useEffect(() => {
        setDatos({
            ...datos,
            "form_answers" : formAnswers
        })
    }, [formAnswers]);
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
				"Accept": "application/json",
			},
			body: JSON.stringify(data),
		});
	};
	const sendData = async (event) => {
		event.preventDefault();

		//Servidor
		const config = {
			url: "https://blood-donors-v1.herokuapp.com/v1/donors/",
			method: "POST",
		};
		try {
			const response = await goToBackend(config, datos);
			if (!response.ok) {
                const errorss = await response.json();
				setErrors({...errorss.errors});
                return;
			}
			const user = await response.json();
            setErrors({});
            auth.login(user.user.token);
		} catch (error) {
			console.error(error);
		}
	};

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
        },
        divider: {
            marginTop: "1em",
            marginBottom: "1em",
        }
    }));

    const classes = useStyles();
    const auth = useAuth();
    return (
        <>
            <Container component="main" maxWidth="sm">
			    {auth.isLogged() ? <Redirect to="/panel" /> : ""}
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Registro de donador
                    </Typography>
                    <form 
                        className={classes.form}
                        onSubmit={sendData}
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
                                    error={!!errors.first_name}
                                    helperText={errors.first_name}
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
                                    error={!!errors.last_name}
                                    helperText={errors.last_name}
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
                                        error={!!errors.birthday}
                                        helperText={errors.birthday}
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
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl
                                    required
                                    fullWidth
                                    variant="outlined"
                                    error={!!errors.password}
                                >
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
                                    <FormHelperText>{errors.password}</FormHelperText>
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
                            <Grid item xs={4}>
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.blood_type}
                                    required
                                >
                                    <InputLabel htmlFor="blood_type">Tipo de sangre</InputLabel>
                                    <Select
                                        id="blood_type"
                                        name="blood_type"
                                        value={datos.blood_type}
                                        label="Tipo de sangre"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="A+">A+</MenuItem>
                                        <MenuItem value="A-">A-</MenuItem>
                                        <MenuItem value="B+">B+</MenuItem>
                                        <MenuItem value="B-">B-</MenuItem>
                                        <MenuItem value="AB+">AB+</MenuItem>
                                        <MenuItem value="AB-">AB-</MenuItem>
                                        <MenuItem value="O+">O+</MenuItem>
                                        <MenuItem value="O-">O-</MenuItem>
                                    </Select>

                                    <FormHelperText>{errors.blood_type}</FormHelperText>
                                </FormControl>                
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    autoComplete="certified_file"
                                    name="certified_file"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="certified_file"
                                    label="Certificado médico"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Divider className={classes.divider} />
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question1"
                                    name="question1"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question1"
                                    label="Pregunta 1"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question2"
                                    name="question2"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question2"
                                    label="Pregunta 2"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question3"
                                    name="question3"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question3"
                                    label="Pregunta 3"
                                    onChange={handleFormAnswers}
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
                                <Link href="SignIn" variant="body1">
                                    ¿Necesitas a un donador? Registrate como Receptor aquí
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="LogIn" variant="body1">
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


export default SigninDonor;
import React, {useState} from 'react';
import Redirect from "react-router-dom/Redirect";

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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import FormHelperText from '@material-ui/core/FormHelperText';

//Autenticación
import useAuth from "./Auth/useAuth";
//Estilos css
import "../css/Form.css";

function SigninDonor() {
    const [datos, setDatos] = useState({        
        "curp": "",
        "first_name": "",
        "last_name": "",
        "birthday": "",
        "gender": "",
        "email": "",
        "phone_number": "",
        "place_of_residence": "",
        "password":"",
        "blood_type": "",
        "form_answers": {}
    })
    const [birthday, setBirthday] = React.useState(new Date());
    const[showPassword, setShowPassword] = React.useState(false);
    const [formAnswers, setFormAnswers] = React.useState({});
    const [errors, setErrors] = React.useState({
    });
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value.trim()
        })
    }
    const handleFormAnswers = (event) => {
        setFormAnswers({
            ...formAnswers,
            [event.target.name] : event.target.value.trim()
        });
    }
    React.useEffect(() => {
        setDatos({
            ...datos,
            "form_answers" : formAnswers
        })
    }, [formAnswers]);
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
				"Accept": "application/json",
			},
			body: JSON.stringify(data),
		});
	};
	const sendData = async (event) => {
		event.preventDefault();

		//Servidor
		const config = {
			url: "https://blood-donors-v1.herokuapp.com/v1/donors/",
			method: "POST",
		};
		try {
			const response = await goToBackend(config, datos);
			if (!response.ok) {
                const errorss = await response.json();
				setErrors({...errorss.errors});
                return;
			}
			const user = await response.json();
            setErrors({});
            auth.login(user.user.token);
		} catch (error) {
			console.error(error);
		}
	};

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
        },
        divider: {
            marginTop: "1em",
            marginBottom: "1em",
        }
    }));

    const classes = useStyles();
    const auth = useAuth();
    return (
        <>
            <Container component="main" maxWidth="sm">
			    {auth.isLogged() ? <Redirect to="/panel" /> : ""}
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Registro de donador
                    </Typography>
                    <form 
                        className={classes.form}
                        onSubmit={sendData}
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
                                    error={!!errors.first_name}
                                    helperText={errors.first_name}
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
                                    error={!!errors.last_name}
                                    helperText={errors.last_name}
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
                                        error={!!errors.birthday}
                                        helperText={errors.birthday}
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
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl
                                    required
                                    fullWidth
                                    variant="outlined"
                                    error={!!errors.password}
                                >
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
                                    <FormHelperText>{errors.password}</FormHelperText>
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
                            <Grid item xs={4}>
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.blood_type}
                                    required
                                >
                                    <InputLabel htmlFor="blood_type">Tipo de sangre</InputLabel>
                                    <Select
                                        id="blood_type"
                                        name="blood_type"
                                        value={datos.blood_type}
                                        label="Tipo de sangre"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="A+">A+</MenuItem>
                                        <MenuItem value="A-">A-</MenuItem>
                                        <MenuItem value="B+">B+</MenuItem>
                                        <MenuItem value="B-">B-</MenuItem>
                                        <MenuItem value="AB+">AB+</MenuItem>
                                        <MenuItem value="AB-">AB-</MenuItem>
                                        <MenuItem value="O+">O+</MenuItem>
                                        <MenuItem value="O-">O-</MenuItem>
                                    </Select>

                                    <FormHelperText>{errors.blood_type}</FormHelperText>
                                </FormControl>                
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    autoComplete="certified_file"
                                    name="certified_file"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="certified_file"
                                    label="Certificado médico"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Divider className={classes.divider} />
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question1"
                                    name="question1"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question1"
                                    label="Pregunta 1"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question2"
                                    name="question2"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question2"
                                    label="Pregunta 2"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question3"
                                    name="question3"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question3"
                                    label="Pregunta 3"
                                    onChange={handleFormAnswers}
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
                                <Link href="SignIn" variant="body1">
                                    ¿Necesitas a un donador? Registrate como Receptor aquí
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="LogIn" variant="body1">
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


export default SigninDonor;
import React, {useState} from 'react';
import Redirect from "react-router-dom/Redirect";

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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import FormHelperText from '@material-ui/core/FormHelperText';

//Autenticación
import useAuth from "./Auth/useAuth";
//Estilos css
import "../css/Form.css";

function SigninDonor() {
    const [datos, setDatos] = useState({        
        "curp": "",
        "first_name": "",
        "last_name": "",
        "birthday": "",
        "gender": "",
        "email": "",
        "phone_number": "",
        "place_of_residence": "",
        "password":"",
        "blood_type": "",
        "form_answers": {}
    })
    const [birthday, setBirthday] = React.useState(new Date());
    const[showPassword, setShowPassword] = React.useState(false);
    const [formAnswers, setFormAnswers] = React.useState({});
    const [errors, setErrors] = React.useState({
    });
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value.trim()
        })
    }
    const handleFormAnswers = (event) => {
        setFormAnswers({
            ...formAnswers,
            [event.target.name] : event.target.value.trim()
        });
    }
    React.useEffect(() => {
        setDatos({
            ...datos,
            "form_answers" : formAnswers
        })
    }, [formAnswers]);
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
				"Accept": "application/json",
			},
			body: JSON.stringify(data),
		});
	};
	const sendData = async (event) => {
		event.preventDefault();

		//Servidor
		const config = {
			url: "https://blood-donors-v1.herokuapp.com/v1/donors/",
			method: "POST",
		};
		try {
			const response = await goToBackend(config, datos);
			if (!response.ok) {
                const errorss = await response.json();
				setErrors({...errorss.errors});
                return;
			}
			const user = await response.json();
            setErrors({});
            auth.login(user.user.token);
		} catch (error) {
			console.error(error);
		}
	};

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
        },
        divider: {
            marginTop: "1em",
            marginBottom: "1em",
        }
    }));

    const classes = useStyles();
    const auth = useAuth();
    return (
        <>
            <Container component="main" maxWidth="sm">
			    {auth.isLogged() ? <Redirect to="/panel" /> : ""}
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Registro de donador
                    </Typography>
                    <form 
                        className={classes.form}
                        onSubmit={sendData}
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
                                    error={!!errors.first_name}
                                    helperText={errors.first_name}
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
                                    error={!!errors.last_name}
                                    helperText={errors.last_name}
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
                                        error={!!errors.birthday}
                                        helperText={errors.birthday}
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
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl
                                    required
                                    fullWidth
                                    variant="outlined"
                                    error={!!errors.password}
                                >
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
                                    <FormHelperText>{errors.password}</FormHelperText>
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
                            <Grid item xs={4}>
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.blood_type}
                                    required
                                >
                                    <InputLabel htmlFor="blood_type">Tipo de sangre</InputLabel>
                                    <Select
                                        id="blood_type"
                                        name="blood_type"
                                        value={datos.blood_type}
                                        label="Tipo de sangre"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="A+">A+</MenuItem>
                                        <MenuItem value="A-">A-</MenuItem>
                                        <MenuItem value="B+">B+</MenuItem>
                                        <MenuItem value="B-">B-</MenuItem>
                                        <MenuItem value="AB+">AB+</MenuItem>
                                        <MenuItem value="AB-">AB-</MenuItem>
                                        <MenuItem value="O+">O+</MenuItem>
                                        <MenuItem value="O-">O-</MenuItem>
                                    </Select>

                                    <FormHelperText>{errors.blood_type}</FormHelperText>
                                </FormControl>                
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    autoComplete="certified_file"
                                    name="certified_file"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="certified_file"
                                    label="Certificado médico"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Divider className={classes.divider} />
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question1"
                                    name="question1"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question1"
                                    label="Pregunta 1"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question2"
                                    name="question2"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question2"
                                    label="Pregunta 2"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question3"
                                    name="question3"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question3"
                                    label="Pregunta 3"
                                    onChange={handleFormAnswers}
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
                                <Link href="SignIn" variant="body1">
                                    ¿Necesitas a un donador? Registrate como Receptor aquí
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="LogIn" variant="body1">
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


export default SigninDonor;
import React, {useState} from 'react';
import Redirect from "react-router-dom/Redirect";

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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import FormHelperText from '@material-ui/core/FormHelperText';

//Autenticación
import useAuth from "./Auth/useAuth";
//Estilos css
import "../css/Form.css";

function SigninDonor() {
    const [datos, setDatos] = useState({        
        "curp": "",
        "first_name": "",
        "last_name": "",
        "birthday": "",
        "gender": "",
        "email": "",
        "phone_number": "",
        "place_of_residence": "",
        "password":"",
        "blood_type": "",
        "form_answers": {}
    })
    const [birthday, setBirthday] = React.useState(new Date());
    const[showPassword, setShowPassword] = React.useState(false);
    const [formAnswers, setFormAnswers] = React.useState({});
    const [errors, setErrors] = React.useState({
    });
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value.trim()
        })
    }
    const handleFormAnswers = (event) => {
        setFormAnswers({
            ...formAnswers,
            [event.target.name] : event.target.value.trim()
        });
    }
    React.useEffect(() => {
        setDatos({
            ...datos,
            "form_answers" : formAnswers
        })
    }, [formAnswers]);
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
				"Accept": "application/json",
			},
			body: JSON.stringify(data),
		});
	};
	const sendData = async (event) => {
		event.preventDefault();

		//Servidor
		const config = {
			url: "https://blood-donors-v1.herokuapp.com/v1/donors/",
			method: "POST",
		};
		try {
			const response = await goToBackend(config, datos);
			if (!response.ok) {
                const errorss = await response.json();
				setErrors({...errorss.errors});
                return;
			}
			const user = await response.json();
            setErrors({});
            auth.login(user.user.token);
		} catch (error) {
			console.error(error);
		}
	};

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
        },
        divider: {
            marginTop: "1em",
            marginBottom: "1em",
        }
    }));

    const classes = useStyles();
    const auth = useAuth();
    return (
        <>
            <Container component="main" maxWidth="sm">
			    {auth.isLogged() ? <Redirect to="/panel" /> : ""}
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Registro de donador
                    </Typography>
                    <form 
                        className={classes.form}
                        onSubmit={sendData}
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
                                    error={!!errors.first_name}
                                    helperText={errors.first_name}
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
                                    error={!!errors.last_name}
                                    helperText={errors.last_name}
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
                                        error={!!errors.birthday}
                                        helperText={errors.birthday}
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
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl
                                    required
                                    fullWidth
                                    variant="outlined"
                                    error={!!errors.password}
                                >
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
                                    <FormHelperText>{errors.password}</FormHelperText>
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
                            <Grid item xs={4}>
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.blood_type}
                                    required
                                >
                                    <InputLabel htmlFor="blood_type">Tipo de sangre</InputLabel>
                                    <Select
                                        id="blood_type"
                                        name="blood_type"
                                        value={datos.blood_type}
                                        label="Tipo de sangre"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="A+">A+</MenuItem>
                                        <MenuItem value="A-">A-</MenuItem>
                                        <MenuItem value="B+">B+</MenuItem>
                                        <MenuItem value="B-">B-</MenuItem>
                                        <MenuItem value="AB+">AB+</MenuItem>
                                        <MenuItem value="AB-">AB-</MenuItem>
                                        <MenuItem value="O+">O+</MenuItem>
                                        <MenuItem value="O-">O-</MenuItem>
                                    </Select>

                                    <FormHelperText>{errors.blood_type}</FormHelperText>
                                </FormControl>                
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    autoComplete="certified_file"
                                    name="certified_file"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="certified_file"
                                    label="Certificado médico"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Divider className={classes.divider} />
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question1"
                                    name="question1"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question1"
                                    label="Pregunta 1"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question2"
                                    name="question2"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question2"
                                    label="Pregunta 2"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question3"
                                    name="question3"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question3"
                                    label="Pregunta 3"
                                    onChange={handleFormAnswers}
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
                                <Link href="SignIn" variant="body1">
                                    ¿Necesitas a un donador? Registrate como Receptor aquí
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="LogIn" variant="body1">
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


export default SigninDonor;
import React, {useState} from 'react';
import Redirect from "react-router-dom/Redirect";

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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import FormHelperText from '@material-ui/core/FormHelperText';

//Autenticación
import useAuth from "./Auth/useAuth";
//Estilos css
import "../css/Form.css";

function SigninDonor() {
    const [datos, setDatos] = useState({        
        "curp": "",
        "first_name": "",
        "last_name": "",
        "birthday": "",
        "gender": "",
        "email": "",
        "phone_number": "",
        "place_of_residence": "",
        "password":"",
        "blood_type": "",
        "form_answers": {}
    })
    const [birthday, setBirthday] = React.useState(new Date());
    const[showPassword, setShowPassword] = React.useState(false);
    const [formAnswers, setFormAnswers] = React.useState({});
    const [errors, setErrors] = React.useState({
    });
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value.trim()
        })
    }
    const handleFormAnswers = (event) => {
        setFormAnswers({
            ...formAnswers,
            [event.target.name] : event.target.value.trim()
        });
    }
    React.useEffect(() => {
        setDatos({
            ...datos,
            "form_answers" : formAnswers
        })
    }, [formAnswers]);
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
				"Accept": "application/json",
			},
			body: JSON.stringify(data),
		});
	};
	const sendData = async (event) => {
		event.preventDefault();

		//Servidor
		const config = {
			url: "https://blood-donors-v1.herokuapp.com/v1/donors/",
			method: "POST",
		};
		try {
			const response = await goToBackend(config, datos);
			if (!response.ok) {
                const errorss = await response.json();
				setErrors({...errorss.errors});
                return;
			}
			const user = await response.json();
            setErrors({});
            auth.login(user.user.token);
		} catch (error) {
			console.error(error);
		}
	};

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
        },
        divider: {
            marginTop: "1em",
            marginBottom: "1em",
        }
    }));

    const classes = useStyles();
    const auth = useAuth();
    return (
        <>
            <Container component="main" maxWidth="sm">
			    {auth.isLogged() ? <Redirect to="/panel" /> : ""}
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Registro de donador
                    </Typography>
                    <form 
                        className={classes.form}
                        onSubmit={sendData}
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
                                    error={!!errors.first_name}
                                    helperText={errors.first_name}
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
                                    error={!!errors.last_name}
                                    helperText={errors.last_name}
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
                                        error={!!errors.birthday}
                                        helperText={errors.birthday}
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
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl
                                    required
                                    fullWidth
                                    variant="outlined"
                                    error={!!errors.password}
                                >
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
                                    <FormHelperText>{errors.password}</FormHelperText>
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
                            <Grid item xs={4}>
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.blood_type}
                                    required
                                >
                                    <InputLabel htmlFor="blood_type">Tipo de sangre</InputLabel>
                                    <Select
                                        id="blood_type"
                                        name="blood_type"
                                        value={datos.blood_type}
                                        label="Tipo de sangre"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="A+">A+</MenuItem>
                                        <MenuItem value="A-">A-</MenuItem>
                                        <MenuItem value="B+">B+</MenuItem>
                                        <MenuItem value="B-">B-</MenuItem>
                                        <MenuItem value="AB+">AB+</MenuItem>
                                        <MenuItem value="AB-">AB-</MenuItem>
                                        <MenuItem value="O+">O+</MenuItem>
                                        <MenuItem value="O-">O-</MenuItem>
                                    </Select>

                                    <FormHelperText>{errors.blood_type}</FormHelperText>
                                </FormControl>                
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    autoComplete="certified_file"
                                    name="certified_file"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="certified_file"
                                    label="Certificado médico"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Divider className={classes.divider} />
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question1"
                                    name="question1"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question1"
                                    label="Pregunta 1"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question2"
                                    name="question2"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question2"
                                    label="Pregunta 2"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question3"
                                    name="question3"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question3"
                                    label="Pregunta 3"
                                    onChange={handleFormAnswers}
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
                                <Link href="SignIn" variant="body1">
                                    ¿Necesitas a un donador? Registrate como Receptor aquí
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="LogIn" variant="body1">
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


export default SigninDonor;
import React, {useState} from 'react';
import Redirect from "react-router-dom/Redirect";

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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import FormHelperText from '@material-ui/core/FormHelperText';

//Autenticación
import useAuth from "./Auth/useAuth";
//Estilos css
import "../css/Form.css";

function SigninDonor() {
    const [datos, setDatos] = useState({        
        "curp": "",
        "first_name": "",
        "last_name": "",
        "birthday": "",
        "gender": "",
        "email": "",
        "phone_number": "",
        "place_of_residence": "",
        "password":"",
        "blood_type": "",
        "form_answers": {}
    })
    const [birthday, setBirthday] = React.useState(new Date());
    const[showPassword, setShowPassword] = React.useState(false);
    const [formAnswers, setFormAnswers] = React.useState({});
    const [errors, setErrors] = React.useState({
    });
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value.trim()
        })
    }
    const handleFormAnswers = (event) => {
        setFormAnswers({
            ...formAnswers,
            [event.target.name] : event.target.value.trim()
        });
    }
    React.useEffect(() => {
        setDatos({
            ...datos,
            "form_answers" : formAnswers
        })
    }, [formAnswers]);
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
				"Accept": "application/json",
			},
			body: JSON.stringify(data),
		});
	};
	const sendData = async (event) => {
		event.preventDefault();

		//Servidor
		const config = {
			url: "https://blood-donors-v1.herokuapp.com/v1/donors/",
			method: "POST",
		};
		try {
			const response = await goToBackend(config, datos);
			if (!response.ok) {
                const errorss = await response.json();
				setErrors({...errorss.errors});
                return;
			}
			const user = await response.json();
            setErrors({});
            auth.login(user.user.token);
		} catch (error) {
			console.error(error);
		}
	};

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
        },
        divider: {
            marginTop: "1em",
            marginBottom: "1em",
        }
    }));

    const classes = useStyles();
    const auth = useAuth();
    return (
        <>
            <Container component="main" maxWidth="sm">
			    {auth.isLogged() ? <Redirect to="/panel" /> : ""}
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Registro de donador
                    </Typography>
                    <form 
                        className={classes.form}
                        onSubmit={sendData}
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
                                    error={!!errors.first_name}
                                    helperText={errors.first_name}
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
                                    error={!!errors.last_name}
                                    helperText={errors.last_name}
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
                                        error={!!errors.birthday}
                                        helperText={errors.birthday}
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
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl
                                    required
                                    fullWidth
                                    variant="outlined"
                                    error={!!errors.password}
                                >
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
                                    <FormHelperText>{errors.password}</FormHelperText>
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
                            <Grid item xs={4}>
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.blood_type}
                                    required
                                >
                                    <InputLabel htmlFor="blood_type">Tipo de sangre</InputLabel>
                                    <Select
                                        id="blood_type"
                                        name="blood_type"
                                        value={datos.blood_type}
                                        label="Tipo de sangre"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="A+">A+</MenuItem>
                                        <MenuItem value="A-">A-</MenuItem>
                                        <MenuItem value="B+">B+</MenuItem>
                                        <MenuItem value="B-">B-</MenuItem>
                                        <MenuItem value="AB+">AB+</MenuItem>
                                        <MenuItem value="AB-">AB-</MenuItem>
                                        <MenuItem value="O+">O+</MenuItem>
                                        <MenuItem value="O-">O-</MenuItem>
                                    </Select>

                                    <FormHelperText>{errors.blood_type}</FormHelperText>
                                </FormControl>                
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    autoComplete="certified_file"
                                    name="certified_file"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="certified_file"
                                    label="Certificado médico"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Divider className={classes.divider} />
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question1"
                                    name="question1"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question1"
                                    label="Pregunta 1"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question2"
                                    name="question2"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question2"
                                    label="Pregunta 2"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question3"
                                    name="question3"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question3"
                                    label="Pregunta 3"
                                    onChange={handleFormAnswers}
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
                                <Link href="SignIn" variant="body1">
                                    ¿Necesitas a un donador? Registrate como Receptor aquí
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="LogIn" variant="body1">
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


export default SigninDonor;
import React, {useState} from 'react';
import Redirect from "react-router-dom/Redirect";

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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import FormHelperText from '@material-ui/core/FormHelperText';

//Autenticación
import useAuth from "./Auth/useAuth";
//Estilos css
import "../css/Form.css";

function SigninDonor() {
    const [datos, setDatos] = useState({        
        "curp": "",
        "first_name": "",
        "last_name": "",
        "birthday": "",
        "gender": "",
        "email": "",
        "phone_number": "",
        "place_of_residence": "",
        "password":"",
        "blood_type": "",
        "form_answers": {}
    })
    const [birthday, setBirthday] = React.useState(new Date());
    const[showPassword, setShowPassword] = React.useState(false);
    const [formAnswers, setFormAnswers] = React.useState({});
    const [errors, setErrors] = React.useState({
    });
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value.trim()
        })
    }
    const handleFormAnswers = (event) => {
        setFormAnswers({
            ...formAnswers,
            [event.target.name] : event.target.value.trim()
        });
    }
    React.useEffect(() => {
        setDatos({
            ...datos,
            "form_answers" : formAnswers
        })
    }, [formAnswers]);
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
				"Accept": "application/json",
			},
			body: JSON.stringify(data),
		});
	};
	const sendData = async (event) => {
		event.preventDefault();

		//Servidor
		const config = {
			url: "https://blood-donors-v1.herokuapp.com/v1/donors/",
			method: "POST",
		};
		try {
			const response = await goToBackend(config, datos);
			if (!response.ok) {
                const errorss = await response.json();
				setErrors({...errorss.errors});
                return;
			}
			const user = await response.json();
            setErrors({});
            auth.login(user.user.token);
		} catch (error) {
			console.error(error);
		}
	};

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
        },
        divider: {
            marginTop: "1em",
            marginBottom: "1em",
        }
    }));

    const classes = useStyles();
    const auth = useAuth();
    return (
        <>
            <Container component="main" maxWidth="sm">
			    {auth.isLogged() ? <Redirect to="/panel" /> : ""}
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Registro de donador
                    </Typography>
                    <form 
                        className={classes.form}
                        onSubmit={sendData}
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
                                    error={!!errors.first_name}
                                    helperText={errors.first_name}
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
                                    error={!!errors.last_name}
                                    helperText={errors.last_name}
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
                                        error={!!errors.birthday}
                                        helperText={errors.birthday}
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
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl
                                    required
                                    fullWidth
                                    variant="outlined"
                                    error={!!errors.password}
                                >
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
                                    <FormHelperText>{errors.password}</FormHelperText>
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
                            <Grid item xs={4}>
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.blood_type}
                                    required
                                >
                                    <InputLabel htmlFor="blood_type">Tipo de sangre</InputLabel>
                                    <Select
                                        id="blood_type"
                                        name="blood_type"
                                        value={datos.blood_type}
                                        label="Tipo de sangre"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="A+">A+</MenuItem>
                                        <MenuItem value="A-">A-</MenuItem>
                                        <MenuItem value="B+">B+</MenuItem>
                                        <MenuItem value="B-">B-</MenuItem>
                                        <MenuItem value="AB+">AB+</MenuItem>
                                        <MenuItem value="AB-">AB-</MenuItem>
                                        <MenuItem value="O+">O+</MenuItem>
                                        <MenuItem value="O-">O-</MenuItem>
                                    </Select>

                                    <FormHelperText>{errors.blood_type}</FormHelperText>
                                </FormControl>                
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    autoComplete="certified_file"
                                    name="certified_file"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="certified_file"
                                    label="Certificado médico"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Divider className={classes.divider} />
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question1"
                                    name="question1"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question1"
                                    label="Pregunta 1"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question2"
                                    name="question2"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question2"
                                    label="Pregunta 2"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question3"
                                    name="question3"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question3"
                                    label="Pregunta 3"
                                    onChange={handleFormAnswers}
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
                                <Link href="SignIn" variant="body1">
                                    ¿Necesitas a un donador? Registrate como Receptor aquí
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="LogIn" variant="body1">
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


export default SigninDonor;
import React, {useState} from 'react';
import Redirect from "react-router-dom/Redirect";

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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import FormHelperText from '@material-ui/core/FormHelperText';

//Autenticación
import useAuth from "./Auth/useAuth";
//Estilos css
import "../css/Form.css";

function SigninDonor() {
    const [datos, setDatos] = useState({        
        "curp": "",
        "first_name": "",
        "last_name": "",
        "birthday": "",
        "gender": "",
        "email": "",
        "phone_number": "",
        "place_of_residence": "",
        "password":"",
        "blood_type": "",
        "form_answers": {}
    })
    const [birthday, setBirthday] = React.useState(new Date());
    const[showPassword, setShowPassword] = React.useState(false);
    const [formAnswers, setFormAnswers] = React.useState({});
    const [errors, setErrors] = React.useState({
    });
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value.trim()
        })
    }
    const handleFormAnswers = (event) => {
        setFormAnswers({
            ...formAnswers,
            [event.target.name] : event.target.value.trim()
        });
    }
    React.useEffect(() => {
        setDatos({
            ...datos,
            "form_answers" : formAnswers
        })
    }, [formAnswers]);
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
				"Accept": "application/json",
			},
			body: JSON.stringify(data),
		});
	};
	const sendData = async (event) => {
		event.preventDefault();

		//Servidor
		const config = {
			url: "https://blood-donors-v1.herokuapp.com/v1/donors/",
			method: "POST",
		};
		try {
			const response = await goToBackend(config, datos);
			if (!response.ok) {
                const errorss = await response.json();
				setErrors({...errorss.errors});
                return;
			}
			const user = await response.json();
            setErrors({});
            auth.login(user.user.token);
		} catch (error) {
			console.error(error);
		}
	};

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
        },
        divider: {
            marginTop: "1em",
            marginBottom: "1em",
        }
    }));

    const classes = useStyles();
    const auth = useAuth();
    return (
        <>
            <Container component="main" maxWidth="sm">
			    {auth.isLogged() ? <Redirect to="/panel" /> : ""}
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Registro de donador
                    </Typography>
                    <form 
                        className={classes.form}
                        onSubmit={sendData}
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
                                    error={!!errors.first_name}
                                    helperText={errors.first_name}
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
                                    error={!!errors.last_name}
                                    helperText={errors.last_name}
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
                                        error={!!errors.birthday}
                                        helperText={errors.birthday}
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
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl
                                    required
                                    fullWidth
                                    variant="outlined"
                                    error={!!errors.password}
                                >
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
                                    <FormHelperText>{errors.password}</FormHelperText>
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
                            <Grid item xs={4}>
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.blood_type}
                                    required
                                >
                                    <InputLabel htmlFor="blood_type">Tipo de sangre</InputLabel>
                                    <Select
                                        id="blood_type"
                                        name="blood_type"
                                        value={datos.blood_type}
                                        label="Tipo de sangre"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="A+">A+</MenuItem>
                                        <MenuItem value="A-">A-</MenuItem>
                                        <MenuItem value="B+">B+</MenuItem>
                                        <MenuItem value="B-">B-</MenuItem>
                                        <MenuItem value="AB+">AB+</MenuItem>
                                        <MenuItem value="AB-">AB-</MenuItem>
                                        <MenuItem value="O+">O+</MenuItem>
                                        <MenuItem value="O-">O-</MenuItem>
                                    </Select>

                                    <FormHelperText>{errors.blood_type}</FormHelperText>
                                </FormControl>                
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    autoComplete="certified_file"
                                    name="certified_file"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="certified_file"
                                    label="Certificado médico"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Divider className={classes.divider} />
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question1"
                                    name="question1"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question1"
                                    label="Pregunta 1"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question2"
                                    name="question2"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question2"
                                    label="Pregunta 2"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question3"
                                    name="question3"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question3"
                                    label="Pregunta 3"
                                    onChange={handleFormAnswers}
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
                                <Link href="SignIn" variant="body1">
                                    ¿Necesitas a un donador? Registrate como Receptor aquí
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="LogIn" variant="body1">
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


export default SigninDonor;
import React, {useState} from 'react';
import Redirect from "react-router-dom/Redirect";

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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import FormHelperText from '@material-ui/core/FormHelperText';

//Autenticación
import useAuth from "./Auth/useAuth";
//Estilos css
import "../css/Form.css";

function SigninDonor() {
    const [datos, setDatos] = useState({        
        "curp": "",
        "first_name": "",
        "last_name": "",
        "birthday": "",
        "gender": "",
        "email": "",
        "phone_number": "",
        "place_of_residence": "",
        "password":"",
        "blood_type": "",
        "form_answers": {}
    })
    const [birthday, setBirthday] = React.useState(new Date());
    const[showPassword, setShowPassword] = React.useState(false);
    const [formAnswers, setFormAnswers] = React.useState({});
    const [errors, setErrors] = React.useState({
    });
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value.trim()
        })
    }
    const handleFormAnswers = (event) => {
        setFormAnswers({
            ...formAnswers,
            [event.target.name] : event.target.value.trim()
        });
    }
    React.useEffect(() => {
        setDatos({
            ...datos,
            "form_answers" : formAnswers
        })
    }, [formAnswers]);
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
				"Accept": "application/json",
			},
			body: JSON.stringify(data),
		});
	};
	const sendData = async (event) => {
		event.preventDefault();

		//Servidor
		const config = {
			url: "https://blood-donors-v1.herokuapp.com/v1/donors/",
			method: "POST",
		};
		try {
			const response = await goToBackend(config, datos);
			if (!response.ok) {
                const errorss = await response.json();
				setErrors({...errorss.errors});
                return;
			}
			const user = await response.json();
            setErrors({});
            auth.login(user.user.token);
		} catch (error) {
			console.error(error);
		}
	};

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
        },
        divider: {
            marginTop: "1em",
            marginBottom: "1em",
        }
    }));

    const classes = useStyles();
    const auth = useAuth();
    return (
        <>
            <Container component="main" maxWidth="sm">
			    {auth.isLogged() ? <Redirect to="/panel" /> : ""}
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Registro de donador
                    </Typography>
                    <form 
                        className={classes.form}
                        onSubmit={sendData}
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
                                    error={!!errors.first_name}
                                    helperText={errors.first_name}
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
                                    error={!!errors.last_name}
                                    helperText={errors.last_name}
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
                                        error={!!errors.birthday}
                                        helperText={errors.birthday}
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
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl
                                    required
                                    fullWidth
                                    variant="outlined"
                                    error={!!errors.password}
                                >
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
                                    <FormHelperText>{errors.password}</FormHelperText>
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
                            <Grid item xs={4}>
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.blood_type}
                                    required
                                >
                                    <InputLabel htmlFor="blood_type">Tipo de sangre</InputLabel>
                                    <Select
                                        id="blood_type"
                                        name="blood_type"
                                        value={datos.blood_type}
                                        label="Tipo de sangre"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="A+">A+</MenuItem>
                                        <MenuItem value="A-">A-</MenuItem>
                                        <MenuItem value="B+">B+</MenuItem>
                                        <MenuItem value="B-">B-</MenuItem>
                                        <MenuItem value="AB+">AB+</MenuItem>
                                        <MenuItem value="AB-">AB-</MenuItem>
                                        <MenuItem value="O+">O+</MenuItem>
                                        <MenuItem value="O-">O-</MenuItem>
                                    </Select>

                                    <FormHelperText>{errors.blood_type}</FormHelperText>
                                </FormControl>                
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    autoComplete="certified_file"
                                    name="certified_file"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="certified_file"
                                    label="Certificado médico"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Divider className={classes.divider} />
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question1"
                                    name="question1"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question1"
                                    label="Pregunta 1"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question2"
                                    name="question2"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question2"
                                    label="Pregunta 2"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question3"
                                    name="question3"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question3"
                                    label="Pregunta 3"
                                    onChange={handleFormAnswers}
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
                                <Link href="SignIn" variant="body1">
                                    ¿Necesitas a un donador? Registrate como Receptor aquí
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="LogIn" variant="body1">
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


export default SigninDonor;
import React, {useState} from 'react';
import Redirect from "react-router-dom/Redirect";

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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import FormHelperText from '@material-ui/core/FormHelperText';

//Autenticación
import useAuth from "./Auth/useAuth";
//Estilos css
import "../css/Form.css";

function SigninDonor() {
    const [datos, setDatos] = useState({        
        "curp": "",
        "first_name": "",
        "last_name": "",
        "birthday": "",
        "gender": "",
        "email": "",
        "phone_number": "",
        "place_of_residence": "",
        "password":"",
        "blood_type": "",
        "form_answers": {}
    })
    const [birthday, setBirthday] = React.useState(new Date());
    const[showPassword, setShowPassword] = React.useState(false);
    const [formAnswers, setFormAnswers] = React.useState({});
    const [errors, setErrors] = React.useState({
    });
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value.trim()
        })
    }
    const handleFormAnswers = (event) => {
        setFormAnswers({
            ...formAnswers,
            [event.target.name] : event.target.value.trim()
        });
    }
    React.useEffect(() => {
        setDatos({
            ...datos,
            "form_answers" : formAnswers
        })
    }, [formAnswers]);
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
				"Accept": "application/json",
			},
			body: JSON.stringify(data),
		});
	};
	const sendData = async (event) => {
		event.preventDefault();

		//Servidor
		const config = {
			url: "https://blood-donors-v1.herokuapp.com/v1/donors/",
			method: "POST",
		};
		try {
			const response = await goToBackend(config, datos);
			if (!response.ok) {
                const errorss = await response.json();
				setErrors({...errorss.errors});
                return;
			}
			const user = await response.json();
            setErrors({});
            auth.login(user.user.token);
		} catch (error) {
			console.error(error);
		}
	};

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
        },
        divider: {
            marginTop: "1em",
            marginBottom: "1em",
        }
    }));

    const classes = useStyles();
    const auth = useAuth();
    return (
        <>
            <Container component="main" maxWidth="sm">
			    {auth.isLogged() ? <Redirect to="/panel" /> : ""}
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Registro de donador
                    </Typography>
                    <form 
                        className={classes.form}
                        onSubmit={sendData}
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
                                    error={!!errors.first_name}
                                    helperText={errors.first_name}
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
                                    error={!!errors.last_name}
                                    helperText={errors.last_name}
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
                                        error={!!errors.birthday}
                                        helperText={errors.birthday}
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
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl
                                    required
                                    fullWidth
                                    variant="outlined"
                                    error={!!errors.password}
                                >
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
                                    <FormHelperText>{errors.password}</FormHelperText>
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
                            <Grid item xs={4}>
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.blood_type}
                                    required
                                >
                                    <InputLabel htmlFor="blood_type">Tipo de sangre</InputLabel>
                                    <Select
                                        id="blood_type"
                                        name="blood_type"
                                        value={datos.blood_type}
                                        label="Tipo de sangre"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="A+">A+</MenuItem>
                                        <MenuItem value="A-">A-</MenuItem>
                                        <MenuItem value="B+">B+</MenuItem>
                                        <MenuItem value="B-">B-</MenuItem>
                                        <MenuItem value="AB+">AB+</MenuItem>
                                        <MenuItem value="AB-">AB-</MenuItem>
                                        <MenuItem value="O+">O+</MenuItem>
                                        <MenuItem value="O-">O-</MenuItem>
                                    </Select>

                                    <FormHelperText>{errors.blood_type}</FormHelperText>
                                </FormControl>                
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    autoComplete="certified_file"
                                    name="certified_file"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="certified_file"
                                    label="Certificado médico"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Divider className={classes.divider} />
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question1"
                                    name="question1"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question1"
                                    label="Pregunta 1"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question2"
                                    name="question2"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question2"
                                    label="Pregunta 2"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question3"
                                    name="question3"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question3"
                                    label="Pregunta 3"
                                    onChange={handleFormAnswers}
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
                                <Link href="SignIn" variant="body1">
                                    ¿Necesitas a un donador? Registrate como Receptor aquí
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="LogIn" variant="body1">
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


export default SigninDonor;
import React, {useState} from 'react';
import Redirect from "react-router-dom/Redirect";

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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import FormHelperText from '@material-ui/core/FormHelperText';

//Autenticación
import useAuth from "./Auth/useAuth";
//Estilos css
import "../css/Form.css";

function SigninDonor() {
    const [datos, setDatos] = useState({        
        "curp": "",
        "first_name": "",
        "last_name": "",
        "birthday": "",
        "gender": "",
        "email": "",
        "phone_number": "",
        "place_of_residence": "",
        "password":"",
        "blood_type": "",
        "form_answers": {}
    })
    const [birthday, setBirthday] = React.useState(new Date());
    const[showPassword, setShowPassword] = React.useState(false);
    const [formAnswers, setFormAnswers] = React.useState({});
    const [errors, setErrors] = React.useState({
    });
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value.trim()
        })
    }
    const handleFormAnswers = (event) => {
        setFormAnswers({
            ...formAnswers,
            [event.target.name] : event.target.value.trim()
        });
    }
    React.useEffect(() => {
        setDatos({
            ...datos,
            "form_answers" : formAnswers
        })
    }, [formAnswers]);
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
				"Accept": "application/json",
			},
			body: JSON.stringify(data),
		});
	};
	const sendData = async (event) => {
		event.preventDefault();

		//Servidor
		const config = {
			url: "https://blood-donors-v1.herokuapp.com/v1/donors/",
			method: "POST",
		};
		try {
			const response = await goToBackend(config, datos);
			if (!response.ok) {
                const errorss = await response.json();
				setErrors({...errorss.errors});
                return;
			}
			const user = await response.json();
            setErrors({});
            auth.login(user.user.token);
		} catch (error) {
			console.error(error);
		}
	};

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
        },
        divider: {
            marginTop: "1em",
            marginBottom: "1em",
        }
    }));

    const classes = useStyles();
    const auth = useAuth();
    return (
        <>
            <Container component="main" maxWidth="sm">
			    {auth.isLogged() ? <Redirect to="/panel" /> : ""}
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Registro de donador
                    </Typography>
                    <form 
                        className={classes.form}
                        onSubmit={sendData}
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
                                    error={!!errors.first_name}
                                    helperText={errors.first_name}
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
                                    error={!!errors.last_name}
                                    helperText={errors.last_name}
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
                                        error={!!errors.birthday}
                                        helperText={errors.birthday}
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
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl
                                    required
                                    fullWidth
                                    variant="outlined"
                                    error={!!errors.password}
                                >
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
                                    <FormHelperText>{errors.password}</FormHelperText>
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
                            <Grid item xs={4}>
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.blood_type}
                                    required
                                >
                                    <InputLabel htmlFor="blood_type">Tipo de sangre</InputLabel>
                                    <Select
                                        id="blood_type"
                                        name="blood_type"
                                        value={datos.blood_type}
                                        label="Tipo de sangre"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="A+">A+</MenuItem>
                                        <MenuItem value="A-">A-</MenuItem>
                                        <MenuItem value="B+">B+</MenuItem>
                                        <MenuItem value="B-">B-</MenuItem>
                                        <MenuItem value="AB+">AB+</MenuItem>
                                        <MenuItem value="AB-">AB-</MenuItem>
                                        <MenuItem value="O+">O+</MenuItem>
                                        <MenuItem value="O-">O-</MenuItem>
                                    </Select>

                                    <FormHelperText>{errors.blood_type}</FormHelperText>
                                </FormControl>                
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    autoComplete="certified_file"
                                    name="certified_file"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="certified_file"
                                    label="Certificado médico"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Divider className={classes.divider} />
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question1"
                                    name="question1"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question1"
                                    label="Pregunta 1"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question2"
                                    name="question2"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question2"
                                    label="Pregunta 2"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question3"
                                    name="question3"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question3"
                                    label="Pregunta 3"
                                    onChange={handleFormAnswers}
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
                                <Link href="SignIn" variant="body1">
                                    ¿Necesitas a un donador? Registrate como Receptor aquí
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="LogIn" variant="body1">
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


export default SigninDonor;
import React, {useState} from 'react';
import Redirect from "react-router-dom/Redirect";

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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import FormHelperText from '@material-ui/core/FormHelperText';

//Autenticación
import useAuth from "./Auth/useAuth";
//Estilos css
import "../css/Form.css";

function SigninDonor() {
    const [datos, setDatos] = useState({        
        "curp": "",
        "first_name": "",
        "last_name": "",
        "birthday": "",
        "gender": "",
        "email": "",
        "phone_number": "",
        "place_of_residence": "",
        "password":"",
        "blood_type": "",
        "form_answers": {}
    })
    const [birthday, setBirthday] = React.useState(new Date());
    const[showPassword, setShowPassword] = React.useState(false);
    const [formAnswers, setFormAnswers] = React.useState({});
    const [errors, setErrors] = React.useState({
    });
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value.trim()
        })
    }
    const handleFormAnswers = (event) => {
        setFormAnswers({
            ...formAnswers,
            [event.target.name] : event.target.value.trim()
        });
    }
    React.useEffect(() => {
        setDatos({
            ...datos,
            "form_answers" : formAnswers
        })
    }, [formAnswers]);
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
				"Accept": "application/json",
			},
			body: JSON.stringify(data),
		});
	};
	const sendData = async (event) => {
		event.preventDefault();

		//Servidor
		const config = {
			url: "https://blood-donors-v1.herokuapp.com/v1/donors/",
			method: "POST",
		};
		try {
			const response = await goToBackend(config, datos);
			if (!response.ok) {
                const errorss = await response.json();
				setErrors({...errorss.errors});
                return;
			}
			const user = await response.json();
            setErrors({});
            auth.login(user.user.token);
		} catch (error) {
			console.error(error);
		}
	};

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
        },
        divider: {
            marginTop: "1em",
            marginBottom: "1em",
        }
    }));

    const classes = useStyles();
    const auth = useAuth();
    return (
        <>
            <Container component="main" maxWidth="sm">
			    {auth.isLogged() ? <Redirect to="/panel" /> : ""}
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Registro de donador
                    </Typography>
                    <form 
                        className={classes.form}
                        onSubmit={sendData}
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
                                    error={!!errors.first_name}
                                    helperText={errors.first_name}
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
                                    error={!!errors.last_name}
                                    helperText={errors.last_name}
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
                                        error={!!errors.birthday}
                                        helperText={errors.birthday}
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
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl
                                    required
                                    fullWidth
                                    variant="outlined"
                                    error={!!errors.password}
                                >
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
                                    <FormHelperText>{errors.password}</FormHelperText>
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
                            <Grid item xs={4}>
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.blood_type}
                                    required
                                >
                                    <InputLabel htmlFor="blood_type">Tipo de sangre</InputLabel>
                                    <Select
                                        id="blood_type"
                                        name="blood_type"
                                        value={datos.blood_type}
                                        label="Tipo de sangre"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="A+">A+</MenuItem>
                                        <MenuItem value="A-">A-</MenuItem>
                                        <MenuItem value="B+">B+</MenuItem>
                                        <MenuItem value="B-">B-</MenuItem>
                                        <MenuItem value="AB+">AB+</MenuItem>
                                        <MenuItem value="AB-">AB-</MenuItem>
                                        <MenuItem value="O+">O+</MenuItem>
                                        <MenuItem value="O-">O-</MenuItem>
                                    </Select>

                                    <FormHelperText>{errors.blood_type}</FormHelperText>
                                </FormControl>                
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    autoComplete="certified_file"
                                    name="certified_file"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="certified_file"
                                    label="Certificado médico"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Divider className={classes.divider} />
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question1"
                                    name="question1"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question1"
                                    label="Pregunta 1"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question2"
                                    name="question2"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question2"
                                    label="Pregunta 2"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question3"
                                    name="question3"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question3"
                                    label="Pregunta 3"
                                    onChange={handleFormAnswers}
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
                                <Link href="SignIn" variant="body1">
                                    ¿Necesitas a un donador? Registrate como Receptor aquí
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="LogIn" variant="body1">
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


export default SigninDonor;
import React, {useState} from 'react';
import Redirect from "react-router-dom/Redirect";

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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import FormHelperText from '@material-ui/core/FormHelperText';

//Autenticación
import useAuth from "./Auth/useAuth";
//Estilos css
import "../css/Form.css";

function SigninDonor() {
    const [datos, setDatos] = useState({        
        "curp": "",
        "first_name": "",
        "last_name": "",
        "birthday": "",
        "gender": "",
        "email": "",
        "phone_number": "",
        "place_of_residence": "",
        "password":"",
        "blood_type": "",
        "form_answers": {}
    })
    const [birthday, setBirthday] = React.useState(new Date());
    const[showPassword, setShowPassword] = React.useState(false);
    const [formAnswers, setFormAnswers] = React.useState({});
    const [errors, setErrors] = React.useState({
    });
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value.trim()
        })
    }
    const handleFormAnswers = (event) => {
        setFormAnswers({
            ...formAnswers,
            [event.target.name] : event.target.value.trim()
        });
    }
    React.useEffect(() => {
        setDatos({
            ...datos,
            "form_answers" : formAnswers
        })
    }, [formAnswers]);
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
				"Accept": "application/json",
			},
			body: JSON.stringify(data),
		});
	};
	const sendData = async (event) => {
		event.preventDefault();

		//Servidor
		const config = {
			url: "https://blood-donors-v1.herokuapp.com/v1/donors/",
			method: "POST",
		};
		try {
			const response = await goToBackend(config, datos);
			if (!response.ok) {
                const errorss = await response.json();
				setErrors({...errorss.errors});
                return;
			}
			const user = await response.json();
            setErrors({});
            auth.login(user.user.token);
		} catch (error) {
			console.error(error);
		}
	};

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
        },
        divider: {
            marginTop: "1em",
            marginBottom: "1em",
        }
    }));

    const classes = useStyles();
    const auth = useAuth();
    return (
        <>
            <Container component="main" maxWidth="sm">
			    {auth.isLogged() ? <Redirect to="/panel" /> : ""}
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Registro de donador
                    </Typography>
                    <form 
                        className={classes.form}
                        onSubmit={sendData}
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
                                    error={!!errors.first_name}
                                    helperText={errors.first_name}
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
                                    error={!!errors.last_name}
                                    helperText={errors.last_name}
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
                                        error={!!errors.birthday}
                                        helperText={errors.birthday}
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
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl
                                    required
                                    fullWidth
                                    variant="outlined"
                                    error={!!errors.password}
                                >
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
                                    <FormHelperText>{errors.password}</FormHelperText>
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
                            <Grid item xs={4}>
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.blood_type}
                                    required
                                >
                                    <InputLabel htmlFor="blood_type">Tipo de sangre</InputLabel>
                                    <Select
                                        id="blood_type"
                                        name="blood_type"
                                        value={datos.blood_type}
                                        label="Tipo de sangre"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="A+">A+</MenuItem>
                                        <MenuItem value="A-">A-</MenuItem>
                                        <MenuItem value="B+">B+</MenuItem>
                                        <MenuItem value="B-">B-</MenuItem>
                                        <MenuItem value="AB+">AB+</MenuItem>
                                        <MenuItem value="AB-">AB-</MenuItem>
                                        <MenuItem value="O+">O+</MenuItem>
                                        <MenuItem value="O-">O-</MenuItem>
                                    </Select>

                                    <FormHelperText>{errors.blood_type}</FormHelperText>
                                </FormControl>                
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    autoComplete="certified_file"
                                    name="certified_file"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="certified_file"
                                    label="Certificado médico"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Divider className={classes.divider} />
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question1"
                                    name="question1"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question1"
                                    label="Pregunta 1"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question2"
                                    name="question2"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question2"
                                    label="Pregunta 2"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question3"
                                    name="question3"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question3"
                                    label="Pregunta 3"
                                    onChange={handleFormAnswers}
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
                                <Link href="SignIn" variant="body1">
                                    ¿Necesitas a un donador? Registrate como Receptor aquí
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="LogIn" variant="body1">
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


export default SigninDonor;
import React, {useState} from 'react';
import Redirect from "react-router-dom/Redirect";

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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import FormHelperText from '@material-ui/core/FormHelperText';

//Autenticación
import useAuth from "./Auth/useAuth";
//Estilos css
import "../css/Form.css";

function SigninDonor() {
    const [datos, setDatos] = useState({        
        "curp": "",
        "first_name": "",
        "last_name": "",
        "birthday": "",
        "gender": "",
        "email": "",
        "phone_number": "",
        "place_of_residence": "",
        "password":"",
        "blood_type": "",
        "form_answers": {}
    })
    const [birthday, setBirthday] = React.useState(new Date());
    const[showPassword, setShowPassword] = React.useState(false);
    const [formAnswers, setFormAnswers] = React.useState({});
    const [errors, setErrors] = React.useState({
    });
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value.trim()
        })
    }
    const handleFormAnswers = (event) => {
        setFormAnswers({
            ...formAnswers,
            [event.target.name] : event.target.value.trim()
        });
    }
    React.useEffect(() => {
        setDatos({
            ...datos,
            "form_answers" : formAnswers
        })
    }, [formAnswers]);
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
				"Accept": "application/json",
			},
			body: JSON.stringify(data),
		});
	};
	const sendData = async (event) => {
		event.preventDefault();

		//Servidor
		const config = {
			url: "https://blood-donors-v1.herokuapp.com/v1/donors/",
			method: "POST",
		};
		try {
			const response = await goToBackend(config, datos);
			if (!response.ok) {
                const errorss = await response.json();
				setErrors({...errorss.errors});
                return;
			}
			const user = await response.json();
            setErrors({});
            auth.login(user.user.token);
		} catch (error) {
			console.error(error);
		}
	};

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
        },
        divider: {
            marginTop: "1em",
            marginBottom: "1em",
        }
    }));

    const classes = useStyles();
    const auth = useAuth();
    return (
        <>
            <Container component="main" maxWidth="sm">
			    {auth.isLogged() ? <Redirect to="/panel" /> : ""}
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Registro de donador
                    </Typography>
                    <form 
                        className={classes.form}
                        onSubmit={sendData}
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
                                    error={!!errors.first_name}
                                    helperText={errors.first_name}
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
                                    error={!!errors.last_name}
                                    helperText={errors.last_name}
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
                                        error={!!errors.birthday}
                                        helperText={errors.birthday}
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
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl
                                    required
                                    fullWidth
                                    variant="outlined"
                                    error={!!errors.password}
                                >
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
                                    <FormHelperText>{errors.password}</FormHelperText>
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
                            <Grid item xs={4}>
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.blood_type}
                                    required
                                >
                                    <InputLabel htmlFor="blood_type">Tipo de sangre</InputLabel>
                                    <Select
                                        id="blood_type"
                                        name="blood_type"
                                        value={datos.blood_type}
                                        label="Tipo de sangre"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="A+">A+</MenuItem>
                                        <MenuItem value="A-">A-</MenuItem>
                                        <MenuItem value="B+">B+</MenuItem>
                                        <MenuItem value="B-">B-</MenuItem>
                                        <MenuItem value="AB+">AB+</MenuItem>
                                        <MenuItem value="AB-">AB-</MenuItem>
                                        <MenuItem value="O+">O+</MenuItem>
                                        <MenuItem value="O-">O-</MenuItem>
                                    </Select>

                                    <FormHelperText>{errors.blood_type}</FormHelperText>
                                </FormControl>                
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    autoComplete="certified_file"
                                    name="certified_file"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="certified_file"
                                    label="Certificado médico"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Divider className={classes.divider} />
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question1"
                                    name="question1"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question1"
                                    label="Pregunta 1"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question2"
                                    name="question2"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question2"
                                    label="Pregunta 2"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question3"
                                    name="question3"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question3"
                                    label="Pregunta 3"
                                    onChange={handleFormAnswers}
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
                                <Link href="SignIn" variant="body1">
                                    ¿Necesitas a un donador? Registrate como Receptor aquí
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="LogIn" variant="body1">
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


export default SigninDonor;
import React, {useState} from 'react';
import Redirect from "react-router-dom/Redirect";

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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import FormHelperText from '@material-ui/core/FormHelperText';

//Autenticación
import useAuth from "./Auth/useAuth";
//Estilos css
import "../css/Form.css";

function SigninDonor() {
    const [datos, setDatos] = useState({        
        "curp": "",
        "first_name": "",
        "last_name": "",
        "birthday": "",
        "gender": "",
        "email": "",
        "phone_number": "",
        "place_of_residence": "",
        "password":"",
        "blood_type": "",
        "form_answers": {}
    })
    const [birthday, setBirthday] = React.useState(new Date());
    const[showPassword, setShowPassword] = React.useState(false);
    const [formAnswers, setFormAnswers] = React.useState({});
    const [errors, setErrors] = React.useState({
    });
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value.trim()
        })
    }
    const handleFormAnswers = (event) => {
        setFormAnswers({
            ...formAnswers,
            [event.target.name] : event.target.value.trim()
        });
    }
    React.useEffect(() => {
        setDatos({
            ...datos,
            "form_answers" : formAnswers
        })
    }, [formAnswers]);
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
				"Accept": "application/json",
			},
			body: JSON.stringify(data),
		});
	};
	const sendData = async (event) => {
		event.preventDefault();

		//Servidor
		const config = {
			url: "https://blood-donors-v1.herokuapp.com/v1/donors/",
			method: "POST",
		};
		try {
			const response = await goToBackend(config, datos);
			if (!response.ok) {
                const errorss = await response.json();
				setErrors({...errorss.errors});
                return;
			}
			const user = await response.json();
            setErrors({});
            auth.login(user.user.token);
		} catch (error) {
			console.error(error);
		}
	};

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
        },
        divider: {
            marginTop: "1em",
            marginBottom: "1em",
        }
    }));

    const classes = useStyles();
    const auth = useAuth();
    return (
        <>
            <Container component="main" maxWidth="sm">
			    {auth.isLogged() ? <Redirect to="/panel" /> : ""}
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Registro de donador
                    </Typography>
                    <form 
                        className={classes.form}
                        onSubmit={sendData}
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
                                    error={!!errors.first_name}
                                    helperText={errors.first_name}
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
                                    error={!!errors.last_name}
                                    helperText={errors.last_name}
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
                                        error={!!errors.birthday}
                                        helperText={errors.birthday}
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
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl
                                    required
                                    fullWidth
                                    variant="outlined"
                                    error={!!errors.password}
                                >
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
                                    <FormHelperText>{errors.password}</FormHelperText>
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
                            <Grid item xs={4}>
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.blood_type}
                                    required
                                >
                                    <InputLabel htmlFor="blood_type">Tipo de sangre</InputLabel>
                                    <Select
                                        id="blood_type"
                                        name="blood_type"
                                        value={datos.blood_type}
                                        label="Tipo de sangre"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="A+">A+</MenuItem>
                                        <MenuItem value="A-">A-</MenuItem>
                                        <MenuItem value="B+">B+</MenuItem>
                                        <MenuItem value="B-">B-</MenuItem>
                                        <MenuItem value="AB+">AB+</MenuItem>
                                        <MenuItem value="AB-">AB-</MenuItem>
                                        <MenuItem value="O+">O+</MenuItem>
                                        <MenuItem value="O-">O-</MenuItem>
                                    </Select>

                                    <FormHelperText>{errors.blood_type}</FormHelperText>
                                </FormControl>                
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    autoComplete="certified_file"
                                    name="certified_file"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="certified_file"
                                    label="Certificado médico"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Divider className={classes.divider} />
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question1"
                                    name="question1"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question1"
                                    label="Pregunta 1"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question2"
                                    name="question2"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question2"
                                    label="Pregunta 2"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question3"
                                    name="question3"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question3"
                                    label="Pregunta 3"
                                    onChange={handleFormAnswers}
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
                                <Link href="SignIn" variant="body1">
                                    ¿Necesitas a un donador? Registrate como Receptor aquí
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="LogIn" variant="body1">
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


export default SigninDonor;
import React, {useState} from 'react';
import Redirect from "react-router-dom/Redirect";

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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import FormHelperText from '@material-ui/core/FormHelperText';

//Autenticación
import useAuth from "./Auth/useAuth";
//Estilos css
import "../css/Form.css";

function SigninDonor() {
    const [datos, setDatos] = useState({        
        "curp": "",
        "first_name": "",
        "last_name": "",
        "birthday": "",
        "gender": "",
        "email": "",
        "phone_number": "",
        "place_of_residence": "",
        "password":"",
        "blood_type": "",
        "form_answers": {}
    })
    const [birthday, setBirthday] = React.useState(new Date());
    const[showPassword, setShowPassword] = React.useState(false);
    const [formAnswers, setFormAnswers] = React.useState({});
    const [errors, setErrors] = React.useState({
    });
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value.trim()
        })
    }
    const handleFormAnswers = (event) => {
        setFormAnswers({
            ...formAnswers,
            [event.target.name] : event.target.value.trim()
        });
    }
    React.useEffect(() => {
        setDatos({
            ...datos,
            "form_answers" : formAnswers
        })
    }, [formAnswers]);
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
				"Accept": "application/json",
			},
			body: JSON.stringify(data),
		});
	};
	const sendData = async (event) => {
		event.preventDefault();

		//Servidor
		const config = {
			url: "https://blood-donors-v1.herokuapp.com/v1/donors/",
			method: "POST",
		};
		try {
			const response = await goToBackend(config, datos);
			if (!response.ok) {
                const errorss = await response.json();
				setErrors({...errorss.errors});
                return;
			}
			const user = await response.json();
            setErrors({});
            auth.login(user.user.token);
		} catch (error) {
			console.error(error);
		}
	};

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
        },
        divider: {
            marginTop: "1em",
            marginBottom: "1em",
        }
    }));

    const classes = useStyles();
    const auth = useAuth();
    return (
        <>
            <Container component="main" maxWidth="sm">
			    {auth.isLogged() ? <Redirect to="/panel" /> : ""}
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Registro de donador
                    </Typography>
                    <form 
                        className={classes.form}
                        onSubmit={sendData}
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
                                    error={!!errors.first_name}
                                    helperText={errors.first_name}
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
                                    error={!!errors.last_name}
                                    helperText={errors.last_name}
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
                                        error={!!errors.birthday}
                                        helperText={errors.birthday}
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
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl
                                    required
                                    fullWidth
                                    variant="outlined"
                                    error={!!errors.password}
                                >
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
                                    <FormHelperText>{errors.password}</FormHelperText>
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
                            <Grid item xs={4}>
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.blood_type}
                                    required
                                >
                                    <InputLabel htmlFor="blood_type">Tipo de sangre</InputLabel>
                                    <Select
                                        id="blood_type"
                                        name="blood_type"
                                        value={datos.blood_type}
                                        label="Tipo de sangre"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="A+">A+</MenuItem>
                                        <MenuItem value="A-">A-</MenuItem>
                                        <MenuItem value="B+">B+</MenuItem>
                                        <MenuItem value="B-">B-</MenuItem>
                                        <MenuItem value="AB+">AB+</MenuItem>
                                        <MenuItem value="AB-">AB-</MenuItem>
                                        <MenuItem value="O+">O+</MenuItem>
                                        <MenuItem value="O-">O-</MenuItem>
                                    </Select>

                                    <FormHelperText>{errors.blood_type}</FormHelperText>
                                </FormControl>                
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    autoComplete="certified_file"
                                    name="certified_file"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="certified_file"
                                    label="Certificado médico"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Divider className={classes.divider} />
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question1"
                                    name="question1"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question1"
                                    label="Pregunta 1"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question2"
                                    name="question2"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question2"
                                    label="Pregunta 2"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question3"
                                    name="question3"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question3"
                                    label="Pregunta 3"
                                    onChange={handleFormAnswers}
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
                                <Link href="SignIn" variant="body1">
                                    ¿Necesitas a un donador? Registrate como Receptor aquí
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="LogIn" variant="body1">
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


export default SigninDonor;
import React, {useState} from 'react';
import Redirect from "react-router-dom/Redirect";

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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import FormHelperText from '@material-ui/core/FormHelperText';

//Autenticación
import useAuth from "./Auth/useAuth";
//Estilos css
import "../css/Form.css";

function SigninDonor() {
    const [datos, setDatos] = useState({        
        "curp": "",
        "first_name": "",
        "last_name": "",
        "birthday": "",
        "gender": "",
        "email": "",
        "phone_number": "",
        "place_of_residence": "",
        "password":"",
        "blood_type": "",
        "form_answers": {}
    })
    const [birthday, setBirthday] = React.useState(new Date());
    const[showPassword, setShowPassword] = React.useState(false);
    const [formAnswers, setFormAnswers] = React.useState({});
    const [errors, setErrors] = React.useState({
    });
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value.trim()
        })
    }
    const handleFormAnswers = (event) => {
        setFormAnswers({
            ...formAnswers,
            [event.target.name] : event.target.value.trim()
        });
    }
    React.useEffect(() => {
        setDatos({
            ...datos,
            "form_answers" : formAnswers
        })
    }, [formAnswers]);
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
				"Accept": "application/json",
			},
			body: JSON.stringify(data),
		});
	};
	const sendData = async (event) => {
		event.preventDefault();

		//Servidor
		const config = {
			url: "https://blood-donors-v1.herokuapp.com/v1/donors/",
			method: "POST",
		};
		try {
			const response = await goToBackend(config, datos);
			if (!response.ok) {
                const errorss = await response.json();
				setErrors({...errorss.errors});
                return;
			}
			const user = await response.json();
            setErrors({});
            auth.login(user.user.token);
		} catch (error) {
			console.error(error);
		}
	};

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
        },
        divider: {
            marginTop: "1em",
            marginBottom: "1em",
        }
    }));

    const classes = useStyles();
    const auth = useAuth();
    return (
        <>
            <Container component="main" maxWidth="sm">
			    {auth.isLogged() ? <Redirect to="/panel" /> : ""}
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Registro de donador
                    </Typography>
                    <form 
                        className={classes.form}
                        onSubmit={sendData}
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
                                    error={!!errors.first_name}
                                    helperText={errors.first_name}
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
                                    error={!!errors.last_name}
                                    helperText={errors.last_name}
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
                                        error={!!errors.birthday}
                                        helperText={errors.birthday}
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
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl
                                    required
                                    fullWidth
                                    variant="outlined"
                                    error={!!errors.password}
                                >
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
                                    <FormHelperText>{errors.password}</FormHelperText>
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
                            <Grid item xs={4}>
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.blood_type}
                                    required
                                >
                                    <InputLabel htmlFor="blood_type">Tipo de sangre</InputLabel>
                                    <Select
                                        id="blood_type"
                                        name="blood_type"
                                        value={datos.blood_type}
                                        label="Tipo de sangre"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="A+">A+</MenuItem>
                                        <MenuItem value="A-">A-</MenuItem>
                                        <MenuItem value="B+">B+</MenuItem>
                                        <MenuItem value="B-">B-</MenuItem>
                                        <MenuItem value="AB+">AB+</MenuItem>
                                        <MenuItem value="AB-">AB-</MenuItem>
                                        <MenuItem value="O+">O+</MenuItem>
                                        <MenuItem value="O-">O-</MenuItem>
                                    </Select>

                                    <FormHelperText>{errors.blood_type}</FormHelperText>
                                </FormControl>                
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    autoComplete="certified_file"
                                    name="certified_file"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="certified_file"
                                    label="Certificado médico"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Divider className={classes.divider} />
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question1"
                                    name="question1"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question1"
                                    label="Pregunta 1"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question2"
                                    name="question2"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question2"
                                    label="Pregunta 2"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question3"
                                    name="question3"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question3"
                                    label="Pregunta 3"
                                    onChange={handleFormAnswers}
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
                                <Link href="SignIn" variant="body1">
                                    ¿Necesitas a un donador? Registrate como Receptor aquí
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="LogIn" variant="body1">
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


export default SigninDonor;
import React, {useState} from 'react';
import Redirect from "react-router-dom/Redirect";

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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import FormHelperText from '@material-ui/core/FormHelperText';

//Autenticación
import useAuth from "./Auth/useAuth";
//Estilos css
import "../css/Form.css";

function SigninDonor() {
    const [datos, setDatos] = useState({        
        "curp": "",
        "first_name": "",
        "last_name": "",
        "birthday": "",
        "gender": "",
        "email": "",
        "phone_number": "",
        "place_of_residence": "",
        "password":"",
        "blood_type": "",
        "form_answers": {}
    })
    const [birthday, setBirthday] = React.useState(new Date());
    const[showPassword, setShowPassword] = React.useState(false);
    const [formAnswers, setFormAnswers] = React.useState({});
    const [errors, setErrors] = React.useState({
    });
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value.trim()
        })
    }
    const handleFormAnswers = (event) => {
        setFormAnswers({
            ...formAnswers,
            [event.target.name] : event.target.value.trim()
        });
    }
    React.useEffect(() => {
        setDatos({
            ...datos,
            "form_answers" : formAnswers
        })
    }, [formAnswers]);
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
				"Accept": "application/json",
			},
			body: JSON.stringify(data),
		});
	};
	const sendData = async (event) => {
		event.preventDefault();

		//Servidor
		const config = {
			url: "https://blood-donors-v1.herokuapp.com/v1/donors/",
			method: "POST",
		};
		try {
			const response = await goToBackend(config, datos);
			if (!response.ok) {
                const errorss = await response.json();
				setErrors({...errorss.errors});
                return;
			}
			const user = await response.json();
            setErrors({});
            auth.login(user.user.token);
		} catch (error) {
			console.error(error);
		}
	};

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
        },
        divider: {
            marginTop: "1em",
            marginBottom: "1em",
        }
    }));

    const classes = useStyles();
    const auth = useAuth();
    return (
        <>
            <Container component="main" maxWidth="sm">
			    {auth.isLogged() ? <Redirect to="/panel" /> : ""}
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Registro de donador
                    </Typography>
                    <form 
                        className={classes.form}
                        onSubmit={sendData}
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
                                    error={!!errors.first_name}
                                    helperText={errors.first_name}
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
                                    error={!!errors.last_name}
                                    helperText={errors.last_name}
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
                                        error={!!errors.birthday}
                                        helperText={errors.birthday}
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
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl
                                    required
                                    fullWidth
                                    variant="outlined"
                                    error={!!errors.password}
                                >
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
                                    <FormHelperText>{errors.password}</FormHelperText>
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
                            <Grid item xs={4}>
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.blood_type}
                                    required
                                >
                                    <InputLabel htmlFor="blood_type">Tipo de sangre</InputLabel>
                                    <Select
                                        id="blood_type"
                                        name="blood_type"
                                        value={datos.blood_type}
                                        label="Tipo de sangre"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="A+">A+</MenuItem>
                                        <MenuItem value="A-">A-</MenuItem>
                                        <MenuItem value="B+">B+</MenuItem>
                                        <MenuItem value="B-">B-</MenuItem>
                                        <MenuItem value="AB+">AB+</MenuItem>
                                        <MenuItem value="AB-">AB-</MenuItem>
                                        <MenuItem value="O+">O+</MenuItem>
                                        <MenuItem value="O-">O-</MenuItem>
                                    </Select>

                                    <FormHelperText>{errors.blood_type}</FormHelperText>
                                </FormControl>                
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    autoComplete="certified_file"
                                    name="certified_file"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="certified_file"
                                    label="Certificado médico"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Divider className={classes.divider} />
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question1"
                                    name="question1"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question1"
                                    label="Pregunta 1"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question2"
                                    name="question2"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question2"
                                    label="Pregunta 2"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question3"
                                    name="question3"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question3"
                                    label="Pregunta 3"
                                    onChange={handleFormAnswers}
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
                                <Link href="SignIn" variant="body1">
                                    ¿Necesitas a un donador? Registrate como Receptor aquí
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="LogIn" variant="body1">
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


export default SigninDonor;
import React, {useState} from 'react';
import Redirect from "react-router-dom/Redirect";

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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import FormHelperText from '@material-ui/core/FormHelperText';

//Autenticación
import useAuth from "./Auth/useAuth";
//Estilos css
import "../css/Form.css";

function SigninDonor() {
    const [datos, setDatos] = useState({        
        "curp": "",
        "first_name": "",
        "last_name": "",
        "birthday": "",
        "gender": "",
        "email": "",
        "phone_number": "",
        "place_of_residence": "",
        "password":"",
        "blood_type": "",
        "form_answers": {}
    })
    const [birthday, setBirthday] = React.useState(new Date());
    const[showPassword, setShowPassword] = React.useState(false);
    const [formAnswers, setFormAnswers] = React.useState({});
    const [errors, setErrors] = React.useState({
    });
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value.trim()
        })
    }
    const handleFormAnswers = (event) => {
        setFormAnswers({
            ...formAnswers,
            [event.target.name] : event.target.value.trim()
        });
    }
    React.useEffect(() => {
        setDatos({
            ...datos,
            "form_answers" : formAnswers
        })
    }, [formAnswers]);
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
				"Accept": "application/json",
			},
			body: JSON.stringify(data),
		});
	};
	const sendData = async (event) => {
		event.preventDefault();

		//Servidor
		const config = {
			url: "https://blood-donors-v1.herokuapp.com/v1/donors/",
			method: "POST",
		};
		try {
			const response = await goToBackend(config, datos);
			if (!response.ok) {
                const errorss = await response.json();
				setErrors({...errorss.errors});
                return;
			}
			const user = await response.json();
            setErrors({});
            auth.login(user.user.token);
		} catch (error) {
			console.error(error);
		}
	};

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
        },
        divider: {
            marginTop: "1em",
            marginBottom: "1em",
        }
    }));

    const classes = useStyles();
    const auth = useAuth();
    return (
        <>
            <Container component="main" maxWidth="sm">
			    {auth.isLogged() ? <Redirect to="/panel" /> : ""}
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Registro de donador
                    </Typography>
                    <form 
                        className={classes.form}
                        onSubmit={sendData}
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
                                    error={!!errors.first_name}
                                    helperText={errors.first_name}
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
                                    error={!!errors.last_name}
                                    helperText={errors.last_name}
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
                                        error={!!errors.birthday}
                                        helperText={errors.birthday}
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
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl
                                    required
                                    fullWidth
                                    variant="outlined"
                                    error={!!errors.password}
                                >
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
                                    <FormHelperText>{errors.password}</FormHelperText>
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
                            <Grid item xs={4}>
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.blood_type}
                                    required
                                >
                                    <InputLabel htmlFor="blood_type">Tipo de sangre</InputLabel>
                                    <Select
                                        id="blood_type"
                                        name="blood_type"
                                        value={datos.blood_type}
                                        label="Tipo de sangre"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="A+">A+</MenuItem>
                                        <MenuItem value="A-">A-</MenuItem>
                                        <MenuItem value="B+">B+</MenuItem>
                                        <MenuItem value="B-">B-</MenuItem>
                                        <MenuItem value="AB+">AB+</MenuItem>
                                        <MenuItem value="AB-">AB-</MenuItem>
                                        <MenuItem value="O+">O+</MenuItem>
                                        <MenuItem value="O-">O-</MenuItem>
                                    </Select>

                                    <FormHelperText>{errors.blood_type}</FormHelperText>
                                </FormControl>                
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    autoComplete="certified_file"
                                    name="certified_file"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="certified_file"
                                    label="Certificado médico"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Divider className={classes.divider} />
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question1"
                                    name="question1"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question1"
                                    label="Pregunta 1"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question2"
                                    name="question2"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question2"
                                    label="Pregunta 2"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question3"
                                    name="question3"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question3"
                                    label="Pregunta 3"
                                    onChange={handleFormAnswers}
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
                                <Link href="SignIn" variant="body1">
                                    ¿Necesitas a un donador? Registrate como Receptor aquí
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="LogIn" variant="body1">
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


export default SigninDonor;
import React, {useState} from 'react';
import Redirect from "react-router-dom/Redirect";

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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import FormHelperText from '@material-ui/core/FormHelperText';

//Autenticación
import useAuth from "./Auth/useAuth";
//Estilos css
import "../css/Form.css";

function SigninDonor() {
    const [datos, setDatos] = useState({        
        "curp": "",
        "first_name": "",
        "last_name": "",
        "birthday": "",
        "gender": "",
        "email": "",
        "phone_number": "",
        "place_of_residence": "",
        "password":"",
        "blood_type": "",
        "form_answers": {}
    })
    const [birthday, setBirthday] = React.useState(new Date());
    const[showPassword, setShowPassword] = React.useState(false);
    const [formAnswers, setFormAnswers] = React.useState({});
    const [errors, setErrors] = React.useState({
    });
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value.trim()
        })
    }
    const handleFormAnswers = (event) => {
        setFormAnswers({
            ...formAnswers,
            [event.target.name] : event.target.value.trim()
        });
    }
    React.useEffect(() => {
        setDatos({
            ...datos,
            "form_answers" : formAnswers
        })
    }, [formAnswers]);
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
				"Accept": "application/json",
			},
			body: JSON.stringify(data),
		});
	};
	const sendData = async (event) => {
		event.preventDefault();

		//Servidor
		const config = {
			url: "https://blood-donors-v1.herokuapp.com/v1/donors/",
			method: "POST",
		};
		try {
			const response = await goToBackend(config, datos);
			if (!response.ok) {
                const errorss = await response.json();
				setErrors({...errorss.errors});
                return;
			}
			const user = await response.json();
            setErrors({});
            auth.login(user.user.token);
		} catch (error) {
			console.error(error);
		}
	};

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
        },
        divider: {
            marginTop: "1em",
            marginBottom: "1em",
        }
    }));

    const classes = useStyles();
    const auth = useAuth();
    return (
        <>
            <Container component="main" maxWidth="sm">
			    {auth.isLogged() ? <Redirect to="/panel" /> : ""}
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Registro de donador
                    </Typography>
                    <form 
                        className={classes.form}
                        onSubmit={sendData}
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
                                    error={!!errors.first_name}
                                    helperText={errors.first_name}
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
                                    error={!!errors.last_name}
                                    helperText={errors.last_name}
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
                                        error={!!errors.birthday}
                                        helperText={errors.birthday}
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
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl
                                    required
                                    fullWidth
                                    variant="outlined"
                                    error={!!errors.password}
                                >
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
                                    <FormHelperText>{errors.password}</FormHelperText>
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
                            <Grid item xs={4}>
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.blood_type}
                                    required
                                >
                                    <InputLabel htmlFor="blood_type">Tipo de sangre</InputLabel>
                                    <Select
                                        id="blood_type"
                                        name="blood_type"
                                        value={datos.blood_type}
                                        label="Tipo de sangre"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="A+">A+</MenuItem>
                                        <MenuItem value="A-">A-</MenuItem>
                                        <MenuItem value="B+">B+</MenuItem>
                                        <MenuItem value="B-">B-</MenuItem>
                                        <MenuItem value="AB+">AB+</MenuItem>
                                        <MenuItem value="AB-">AB-</MenuItem>
                                        <MenuItem value="O+">O+</MenuItem>
                                        <MenuItem value="O-">O-</MenuItem>
                                    </Select>

                                    <FormHelperText>{errors.blood_type}</FormHelperText>
                                </FormControl>                
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    autoComplete="certified_file"
                                    name="certified_file"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="certified_file"
                                    label="Certificado médico"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Divider className={classes.divider} />
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question1"
                                    name="question1"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question1"
                                    label="Pregunta 1"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question2"
                                    name="question2"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question2"
                                    label="Pregunta 2"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question3"
                                    name="question3"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question3"
                                    label="Pregunta 3"
                                    onChange={handleFormAnswers}
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
                                <Link href="SignIn" variant="body1">
                                    ¿Necesitas a un donador? Registrate como Receptor aquí
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="LogIn" variant="body1">
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


export default SigninDonor;
import React, {useState} from 'react';
import Redirect from "react-router-dom/Redirect";

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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import FormHelperText from '@material-ui/core/FormHelperText';

//Autenticación
import useAuth from "./Auth/useAuth";
//Estilos css
import "../css/Form.css";

function SigninDonor() {
    const [datos, setDatos] = useState({        
        "curp": "",
        "first_name": "",
        "last_name": "",
        "birthday": "",
        "gender": "",
        "email": "",
        "phone_number": "",
        "place_of_residence": "",
        "password":"",
        "blood_type": "",
        "form_answers": {}
    })
    const [birthday, setBirthday] = React.useState(new Date());
    const[showPassword, setShowPassword] = React.useState(false);
    const [formAnswers, setFormAnswers] = React.useState({});
    const [errors, setErrors] = React.useState({
    });
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value.trim()
        })
    }
    const handleFormAnswers = (event) => {
        setFormAnswers({
            ...formAnswers,
            [event.target.name] : event.target.value.trim()
        });
    }
    React.useEffect(() => {
        setDatos({
            ...datos,
            "form_answers" : formAnswers
        })
    }, [formAnswers]);
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
				"Accept": "application/json",
			},
			body: JSON.stringify(data),
		});
	};
	const sendData = async (event) => {
		event.preventDefault();

		//Servidor
		const config = {
			url: "https://blood-donors-v1.herokuapp.com/v1/donors/",
			method: "POST",
		};
		try {
			const response = await goToBackend(config, datos);
			if (!response.ok) {
                const errorss = await response.json();
				setErrors({...errorss.errors});
                return;
			}
			const user = await response.json();
            setErrors({});
            auth.login(user.user.token);
		} catch (error) {
			console.error(error);
		}
	};

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
        },
        divider: {
            marginTop: "1em",
            marginBottom: "1em",
        }
    }));

    const classes = useStyles();
    const auth = useAuth();
    return (
        <>
            <Container component="main" maxWidth="sm">
			    {auth.isLogged() ? <Redirect to="/panel" /> : ""}
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Registro de donador
                    </Typography>
                    <form 
                        className={classes.form}
                        onSubmit={sendData}
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
                                    error={!!errors.first_name}
                                    helperText={errors.first_name}
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
                                    error={!!errors.last_name}
                                    helperText={errors.last_name}
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
                                        error={!!errors.birthday}
                                        helperText={errors.birthday}
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
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl
                                    required
                                    fullWidth
                                    variant="outlined"
                                    error={!!errors.password}
                                >
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
                                    <FormHelperText>{errors.password}</FormHelperText>
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
                            <Grid item xs={4}>
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.blood_type}
                                    required
                                >
                                    <InputLabel htmlFor="blood_type">Tipo de sangre</InputLabel>
                                    <Select
                                        id="blood_type"
                                        name="blood_type"
                                        value={datos.blood_type}
                                        label="Tipo de sangre"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="A+">A+</MenuItem>
                                        <MenuItem value="A-">A-</MenuItem>
                                        <MenuItem value="B+">B+</MenuItem>
                                        <MenuItem value="B-">B-</MenuItem>
                                        <MenuItem value="AB+">AB+</MenuItem>
                                        <MenuItem value="AB-">AB-</MenuItem>
                                        <MenuItem value="O+">O+</MenuItem>
                                        <MenuItem value="O-">O-</MenuItem>
                                    </Select>

                                    <FormHelperText>{errors.blood_type}</FormHelperText>
                                </FormControl>                
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    autoComplete="certified_file"
                                    name="certified_file"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="certified_file"
                                    label="Certificado médico"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Divider className={classes.divider} />
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question1"
                                    name="question1"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question1"
                                    label="Pregunta 1"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question2"
                                    name="question2"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question2"
                                    label="Pregunta 2"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question3"
                                    name="question3"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question3"
                                    label="Pregunta 3"
                                    onChange={handleFormAnswers}
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
                                <Link href="SignIn" variant="body1">
                                    ¿Necesitas a un donador? Registrate como Receptor aquí
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="LogIn" variant="body1">
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


export default SigninDonor;
import React, {useState} from 'react';
import Redirect from "react-router-dom/Redirect";

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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import FormHelperText from '@material-ui/core/FormHelperText';

//Autenticación
import useAuth from "./Auth/useAuth";
//Estilos css
import "../css/Form.css";

function SigninDonor() {
    const [datos, setDatos] = useState({        
        "curp": "",
        "first_name": "",
        "last_name": "",
        "birthday": "",
        "gender": "",
        "email": "",
        "phone_number": "",
        "place_of_residence": "",
        "password":"",
        "blood_type": "",
        "form_answers": {}
    })
    const [birthday, setBirthday] = React.useState(new Date());
    const[showPassword, setShowPassword] = React.useState(false);
    const [formAnswers, setFormAnswers] = React.useState({});
    const [errors, setErrors] = React.useState({
    });
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value.trim()
        })
    }
    const handleFormAnswers = (event) => {
        setFormAnswers({
            ...formAnswers,
            [event.target.name] : event.target.value.trim()
        });
    }
    React.useEffect(() => {
        setDatos({
            ...datos,
            "form_answers" : formAnswers
        })
    }, [formAnswers]);
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
				"Accept": "application/json",
			},
			body: JSON.stringify(data),
		});
	};
	const sendData = async (event) => {
		event.preventDefault();

		//Servidor
		const config = {
			url: "https://blood-donors-v1.herokuapp.com/v1/donors/",
			method: "POST",
		};
		try {
			const response = await goToBackend(config, datos);
			if (!response.ok) {
                const errorss = await response.json();
				setErrors({...errorss.errors});
                return;
			}
			const user = await response.json();
            setErrors({});
            auth.login(user.user.token);
		} catch (error) {
			console.error(error);
		}
	};

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
        },
        divider: {
            marginTop: "1em",
            marginBottom: "1em",
        }
    }));

    const classes = useStyles();
    const auth = useAuth();
    return (
        <>
            <Container component="main" maxWidth="sm">
			    {auth.isLogged() ? <Redirect to="/panel" /> : ""}
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Registro de donador
                    </Typography>
                    <form 
                        className={classes.form}
                        onSubmit={sendData}
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
                                    error={!!errors.first_name}
                                    helperText={errors.first_name}
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
                                    error={!!errors.last_name}
                                    helperText={errors.last_name}
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
                                        error={!!errors.birthday}
                                        helperText={errors.birthday}
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
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl
                                    required
                                    fullWidth
                                    variant="outlined"
                                    error={!!errors.password}
                                >
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
                                    <FormHelperText>{errors.password}</FormHelperText>
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
                            <Grid item xs={4}>
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.blood_type}
                                    required
                                >
                                    <InputLabel htmlFor="blood_type">Tipo de sangre</InputLabel>
                                    <Select
                                        id="blood_type"
                                        name="blood_type"
                                        value={datos.blood_type}
                                        label="Tipo de sangre"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="A+">A+</MenuItem>
                                        <MenuItem value="A-">A-</MenuItem>
                                        <MenuItem value="B+">B+</MenuItem>
                                        <MenuItem value="B-">B-</MenuItem>
                                        <MenuItem value="AB+">AB+</MenuItem>
                                        <MenuItem value="AB-">AB-</MenuItem>
                                        <MenuItem value="O+">O+</MenuItem>
                                        <MenuItem value="O-">O-</MenuItem>
                                    </Select>

                                    <FormHelperText>{errors.blood_type}</FormHelperText>
                                </FormControl>                
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    autoComplete="certified_file"
                                    name="certified_file"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="certified_file"
                                    label="Certificado médico"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Divider className={classes.divider} />
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question1"
                                    name="question1"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question1"
                                    label="Pregunta 1"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question2"
                                    name="question2"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question2"
                                    label="Pregunta 2"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question3"
                                    name="question3"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question3"
                                    label="Pregunta 3"
                                    onChange={handleFormAnswers}
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
                                <Link href="SignIn" variant="body1">
                                    ¿Necesitas a un donador? Registrate como Receptor aquí
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="LogIn" variant="body1">
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


export default SigninDonor;
import React, {useState} from 'react';
import Redirect from "react-router-dom/Redirect";

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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import FormHelperText from '@material-ui/core/FormHelperText';

//Autenticación
import useAuth from "./Auth/useAuth";
//Estilos css
import "../css/Form.css";

function SigninDonor() {
    const [datos, setDatos] = useState({        
        "curp": "",
        "first_name": "",
        "last_name": "",
        "birthday": "",
        "gender": "",
        "email": "",
        "phone_number": "",
        "place_of_residence": "",
        "password":"",
        "blood_type": "",
        "form_answers": {}
    })
    const [birthday, setBirthday] = React.useState(new Date());
    const[showPassword, setShowPassword] = React.useState(false);
    const [formAnswers, setFormAnswers] = React.useState({});
    const [errors, setErrors] = React.useState({
    });
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value.trim()
        })
    }
    const handleFormAnswers = (event) => {
        setFormAnswers({
            ...formAnswers,
            [event.target.name] : event.target.value.trim()
        });
    }
    React.useEffect(() => {
        setDatos({
            ...datos,
            "form_answers" : formAnswers
        })
    }, [formAnswers]);
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
				"Accept": "application/json",
			},
			body: JSON.stringify(data),
		});
	};
	const sendData = async (event) => {
		event.preventDefault();

		//Servidor
		const config = {
			url: "https://blood-donors-v1.herokuapp.com/v1/donors/",
			method: "POST",
		};
		try {
			const response = await goToBackend(config, datos);
			if (!response.ok) {
                const errorss = await response.json();
				setErrors({...errorss.errors});
                return;
			}
			const user = await response.json();
            setErrors({});
            auth.login(user.user.token);
		} catch (error) {
			console.error(error);
		}
	};

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
        },
        divider: {
            marginTop: "1em",
            marginBottom: "1em",
        }
    }));

    const classes = useStyles();
    const auth = useAuth();
    return (
        <>
            <Container component="main" maxWidth="sm">
			    {auth.isLogged() ? <Redirect to="/panel" /> : ""}
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Registro de donador
                    </Typography>
                    <form 
                        className={classes.form}
                        onSubmit={sendData}
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
                                    error={!!errors.first_name}
                                    helperText={errors.first_name}
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
                                    error={!!errors.last_name}
                                    helperText={errors.last_name}
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
                                        error={!!errors.birthday}
                                        helperText={errors.birthday}
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
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl
                                    required
                                    fullWidth
                                    variant="outlined"
                                    error={!!errors.password}
                                >
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
                                    <FormHelperText>{errors.password}</FormHelperText>
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
                            <Grid item xs={4}>
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.blood_type}
                                    required
                                >
                                    <InputLabel htmlFor="blood_type">Tipo de sangre</InputLabel>
                                    <Select
                                        id="blood_type"
                                        name="blood_type"
                                        value={datos.blood_type}
                                        label="Tipo de sangre"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="A+">A+</MenuItem>
                                        <MenuItem value="A-">A-</MenuItem>
                                        <MenuItem value="B+">B+</MenuItem>
                                        <MenuItem value="B-">B-</MenuItem>
                                        <MenuItem value="AB+">AB+</MenuItem>
                                        <MenuItem value="AB-">AB-</MenuItem>
                                        <MenuItem value="O+">O+</MenuItem>
                                        <MenuItem value="O-">O-</MenuItem>
                                    </Select>

                                    <FormHelperText>{errors.blood_type}</FormHelperText>
                                </FormControl>                
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    autoComplete="certified_file"
                                    name="certified_file"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="certified_file"
                                    label="Certificado médico"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Divider className={classes.divider} />
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question1"
                                    name="question1"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question1"
                                    label="Pregunta 1"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question2"
                                    name="question2"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question2"
                                    label="Pregunta 2"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question3"
                                    name="question3"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question3"
                                    label="Pregunta 3"
                                    onChange={handleFormAnswers}
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
                                <Link href="SignIn" variant="body1">
                                    ¿Necesitas a un donador? Registrate como Receptor aquí
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="LogIn" variant="body1">
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


export default SigninDonor;
import React, {useState} from 'react';
import Redirect from "react-router-dom/Redirect";

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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import FormHelperText from '@material-ui/core/FormHelperText';

//Autenticación
import useAuth from "./Auth/useAuth";
//Estilos css
import "../css/Form.css";

function SigninDonor() {
    const [datos, setDatos] = useState({        
        "curp": "",
        "first_name": "",
        "last_name": "",
        "birthday": "",
        "gender": "",
        "email": "",
        "phone_number": "",
        "place_of_residence": "",
        "password":"",
        "blood_type": "",
        "form_answers": {}
    })
    const [birthday, setBirthday] = React.useState(new Date());
    const[showPassword, setShowPassword] = React.useState(false);
    const [formAnswers, setFormAnswers] = React.useState({});
    const [errors, setErrors] = React.useState({
    });
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value.trim()
        })
    }
    const handleFormAnswers = (event) => {
        setFormAnswers({
            ...formAnswers,
            [event.target.name] : event.target.value.trim()
        });
    }
    React.useEffect(() => {
        setDatos({
            ...datos,
            "form_answers" : formAnswers
        })
    }, [formAnswers]);
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
				"Accept": "application/json",
			},
			body: JSON.stringify(data),
		});
	};
	const sendData = async (event) => {
		event.preventDefault();

		//Servidor
		const config = {
			url: "https://blood-donors-v1.herokuapp.com/v1/donors/",
			method: "POST",
		};
		try {
			const response = await goToBackend(config, datos);
			if (!response.ok) {
                const errorss = await response.json();
				setErrors({...errorss.errors});
                return;
			}
			const user = await response.json();
            setErrors({});
            auth.login(user.user.token);
		} catch (error) {
			console.error(error);
		}
	};

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
        },
        divider: {
            marginTop: "1em",
            marginBottom: "1em",
        }
    }));

    const classes = useStyles();
    const auth = useAuth();
    return (
        <>
            <Container component="main" maxWidth="sm">
			    {auth.isLogged() ? <Redirect to="/panel" /> : ""}
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Registro de donador
                    </Typography>
                    <form 
                        className={classes.form}
                        onSubmit={sendData}
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
                                    error={!!errors.first_name}
                                    helperText={errors.first_name}
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
                                    error={!!errors.last_name}
                                    helperText={errors.last_name}
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
                                        error={!!errors.birthday}
                                        helperText={errors.birthday}
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
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl
                                    required
                                    fullWidth
                                    variant="outlined"
                                    error={!!errors.password}
                                >
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
                                    <FormHelperText>{errors.password}</FormHelperText>
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
                            <Grid item xs={4}>
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.blood_type}
                                    required
                                >
                                    <InputLabel htmlFor="blood_type">Tipo de sangre</InputLabel>
                                    <Select
                                        id="blood_type"
                                        name="blood_type"
                                        value={datos.blood_type}
                                        label="Tipo de sangre"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="A+">A+</MenuItem>
                                        <MenuItem value="A-">A-</MenuItem>
                                        <MenuItem value="B+">B+</MenuItem>
                                        <MenuItem value="B-">B-</MenuItem>
                                        <MenuItem value="AB+">AB+</MenuItem>
                                        <MenuItem value="AB-">AB-</MenuItem>
                                        <MenuItem value="O+">O+</MenuItem>
                                        <MenuItem value="O-">O-</MenuItem>
                                    </Select>

                                    <FormHelperText>{errors.blood_type}</FormHelperText>
                                </FormControl>                
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    autoComplete="certified_file"
                                    name="certified_file"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="certified_file"
                                    label="Certificado médico"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Divider className={classes.divider} />
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question1"
                                    name="question1"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question1"
                                    label="Pregunta 1"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question2"
                                    name="question2"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question2"
                                    label="Pregunta 2"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question3"
                                    name="question3"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question3"
                                    label="Pregunta 3"
                                    onChange={handleFormAnswers}
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
                                <Link href="SignIn" variant="body1">
                                    ¿Necesitas a un donador? Registrate como Receptor aquí
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="LogIn" variant="body1">
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


export default SigninDonor;
import React, {useState} from 'react';
import Redirect from "react-router-dom/Redirect";

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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import FormHelperText from '@material-ui/core/FormHelperText';

//Autenticación
import useAuth from "./Auth/useAuth";
//Estilos css
import "../css/Form.css";

function SigninDonor() {
    const [datos, setDatos] = useState({        
        "curp": "",
        "first_name": "",
        "last_name": "",
        "birthday": "",
        "gender": "",
        "email": "",
        "phone_number": "",
        "place_of_residence": "",
        "password":"",
        "blood_type": "",
        "form_answers": {}
    })
    const [birthday, setBirthday] = React.useState(new Date());
    const[showPassword, setShowPassword] = React.useState(false);
    const [formAnswers, setFormAnswers] = React.useState({});
    const [errors, setErrors] = React.useState({
    });
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value.trim()
        })
    }
    const handleFormAnswers = (event) => {
        setFormAnswers({
            ...formAnswers,
            [event.target.name] : event.target.value.trim()
        });
    }
    React.useEffect(() => {
        setDatos({
            ...datos,
            "form_answers" : formAnswers
        })
    }, [formAnswers]);
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
				"Accept": "application/json",
			},
			body: JSON.stringify(data),
		});
	};
	const sendData = async (event) => {
		event.preventDefault();

		//Servidor
		const config = {
			url: "https://blood-donors-v1.herokuapp.com/v1/donors/",
			method: "POST",
		};
		try {
			const response = await goToBackend(config, datos);
			if (!response.ok) {
                const errorss = await response.json();
				setErrors({...errorss.errors});
                return;
			}
			const user = await response.json();
            setErrors({});
            auth.login(user.user.token);
		} catch (error) {
			console.error(error);
		}
	};

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
        },
        divider: {
            marginTop: "1em",
            marginBottom: "1em",
        }
    }));

    const classes = useStyles();
    const auth = useAuth();
    return (
        <>
            <Container component="main" maxWidth="sm">
			    {auth.isLogged() ? <Redirect to="/panel" /> : ""}
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Registro de donador
                    </Typography>
                    <form 
                        className={classes.form}
                        onSubmit={sendData}
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
                                    error={!!errors.first_name}
                                    helperText={errors.first_name}
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
                                    error={!!errors.last_name}
                                    helperText={errors.last_name}
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
                                        error={!!errors.birthday}
                                        helperText={errors.birthday}
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
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl
                                    required
                                    fullWidth
                                    variant="outlined"
                                    error={!!errors.password}
                                >
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
                                    <FormHelperText>{errors.password}</FormHelperText>
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
                            <Grid item xs={4}>
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.blood_type}
                                    required
                                >
                                    <InputLabel htmlFor="blood_type">Tipo de sangre</InputLabel>
                                    <Select
                                        id="blood_type"
                                        name="blood_type"
                                        value={datos.blood_type}
                                        label="Tipo de sangre"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="A+">A+</MenuItem>
                                        <MenuItem value="A-">A-</MenuItem>
                                        <MenuItem value="B+">B+</MenuItem>
                                        <MenuItem value="B-">B-</MenuItem>
                                        <MenuItem value="AB+">AB+</MenuItem>
                                        <MenuItem value="AB-">AB-</MenuItem>
                                        <MenuItem value="O+">O+</MenuItem>
                                        <MenuItem value="O-">O-</MenuItem>
                                    </Select>

                                    <FormHelperText>{errors.blood_type}</FormHelperText>
                                </FormControl>                
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    autoComplete="certified_file"
                                    name="certified_file"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="certified_file"
                                    label="Certificado médico"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Divider className={classes.divider} />
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question1"
                                    name="question1"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question1"
                                    label="Pregunta 1"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question2"
                                    name="question2"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question2"
                                    label="Pregunta 2"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question3"
                                    name="question3"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question3"
                                    label="Pregunta 3"
                                    onChange={handleFormAnswers}
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
                                <Link href="SignIn" variant="body1">
                                    ¿Necesitas a un donador? Registrate como Receptor aquí
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="LogIn" variant="body1">
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


export default SigninDonor;
import React, {useState} from 'react';
import Redirect from "react-router-dom/Redirect";

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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import FormHelperText from '@material-ui/core/FormHelperText';

//Autenticación
import useAuth from "./Auth/useAuth";
//Estilos css
import "../css/Form.css";

function SigninDonor() {
    const [datos, setDatos] = useState({        
        "curp": "",
        "first_name": "",
        "last_name": "",
        "birthday": "",
        "gender": "",
        "email": "",
        "phone_number": "",
        "place_of_residence": "",
        "password":"",
        "blood_type": "",
        "form_answers": {}
    })
    const [birthday, setBirthday] = React.useState(new Date());
    const[showPassword, setShowPassword] = React.useState(false);
    const [formAnswers, setFormAnswers] = React.useState({});
    const [errors, setErrors] = React.useState({
    });
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value.trim()
        })
    }
    const handleFormAnswers = (event) => {
        setFormAnswers({
            ...formAnswers,
            [event.target.name] : event.target.value.trim()
        });
    }
    React.useEffect(() => {
        setDatos({
            ...datos,
            "form_answers" : formAnswers
        })
    }, [formAnswers]);
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
				"Accept": "application/json",
			},
			body: JSON.stringify(data),
		});
	};
	const sendData = async (event) => {
		event.preventDefault();

		//Servidor
		const config = {
			url: "https://blood-donors-v1.herokuapp.com/v1/donors/",
			method: "POST",
		};
		try {
			const response = await goToBackend(config, datos);
			if (!response.ok) {
                const errorss = await response.json();
				setErrors({...errorss.errors});
                return;
			}
			const user = await response.json();
            setErrors({});
            auth.login(user.user.token);
		} catch (error) {
			console.error(error);
		}
	};

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
        },
        divider: {
            marginTop: "1em",
            marginBottom: "1em",
        }
    }));

    const classes = useStyles();
    const auth = useAuth();
    return (
        <>
            <Container component="main" maxWidth="sm">
			    {auth.isLogged() ? <Redirect to="/panel" /> : ""}
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Registro de donador
                    </Typography>
                    <form 
                        className={classes.form}
                        onSubmit={sendData}
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
                                    error={!!errors.first_name}
                                    helperText={errors.first_name}
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
                                    error={!!errors.last_name}
                                    helperText={errors.last_name}
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
                                        error={!!errors.birthday}
                                        helperText={errors.birthday}
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
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl
                                    required
                                    fullWidth
                                    variant="outlined"
                                    error={!!errors.password}
                                >
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
                                    <FormHelperText>{errors.password}</FormHelperText>
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
                            <Grid item xs={4}>
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.blood_type}
                                    required
                                >
                                    <InputLabel htmlFor="blood_type">Tipo de sangre</InputLabel>
                                    <Select
                                        id="blood_type"
                                        name="blood_type"
                                        value={datos.blood_type}
                                        label="Tipo de sangre"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="A+">A+</MenuItem>
                                        <MenuItem value="A-">A-</MenuItem>
                                        <MenuItem value="B+">B+</MenuItem>
                                        <MenuItem value="B-">B-</MenuItem>
                                        <MenuItem value="AB+">AB+</MenuItem>
                                        <MenuItem value="AB-">AB-</MenuItem>
                                        <MenuItem value="O+">O+</MenuItem>
                                        <MenuItem value="O-">O-</MenuItem>
                                    </Select>

                                    <FormHelperText>{errors.blood_type}</FormHelperText>
                                </FormControl>                
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    autoComplete="certified_file"
                                    name="certified_file"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="certified_file"
                                    label="Certificado médico"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Divider className={classes.divider} />
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question1"
                                    name="question1"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question1"
                                    label="Pregunta 1"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question2"
                                    name="question2"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question2"
                                    label="Pregunta 2"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question3"
                                    name="question3"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question3"
                                    label="Pregunta 3"
                                    onChange={handleFormAnswers}
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
                                <Link href="SignIn" variant="body1">
                                    ¿Necesitas a un donador? Registrate como Receptor aquí
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="LogIn" variant="body1">
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


export default SigninDonor;
import React, {useState} from 'react';
import Redirect from "react-router-dom/Redirect";

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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import FormHelperText from '@material-ui/core/FormHelperText';

//Autenticación
import useAuth from "./Auth/useAuth";
//Estilos css
import "../css/Form.css";

function SigninDonor() {
    const [datos, setDatos] = useState({        
        "curp": "",
        "first_name": "",
        "last_name": "",
        "birthday": "",
        "gender": "",
        "email": "",
        "phone_number": "",
        "place_of_residence": "",
        "password":"",
        "blood_type": "",
        "form_answers": {}
    })
    const [birthday, setBirthday] = React.useState(new Date());
    const[showPassword, setShowPassword] = React.useState(false);
    const [formAnswers, setFormAnswers] = React.useState({});
    const [errors, setErrors] = React.useState({
    });
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value.trim()
        })
    }
    const handleFormAnswers = (event) => {
        setFormAnswers({
            ...formAnswers,
            [event.target.name] : event.target.value.trim()
        });
    }
    React.useEffect(() => {
        setDatos({
            ...datos,
            "form_answers" : formAnswers
        })
    }, [formAnswers]);
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
				"Accept": "application/json",
			},
			body: JSON.stringify(data),
		});
	};
	const sendData = async (event) => {
		event.preventDefault();

		//Servidor
		const config = {
			url: "https://blood-donors-v1.herokuapp.com/v1/donors/",
			method: "POST",
		};
		try {
			const response = await goToBackend(config, datos);
			if (!response.ok) {
                const errorss = await response.json();
				setErrors({...errorss.errors});
                return;
			}
			const user = await response.json();
            setErrors({});
            auth.login(user.user.token);
		} catch (error) {
			console.error(error);
		}
	};

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
        },
        divider: {
            marginTop: "1em",
            marginBottom: "1em",
        }
    }));

    const classes = useStyles();
    const auth = useAuth();
    return (
        <>
            <Container component="main" maxWidth="sm">
			    {auth.isLogged() ? <Redirect to="/panel" /> : ""}
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Registro de donador
                    </Typography>
                    <form 
                        className={classes.form}
                        onSubmit={sendData}
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
                                    error={!!errors.first_name}
                                    helperText={errors.first_name}
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
                                    error={!!errors.last_name}
                                    helperText={errors.last_name}
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
                                        error={!!errors.birthday}
                                        helperText={errors.birthday}
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
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl
                                    required
                                    fullWidth
                                    variant="outlined"
                                    error={!!errors.password}
                                >
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
                                    <FormHelperText>{errors.password}</FormHelperText>
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
                            <Grid item xs={4}>
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.blood_type}
                                    required
                                >
                                    <InputLabel htmlFor="blood_type">Tipo de sangre</InputLabel>
                                    <Select
                                        id="blood_type"
                                        name="blood_type"
                                        value={datos.blood_type}
                                        label="Tipo de sangre"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="A+">A+</MenuItem>
                                        <MenuItem value="A-">A-</MenuItem>
                                        <MenuItem value="B+">B+</MenuItem>
                                        <MenuItem value="B-">B-</MenuItem>
                                        <MenuItem value="AB+">AB+</MenuItem>
                                        <MenuItem value="AB-">AB-</MenuItem>
                                        <MenuItem value="O+">O+</MenuItem>
                                        <MenuItem value="O-">O-</MenuItem>
                                    </Select>

                                    <FormHelperText>{errors.blood_type}</FormHelperText>
                                </FormControl>                
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    autoComplete="certified_file"
                                    name="certified_file"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="certified_file"
                                    label="Certificado médico"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Divider className={classes.divider} />
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question1"
                                    name="question1"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question1"
                                    label="Pregunta 1"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question2"
                                    name="question2"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question2"
                                    label="Pregunta 2"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question3"
                                    name="question3"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question3"
                                    label="Pregunta 3"
                                    onChange={handleFormAnswers}
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
                                <Link href="SignIn" variant="body1">
                                    ¿Necesitas a un donador? Registrate como Receptor aquí
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="LogIn" variant="body1">
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


export default SigninDonor;
import React, {useState} from 'react';
import Redirect from "react-router-dom/Redirect";

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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import FormHelperText from '@material-ui/core/FormHelperText';

//Autenticación
import useAuth from "./Auth/useAuth";
//Estilos css
import "../css/Form.css";

function SigninDonor() {
    const [datos, setDatos] = useState({        
        "curp": "",
        "first_name": "",
        "last_name": "",
        "birthday": "",
        "gender": "",
        "email": "",
        "phone_number": "",
        "place_of_residence": "",
        "password":"",
        "blood_type": "",
        "form_answers": {}
    })
    const [birthday, setBirthday] = React.useState(new Date());
    const[showPassword, setShowPassword] = React.useState(false);
    const [formAnswers, setFormAnswers] = React.useState({});
    const [errors, setErrors] = React.useState({
    });
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value.trim()
        })
    }
    const handleFormAnswers = (event) => {
        setFormAnswers({
            ...formAnswers,
            [event.target.name] : event.target.value.trim()
        });
    }
    React.useEffect(() => {
        setDatos({
            ...datos,
            "form_answers" : formAnswers
        })
    }, [formAnswers]);
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
				"Accept": "application/json",
			},
			body: JSON.stringify(data),
		});
	};
	const sendData = async (event) => {
		event.preventDefault();

		//Servidor
		const config = {
			url: "https://blood-donors-v1.herokuapp.com/v1/donors/",
			method: "POST",
		};
		try {
			const response = await goToBackend(config, datos);
			if (!response.ok) {
                const errorss = await response.json();
				setErrors({...errorss.errors});
                return;
			}
			const user = await response.json();
            setErrors({});
            auth.login(user.user.token);
		} catch (error) {
			console.error(error);
		}
	};

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
        },
        divider: {
            marginTop: "1em",
            marginBottom: "1em",
        }
    }));

    const classes = useStyles();
    const auth = useAuth();
    return (
        <>
            <Container component="main" maxWidth="sm">
			    {auth.isLogged() ? <Redirect to="/panel" /> : ""}
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Registro de donador
                    </Typography>
                    <form 
                        className={classes.form}
                        onSubmit={sendData}
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
                                    error={!!errors.first_name}
                                    helperText={errors.first_name}
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
                                    error={!!errors.last_name}
                                    helperText={errors.last_name}
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
                                        error={!!errors.birthday}
                                        helperText={errors.birthday}
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
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl
                                    required
                                    fullWidth
                                    variant="outlined"
                                    error={!!errors.password}
                                >
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
                                    <FormHelperText>{errors.password}</FormHelperText>
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
                            <Grid item xs={4}>
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.blood_type}
                                    required
                                >
                                    <InputLabel htmlFor="blood_type">Tipo de sangre</InputLabel>
                                    <Select
                                        id="blood_type"
                                        name="blood_type"
                                        value={datos.blood_type}
                                        label="Tipo de sangre"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="A+">A+</MenuItem>
                                        <MenuItem value="A-">A-</MenuItem>
                                        <MenuItem value="B+">B+</MenuItem>
                                        <MenuItem value="B-">B-</MenuItem>
                                        <MenuItem value="AB+">AB+</MenuItem>
                                        <MenuItem value="AB-">AB-</MenuItem>
                                        <MenuItem value="O+">O+</MenuItem>
                                        <MenuItem value="O-">O-</MenuItem>
                                    </Select>

                                    <FormHelperText>{errors.blood_type}</FormHelperText>
                                </FormControl>                
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    autoComplete="certified_file"
                                    name="certified_file"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="certified_file"
                                    label="Certificado médico"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Divider className={classes.divider} />
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question1"
                                    name="question1"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question1"
                                    label="Pregunta 1"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question2"
                                    name="question2"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question2"
                                    label="Pregunta 2"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question3"
                                    name="question3"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question3"
                                    label="Pregunta 3"
                                    onChange={handleFormAnswers}
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
                                <Link href="SignIn" variant="body1">
                                    ¿Necesitas a un donador? Registrate como Receptor aquí
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="LogIn" variant="body1">
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


export default SigninDonor;
import React, {useState} from 'react';
import Redirect from "react-router-dom/Redirect";

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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import FormHelperText from '@material-ui/core/FormHelperText';

//Autenticación
import useAuth from "./Auth/useAuth";
//Estilos css
import "../css/Form.css";

function SigninDonor() {
    const [datos, setDatos] = useState({        
        "curp": "",
        "first_name": "",
        "last_name": "",
        "birthday": "",
        "gender": "",
        "email": "",
        "phone_number": "",
        "place_of_residence": "",
        "password":"",
        "blood_type": "",
        "form_answers": {}
    })
    const [birthday, setBirthday] = React.useState(new Date());
    const[showPassword, setShowPassword] = React.useState(false);
    const [formAnswers, setFormAnswers] = React.useState({});
    const [errors, setErrors] = React.useState({
    });
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value.trim()
        })
    }
    const handleFormAnswers = (event) => {
        setFormAnswers({
            ...formAnswers,
            [event.target.name] : event.target.value.trim()
        });
    }
    React.useEffect(() => {
        setDatos({
            ...datos,
            "form_answers" : formAnswers
        })
    }, [formAnswers]);
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
				"Accept": "application/json",
			},
			body: JSON.stringify(data),
		});
	};
	const sendData = async (event) => {
		event.preventDefault();

		//Servidor
		const config = {
			url: "https://blood-donors-v1.herokuapp.com/v1/donors/",
			method: "POST",
		};
		try {
			const response = await goToBackend(config, datos);
			if (!response.ok) {
                const errorss = await response.json();
				setErrors({...errorss.errors});
                return;
			}
			const user = await response.json();
            setErrors({});
            auth.login(user.user.token);
		} catch (error) {
			console.error(error);
		}
	};

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
        },
        divider: {
            marginTop: "1em",
            marginBottom: "1em",
        }
    }));

    const classes = useStyles();
    const auth = useAuth();
    return (
        <>
            <Container component="main" maxWidth="sm">
			    {auth.isLogged() ? <Redirect to="/panel" /> : ""}
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Registro de donador
                    </Typography>
                    <form 
                        className={classes.form}
                        onSubmit={sendData}
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
                                    error={!!errors.first_name}
                                    helperText={errors.first_name}
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
                                    error={!!errors.last_name}
                                    helperText={errors.last_name}
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
                                        error={!!errors.birthday}
                                        helperText={errors.birthday}
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
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl
                                    required
                                    fullWidth
                                    variant="outlined"
                                    error={!!errors.password}
                                >
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
                                    <FormHelperText>{errors.password}</FormHelperText>
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
                            <Grid item xs={4}>
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.blood_type}
                                    required
                                >
                                    <InputLabel htmlFor="blood_type">Tipo de sangre</InputLabel>
                                    <Select
                                        id="blood_type"
                                        name="blood_type"
                                        value={datos.blood_type}
                                        label="Tipo de sangre"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="A+">A+</MenuItem>
                                        <MenuItem value="A-">A-</MenuItem>
                                        <MenuItem value="B+">B+</MenuItem>
                                        <MenuItem value="B-">B-</MenuItem>
                                        <MenuItem value="AB+">AB+</MenuItem>
                                        <MenuItem value="AB-">AB-</MenuItem>
                                        <MenuItem value="O+">O+</MenuItem>
                                        <MenuItem value="O-">O-</MenuItem>
                                    </Select>

                                    <FormHelperText>{errors.blood_type}</FormHelperText>
                                </FormControl>                
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    autoComplete="certified_file"
                                    name="certified_file"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="certified_file"
                                    label="Certificado médico"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Divider className={classes.divider} />
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question1"
                                    name="question1"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question1"
                                    label="Pregunta 1"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question2"
                                    name="question2"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question2"
                                    label="Pregunta 2"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question3"
                                    name="question3"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question3"
                                    label="Pregunta 3"
                                    onChange={handleFormAnswers}
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
                                <Link href="SignIn" variant="body1">
                                    ¿Necesitas a un donador? Registrate como Receptor aquí
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="LogIn" variant="body1">
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


export default SigninDonor;
import React, {useState} from 'react';
import Redirect from "react-router-dom/Redirect";

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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import FormHelperText from '@material-ui/core/FormHelperText';

//Autenticación
import useAuth from "./Auth/useAuth";
//Estilos css
import "../css/Form.css";

function SigninDonor() {
    const [datos, setDatos] = useState({        
        "curp": "",
        "first_name": "",
        "last_name": "",
        "birthday": "",
        "gender": "",
        "email": "",
        "phone_number": "",
        "place_of_residence": "",
        "password":"",
        "blood_type": "",
        "form_answers": {}
    })
    const [birthday, setBirthday] = React.useState(new Date());
    const[showPassword, setShowPassword] = React.useState(false);
    const [formAnswers, setFormAnswers] = React.useState({});
    const [errors, setErrors] = React.useState({
    });
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value.trim()
        })
    }
    const handleFormAnswers = (event) => {
        setFormAnswers({
            ...formAnswers,
            [event.target.name] : event.target.value.trim()
        });
    }
    React.useEffect(() => {
        setDatos({
            ...datos,
            "form_answers" : formAnswers
        })
    }, [formAnswers]);
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
				"Accept": "application/json",
			},
			body: JSON.stringify(data),
		});
	};
	const sendData = async (event) => {
		event.preventDefault();

		//Servidor
		const config = {
			url: "https://blood-donors-v1.herokuapp.com/v1/donors/",
			method: "POST",
		};
		try {
			const response = await goToBackend(config, datos);
			if (!response.ok) {
                const errorss = await response.json();
				setErrors({...errorss.errors});
                return;
			}
			const user = await response.json();
            setErrors({});
            auth.login(user.user.token);
		} catch (error) {
			console.error(error);
		}
	};

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
        },
        divider: {
            marginTop: "1em",
            marginBottom: "1em",
        }
    }));

    const classes = useStyles();
    const auth = useAuth();
    return (
        <>
            <Container component="main" maxWidth="sm">
			    {auth.isLogged() ? <Redirect to="/panel" /> : ""}
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Registro de donador
                    </Typography>
                    <form 
                        className={classes.form}
                        onSubmit={sendData}
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
                                    error={!!errors.first_name}
                                    helperText={errors.first_name}
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
                                    error={!!errors.last_name}
                                    helperText={errors.last_name}
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
                                        error={!!errors.birthday}
                                        helperText={errors.birthday}
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
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl
                                    required
                                    fullWidth
                                    variant="outlined"
                                    error={!!errors.password}
                                >
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
                                    <FormHelperText>{errors.password}</FormHelperText>
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
                            <Grid item xs={4}>
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.blood_type}
                                    required
                                >
                                    <InputLabel htmlFor="blood_type">Tipo de sangre</InputLabel>
                                    <Select
                                        id="blood_type"
                                        name="blood_type"
                                        value={datos.blood_type}
                                        label="Tipo de sangre"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="A+">A+</MenuItem>
                                        <MenuItem value="A-">A-</MenuItem>
                                        <MenuItem value="B+">B+</MenuItem>
                                        <MenuItem value="B-">B-</MenuItem>
                                        <MenuItem value="AB+">AB+</MenuItem>
                                        <MenuItem value="AB-">AB-</MenuItem>
                                        <MenuItem value="O+">O+</MenuItem>
                                        <MenuItem value="O-">O-</MenuItem>
                                    </Select>

                                    <FormHelperText>{errors.blood_type}</FormHelperText>
                                </FormControl>                
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    autoComplete="certified_file"
                                    name="certified_file"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="certified_file"
                                    label="Certificado médico"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Divider className={classes.divider} />
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question1"
                                    name="question1"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question1"
                                    label="Pregunta 1"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question2"
                                    name="question2"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question2"
                                    label="Pregunta 2"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question3"
                                    name="question3"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question3"
                                    label="Pregunta 3"
                                    onChange={handleFormAnswers}
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
                                <Link href="SignIn" variant="body1">
                                    ¿Necesitas a un donador? Registrate como Receptor aquí
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="LogIn" variant="body1">
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


export default SigninDonor;
import React, {useState} from 'react';
import Redirect from "react-router-dom/Redirect";

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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import FormHelperText from '@material-ui/core/FormHelperText';

//Autenticación
import useAuth from "./Auth/useAuth";
//Estilos css
import "../css/Form.css";

function SigninDonor() {
    const [datos, setDatos] = useState({        
        "curp": "",
        "first_name": "",
        "last_name": "",
        "birthday": "",
        "gender": "",
        "email": "",
        "phone_number": "",
        "place_of_residence": "",
        "password":"",
        "blood_type": "",
        "form_answers": {}
    })
    const [birthday, setBirthday] = React.useState(new Date());
    const[showPassword, setShowPassword] = React.useState(false);
    const [formAnswers, setFormAnswers] = React.useState({});
    const [errors, setErrors] = React.useState({
    });
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value.trim()
        })
    }
    const handleFormAnswers = (event) => {
        setFormAnswers({
            ...formAnswers,
            [event.target.name] : event.target.value.trim()
        });
    }
    React.useEffect(() => {
        setDatos({
            ...datos,
            "form_answers" : formAnswers
        })
    }, [formAnswers]);
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
				"Accept": "application/json",
			},
			body: JSON.stringify(data),
		});
	};
	const sendData = async (event) => {
		event.preventDefault();

		//Servidor
		const config = {
			url: "https://blood-donors-v1.herokuapp.com/v1/donors/",
			method: "POST",
		};
		try {
			const response = await goToBackend(config, datos);
			if (!response.ok) {
                const errorss = await response.json();
				setErrors({...errorss.errors});
                return;
			}
			const user = await response.json();
            setErrors({});
            auth.login(user.user.token);
		} catch (error) {
			console.error(error);
		}
	};

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
        },
        divider: {
            marginTop: "1em",
            marginBottom: "1em",
        }
    }));

    const classes = useStyles();
    const auth = useAuth();
    return (
        <>
            <Container component="main" maxWidth="sm">
			    {auth.isLogged() ? <Redirect to="/panel" /> : ""}
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Registro de donador
                    </Typography>
                    <form 
                        className={classes.form}
                        onSubmit={sendData}
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
                                    error={!!errors.first_name}
                                    helperText={errors.first_name}
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
                                    error={!!errors.last_name}
                                    helperText={errors.last_name}
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
                                        error={!!errors.birthday}
                                        helperText={errors.birthday}
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
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl
                                    required
                                    fullWidth
                                    variant="outlined"
                                    error={!!errors.password}
                                >
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
                                    <FormHelperText>{errors.password}</FormHelperText>
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
                            <Grid item xs={4}>
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.blood_type}
                                    required
                                >
                                    <InputLabel htmlFor="blood_type">Tipo de sangre</InputLabel>
                                    <Select
                                        id="blood_type"
                                        name="blood_type"
                                        value={datos.blood_type}
                                        label="Tipo de sangre"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="A+">A+</MenuItem>
                                        <MenuItem value="A-">A-</MenuItem>
                                        <MenuItem value="B+">B+</MenuItem>
                                        <MenuItem value="B-">B-</MenuItem>
                                        <MenuItem value="AB+">AB+</MenuItem>
                                        <MenuItem value="AB-">AB-</MenuItem>
                                        <MenuItem value="O+">O+</MenuItem>
                                        <MenuItem value="O-">O-</MenuItem>
                                    </Select>

                                    <FormHelperText>{errors.blood_type}</FormHelperText>
                                </FormControl>                
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    autoComplete="certified_file"
                                    name="certified_file"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="certified_file"
                                    label="Certificado médico"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Divider className={classes.divider} />
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question1"
                                    name="question1"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question1"
                                    label="Pregunta 1"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question2"
                                    name="question2"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question2"
                                    label="Pregunta 2"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question3"
                                    name="question3"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question3"
                                    label="Pregunta 3"
                                    onChange={handleFormAnswers}
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
                                <Link href="SignIn" variant="body1">
                                    ¿Necesitas a un donador? Registrate como Receptor aquí
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="LogIn" variant="body1">
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


export default SigninDonor;
import React, {useState} from 'react';
import Redirect from "react-router-dom/Redirect";

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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import FormHelperText from '@material-ui/core/FormHelperText';

//Autenticación
import useAuth from "./Auth/useAuth";
//Estilos css
import "../css/Form.css";

function SigninDonor() {
    const [datos, setDatos] = useState({        
        "curp": "",
        "first_name": "",
        "last_name": "",
        "birthday": "",
        "gender": "",
        "email": "",
        "phone_number": "",
        "place_of_residence": "",
        "password":"",
        "blood_type": "",
        "form_answers": {}
    })
    const [birthday, setBirthday] = React.useState(new Date());
    const[showPassword, setShowPassword] = React.useState(false);
    const [formAnswers, setFormAnswers] = React.useState({});
    const [errors, setErrors] = React.useState({
    });
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value.trim()
        })
    }
    const handleFormAnswers = (event) => {
        setFormAnswers({
            ...formAnswers,
            [event.target.name] : event.target.value.trim()
        });
    }
    React.useEffect(() => {
        setDatos({
            ...datos,
            "form_answers" : formAnswers
        })
    }, [formAnswers]);
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
				"Accept": "application/json",
			},
			body: JSON.stringify(data),
		});
	};
	const sendData = async (event) => {
		event.preventDefault();

		//Servidor
		const config = {
			url: "https://blood-donors-v1.herokuapp.com/v1/donors/",
			method: "POST",
		};
		try {
			const response = await goToBackend(config, datos);
			if (!response.ok) {
                const errorss = await response.json();
				setErrors({...errorss.errors});
                return;
			}
			const user = await response.json();
            setErrors({});
            auth.login(user.user.token);
		} catch (error) {
			console.error(error);
		}
	};

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
        },
        divider: {
            marginTop: "1em",
            marginBottom: "1em",
        }
    }));

    const classes = useStyles();
    const auth = useAuth();
    return (
        <>
            <Container component="main" maxWidth="sm">
			    {auth.isLogged() ? <Redirect to="/panel" /> : ""}
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Registro de donador
                    </Typography>
                    <form 
                        className={classes.form}
                        onSubmit={sendData}
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
                                    error={!!errors.first_name}
                                    helperText={errors.first_name}
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
                                    error={!!errors.last_name}
                                    helperText={errors.last_name}
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
                                        error={!!errors.birthday}
                                        helperText={errors.birthday}
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
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl
                                    required
                                    fullWidth
                                    variant="outlined"
                                    error={!!errors.password}
                                >
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
                                    <FormHelperText>{errors.password}</FormHelperText>
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
                            <Grid item xs={4}>
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.blood_type}
                                    required
                                >
                                    <InputLabel htmlFor="blood_type">Tipo de sangre</InputLabel>
                                    <Select
                                        id="blood_type"
                                        name="blood_type"
                                        value={datos.blood_type}
                                        label="Tipo de sangre"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="A+">A+</MenuItem>
                                        <MenuItem value="A-">A-</MenuItem>
                                        <MenuItem value="B+">B+</MenuItem>
                                        <MenuItem value="B-">B-</MenuItem>
                                        <MenuItem value="AB+">AB+</MenuItem>
                                        <MenuItem value="AB-">AB-</MenuItem>
                                        <MenuItem value="O+">O+</MenuItem>
                                        <MenuItem value="O-">O-</MenuItem>
                                    </Select>

                                    <FormHelperText>{errors.blood_type}</FormHelperText>
                                </FormControl>                
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    autoComplete="certified_file"
                                    name="certified_file"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="certified_file"
                                    label="Certificado médico"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Divider className={classes.divider} />
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question1"
                                    name="question1"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question1"
                                    label="Pregunta 1"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question2"
                                    name="question2"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question2"
                                    label="Pregunta 2"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question3"
                                    name="question3"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question3"
                                    label="Pregunta 3"
                                    onChange={handleFormAnswers}
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
                                <Link href="SignIn" variant="body1">
                                    ¿Necesitas a un donador? Registrate como Receptor aquí
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="LogIn" variant="body1">
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


export default SigninDonor;
import React, {useState} from 'react';
import Redirect from "react-router-dom/Redirect";

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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import FormHelperText from '@material-ui/core/FormHelperText';

//Autenticación
import useAuth from "./Auth/useAuth";
//Estilos css
import "../css/Form.css";

function SigninDonor() {
    const [datos, setDatos] = useState({        
        "curp": "",
        "first_name": "",
        "last_name": "",
        "birthday": "",
        "gender": "",
        "email": "",
        "phone_number": "",
        "place_of_residence": "",
        "password":"",
        "blood_type": "",
        "form_answers": {}
    })
    const [birthday, setBirthday] = React.useState(new Date());
    const[showPassword, setShowPassword] = React.useState(false);
    const [formAnswers, setFormAnswers] = React.useState({});
    const [errors, setErrors] = React.useState({
    });
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value.trim()
        })
    }
    const handleFormAnswers = (event) => {
        setFormAnswers({
            ...formAnswers,
            [event.target.name] : event.target.value.trim()
        });
    }
    React.useEffect(() => {
        setDatos({
            ...datos,
            "form_answers" : formAnswers
        })
    }, [formAnswers]);
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
				"Accept": "application/json",
			},
			body: JSON.stringify(data),
		});
	};
	const sendData = async (event) => {
		event.preventDefault();

		//Servidor
		const config = {
			url: "https://blood-donors-v1.herokuapp.com/v1/donors/",
			method: "POST",
		};
		try {
			const response = await goToBackend(config, datos);
			if (!response.ok) {
                const errorss = await response.json();
				setErrors({...errorss.errors});
                return;
			}
			const user = await response.json();
            setErrors({});
            auth.login(user.user.token);
		} catch (error) {
			console.error(error);
		}
	};

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
        },
        divider: {
            marginTop: "1em",
            marginBottom: "1em",
        }
    }));

    const classes = useStyles();
    const auth = useAuth();
    return (
        <>
            <Container component="main" maxWidth="sm">
			    {auth.isLogged() ? <Redirect to="/panel" /> : ""}
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Registro de donador
                    </Typography>
                    <form 
                        className={classes.form}
                        onSubmit={sendData}
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
                                    error={!!errors.first_name}
                                    helperText={errors.first_name}
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
                                    error={!!errors.last_name}
                                    helperText={errors.last_name}
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
                                        error={!!errors.birthday}
                                        helperText={errors.birthday}
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
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl
                                    required
                                    fullWidth
                                    variant="outlined"
                                    error={!!errors.password}
                                >
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
                                    <FormHelperText>{errors.password}</FormHelperText>
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
                            <Grid item xs={4}>
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.blood_type}
                                    required
                                >
                                    <InputLabel htmlFor="blood_type">Tipo de sangre</InputLabel>
                                    <Select
                                        id="blood_type"
                                        name="blood_type"
                                        value={datos.blood_type}
                                        label="Tipo de sangre"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="A+">A+</MenuItem>
                                        <MenuItem value="A-">A-</MenuItem>
                                        <MenuItem value="B+">B+</MenuItem>
                                        <MenuItem value="B-">B-</MenuItem>
                                        <MenuItem value="AB+">AB+</MenuItem>
                                        <MenuItem value="AB-">AB-</MenuItem>
                                        <MenuItem value="O+">O+</MenuItem>
                                        <MenuItem value="O-">O-</MenuItem>
                                    </Select>

                                    <FormHelperText>{errors.blood_type}</FormHelperText>
                                </FormControl>                
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    autoComplete="certified_file"
                                    name="certified_file"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="certified_file"
                                    label="Certificado médico"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Divider className={classes.divider} />
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question1"
                                    name="question1"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question1"
                                    label="Pregunta 1"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question2"
                                    name="question2"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question2"
                                    label="Pregunta 2"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question3"
                                    name="question3"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question3"
                                    label="Pregunta 3"
                                    onChange={handleFormAnswers}
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
                                <Link href="SignIn" variant="body1">
                                    ¿Necesitas a un donador? Registrate como Receptor aquí
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="LogIn" variant="body1">
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


export default SigninDonor;
import React, {useState} from 'react';
import Redirect from "react-router-dom/Redirect";

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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import FormHelperText from '@material-ui/core/FormHelperText';

//Autenticación
import useAuth from "./Auth/useAuth";
//Estilos css
import "../css/Form.css";

function SigninDonor() {
    const [datos, setDatos] = useState({        
        "curp": "",
        "first_name": "",
        "last_name": "",
        "birthday": "",
        "gender": "",
        "email": "",
        "phone_number": "",
        "place_of_residence": "",
        "password":"",
        "blood_type": "",
        "form_answers": {}
    })
    const [birthday, setBirthday] = React.useState(new Date());
    const[showPassword, setShowPassword] = React.useState(false);
    const [formAnswers, setFormAnswers] = React.useState({});
    const [errors, setErrors] = React.useState({
    });
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value.trim()
        })
    }
    const handleFormAnswers = (event) => {
        setFormAnswers({
            ...formAnswers,
            [event.target.name] : event.target.value.trim()
        });
    }
    React.useEffect(() => {
        setDatos({
            ...datos,
            "form_answers" : formAnswers
        })
    }, [formAnswers]);
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
				"Accept": "application/json",
			},
			body: JSON.stringify(data),
		});
	};
	const sendData = async (event) => {
		event.preventDefault();

		//Servidor
		const config = {
			url: "https://blood-donors-v1.herokuapp.com/v1/donors/",
			method: "POST",
		};
		try {
			const response = await goToBackend(config, datos);
			if (!response.ok) {
                const errorss = await response.json();
				setErrors({...errorss.errors});
                return;
			}
			const user = await response.json();
            setErrors({});
            auth.login(user.user.token);
		} catch (error) {
			console.error(error);
		}
	};

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
        },
        divider: {
            marginTop: "1em",
            marginBottom: "1em",
        }
    }));

    const classes = useStyles();
    const auth = useAuth();
    return (
        <>
            <Container component="main" maxWidth="sm">
			    {auth.isLogged() ? <Redirect to="/panel" /> : ""}
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Registro de donador
                    </Typography>
                    <form 
                        className={classes.form}
                        onSubmit={sendData}
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
                                    error={!!errors.first_name}
                                    helperText={errors.first_name}
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
                                    error={!!errors.last_name}
                                    helperText={errors.last_name}
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
                                        error={!!errors.birthday}
                                        helperText={errors.birthday}
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
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl
                                    required
                                    fullWidth
                                    variant="outlined"
                                    error={!!errors.password}
                                >
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
                                    <FormHelperText>{errors.password}</FormHelperText>
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
                            <Grid item xs={4}>
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.blood_type}
                                    required
                                >
                                    <InputLabel htmlFor="blood_type">Tipo de sangre</InputLabel>
                                    <Select
                                        id="blood_type"
                                        name="blood_type"
                                        value={datos.blood_type}
                                        label="Tipo de sangre"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="A+">A+</MenuItem>
                                        <MenuItem value="A-">A-</MenuItem>
                                        <MenuItem value="B+">B+</MenuItem>
                                        <MenuItem value="B-">B-</MenuItem>
                                        <MenuItem value="AB+">AB+</MenuItem>
                                        <MenuItem value="AB-">AB-</MenuItem>
                                        <MenuItem value="O+">O+</MenuItem>
                                        <MenuItem value="O-">O-</MenuItem>
                                    </Select>

                                    <FormHelperText>{errors.blood_type}</FormHelperText>
                                </FormControl>                
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    autoComplete="certified_file"
                                    name="certified_file"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="certified_file"
                                    label="Certificado médico"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Divider className={classes.divider} />
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question1"
                                    name="question1"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question1"
                                    label="Pregunta 1"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question2"
                                    name="question2"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question2"
                                    label="Pregunta 2"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question3"
                                    name="question3"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question3"
                                    label="Pregunta 3"
                                    onChange={handleFormAnswers}
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
                                <Link href="SignIn" variant="body1">
                                    ¿Necesitas a un donador? Registrate como Receptor aquí
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="LogIn" variant="body1">
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


export default SigninDonor;
import React, {useState} from 'react';
import Redirect from "react-router-dom/Redirect";

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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import FormHelperText from '@material-ui/core/FormHelperText';

//Autenticación
import useAuth from "./Auth/useAuth";
//Estilos css
import "../css/Form.css";

function SigninDonor() {
    const [datos, setDatos] = useState({        
        "curp": "",
        "first_name": "",
        "last_name": "",
        "birthday": "",
        "gender": "",
        "email": "",
        "phone_number": "",
        "place_of_residence": "",
        "password":"",
        "blood_type": "",
        "form_answers": {}
    })
    const [birthday, setBirthday] = React.useState(new Date());
    const[showPassword, setShowPassword] = React.useState(false);
    const [formAnswers, setFormAnswers] = React.useState({});
    const [errors, setErrors] = React.useState({
    });
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value.trim()
        })
    }
    const handleFormAnswers = (event) => {
        setFormAnswers({
            ...formAnswers,
            [event.target.name] : event.target.value.trim()
        });
    }
    React.useEffect(() => {
        setDatos({
            ...datos,
            "form_answers" : formAnswers
        })
    }, [formAnswers]);
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
				"Accept": "application/json",
			},
			body: JSON.stringify(data),
		});
	};
	const sendData = async (event) => {
		event.preventDefault();

		//Servidor
		const config = {
			url: "https://blood-donors-v1.herokuapp.com/v1/donors/",
			method: "POST",
		};
		try {
			const response = await goToBackend(config, datos);
			if (!response.ok) {
                const errorss = await response.json();
				setErrors({...errorss.errors});
                return;
			}
			const user = await response.json();
            setErrors({});
            auth.login(user.user.token);
		} catch (error) {
			console.error(error);
		}
	};

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
        },
        divider: {
            marginTop: "1em",
            marginBottom: "1em",
        }
    }));

    const classes = useStyles();
    const auth = useAuth();
    return (
        <>
            <Container component="main" maxWidth="sm">
			    {auth.isLogged() ? <Redirect to="/panel" /> : ""}
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Registro de donador
                    </Typography>
                    <form 
                        className={classes.form}
                        onSubmit={sendData}
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
                                    error={!!errors.first_name}
                                    helperText={errors.first_name}
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
                                    error={!!errors.last_name}
                                    helperText={errors.last_name}
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
                                        error={!!errors.birthday}
                                        helperText={errors.birthday}
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
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl
                                    required
                                    fullWidth
                                    variant="outlined"
                                    error={!!errors.password}
                                >
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
                                    <FormHelperText>{errors.password}</FormHelperText>
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
                            <Grid item xs={4}>
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.blood_type}
                                    required
                                >
                                    <InputLabel htmlFor="blood_type">Tipo de sangre</InputLabel>
                                    <Select
                                        id="blood_type"
                                        name="blood_type"
                                        value={datos.blood_type}
                                        label="Tipo de sangre"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="A+">A+</MenuItem>
                                        <MenuItem value="A-">A-</MenuItem>
                                        <MenuItem value="B+">B+</MenuItem>
                                        <MenuItem value="B-">B-</MenuItem>
                                        <MenuItem value="AB+">AB+</MenuItem>
                                        <MenuItem value="AB-">AB-</MenuItem>
                                        <MenuItem value="O+">O+</MenuItem>
                                        <MenuItem value="O-">O-</MenuItem>
                                    </Select>

                                    <FormHelperText>{errors.blood_type}</FormHelperText>
                                </FormControl>                
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    autoComplete="certified_file"
                                    name="certified_file"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="certified_file"
                                    label="Certificado médico"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Divider className={classes.divider} />
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question1"
                                    name="question1"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question1"
                                    label="Pregunta 1"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question2"
                                    name="question2"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question2"
                                    label="Pregunta 2"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question3"
                                    name="question3"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question3"
                                    label="Pregunta 3"
                                    onChange={handleFormAnswers}
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
                                <Link href="SignIn" variant="body1">
                                    ¿Necesitas a un donador? Registrate como Receptor aquí
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="LogIn" variant="body1">
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


export default SigninDonor;
import React, {useState} from 'react';
import Redirect from "react-router-dom/Redirect";

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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import FormHelperText from '@material-ui/core/FormHelperText';

//Autenticación
import useAuth from "./Auth/useAuth";
//Estilos css
import "../css/Form.css";

function SigninDonor() {
    const [datos, setDatos] = useState({        
        "curp": "",
        "first_name": "",
        "last_name": "",
        "birthday": "",
        "gender": "",
        "email": "",
        "phone_number": "",
        "place_of_residence": "",
        "password":"",
        "blood_type": "",
        "form_answers": {}
    })
    const [birthday, setBirthday] = React.useState(new Date());
    const[showPassword, setShowPassword] = React.useState(false);
    const [formAnswers, setFormAnswers] = React.useState({});
    const [errors, setErrors] = React.useState({
    });
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value.trim()
        })
    }
    const handleFormAnswers = (event) => {
        setFormAnswers({
            ...formAnswers,
            [event.target.name] : event.target.value.trim()
        });
    }
    React.useEffect(() => {
        setDatos({
            ...datos,
            "form_answers" : formAnswers
        })
    }, [formAnswers]);
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
				"Accept": "application/json",
			},
			body: JSON.stringify(data),
		});
	};
	const sendData = async (event) => {
		event.preventDefault();

		//Servidor
		const config = {
			url: "https://blood-donors-v1.herokuapp.com/v1/donors/",
			method: "POST",
		};
		try {
			const response = await goToBackend(config, datos);
			if (!response.ok) {
                const errorss = await response.json();
				setErrors({...errorss.errors});
                return;
			}
			const user = await response.json();
            setErrors({});
            auth.login(user.user.token);
		} catch (error) {
			console.error(error);
		}
	};

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
        },
        divider: {
            marginTop: "1em",
            marginBottom: "1em",
        }
    }));

    const classes = useStyles();
    const auth = useAuth();
    return (
        <>
            <Container component="main" maxWidth="sm">
			    {auth.isLogged() ? <Redirect to="/panel" /> : ""}
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Registro de donador
                    </Typography>
                    <form 
                        className={classes.form}
                        onSubmit={sendData}
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
                                    error={!!errors.first_name}
                                    helperText={errors.first_name}
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
                                    error={!!errors.last_name}
                                    helperText={errors.last_name}
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
                                        error={!!errors.birthday}
                                        helperText={errors.birthday}
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
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl
                                    required
                                    fullWidth
                                    variant="outlined"
                                    error={!!errors.password}
                                >
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
                                    <FormHelperText>{errors.password}</FormHelperText>
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
                            <Grid item xs={4}>
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.blood_type}
                                    required
                                >
                                    <InputLabel htmlFor="blood_type">Tipo de sangre</InputLabel>
                                    <Select
                                        id="blood_type"
                                        name="blood_type"
                                        value={datos.blood_type}
                                        label="Tipo de sangre"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="A+">A+</MenuItem>
                                        <MenuItem value="A-">A-</MenuItem>
                                        <MenuItem value="B+">B+</MenuItem>
                                        <MenuItem value="B-">B-</MenuItem>
                                        <MenuItem value="AB+">AB+</MenuItem>
                                        <MenuItem value="AB-">AB-</MenuItem>
                                        <MenuItem value="O+">O+</MenuItem>
                                        <MenuItem value="O-">O-</MenuItem>
                                    </Select>

                                    <FormHelperText>{errors.blood_type}</FormHelperText>
                                </FormControl>                
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    autoComplete="certified_file"
                                    name="certified_file"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="certified_file"
                                    label="Certificado médico"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Divider className={classes.divider} />
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question1"
                                    name="question1"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question1"
                                    label="Pregunta 1"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question2"
                                    name="question2"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question2"
                                    label="Pregunta 2"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question3"
                                    name="question3"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question3"
                                    label="Pregunta 3"
                                    onChange={handleFormAnswers}
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
                                <Link href="SignIn" variant="body1">
                                    ¿Necesitas a un donador? Registrate como Receptor aquí
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="LogIn" variant="body1">
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


export default SigninDonor;
import React, {useState} from 'react';
import Redirect from "react-router-dom/Redirect";

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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import FormHelperText from '@material-ui/core/FormHelperText';

//Autenticación
import useAuth from "./Auth/useAuth";
//Estilos css
import "../css/Form.css";

function SigninDonor() {
    const [datos, setDatos] = useState({        
        "curp": "",
        "first_name": "",
        "last_name": "",
        "birthday": "",
        "gender": "",
        "email": "",
        "phone_number": "",
        "place_of_residence": "",
        "password":"",
        "blood_type": "",
        "form_answers": {}
    })
    const [birthday, setBirthday] = React.useState(new Date());
    const[showPassword, setShowPassword] = React.useState(false);
    const [formAnswers, setFormAnswers] = React.useState({});
    const [errors, setErrors] = React.useState({
    });
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value.trim()
        })
    }
    const handleFormAnswers = (event) => {
        setFormAnswers({
            ...formAnswers,
            [event.target.name] : event.target.value.trim()
        });
    }
    React.useEffect(() => {
        setDatos({
            ...datos,
            "form_answers" : formAnswers
        })
    }, [formAnswers]);
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
				"Accept": "application/json",
			},
			body: JSON.stringify(data),
		});
	};
	const sendData = async (event) => {
		event.preventDefault();

		//Servidor
		const config = {
			url: "https://blood-donors-v1.herokuapp.com/v1/donors/",
			method: "POST",
		};
		try {
			const response = await goToBackend(config, datos);
			if (!response.ok) {
                const errorss = await response.json();
				setErrors({...errorss.errors});
                return;
			}
			const user = await response.json();
            setErrors({});
            auth.login(user.user.token);
		} catch (error) {
			console.error(error);
		}
	};

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
        },
        divider: {
            marginTop: "1em",
            marginBottom: "1em",
        }
    }));

    const classes = useStyles();
    const auth = useAuth();
    return (
        <>
            <Container component="main" maxWidth="sm">
			    {auth.isLogged() ? <Redirect to="/panel" /> : ""}
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Registro de donador
                    </Typography>
                    <form 
                        className={classes.form}
                        onSubmit={sendData}
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
                                    error={!!errors.first_name}
                                    helperText={errors.first_name}
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
                                    error={!!errors.last_name}
                                    helperText={errors.last_name}
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
                                        error={!!errors.birthday}
                                        helperText={errors.birthday}
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
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl
                                    required
                                    fullWidth
                                    variant="outlined"
                                    error={!!errors.password}
                                >
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
                                    <FormHelperText>{errors.password}</FormHelperText>
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
                            <Grid item xs={4}>
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.blood_type}
                                    required
                                >
                                    <InputLabel htmlFor="blood_type">Tipo de sangre</InputLabel>
                                    <Select
                                        id="blood_type"
                                        name="blood_type"
                                        value={datos.blood_type}
                                        label="Tipo de sangre"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="A+">A+</MenuItem>
                                        <MenuItem value="A-">A-</MenuItem>
                                        <MenuItem value="B+">B+</MenuItem>
                                        <MenuItem value="B-">B-</MenuItem>
                                        <MenuItem value="AB+">AB+</MenuItem>
                                        <MenuItem value="AB-">AB-</MenuItem>
                                        <MenuItem value="O+">O+</MenuItem>
                                        <MenuItem value="O-">O-</MenuItem>
                                    </Select>

                                    <FormHelperText>{errors.blood_type}</FormHelperText>
                                </FormControl>                
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    autoComplete="certified_file"
                                    name="certified_file"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="certified_file"
                                    label="Certificado médico"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Divider className={classes.divider} />
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question1"
                                    name="question1"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question1"
                                    label="Pregunta 1"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question2"
                                    name="question2"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question2"
                                    label="Pregunta 2"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question3"
                                    name="question3"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question3"
                                    label="Pregunta 3"
                                    onChange={handleFormAnswers}
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
                                <Link href="SignIn" variant="body1">
                                    ¿Necesitas a un donador? Registrate como Receptor aquí
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="LogIn" variant="body1">
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


export default SigninDonor;
import React, {useState} from 'react';
import Redirect from "react-router-dom/Redirect";

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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Divider from '@material-ui/core/Divider';
import FormHelperText from '@material-ui/core/FormHelperText';

//Autenticación
import useAuth from "./Auth/useAuth";
//Estilos css
import "../css/Form.css";

function SigninDonor() {
    const [datos, setDatos] = useState({        
        "curp": "",
        "first_name": "",
        "last_name": "",
        "birthday": "",
        "gender": "",
        "email": "",
        "phone_number": "",
        "place_of_residence": "",
        "password":"",
        "blood_type": "",
        "form_answers": {}
    })
    const [birthday, setBirthday] = React.useState(new Date());
    const[showPassword, setShowPassword] = React.useState(false);
    const [formAnswers, setFormAnswers] = React.useState({});
    const [errors, setErrors] = React.useState({
    });
    const handleInputChange = (event) => {
        setDatos({
            ...datos,
            [event.target.name] : event.target.value.trim()
        })
    }
    const handleFormAnswers = (event) => {
        setFormAnswers({
            ...formAnswers,
            [event.target.name] : event.target.value.trim()
        });
    }
    React.useEffect(() => {
        setDatos({
            ...datos,
            "form_answers" : formAnswers
        })
    }, [formAnswers]);
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
				"Accept": "application/json",
			},
			body: JSON.stringify(data),
		});
	};
	const sendData = async (event) => {
		event.preventDefault();

		//Servidor
		const config = {
			url: "https://blood-donors-v1.herokuapp.com/v1/donors/",
			method: "POST",
		};
		try {
			const response = await goToBackend(config, datos);
			if (!response.ok) {
                const errorss = await response.json();
				setErrors({...errorss.errors});
                return;
			}
			const user = await response.json();
            setErrors({});
            auth.login(user.user.token);
		} catch (error) {
			console.error(error);
		}
	};

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
        },
        divider: {
            marginTop: "1em",
            marginBottom: "1em",
        }
    }));

    const classes = useStyles();
    const auth = useAuth();
    return (
        <>
            <Container component="main" maxWidth="sm">
			    {auth.isLogged() ? <Redirect to="/panel" /> : ""}
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Registro de donador
                    </Typography>
                    <form 
                        className={classes.form}
                        onSubmit={sendData}
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
                                    error={!!errors.first_name}
                                    helperText={errors.first_name}
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
                                    error={!!errors.last_name}
                                    helperText={errors.last_name}
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
                                        error={!!errors.birthday}
                                        helperText={errors.birthday}
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
                                    error={!!errors.email}
                                    helperText={errors.email}
                                    onChange={handleInputChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <FormControl
                                    required
                                    fullWidth
                                    variant="outlined"
                                    error={!!errors.password}
                                >
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
                                    <FormHelperText>{errors.password}</FormHelperText>
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
                            <Grid item xs={4}>
                                <FormControl
                                    variant="outlined"
                                    fullWidth
                                    error={!!errors.blood_type}
                                    required
                                >
                                    <InputLabel htmlFor="blood_type">Tipo de sangre</InputLabel>
                                    <Select
                                        id="blood_type"
                                        name="blood_type"
                                        value={datos.blood_type}
                                        label="Tipo de sangre"
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="A+">A+</MenuItem>
                                        <MenuItem value="A-">A-</MenuItem>
                                        <MenuItem value="B+">B+</MenuItem>
                                        <MenuItem value="B-">B-</MenuItem>
                                        <MenuItem value="AB+">AB+</MenuItem>
                                        <MenuItem value="AB-">AB-</MenuItem>
                                        <MenuItem value="O+">O+</MenuItem>
                                        <MenuItem value="O-">O-</MenuItem>
                                    </Select>

                                    <FormHelperText>{errors.blood_type}</FormHelperText>
                                </FormControl>                
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    autoComplete="certified_file"
                                    name="certified_file"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="certified_file"
                                    label="Certificado médico"
                                    onChange={handleInputChange}
                                />
                            </Grid>
                            <Divider className={classes.divider} />
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question1"
                                    name="question1"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question1"
                                    label="Pregunta 1"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question2"
                                    name="question2"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question2"
                                    label="Pregunta 2"
                                    onChange={handleFormAnswers}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="question3"
                                    name="question3"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="question3"
                                    label="Pregunta 3"
                                    onChange={handleFormAnswers}
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
                                <Link href="SignIn" variant="body1">
                                    ¿Necesitas a un donador? Registrate como Receptor aquí
                                </Link>
                            </Grid>
                            <Grid item>
                                <Link href="LogIn" variant="body1">
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


export default SigninDonor;
