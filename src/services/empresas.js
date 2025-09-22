import api from '../api';

// Obtener todas las empresas
const getAll = () => {
  return api.get('/empresas');
};

// Crear empresa nueva
const create = (newEmpresa) => {
  return api.post('/empresas', newEmpresa);
};

export default { getAll, create };
