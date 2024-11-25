import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import ProductForm from './ProductForm';

const ProductEditDialog = ({ open, onClose, onSave, product }) => (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>{product ? 'Modifier le produit' : 'Créer un produit'}</DialogTitle>
        <DialogContent>
            <ProductForm
                product={product}
                onSubmit={(data) => {
                    onSave(data);
                    onClose();
                }}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Annuler</Button>
        </DialogActions>
    </Dialog>
);

export default ProductEditDialog;
