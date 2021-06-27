import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Container from '@material-ui/core/Container';
import { red } from '@material-ui/core/colors';

import '../../css/AccessPanel/User.css';

const User = () => {
    return (
		<Container className="user">
			<div className="img-user">
				<AccountCircleIcon style={{ color: red[500], fontSize: 80 }}/>
			</div>
			<div className="inf-user">
				<div>
					<h3>Nombre</h3>
					<h4>Juan Galindo Perez</h4>
				</div>
				<div>
					<h3>Correo</h3>
					<h4>juang20@gmail.com</h4>
				</div>
				<div>
					<h3>Tipo de sangre</h3>
					<h4> B+ </h4>
				</div>
			</div>
		</Container>
      );
}

export default User;
