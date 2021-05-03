import React from 'react';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const PanelUser = () => {
    return(
        <>
            <Container>
                <Grid container spacing={1}>
                    <Grid item xs={4}>
                        <Paper className="">xs=12</Paper>
                    </Grid>
                    <Grid item xs={8}>
                        <Paper className="">xs=12</Paper>
                    </Grid>
                </Grid>
            </Container>
        </>
    )

}
export default PanelUser;