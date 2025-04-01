package br.com.exemplo.backendapitemplate.v1.model;

import javax.persistence.*;

@Entity
@Table(name = "electronic_components")
public class ElectronicComponent {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String description;

    private Integer quantity;

    @Column(name = "component_type")
    private String componentType;

    public ElectronicComponent() {
    }

    public ElectronicComponent(String name, String description, Integer quantity, String componentType) {
        this.name = name;
        this.description = description;
        this.quantity = quantity;
        this.componentType = componentType;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public String getComponentType() {
        return componentType;
    }

    public void setComponentType(String componentType) {
        this.componentType = componentType;
    }
}
