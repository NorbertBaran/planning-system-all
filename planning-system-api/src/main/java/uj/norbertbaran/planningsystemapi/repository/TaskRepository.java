package uj.norbertbaran.planningsystemapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uj.norbertbaran.planningsystemapi.model.Company;
import uj.norbertbaran.planningsystemapi.model.Task;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long>, GenericRepository<Task> {
    List<Task> findByTeam_IdAndCompany(Long teamId, Company company);
    List<Task> findByCompany(Company company);
}
