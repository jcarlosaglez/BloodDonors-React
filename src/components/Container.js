import React from 'react';
import Grid from '@material-ui/core/Grid';
import Card from "./Card";


function Container(props) {
    const data = props.data;
    let roots = data.map((product, index, array) => {
        return  <Grid key={index} item xs={12} sm={6}  lg={3}> <Card datos={product}  /> </Grid>;})
    return (
        <div className="">
            <Grid container spacing={3}>
                {roots}  
            </Grid>
        </div>
        )
    }

export default Container;