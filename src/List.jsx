import { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Button, TextField, Container, Box, Typography, FormControl, InputLabel, Select, MenuItem, Dialog, DialogTitle, DialogContent } from '@mui/material';
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from "@mui/icons-material/Info";
import CloseIcon from "@mui/icons-material/Close";
import React from 'react'

const List = ({ anuncios, empresas, filter, deleteAnuncio }) => {

    const [openVisual, setOpenVisual] = useState(false);
    const [selectedAnuncio, setSelectedAnuncio] = useState(null);

    const empresaInfo = selectedAnuncio
        ? empresas.find(e => e.nombre === selectedAnuncio.empresa)
        : null


    return (
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
                        {anuncios.filter((anuncio) =>
                            anuncio.ubi.toLowerCase().includes(filter.toLowerCase()) ||
                            anuncio.contract.toLowerCase().includes(filter.toLowerCase())
                        ).map((anuncio) => (
                            <TableRow key={anuncio.id} sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" } }}>
                                <TableCell align="center">{anuncio.title}</TableCell>
                                <TableCell align="center">{anuncio.desc}</TableCell>
                                <TableCell align="center">{anuncio.ubi}</TableCell>
                                <TableCell align="center">{anuncio.contract}</TableCell>
                                <TableCell align="center">{anuncio.empresa}</TableCell>
                                <TableCell align="center">{anuncio.date}</TableCell>
                                <TableCell align="center" >
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
                                                    <TableCell>
                                                        <Typography variant="h6" align="center" sx={{ mb: 1 }}> Anuncio </Typography>
                                                        <Typography><strong>Título:</strong> {selectedAnuncio.title}</Typography>
                                                        <Typography><strong>Descripción:</strong> {selectedAnuncio.desc}</Typography>
                                                        <Typography><strong>Ubicación:</strong> {selectedAnuncio.ubi}</Typography>
                                                        <Typography><strong>Contrato:</strong> {selectedAnuncio.contract}</Typography>
                                                        <Typography><strong>Fecha:</strong> {selectedAnuncio.date}</Typography>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Typography variant="h6" align="center" sx={{ mb: 1 }}> Empresa </Typography>
                                                        {empresaInfo ? (
                                                            <>
                                                                <Typography><strong>Nombre:</strong> {empresaInfo.nombre}</Typography>
                                                                <Typography><strong>Descripción:</strong> {empresaInfo.desc}</Typography>
                                                                <Typography><strong>Email:</strong> {empresaInfo.email}</Typography>
                                                            </>
                                                        ) : (
                                                            <Typography>No se encontró información de la empresa.</Typography>
                                                        )}
                                                    </TableCell>
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
                                            onClick={() => deleteAnuncio(anuncio.id, anuncio.title)}
                                        >
                                            Delete
                                        </Button>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Container>
    );
};

export default List;