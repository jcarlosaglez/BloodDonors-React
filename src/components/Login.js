import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Switch from '@material-ui/core/Switch';
import Snackbar from '@material-ui/core/Snackbar';
import ErrorIcon from '@material-ui/icons/ErrorOutlineOutlined';


function Copyright() {
	return (
		<Typography variant="body2" color="textSecondary" align="center">
			{"Copyright © "}
			<Link color="inherit" component={RouterLink} to="/">
				BloorDonor
			</Link>{" "}
			{new Date().getFullYear()}
			{"."}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	alertError: {
		backgroundColor: "#f44336",
		padding: "0.5em 1em",
		borderRadius: "4px",
		color: "white",
		fontWeight: 500,
		display: "flex",
		alignItems: "center"
	}
}));

function SignIn() {
	const [data, setData] = useState({
		email: "",
		password: "",
	});
	const [isDonor, setIsDonor] = React.useState(true);
	const [error, setError] = React.useState(false);
	const handleInpChange = (event) => {
		setData({
			...data,
			[event.target.name]: event.target.value,
		});
	};
	const goToBackend = (config, data) => {
		return fetch(config.url, {
			method: config.method,
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
			},
			body: JSON.stringify(data),
		});
	};
	const sendData = async (event) => {
		event.preventDefault();
		console.log(data);

		//Servidor
		const config = {
			url: `https://blood-donors-v1.herokuapp.com/v1/${isDonor ? "donors" : "receivers"}/login`,
			method: "POST",
		};
		try {
			const response = await goToBackend(config, data);
			if (!response.ok) {
				console.log(response);
				setError(true);
			}
			const todo = await response.json();
			console.log("data", todo, response, data);
		} catch (error) {
			console.log("OOOh no");
			console.error(error);
		}
	};

	const handleClose = () => {
		setError(false);
	};

	const classes = useStyles();

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Sign in
				</Typography>
				<form className={classes.form} onSubmit={sendData}>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						autoComplete="email"
						autoFocus
						onChange={handleInpChange}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						onChange={handleInpChange}
					/>
					<FormControlLabel
						control={<Checkbox value="remember" color="primary" />}
						label="Remember me"
					/>
					<Grid container alignItems="center">
						<Grid item>
							Receptor
						</Grid>
						<Grid item>
							<Switch
								checked={isDonor}
								onChange={() => {setIsDonor(!isDonor)}}
							/>
						</Grid>
						<Grid item>
							Donador
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Sign In
					</Button>
					<Grid container>
						<Grid item xs>
							<Link href="#" variant="body2">
								Olvidaste tu contraseña?
							</Link>
						</Grid>
						<Grid item>
							<Link component={RouterLink} to="/SignIn">
								{"¿No tienes cuenta? Registrate"}
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
			<Box mt={8}>
				<Copyright />
			</Box>
			<Snackbar
				children={<div className={classes.alertError}><ErrorIcon /><p>El correo y contraseña no coinciden</p></div>}
				anchorOrigin={{ vertical: "bottom", horizontal: "center"}}
				open={error}
				autoHideDuration={5000}
				onClose={handleClose}
				key={"bottom" + "center"}
			/>
		</Container>
	);
}

export default SignIn;
