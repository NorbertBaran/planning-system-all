package uj.norbertbaran.planningsystemapi.service;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import uj.norbertbaran.planningsystemapi.exception.PlanningSystemException;
import uj.norbertbaran.planningsystemapi.model.Task;
import uj.norbertbaran.planningsystemapi.repository.EmployerRepository;
import uj.norbertbaran.planningsystemapi.repository.TaskRepository;
import uj.norbertbaran.planningsystemapi.repository.TeamRepository;

import java.util.List;

@Service
public class TaskService extends GenericService<Task, TaskRepository> {

    private final TeamRepository teamRepository;
    private final EmployerRepository employerRepository;

    public TaskService(TaskRepository repository, TeamRepository teamRepository, EmployerRepository employerRepository) {
        super(repository, employerRepository);
        this.teamRepository = teamRepository;
        this.employerRepository = employerRepository;
    }

    public Task get(Long id){
        var optionalTask = repository.findById(id);
        var task = optionalTask.orElseThrow(() -> new PlanningSystemException("Task not found"));
        return task;
    }

    public List<Task> getMe(){
        var userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        var optionalEmployer = employerRepository.findByUsername(userDetails.getUsername());
        var admin = optionalEmployer.orElseThrow(() -> new PlanningSystemException("Username not found"));
        System.out.println("Id: "+admin.getTeam().getId());
        var tasks = repository.findByTeam_IdAndCompany(admin.getTeam().getId(), admin.getCompany());
        return tasks;
    }

    @Override
    public Task post(Task task){
        var userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        var optionalEmployer = employerRepository.findByUsername(userDetails.getUsername());
        var logged = optionalEmployer.orElseThrow(() -> new PlanningSystemException("Username not found"));

        var optionalTeam = teamRepository.findByNameAndCompany(task.getTeam().getName(), logged.getCompany());
        var team = optionalTeam.orElseThrow(() -> new PlanningSystemException("Task not found"));
        task.setTeam(team);
        return super.post(task);
    }
}
