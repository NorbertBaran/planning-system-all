package uj.norbertbaran.planningsystemapi.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uj.norbertbaran.planningsystemapi.model.Company;
import uj.norbertbaran.planningsystemapi.service.CompanyService;

;

@RestController
@RequestMapping(
        value = "/api/company",
        produces = {"application/json;charset=UTF-8"}
)
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class CompanyController {

    private final CompanyService service;

    @GetMapping
    public ResponseEntity<Company> get(){
        return new ResponseEntity<>(service.get(), HttpStatus.OK);
    }

}
