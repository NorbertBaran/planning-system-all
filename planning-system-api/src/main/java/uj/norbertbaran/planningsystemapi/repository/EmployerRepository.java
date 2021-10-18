package uj.norbertbaran.planningsystemapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import uj.norbertbaran.planningsystemapi.model.Company;
import uj.norbertbaran.planningsystemapi.model.Employer;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface EmployerRepository extends JpaRepository<Employer, Long>, GenericRepository<Employer> {
    Optional<Employer> findByUsername(String username);
    Optional<Employer> findByUsernameAndCompany(String username, Company company);
    List<Employer> findByCompany(Company company);
    List<Employer> findByNotExpiredAndCompany(boolean notExpired, Company company);
    List<Employer> findByTeam_IdAndCompany(Long teamId, Company company);
    @Transactional
    @Modifying
    @Query(value = "UPDATE Employer e SET e.team=null WHERE e.id=?1")
    void deleteFromTeam(Long userId);
}
