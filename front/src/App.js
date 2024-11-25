import React, { useState } from 'react';
import Header from './components/Header';
import ProductList from './components/ProductList';
import ProductEditDialog from './components/ProductEditDialog';
import { useDispatch } from 'react-redux';
import { createProduct, updateProduct } from './redux/productsSlice';
import { Container, Button } from '@mui/material';

const App = () => {
    const [editProduct, setEditProduct] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const dispatch = useDispatch();

    const handleSave = (product) => {
        if (editProduct) {
            dispatch(updateProduct({ id: editProduct.id, product }));
        } else {
            dispatch(createProduct(product));
        }
    };

    return (
        <div>
            <Header />
            <Container sx={{
            boxShadow: 'none',
            borderWidth: '1px',
            borderRadius: '10px',
            borderColor: 'gray',
            borderStyle: 'solid',
            marginTop:'20px',
            padding:'20px',
            height:'auto',
        }}>
          <span style={{fontSize:'40px'}}>Gestion des produits</span>
          <hr></hr>
          <br></br>
          Liste
          <br></br>
                <Button
                    variant="contained"
                    color="#1b234a"
                    onClick={() => {
                        setEditProduct(null);
                        setDialogOpen(true);
                    }}
                    sx={{
                      fontWeight:"bold",
                      backgroundColor:'none',
                      borderColor:"#1b234a",
                      borderStyle: 'solid',
                      borderWidth: '1px',
                    }}
                >
                    Ajouter un produit <img src='https://cdn-icons-png.flaticon.com/128/1665/1665629.png'style={{marginLeft:'5px',height:'30px'}}></img>
                </Button>
                <ProductList onEdit={(product) => {
                    setEditProduct(product);
                    setDialogOpen(true);
                }} />
                <ProductEditDialog
                    open={dialogOpen}
                    onClose={() => setDialogOpen(false)}
                    onSave={handleSave}
                    product={editProduct}
                />
            </Container>
        </div>
    );
};

export default App;
