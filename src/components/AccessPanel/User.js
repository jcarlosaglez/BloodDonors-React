import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { red } from '@material-ui/core/colors';

import '../../css/AccessPanel/User.css';

const User = (props) => {
	const me = props.me;
    return (
		<div className="user">
			<div className="img-user">
				<AccountCircleIcon style={{ color: red[500], fontSize: 80 }}/>
			</div>
			<div className="inf-user">
			<svg className="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#ff2222" fill-opacity="1" d="M0,64L26.7,85.3C53.3,107,107,149,160,176C213.3,203,267,213,320,202.7C373.3,192,427,160,480,160C533.3,160,587,192,640,218.7C693.3,245,747,267,800,272C853.3,277,907,267,960,229.3C1013.3,192,1067,128,1120,117.3C1173.3,107,1227,149,1280,154.7C1333.3,160,1387,128,1413,112L1440,96L1440,320L1413.3,320C1386.7,320,1333,320,1280,320C1226.7,320,1173,320,1120,320C1066.7,320,1013,320,960,320C906.7,320,853,320,800,320C746.7,320,693,320,640,320C586.7,320,533,320,480,320C426.7,320,373,320,320,320C266.7,320,213,320,160,320C106.7,320,53,320,27,320L0,320Z"></path></svg>
				<div>
					<h3>Nombre</h3>
					<h4>{me.first_name}</h4>
				</div>
				<div>
					<h3>Correo</h3>
					<h4>{me.email}</h4>
				</div>
				<div>
					<h3>Id</h3>
					<h4>{me.id}</h4>
				</div>
			</div>
		</div>
      );
}

export default User;
