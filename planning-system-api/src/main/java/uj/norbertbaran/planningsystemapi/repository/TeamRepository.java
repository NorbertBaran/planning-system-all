package uj.norbertbaran.planningsystemapi.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uj.norbertbaran.planningsystemapi.model.Company;
import uj.norbertbaran.planningsystemapi.model.Team;

import java.util.List;
import java.util.Optional;

@Repository
public interface TeamRepository extends JpaRepository<Team, Long>, GenericRepository<Team> {
    Optional<Team> findByNameAndCompany(String name, Company company);
    List<Team> findByCompany(Company company);
}
