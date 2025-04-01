import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Switch } from '@mui/material';
import { Star, StarBorder, Edit, Delete } from '@mui/icons-material';
import styles from './ElectronicComponentTable.module.css';

function ElectronicComponentTable({ electronicComponents, onEdit, onDelete }) {
  const [favorites, setFavorites] = useState({});
  
  const handleToggleFavorite = (id) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <TableContainer className={styles.tableContainer}>
      <Table>
        <TableHead className={styles.tableHead}>
          <TableRow>
            <TableCell className={styles.headerCell}></TableCell>
            <TableCell className={styles.headerCell}>Imagem</TableCell>
            <TableCell className={styles.headerCell}>Produto</TableCell>
            <TableCell className={styles.headerCell}>Categoria</TableCell>
            <TableCell className={styles.headerCell}>Estoque</TableCell>
            <TableCell className={styles.headerCell}>Preço</TableCell>
            <TableCell className={styles.headerCell}>Catálogo</TableCell>
            <TableCell className={styles.headerCell} align="center">Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {electronicComponents.map((component) => {
            const { id, name, description, quantity, componentType } = component;
            // Exemplo simplificado assumindo que o preço e imagem podem vir de description ou placeholders.
            const price = 'R$' + (quantity || '9999'); // Exemplo para simular valor
            const imageUrl = 'https://via.placeholder.com/80x60.png?text=No+Img';
            const isFavorite = !!favorites[id];
            const isCatalog = Math.random() > 0.5; // Exemplo mock aleatório

            return (
              <TableRow key={id} className={styles.row}>
                <TableCell>
                  <IconButton onClick={() => handleToggleFavorite(id)}>
                    {isFavorite ? <Star style={{ color: '#FFC107' }} /> : <StarBorder />}
                  </IconButton>
                </TableCell>
                <TableCell>
                  <img src={imageUrl} alt="Imagem" className={styles.productImage} />
                </TableCell>
                <TableCell>{name || 'Nome do Produto'}</TableCell>
                <TableCell>{componentType || 'Categoria do Produto'}</TableCell>
                <TableCell>{(quantity || '0') + ' Un'}</TableCell>
                <TableCell>{price}</TableCell>
                <TableCell>
                  <Switch checked={isCatalog} color="success" />
                </TableCell>
                <TableCell align="center">
                  <IconButton onClick={() => onEdit(component)} className={styles.iconButton}>
                    <Edit />
                  </IconButton>
                  <IconButton onClick={() => onDelete(id)} className={styles.iconButton}>
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default ElectronicComponentTable;
