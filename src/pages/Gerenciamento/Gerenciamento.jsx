import React, { useState, useEffect } from 'react';
import styles from './Gerenciamento.module.css';
import { TextField, Button, IconButton, Tooltip, Switch } from '@mui/material';
import { Search, FilterList, FileDownload, Add, Edit, Delete, Star, StarBorder } from '@mui/icons-material';
import AddEditModal from '../../components/gerenciamento/AddEditModal/AddEditModal';
import ElectronicComponentTable from '../../components/gerenciamento/ElectronicComponentTable/ElectronicComponentTable';
import {
  fetchAllElectronicComponents,
  createElectronicComponent,
  updateElectronicComponent,
  deleteElectronicComponent
} from '../../services/electronicComponentService';

function Gerenciamento() {
  const [electronicComponents, setElectronicComponents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState(null);

  useEffect(() => {
    loadComponents();
  }, []);

  const loadComponents = async () => {
    try {
      const response = await fetchAllElectronicComponents();
      setElectronicComponents(response);
    } catch (error) {
      console.error('Erro ao carregar componentes:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOpenModal = () => {
    setSelectedComponent(null);
    setIsModalOpen(true);
  };

  const handleEditComponent = (component) => {
    setSelectedComponent(component);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedComponent(null);
    setIsModalOpen(false);
  };

  const handleSaveComponent = async (data) => {
    try {
      if (data.id) {
        // Atualizar
        await updateElectronicComponent(data.id, data);
      } else {
        // Criar
        await createElectronicComponent(data);
      }
      await loadComponents();
      handleCloseModal();
    } catch (error) {
      console.error('Erro ao salvar componente:', error);
    }
  };

  const handleDeleteComponent = async (id) => {
    const confirmDelete = window.confirm('Tem certeza que deseja excluir este componente?');
    if (!confirmDelete) return;
    try {
      await deleteElectronicComponent(id);
      await loadComponents();
    } catch (error) {
      console.error('Erro ao excluir componente:', error);
    }
  };

  const filteredComponents = electronicComponents.filter((component) => {
    const term = searchTerm.toLowerCase();
    return (
      component.name.toLowerCase().includes(term) ||
      (component.componentType && component.componentType.toLowerCase().includes(term)) ||
      (component.description && component.description.toLowerCase().includes(term))
    );
  });

  const handleExport = () => {
    // Exemplo simples apenas para demonstrar a ação
    alert('Exportar tabela em CSV (exemplo)');
  };

  const handleFilter = () => {
    // Exemplo de ação de filtragem
    alert('Filtro avançado (exemplo)');
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Gerenciamento de estoque</h1>
      <div className={styles.actionsBar}>
        <div className={styles.searchContainer}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Item, valor, código"
            value={searchTerm}
            onChange={handleSearch}
            className={styles.searchField}
            InputProps={{
              endAdornment: (
                <IconButton>
                  <Search />
                </IconButton>
              )
            }}
          />
        </div>
        <Tooltip title="Filtrar">
          <Button
            variant="outlined"
            className={styles.filterButton}
            startIcon={<FilterList />}
            onClick={handleFilter}
          >
            Filtrar
          </Button>
        </Tooltip>
        <Tooltip title="Exportar">
          <Button
            variant="outlined"
            className={styles.exportButton}
            startIcon={<FileDownload />}
            onClick={handleExport}
          >
            Exportar
          </Button>
        </Tooltip>
        <Tooltip title="Adicionar Produto">
          <Button
            variant="contained"
            className={styles.addButton}
            startIcon={<Add />}
            onClick={handleOpenModal}
          >
            Adicionar Produto
          </Button>
        </Tooltip>
      </div>
      <ElectronicComponentTable
        electronicComponents={filteredComponents}
        onEdit={handleEditComponent}
        onDelete={handleDeleteComponent}
      />
      {isModalOpen && (
        <AddEditModal
          componentData={selectedComponent}
          onClose={handleCloseModal}
          onSave={handleSaveComponent}
        />
      )}
    </div>
  );
}

export default Gerenciamento;
