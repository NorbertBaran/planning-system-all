package uj.norbertbaran.planningsystemapi.service;

import lombok.AllArgsConstructor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import uj.norbertbaran.planningsystemapi.exception.PlanningSystemException;
import uj.norbertbaran.planningsystemapi.model.ExpiringData;
import uj.norbertbaran.planningsystemapi.repository.EmployerRepository;
import uj.norbertbaran.planningsystemapi.repository.GenericRepository;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
public class GenericService<Type extends ExpiringData<Type>, TypeRepository extends JpaRepository<Type, Long> & GenericRepository<Type>> {

    protected final TypeRepository repository;
    private final EmployerRepository employerRepository;

    public List<Type> get(){
        //return repository.findAll();
        var userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        var optionalEmployer = employerRepository.findByUsername(userDetails.getUsername());
        var logged = optionalEmployer.orElseThrow(() -> new PlanningSystemException("Username not found"));
        return repository.findByCompany(logged.getCompany());
    }

    public List<Type> get(boolean notExpired){
        var userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        var optionalEmployer = employerRepository.findByUsername(userDetails.getUsername());
        var logged = optionalEmployer.orElseThrow(() -> new PlanningSystemException("Username not found"));
        return repository.findByNotExpiredAndCompany(notExpired, logged.getCompany());
    }

    public Type post(Type type){
        var userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        var optionalEmployer = employerRepository.findByUsername(userDetails.getUsername());
        var logged = optionalEmployer.orElseThrow(() -> new PlanningSystemException("Username not found"));
        type.setCompany(logged.getCompany());
        return repository.save(type);
    }

    public void put(Type updatedType){
        Optional<Type> optionalType=repository.findById(updatedType.getId());
        Type type = optionalType.orElseThrow(() -> new PlanningSystemException("Entity not found"));
        type.modify(updatedType);
        repository.save(type);
    }

    /*public void delete(Long id){
        Optional<Type> optionalType = repository.findById(id);
        Type type = optionalType.orElseThrow(() -> new PlanningSystemException("Entity not found"));
        type.setNotExpired(false);
        repository.save(type);
    }*/

    public void delete(Long id){
        repository.deleteById(id);
    }

}
