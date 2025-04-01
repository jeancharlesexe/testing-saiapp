package br.com.exemplo.backendapitemplate.v1.repository;

import br.com.exemplo.backendapitemplate.v1.model.ElectronicComponent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ElectronicComponentRepository extends JpaRepository<ElectronicComponent, Long> {

}
