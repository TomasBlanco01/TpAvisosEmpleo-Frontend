import { Paper, TextField, Container, Typography, Box } from "@mui/material";
import React from 'react'

const Filter = ({ filter, setFilter }) => {
  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      <Paper sx={{ p: 3, textAlign: "center" }}>
        <Box display="flex" justifyContent="center">
          <Typography variant="h6" align="left" sx={{ mb: 1 }}>
          Filtrar Aviso
          </Typography>
          <TextField
            label="Ubicacion o Tipo de contrato"
            variant="outlined"
            size="small"
            value={filter}
            onChange={handleFilter}
            sx={{ ml: 2, width: '300px' }}
          />
        </Box>
      </Paper>
    </Container>
  );
};

export default Filter;
