import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Container from '@material-ui/core/Container';

import '../../css/AccessPanel/User.css';

const User = () => {
    return (
		<div className="user">
			<Container>
				<div>
					<AccountCircleIcon />
				</div>
				<hr />
				<div>
					<h3>Usuario</h3>
					<h4>JuanGa21</h4>
				</div>
				<div className="flex">
					<div>
						<h3>Nombre</h3>
						<h4>Juan Galindo Perez</h4>
					</div>
					<div>
						<h3>Correo</h3>
						<h4>juang20@gmail.com</h4>
					</div>
				</div>
				<div>
					<h3>Tipo de sangre</h3>
					<h4> B+ </h4>
				</div>
			</Container>
		</div>
      );
}

export default User;
