package uj.norbertbaran.planningsystemapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import uj.norbertbaran.planningsystemapi.model.Company;
import uj.norbertbaran.planningsystemapi.model.Tool;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface ToolRepository extends JpaRepository<Tool, Long>, GenericRepository<Tool> {
    List<Tool> findByCompany(Company company);
    List<Tool> findByTask_IdAndCompany(Long id, Company company);
    @Transactional
    @Modifying
    @Query(value = "UPDATE Tool e SET e.task=null WHERE e.id=?1")
    void deleteFromTask(Long toolId);
    Optional<Tool> findByNameAndCompany(String name, Company company);
}
