import { useParams } from "react-router-dom";

const ContactDonor = () => {
    let { id } = useParams();
		return(
      <div>
					<h2>Hola que tal</h2>
					<br />
					<p>La vida {id}</p>
			</div>
    )
}
export default ContactDonor;
