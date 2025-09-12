import { useState, useEffect } from 'react'
import noteServiceAnuncios from './services/anuncios'
import noteServiceEmpresas from './services/empresas'
import List from './List'
import Create from './Create'
import Visual from './Visual'
import Filter from './Filter'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const App = () => {

  const [anuncios, setAnuncios] = useState([])
  const [empresas, setEmpresas] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    noteServiceAnuncios.getAll()
      .then(response => setAnuncios(response.data))
      .catch(error => console.error('Error fetching ads:', error));
  }, []);

  const getNextId = (anuncios) => {
    if (anuncios.length === 0) return 1;
    const ids = anuncios.map(a => a.id);
    return Math.max(...ids) + 1;
  };

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
      .catch((error) => console.error("Error loading empresas:", error));
  }, []);

  const getNextIdEmp = (empresas) => {
    if (empresas.length === 0) return 1;
    const ids = empresas.map(e => e.id);
    return Math.max(...ids) + 1;
  };

  const addEmpresa = (newEmpresa) => {
    const newId = getNextIdEmp(empresas);
    const empresaWithId = { ...newEmpresa, id: newId };

    noteServiceEmpresas.create(empresaWithId)
      .then(response => setEmpresas(empresas.concat(response.data)))
      .catch(error => console.error('Error adding ads:', error));
  };

  return (
    <div>
      <Filter filter={filter} setFilter={setFilter}></Filter>
      <List anuncios={anuncios} filter={filter} deleteAnuncio={deleteAnuncio}></List>
      <Create anuncios={anuncios} addAnuncio={addAnuncio} empresas={empresas} addEmpresa={addEmpresa}></Create>
      <Visual></Visual>
    </div>
  )
}

export default App
