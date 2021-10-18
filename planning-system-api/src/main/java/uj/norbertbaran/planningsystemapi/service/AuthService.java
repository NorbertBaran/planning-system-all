package uj.norbertbaran.planningsystemapi.service;

import lombok.AllArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import uj.norbertbaran.planningsystemapi.dto.AuthToken;
import uj.norbertbaran.planningsystemapi.model.Company;
import uj.norbertbaran.planningsystemapi.model.Employer;
import uj.norbertbaran.planningsystemapi.repository.CompanyRepository;
import uj.norbertbaran.planningsystemapi.repository.EmployerRepository;
import uj.norbertbaran.planningsystemapi.security.JwtProvider;

import javax.transaction.Transactional;

@Service
@AllArgsConstructor
public class AuthService {

    private final EmployerRepository employerRepository;
    private final CompanyRepository companyRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtProvider jwtProvider;

    public void signupAdd(Employer employer, Company company) {
        employer.setId(null);
        employer.setPassword(passwordEncoder.encode(employer.getPassword()));
        //TODO Checking if company belong to admin adding new user
        employer.setCompany(company);
        employerRepository.save(employer);
    }

    @Transactional
    public void signupCreate(Employer employer, Company company) {
        company.setId(null);
        company=companyRepository.save(company);

        employer.setId(null);
        employer.setRole("Admin");
        employer.setNotExpired(true);
        employer.setPassword(passwordEncoder.encode(employer.getPassword()));
        employer.setCompany(company);
        employerRepository.save(employer);
    }

    public AuthToken login(Employer employer) {
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                employer.getUsername(),
                employer.getPassword()
        ));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String authToken = jwtProvider.generateToken(authentication);
        return new AuthToken(authToken);
    }
}
