import { useState, useEffect } from 'react'
import React from 'react'
import noteServiceAnuncios from './services/anuncios'
import noteServiceEmpresas from './services/empresas'
import List from './List'
import Create from './Create'
import Filter from './Filter'
import { Typography } from "@mui/material";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const App = () => {

  const [anuncios, setAnuncios] = useState([]);
  const [empresas, setEmpresas] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    noteServiceAnuncios.getAll()
      .then(response => setAnuncios(response.data))
      .catch(error => console.error('Error fetching ads:', error));
  }, []);

  const addAnuncio = (newAnuncio) => {
    const newId = getNextId(anuncios);
    const anuncioWithId = { ...newAnuncio, id: newId };

    noteServiceAnuncios.create(anuncioWithId)
      .then(response => setAnuncios(anuncios.concat(response.data)))
      .catch(error => console.error('Error adding ads:', error));
  };

  const deleteAnuncio = (anuncioId, anuncioName) => {
    if (window.confirm(`Delete ${anuncioName} ?`)) {
      noteServiceAnuncios.remove(anuncioId)
        .then(() => setAnuncios(anuncios.filter(a => a.id !== anuncioId)))
        .catch(error => console.error('Error deleting ads:', error));
    }
  };

  useEffect(() => {
    noteServiceEmpresas.getAll()
      .then((response) => setEmpresas(response.data))
      .catch((error) => console.error("Error loading company:", error));
  }, []);

  const addEmpresa = (newEmpresa) => {
    const newId = getNextIdEmp(empresas);
    const empresaWithId = { ...newEmpresa, id: newId };

    noteServiceEmpresas.create(empresaWithId)
      .then(response => setEmpresas(empresas.concat(response.data)))
      .catch(error => console.error('Error adding company:', error));
  };

  return (
    <div>
      <Typography variant="h4" align="center" sx={{ fontWeight: "bold", mb: 1 }}>
                Registro de Avisos
              </Typography>
      <Create addAnuncio={addAnuncio} empresas={empresas} addEmpresa={addEmpresa}></Create>
      <Filter filter={filter} setFilter={setFilter}></Filter> 
      <List anuncios={anuncios} empresas={empresas} filter={filter} deleteAnuncio={deleteAnuncio}></List>
    </div>
  )
}

export default App
