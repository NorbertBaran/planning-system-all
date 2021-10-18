package uj.norbertbaran.planningsystemapi.service;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import uj.norbertbaran.planningsystemapi.exception.PlanningSystemException;
import uj.norbertbaran.planningsystemapi.model.Company;
import uj.norbertbaran.planningsystemapi.repository.EmployerRepository;

@Service
public class CompanyService {

    private final EmployerRepository employerRepository;

    public CompanyService(EmployerRepository employerRepository) {
        this.employerRepository = employerRepository;
    }

    public Company get(){
        var userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        var optionalEmployer = employerRepository.findByUsername(userDetails.getUsername());
        var admin = optionalEmployer.orElseThrow(() -> new PlanningSystemException("Username not found"));
        return admin.getCompany();
    }
}
