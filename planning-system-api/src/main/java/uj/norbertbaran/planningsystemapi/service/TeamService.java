package uj.norbertbaran.planningsystemapi.service;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import uj.norbertbaran.planningsystemapi.exception.PlanningSystemException;
import uj.norbertbaran.planningsystemapi.model.Team;
import uj.norbertbaran.planningsystemapi.repository.EmployerRepository;
import uj.norbertbaran.planningsystemapi.repository.TeamRepository;

import java.util.List;

@Service
public class TeamService extends GenericService<Team, TeamRepository> {

    private final EmployerRepository employerRepository;

    public TeamService(TeamRepository repository, EmployerRepository employerRepository) {
        super(repository, employerRepository);
        this.employerRepository = employerRepository;
    }

    @Override
    public Team post(Team team){
        team.setNotExpired(true);
        var userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        var optionalEmployer = employerRepository.findByUsername(userDetails.getUsername());
        var admin = optionalEmployer.orElseThrow(() -> new PlanningSystemException("Username not found"));
        team.setCompany(admin.getCompany());

        var optionalLeader = employerRepository.findByUsername(team.getLeader().getUsername());
        var leader = optionalLeader.orElseThrow(() -> new PlanningSystemException("Leader not found"));
        team.setLeader(leader);
        return super.post(team);
    }

    public Team get(Long id){
        var optionalTeam = repository.findById(id);
        var team = optionalTeam.orElseThrow(() -> new PlanningSystemException("Team not found"));
        return team;
    }

    public Team get(String name){
        var userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        var optionalEmployer = employerRepository.findByUsername(userDetails.getUsername());
        var logged = optionalEmployer.orElseThrow(() -> new PlanningSystemException("Username not found"));

        var optionalTeam = repository.findByNameAndCompany(name, logged.getCompany());
        var team = optionalTeam.orElseThrow(() -> new PlanningSystemException("Team not found"));
        return team;
    }

    public List<Team> getMe(){
        var userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        var optionalEmployer = employerRepository.findByUsername(userDetails.getUsername());
        var admin = optionalEmployer.orElseThrow(() -> new PlanningSystemException("Username not found"));

        var optionalTeam = repository.findById(admin.getTeam().getId());
        var team = optionalTeam.orElseThrow(() -> new PlanningSystemException("Team not found"));
        return List.of(team);
    }

}
