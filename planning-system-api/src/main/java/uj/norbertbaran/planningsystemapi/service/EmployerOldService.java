package uj.norbertbaran.planningsystemapi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uj.norbertbaran.planningsystemapi.model.Employer;
import uj.norbertbaran.planningsystemapi.repository.EmployerRepository;

@Service
public class EmployerOldService extends GenericService<Employer, EmployerRepository> {

    @Autowired
    public EmployerOldService(EmployerRepository repository) {
        super(repository, repository);
    }

    /*private final EmployerRepository repository;

    public List<Employer> get(){
        return repository.findAll();
    }

    public Employer post(Employer employer){
        employer.setId(null);
        return repository.save(employer);
    }

    public void delete(Employer employer){
        repository.delete(employer);
    }*/
}
