package br.com.exemplo.backendapitemplate.v1.service;

import br.com.exemplo.backendapitemplate.v1.model.ElectronicComponent;
import br.com.exemplo.backendapitemplate.v1.repository.ElectronicComponentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@Service
public class ElectronicComponentService {

    @Autowired
    private ElectronicComponentRepository electronicComponentRepository;

    public List<ElectronicComponent> findAll() {
        return electronicComponentRepository.findAll();
    }

    public ElectronicComponent findById(Long id) {
        return electronicComponentRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("ElectronicComponent not found with id " + id));
    }

    public ElectronicComponent save(ElectronicComponent electronicComponent) {
        return electronicComponentRepository.save(electronicComponent);
    }

    public ElectronicComponent update(Long id, ElectronicComponent updatedComponent) {
        ElectronicComponent existingComponent = this.findById(id);
        existingComponent.setName(updatedComponent.getName());
        existingComponent.setDescription(updatedComponent.getDescription());
        existingComponent.setQuantity(updatedComponent.getQuantity());
        existingComponent.setComponentType(updatedComponent.getComponentType());
        return electronicComponentRepository.save(existingComponent);
    }

    public void delete(Long id) {
        ElectronicComponent existingComponent = this.findById(id);
        electronicComponentRepository.delete(existingComponent);
    }
}
