package uj.norbertbaran.planningsystemapi.service;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import uj.norbertbaran.planningsystemapi.exception.PlanningSystemException;
import uj.norbertbaran.planningsystemapi.model.Employer;
import uj.norbertbaran.planningsystemapi.repository.EmployerRepository;
import uj.norbertbaran.planningsystemapi.repository.TeamRepository;

import java.util.List;

@Service
public class EmployerService extends GenericService<Employer, EmployerRepository> {

    private final PasswordEncoder passwordEncoder;
    private final TeamRepository teamRepository;

    public EmployerService(EmployerRepository repository, PasswordEncoder passwordEncoder, TeamRepository teamRepository) {
        super(repository, repository);
        this.passwordEncoder = passwordEncoder;
        this.teamRepository = teamRepository;
    }

    @Override
    public Employer post(Employer employer){
        employer.setNotExpired(true);
        employer.setPassword(passwordEncoder.encode(employer.getPassword()));
        var userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        var optionalEmployer = repository.findByUsername(userDetails.getUsername());
        var admin = optionalEmployer.orElseThrow(() -> new PlanningSystemException("Username not found"));
        employer.setCompany(admin.getCompany());
        return super.post(employer);
    }

    @Override
    public void put(Employer updatedType){
        if(updatedType.getTeam() != null && updatedType.getTeam().getId() == -1){
            System.out.println("Delete test");
            System.out.println("Test1");
            repository.deleteFromTeam(updatedType.getId());
        }
        else {
            if(updatedType.getTeam() != null && updatedType.getTeam().getId() != -1){
                var optionalTeam = teamRepository.findById(updatedType.getTeam().getId());
                var team = optionalTeam.orElseThrow(() -> new PlanningSystemException("Entity not found"));
                updatedType.setTeam(team);
            }
            super.put(updatedType);
        }
    }

    public List<Employer> get(Long teamId){
        var userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        var optionalEmployer = repository.findByUsername(userDetails.getUsername());
        var logged = optionalEmployer.orElseThrow(() -> new PlanningSystemException("Username not found"));
        return repository.findByTeam_IdAndCompany(teamId, logged.getCompany());
    }

    public Employer get(String username){
        var userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        var optionalLogged = repository.findByUsername(userDetails.getUsername());
        var logged = optionalLogged.orElseThrow(() -> new PlanningSystemException("Username not found"));

        var optionalEmployer = repository.findByUsernameAndCompany(username, logged.getCompany());
        var employer = optionalEmployer.orElseThrow(() -> new PlanningSystemException("Username not found"));

        return employer;
    }
}