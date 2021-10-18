package uj.norbertbaran.planningsystemapi.service;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import uj.norbertbaran.planningsystemapi.exception.PlanningSystemException;
import uj.norbertbaran.planningsystemapi.model.Material;
import uj.norbertbaran.planningsystemapi.repository.EmployerRepository;
import uj.norbertbaran.planningsystemapi.repository.MaterialRepository;
import uj.norbertbaran.planningsystemapi.repository.TaskRepository;

import java.util.List;

@Service
public class MaterialService extends GenericService<Material, MaterialRepository> {

    private final TaskRepository taskRepository;
    private final EmployerRepository employerRepository;

    public MaterialService(MaterialRepository repository, TaskRepository taskRepository, EmployerRepository employerRepository, EmployerRepository employerRepository1) {
        super(repository, employerRepository);
        this.taskRepository = taskRepository;
        this.employerRepository = employerRepository1;
    }

    public List<Material> get(Long taskId){
        var userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        var optionalEmployer = employerRepository.findByUsername(userDetails.getUsername());
        var logged = optionalEmployer.orElseThrow(() -> new PlanningSystemException("Username not found"));
        return repository.findByTask_IdAndCompany(taskId, logged.getCompany());
    }

    public Material get(String name){
        var userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        var optionalEmployer = employerRepository.findByUsername(userDetails.getUsername());
        var logged = optionalEmployer.orElseThrow(() -> new PlanningSystemException("Username not found"));

        var optionalMaterial = repository.findByNameAndCompany(name, logged.getCompany());
        var material = optionalMaterial.orElseThrow(() -> new PlanningSystemException("Username not found"));
        return material;
    }

    @Override
    public void put(Material updatedType){
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
}
