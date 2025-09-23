import { useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Button, TextField, Container, Box, Typography, FormControl, InputLabel, Select, MenuItem, Dialog, DialogTitle, DialogContent } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import Pagination from '@mui/material/Pagination';
import React from 'react'

const List = ({ anuncios, empresas, filter, deleteAnuncio }) => {

    const [openVisual, setOpenVisual] = useState(false);
    const [selectedAnuncio, setSelectedAnuncio] = useState(null);
    const [page, setPage] = useState(1);

    const avisosPorPagina = 5;
    const anunciosFiltrados = anuncios.filter((anuncio) =>
        anuncio.ubicacion.toLowerCase().includes(filter.toLowerCase()) ||
        anuncio.tipo_contrato.toLowerCase().includes(filter.toLowerCase())
    );
    const totalPaginas = Math.ceil(anunciosFiltrados.length / avisosPorPagina);
    const anunciosPagina = anunciosFiltrados.slice(
        (page - 1) * avisosPorPagina,
        page * avisosPorPagina
    );

    const empresaInfo = selectedAnuncio
        ? empresas.find(e => e.nombre === selectedAnuncio.empresa)
        : null


    return (
        <div>
        
        <Container maxWidth="xl" sx={{ mt: 2 }}>
            <Paper sx={{ p: 3 }}>
                
                <Typography variant="h6" align="center" sx={{ mb: 1 }}>
                    Agenda
                </Typography>

                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">
                                <strong>Título</strong>
                            </TableCell>
                            <TableCell align="center">
                                <strong>Descripción</strong>
                            </TableCell>
                            <TableCell align="center">
                                <strong>Ubicación</strong>
                            </TableCell>
                            <TableCell align="center">
                                <strong>Contrato</strong>
                            </TableCell>
                            <TableCell align="center">
                                <strong>Empresa</strong>
                            </TableCell>
                            <TableCell align="center">
                                <strong>Fecha</strong>
                            </TableCell>
                            <TableCell align="center">
                                <strong>Acciones</strong>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {anunciosPagina.map((anuncio) => (
                            <TableRow key={anuncio.id} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" } }}>
                                <TableCell align="center">{anuncio.titulo}</TableCell>
                                <TableCell align="center">{anuncio.descripcion}</TableCell>
                                <TableCell align="center">{anuncio.ubicacion}</TableCell>
                                <TableCell align="center">{anuncio.tipo_contrato}</TableCell>
                                <TableCell align="center">{anuncio.empresa}</TableCell>
                                <TableCell align="center">{new Date(anuncio.fecha_publicacion).toLocaleDateString("es-AR")}</TableCell>
                                <TableCell align="center">
                                    <Box display="flex" flexDirection="column" alignItems="center" gap={1}>
                                        <Button
                                            variant="outlined"
                                            color="inherit"
                                            size="small"
                                            startIcon={<InfoIcon />}
                                            sx={{ px: 1 }}
                                            onClick={() => {
                                                setSelectedAnuncio(anuncio);
                                                setOpenVisual(true);
                                            }}
                                        >
                                            Info
                                        </Button>

                                        <Dialog open={openVisual} onClose={() => setOpenVisual(false)}>
                                            <DialogContent>
                                                {selectedAnuncio && (
                                                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}>
                                                        <TableRow>
                                                        <TableCell>
                                                            <Typography variant="h6" align="center" sx={{ mb: 1 }}> Anuncio </Typography>
                                                            <Typography><strong>Título:</strong> {selectedAnuncio.titulo}</Typography>
                                                            <Typography><strong>Descripción:</strong> {selectedAnuncio.descripcion}</Typography>
                                                            <Typography><strong>Ubicación:</strong> {selectedAnuncio.ubicacion}</Typography>
                                                            <Typography><strong>Contrato:</strong> {selectedAnuncio.tipo_contrato}</Typography>
                                                            <Typography><strong>Fecha:</strong> {new Date(selectedAnuncio.fecha_publicacion).toLocaleDateString("es-AR")}</Typography>
                                                        </TableCell>
                                                        <TableCell>
                                                            <Typography variant="h6" align="center" sx={{ mb: 1 }}> Empresa </Typography>
                                                            {empresaInfo ? (
                                                                <>
                                                                    <Typography><strong>Nombre:</strong> {empresaInfo.nombre}</Typography>
                                                                    <Typography><strong>Descripción:</strong> {empresaInfo.descripcion}</Typography>
                                                                    <Typography><strong>Email:</strong> {empresaInfo.email}</Typography>
                                                                </>
                                                            ) : (
                                                                <Typography>No se encontró información de la empresa.</Typography>
                                                            )}
                                                        </TableCell>
                                                        </TableRow>
                                                        <Button onClick={() => setOpenVisual(false)} variant="outlined" color="error" startIcon={<CloseIcon />}>
                                                            Cerrar
                                                        </Button>
                                                    </Box>
                                                )}
                                            </DialogContent>
                                        </Dialog>

                                        <Button
                                            variant="contained"
                                            color="error"
                                            size="small"
                                            startIcon={<DeleteIcon />}
                                            sx={{ px: 1 }}
                                            onClick={() => deleteAnuncio(anuncio.id, anuncio.titulo)}
                                        >
                                            Delete
                                        </Button>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Box display="flex" justifyContent="center" mt={2}>
                    <Pagination
                        count={totalPaginas}
                        page={page}
                        onChange={(e, value) => setPage(value)}
                        color="primary"
                    />
                </Box>
            </Paper>
        </Container>
        </div>
    );
};

export default List;