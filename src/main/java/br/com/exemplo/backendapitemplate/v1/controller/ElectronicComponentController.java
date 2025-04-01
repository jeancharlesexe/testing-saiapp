package br.com.exemplo.backendapitemplate.v1.controller;

import br.com.exemplo.backendapitemplate.v1.model.ElectronicComponent;
import br.com.exemplo.backendapitemplate.v1.service.ElectronicComponentService;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.EntityNotFoundException;
import java.util.List;

@RestController
@RequestMapping("/api/v1/electronic-components")
public class ElectronicComponentController {

    @Autowired
    private ElectronicComponentService electronicComponentService;

    @Operation(summary = "List all electronic components", description = "Retrieve a list of all electronic components in inventory")
    @GetMapping
    public ResponseEntity<?> getAllComponents() {
        try {
            List<ElectronicComponent> components = electronicComponentService.findAll();
            return ResponseEntity.status(HttpStatus.OK).body(components);
        } catch(Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @Operation(summary = "Get electronic component by ID", description = "Retrieve a single electronic component by its ID")
    @GetMapping("/{id}")
    public ResponseEntity<?> getComponentById(@PathVariable Long id) {
        try {
            ElectronicComponent component = electronicComponentService.findById(id);
            return ResponseEntity.status(HttpStatus.OK).body(component);
        } catch(EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch(Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @Operation(summary = "Create a new electronic component", description = "Add a new electronic component to the inventory")
    @PostMapping
    public ResponseEntity<?> createComponent(@RequestBody ElectronicComponent electronicComponent) {
        try {
            ElectronicComponent savedComponent = electronicComponentService.save(electronicComponent);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedComponent);
        } catch(IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch(Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @Operation(summary = "Update an existing electronic component", description = "Update the details of an existing electronic component")
    @PutMapping("/{id}")
    public ResponseEntity<?> updateComponent(@PathVariable Long id, @RequestBody ElectronicComponent electronicComponent) {
        try {
            ElectronicComponent updatedComponent = electronicComponentService.update(id, electronicComponent);
            return ResponseEntity.status(HttpStatus.OK).body(updatedComponent);
        } catch(EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch(IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch(Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }

    @Operation(summary = "Delete an electronic component", description = "Delete an electronic component from inventory by its ID")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteComponent(@PathVariable Long id) {
        try {
            electronicComponentService.delete(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        } catch(EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch(Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(e.getMessage());
        }
    }
}
