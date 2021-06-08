import { useRouteMatch } from "react-router-dom";
import React from "react";

function AccessPanel() {
    let { path } = useRouteMatch();

	return (
        <h1> {path} </h1>
	);
}
export default AccessPanel;