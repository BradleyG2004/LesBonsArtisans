import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, deleteProduct, updateProduct , createProduct} from '../redux/productsSlice'; // Ajout d'une action updateProduct
import { 
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
    Button, Paper, CircularProgress, Typography, Dialog, DialogActions, 
    DialogContent, DialogContentText, DialogTitle, TextField 
} from '@mui/material';

const ProductList = () => {
    const dispatch = useDispatch();
    const { items: products, loading, error } = useSelector((state) => state.products);

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [productToDelete, setProductToDelete] = useState(null);
    const [productToEdit, setProductToEdit] = useState(null);
    const [newProduct, setNewProduct] = useState({ // Initialisation de newProduct ici
        name: '',
        type: '',
        price: 0,
        rating: 0,
        warranty_years: 0,
        available: true,
    });
    
        // Gestion de la boîte de dialogue de création
        const openCreateDialog = () => setCreateDialogOpen(true);
        const closeCreateDialog = () => {
            setCreateDialogOpen(false);
            setNewProduct({
                name: '',
                type: '',
                price: 0,
                rating: 0,
                warranty_years: 0,
                available: true,
            });
        };
    
        const handleCreateChange = (field, value) => {
            setNewProduct((prev) => ({ ...prev, [field]: value }));
        };
    
        const confirmCreate = () => {
            if (newProduct) {
            dispatch(createProduct(newProduct));
            }
            closeCreateDialog();
            window.location.reload();
        };
    const [createDialogOpen, setCreateDialogOpen] = useState(false);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    // Ouvrir la boîte de dialogue pour supprimer
    const openDeleteDialog = (product) => {
        setProductToDelete(product);
        setDeleteDialogOpen(true);
    };

    // Fermer la boîte de dialogue pour supprimer
    const closeDeleteDialog = () => {
        setDeleteDialogOpen(false);
        setProductToDelete(null);
    };

    // Confirmer et supprimer un produit
    const confirmDelete = () => {
        if (productToDelete) {
            dispatch(deleteProduct(productToDelete._id));
        }
        closeDeleteDialog();
        window.location.reload(); // Actualiser après suppression
    };

    // Ouvrir la boîte de dialogue pour modifier
    const openEditDialog = (product) => {
        setProductToEdit({ ...product }); // Copier le produit à modifier
        setEditDialogOpen(true);
    };

    // Fermer la boîte de dialogue pour modifier
    const closeEditDialog = () => {
        setEditDialogOpen(false);
        setProductToEdit(null);
    };

    // Gérer les changements dans le formulaire de modification
    const handleEditChange = (field, value) => {
        setProductToEdit((prev) => ({ ...prev, [field]: value }));
    };

    // Confirmer la modification
    const confirmEdit = () => {
        if (productToEdit) {
            console.log(productToEdit)
            dispatch(updateProduct({ id: productToEdit._id, product: productToEdit }));
        }
        window.location.reload();
        closeEditDialog();
    };

    if (loading) return <CircularProgress />;
    if (error) return <Typography color="error">Erreur : {error}</Typography>;

    return (
        <TableContainer component={Paper} sx={{ padding: "20px", fontFamily: "calibri",fontSize:"90px",color:"#1b234a" ,fontWeight:"bold"}}>
            <Typography variant="h6" gutterBottom>
                GESTION DES PRODUITS
            </Typography>
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
                                    onClick={() => openEditDialog(product)}
                                    sx={{ marginRight: "8px",backgroundColor:"#1b234a",color:"white",fontWeight:"bold" }}
                                >
                                    Modifier
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => openDeleteDialog(product)}
                                    sx={{ marginRight: "8px",color:"red",borderColor:"red",fontWeight:"bold" }}
                                >
                                    Supprimer
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Dialog de confirmation de suppression */}
            <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
                <DialogTitle>Confirmer la suppression</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Êtes-vous sûr de vouloir supprimer le produit "{productToDelete?.name}" ? Cette action est irréversible.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDeleteDialog} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={confirmDelete} color="secondary" autoFocus>
                        Supprimer
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Dialog de modification */}
            <Dialog open={editDialogOpen} onClose={closeEditDialog}>
                <DialogTitle>Modifier le produit</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Nom"
                        value={productToEdit?.name || ""}
                        onChange={(e) => handleEditChange("name", e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Type"
                        value={productToEdit?.type || ""}
                        onChange={(e) => handleEditChange("type", e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Prix (€)"
                        type="number"
                        value={productToEdit?.price || ""}
                        onChange={(e) => handleEditChange("price", parseFloat(e.target.value))}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Évaluation"
                        type="number"
                        value={productToEdit?.rating || ""}
                        onChange={(e) => handleEditChange("rating", parseFloat(e.target.value))}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Garantie (années)"
                        type="number"
                        value={productToEdit?.warranty_years || ""}
                        onChange={(e) => handleEditChange("warranty_years", parseInt(e.target.value, 10))}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Disponibilité"
                        type="text"
                        value={productToEdit?.available ? "Oui" : "Non"}
                        onChange={(e) => handleEditChange("available", e.target.value === "Oui")}
                        fullWidth
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeEditDialog} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={confirmEdit} color="secondary" autoFocus>
                        Enregistrer
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={createDialogOpen} onClose={closeCreateDialog}>
                <DialogTitle>Créer un nouveau produit</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Nom"
                        value={newProduct.name}
                        onChange={(e) => handleCreateChange("name", e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Type"
                        value={newProduct.type}
                        onChange={(e) => handleCreateChange("type", e.target.value)}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Prix (€)"
                        type="number"
                        value={newProduct.price}
                        onChange={(e) => handleCreateChange("price", parseFloat(e.target.value))}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Évaluation"
                        type="number"
                        value={newProduct.rating}
                        onChange={(e) => handleCreateChange("rating", parseFloat(e.target.value))}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Garantie (années)"
                        type="number"
                        value={newProduct.warranty_years}
                        onChange={(e) => handleCreateChange("warranty_years", parseInt(e.target.value, 10))}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Disponibilité"
                        value={newProduct.available ? "Oui" : "Non"}
                        onChange={(e) => handleCreateChange("available", e.target.value === "Oui")}
                        fullWidth
                        margin="normal"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeCreateDialog} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={confirmCreate} color="secondary" autoFocus>
                        Créer
                    </Button>
                </DialogActions>
            </Dialog>
            <Button
                variant="contained"
                color="primary"
                onClick={openCreateDialog} 
                sx={{ marginBottom: "16px", backgroundColor: "#1b234a", color: "white", fontWeight: "bold" }}
            >
                Ajouter un produit
            </Button>
        </TableContainer>
    );
};

export default ProductList;