import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, deleteProduct } from '../redux/productsSlice';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Paper, CircularProgress, Typography } from '@mui/material';

const ProductList = ({ onEdit }) => {
    const dispatch = useDispatch();
    const { items: products, loading, error } = useSelector((state) => state.products);

    // Charger les produits au montage
    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    const handleDelete = (id) => {
        dispatch(deleteProduct(id));
    };

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">Erreur : {error}</Typography>;

    return (
        <TableContainer component={Paper} sx={{
            padding: "20px", fontFamily: "aptos", boxShadow: 'none',
            borderWidth: '1px',
            borderRadius: '10px',
            borderColor: 'gray',
            borderStyle: 'solid',
        }}>
            <Typography variant="h6" gutterBottom sx={{color:"#1b234a",fontWeight:"bold",fontSize:"30px"}}>
                Gestion des produits
            </Typography>
            <hr></hr>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">ID</TableCell>
                        <TableCell align="center">Nom</TableCell>
                        <TableCell align="center">Type</TableCell>
                        <TableCell align="center">Prix (€)</TableCell>
                        <TableCell align="center">Évaluation</TableCell>
                        <TableCell align="center">Garantie (années)</TableCell>
                        <TableCell align="center">Disponibilité</TableCell>
                        <TableCell align="center">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {products.map((product) => (
                        <TableRow key={product._id}>
                            <TableCell align="center">{product._id}</TableCell>
                            <TableCell align="center">{product.name}</TableCell>
                            <TableCell align="center">{product.type}</TableCell>
                            <TableCell align="center">{product.price.toFixed(2)}</TableCell>
                            <TableCell align="center">{product.rating}</TableCell>
                            <TableCell align="center">{product.warranty_years}</TableCell>
                            <TableCell align="center">
                                {product.available ? "Oui" : "Non"}
                            </TableCell>
                            <TableCell align="center">
                                <Button
                                    variant="outlined"
                                    color="#1b234a"
                                    onClick={() => onEdit(product)}
                                    sx={{ marginRight: "8px",fontWeight:"bold" }}
                                >
                                    Modifier
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => handleDelete(product._id)}
                                    sx={{fontWeight:"bold"}}
                                >
                                    Supprimer
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default ProductList;
