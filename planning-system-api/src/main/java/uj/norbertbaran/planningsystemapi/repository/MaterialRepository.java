package uj.norbertbaran.planningsystemapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import uj.norbertbaran.planningsystemapi.model.Company;
import uj.norbertbaran.planningsystemapi.model.Material;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface MaterialRepository extends JpaRepository<Material, Long>, GenericRepository<Material> {
    List<Material> findByCompany(Company company);
    List<Material> findByTask_IdAndCompany(Long id, Company company);
    Optional<Material> findByNameAndCompany(String name, Company company);
    @Transactional
    @Modifying
    @Query(value = "UPDATE Material e SET e.task=null WHERE e.id=?1")
    void deleteFromTask(Long toolId);
}
