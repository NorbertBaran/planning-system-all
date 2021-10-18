package uj.norbertbaran.planningsystemapi.service;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import uj.norbertbaran.planningsystemapi.exception.PlanningSystemException;
import uj.norbertbaran.planningsystemapi.model.Tool;
import uj.norbertbaran.planningsystemapi.repository.EmployerRepository;
import uj.norbertbaran.planningsystemapi.repository.TaskRepository;
import uj.norbertbaran.planningsystemapi.repository.ToolRepository;

import java.util.List;

@Service
public class ToolService extends GenericService<Tool, ToolRepository> {

    private final TaskRepository taskRepository;
    private final EmployerRepository employerRepository;

    public ToolService(ToolRepository repository, TaskRepository taskRepository, EmployerRepository employerRepository, EmployerRepository employerRepository1) {
        super(repository, employerRepository);
        this.taskRepository = taskRepository;
        this.employerRepository = employerRepository1;
    }

    @Override
    public void put(Tool updatedType){
        if(updatedType.getTask() != null && updatedType.getTask().getId() == -1){
            System.out.println("Test1");
            repository.deleteFromTask(updatedType.getId());
        }
        else {
            if(updatedType.getTask() != null && updatedType.getTask().getId() != -1){
                System.out.println("Tool put");
                System.out.println(updatedType.getTask().getId());
                var optionalTask = taskRepository.findById(updatedType.getTask().getId());
                var task = optionalTask.orElseThrow(() -> new PlanningSystemException("Entity not found"));
                updatedType.setTask(task);
            }
            super.put(updatedType);
        }
    }

    public List<Tool> get(Long taskId){
        var userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        var optionalEmployer = employerRepository.findByUsername(userDetails.getUsername());
        var logged = optionalEmployer.orElseThrow(() -> new PlanningSystemException("Username not found"));
        return repository.findByTask_IdAndCompany(taskId, logged.getCompany());
    }

    public Tool get(String name){
        var userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        var optionalEmployer = employerRepository.findByUsername(userDetails.getUsername());
        var logged = optionalEmployer.orElseThrow(() -> new PlanningSystemException("Username not found"));

        var optionalTool = repository.findByNameAndCompany(name, logged.getCompany());
        var tool = optionalTool.orElseThrow(() -> new PlanningSystemException("Name not found"));
        return tool;
    }
}
