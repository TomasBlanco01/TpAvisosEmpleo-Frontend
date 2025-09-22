import { useState } from 'react'
import React from 'react'
import { Paper, Button, TextField, Container, Box, Typography, FormControl, InputLabel, Select, MenuItem, Dialog, DialogTitle, DialogContent } from '@mui/material';
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";

const Create = ({ addAnuncio, empresas, addEmpresa }) => {
  //anuncios
  const [newTitle, setNewTitle] = useState('')
  const [newDesc, setNewDesc] = useState('')
  const [newUbi, setNewUbi] = useState('')
  const [newContract, setNewContract] = useState('')
  const [newEmpresa, setNewEmpresa] = useState('')

  //empresas
  const [newNameEmpresa, setNewNameEmpresa] = useState('')
  const [newDescEmpresa, setNewDescEmpresa] = useState('')
  const [newEmailEmpresa, setNewEmailEmpresa] = useState('')

  const [openNewEmpresa, setOpenNewEmpresa] = useState(false);


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

  const handleSubmitEmpresa = (event) => {
    event.preventDefault()
    if (newNameEmpresa.trim() === '' || newDescEmpresa.trim() === '' || newEmailEmpresa.trim() === '') {
      alert("Por favor completa todos los campos obligatorios.")
      setNewNameEmpresa("");
      setNewDescEmpresa("");
      setNewEmailEmpresa("");
      return
    }

    addEmpresa({
      nombre: newNameEmpresa,
      desc: newDescEmpresa,
      email: newEmailEmpresa
    });

    setNewEmpresa(newNameEmpresa);
    setNewNameEmpresa("");
    setNewDescEmpresa("");
    setNewEmailEmpresa("");
    setOpenNewEmpresa(false);
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 2 }}>
      <Paper sx={{ p: 3 }}>
        <Typography
          variant="h6"
          align="center"
          sx={{ mb: 2 }}
        >
          Agregar Aviso
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
              <MenuItem>
                <Button variant="outlined" onClick={() => setOpenNewEmpresa(true)} startIcon={<AddIcon />}> Nueva Empresa </Button>
              </MenuItem>
            </Select>
          </FormControl>

          <Dialog open={openNewEmpresa} onClose={() => setOpenNewEmpresa(false)}>
            <DialogTitle>Nueva Empresa</DialogTitle>
            <DialogContent>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
                <TextField label="Nombre" size="small" fullWidth value={newNameEmpresa} onChange={(e) => setNewNameEmpresa(e.target.value)} />
                <TextField label="Descripción" size="small" fullWidth value={newDescEmpresa} onChange={(e) => setNewDescEmpresa(e.target.value)} />
                <TextField label="Email" size="small" fullWidth value={newEmailEmpresa} onChange={(e) => setNewEmailEmpresa(e.target.value)} />
                <Button onClick={handleSubmitEmpresa} variant="contained" color="primary" startIcon={<AddIcon />}>
                  Agregar
                </Button>
              </Box>
            </DialogContent>
          </Dialog>

          <Button
            type="submit"
            variant="contained"
            color="primary"
            startIcon={<SendIcon />}
            sx={{ px: 6 }}
          >
            Enviar
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Create