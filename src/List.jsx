import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Button, Container, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const List = ({ anuncios, filter, deleteAnuncio }) => {
    return (
        <Container maxWidth="md" sx={{ mt: 2 }}>
            <Paper sx={{ p: 3 }}>
                <Typography
                    variant="h6"
                    align="center"
                    sx={{ mb: 1 }}
                >
                    Agenda
                </Typography>

                <Table size="small">
                    <TableHead>
                        <TableRow>
                            <TableCell align="center">
                                <strong>Titulo</strong>
                            </TableCell>
                            <TableCell align="center">
                                <strong>Descripcion</strong>
                            </TableCell>
                            <TableCell align="center">
                                <strong>Ubicacion</strong>
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
                            <TableRow
                                key={anuncio.id}
                                sx={{ "&:nth-of-type(odd)": { backgroundColor: "#f9f9f9" } }}
                            >
                                <TableCell align="center">{anuncio.title}</TableCell>
                                <TableCell align="center">{anuncio.desc}</TableCell>
                                <TableCell align="center">{anuncio.ubi}</TableCell>
                                <TableCell align="center">{anuncio.contract}</TableCell>
                                <TableCell align="center">{anuncio.empresa}</TableCell>
                                <TableCell align="center">{anuncio.date}</TableCell>
                                <TableCell align="center">
                                    <Button
                                        variant="contained"
                                        color="error"
                                        size="small"
                                        startIcon={<DeleteIcon />}
                                        onClick={() => deleteAnuncio(anuncio.id, anuncio.title)}
                                    >
                                        Delete
                                    </Button>
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