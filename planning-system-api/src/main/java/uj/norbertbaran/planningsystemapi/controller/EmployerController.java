package uj.norbertbaran.planningsystemapi.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uj.norbertbaran.planningsystemapi.dto.ResponseMessageDto;
import uj.norbertbaran.planningsystemapi.model.Employer;
import uj.norbertbaran.planningsystemapi.service.EmployerService;

import java.util.List;

@RestController
@RequestMapping(
        value = "/api/employers",
        produces = {"application/json;charset=UTF-8"}
)
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class EmployerController {

    private final EmployerService service;

    @GetMapping("/{username}")
    public ResponseEntity<Employer> getByUsername(@PathVariable String username){
        return new ResponseEntity<>(service.get(username), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Employer>> get(@RequestParam(required = false) Boolean notExpired, @RequestParam(required = false) Long teamId){
        if(teamId != null)
            return new ResponseEntity<>(service.get(teamId), HttpStatus.OK);
        else if(notExpired != null)
            return new ResponseEntity<>(service.get(notExpired), HttpStatus.OK);
        else
            return new ResponseEntity<>(service.get(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Employer> post(@RequestBody Employer model){
        return new ResponseEntity<>(service.post(model), HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<ResponseMessageDto> put(@RequestBody Employer employer){
        service.put(employer);
        return new ResponseEntity<>(new ResponseMessageDto("Employer modified successfully"), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseMessageDto> delete(@PathVariable Long id){
        service.delete(id);
        return new ResponseEntity<>(new ResponseMessageDto("Employer deleted successfully"), HttpStatus.OK);
    }

}
