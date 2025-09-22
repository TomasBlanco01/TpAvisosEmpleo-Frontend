import { Paper, TextField, Container, Typography, Box } from "@mui/material";
import React from 'react'

const Filter = ({ filter, setFilter }) => {
  const handleFilter = (event) => {
    setFilter(event.target.value);
  };

  return (
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      <Paper sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h4" align="center" sx={{ fontWeight: "bold", mb: 2 }}>
          Registro de Anuncios
        </Typography>

        <Typography variant="h6" align="center" sx={{ mb: 1 }}>
          Filtrar Anuncio
        </Typography>

        <Box display="flex" justifyContent="center">
          <TextField
            label="Ubicacion o Tipo de contrato"
            variant="outlined"
            size="small"
            value={filter}
            onChange={handleFilter}
          />
        </Box>
      </Paper>
    </Container>
  );
};

export default Filter;
