import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import styles from './AddEditModal.module.css';

function AddEditModal({ componentData, onClose, onSave }) {
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    description: '',
    quantity: '',
    componentType: ''
  });

  useEffect(() => {
    if (componentData) {
      setFormData({
        id: componentData.id || null,
        name: componentData.name || '',
        description: componentData.description || '',
        quantity: componentData.quantity || '',
        componentType: componentData.componentType || ''
      });
    }
  }, [componentData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave({
      id: formData.id,
      name: formData.name,
      description: formData.description,
      quantity: parseInt(formData.quantity, 10) || 0,
      componentType: formData.componentType
    });
  };

  return (
    <Dialog open onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{componentData ? 'Editar Componente' : 'Adicionar Componente'}</DialogTitle>
      <DialogContent className={styles.content}>
        <TextField
          label="Nome"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Descrição"
          name="description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Quantidade"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          fullWidth
          margin="normal"
          type="number"
        />
        <TextField
          label="Categoria"
          name="componentType"
          value={formData.componentType}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
      </DialogContent>
      <DialogActions className={styles.actions}>
        <Button onClick={onClose} variant="outlined" color="error">
          Cancelar
        </Button>
        <Button onClick={handleSave} variant="contained" className={styles.saveButton}>
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default AddEditModal;
