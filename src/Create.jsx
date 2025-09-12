import { useState } from 'react'
import { Paper, Button, TextField, Container, Box, Typography } from '@mui/material';
import AddIcon from "@mui/icons-material/Add";

const Create = ({ anuncios, addAnuncio, empresas }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newDesc, setNewDesc] = useState('')
  const [newUbi, setNewUbi] = useState('')
  const [newContract, setNewContract] = useState('')
  const [newEmpresa, setNewEmpresa] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (newTitle.trim() === '' || newDesc.trim() === '' || newUbi.trim() === '' || newContract.trim() === "" || newEmpresa.trim() === "") {
      alert("Por favor completa todos los campos obligatorios.")
      setNewTitle("");
      setNewDesc("");
      setNewUbi("");
      setNewContract("");
      setNewEmpresa("");
      return
    }

    addAnuncio({
      title: newTitle,
      desc: newDesc,
      ubi: newUbi,
      contract: newContract,
      empresa: newEmpresa,
      date: new Date().toLocaleDateString()
    });

    setNewTitle("");
    setNewDesc("");
    setNewUbi("");
    setNewContract("");
    setNewEmpresa("");
  }

  return (
    <Container maxWidth="md" sx={{ mt: 2 }}>
      <Paper sx={{ p: 3 }}>
        <Typography
          variant="h6"
          align="center"
          sx={{ mb: 2 }}
        >
          Agregar Contacto
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            gap: 2,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <TextField
            label="Título"
            variant="outlined"
            size="small"
            fullWidth
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <TextField
            label="Descripción"
            variant="outlined"
            size="small"
            fullWidth
            value={newDesc}
            onChange={(e) => setNewDesc(e.target.value)}
          />
          <TextField
            label="Ubicación"
            variant="outlined"
            size="small"
            fullWidth
            value={newUbi}
            onChange={(e) => setNewUbi(e.target.value)}
          />

          <FormControl fullWidth size="small">
            <InputLabel>Contrato</InputLabel>
            <Select
              value={newContract}
              onChange={(e) => setNewContract(e.target.value)}
              label="Contrato"
            >
              <MenuItem value="Full-time">Full-time</MenuItem>
              <MenuItem value="Part-time">Part-time</MenuItem>
              <MenuItem value="Freelance">Freelance</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel>Empresa</InputLabel>
            <Select
              value={newEmpresa}
              onChange={(e) => setNewEmpresa(e.target.value)}
              label="Empresa"
            >
              {empresas.map((empresa) => (
                <MenuItem key={empresa.id} value={empresa.nombre}>
                  {empresa.nombre}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
          >
            Agregar
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Create