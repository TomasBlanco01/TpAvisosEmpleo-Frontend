import api from '../api';

// Obtener todos los avisos
const getAll = () => {
  return api.get('/avisos');
};

// Crear un aviso nuevo
const create = (newAviso) => {
  return api.post('/avisos', newAviso);
};

// Eliminar un aviso por ID
const remove = (id) => {
  return api.delete(`/avisos/${id}`);
};

export default { getAll, create, remove };
