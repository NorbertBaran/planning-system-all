package uj.norbertbaran.planningsystemapi.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uj.norbertbaran.planningsystemapi.dto.ResponseMessageDto;
import uj.norbertbaran.planningsystemapi.model.Team;
import uj.norbertbaran.planningsystemapi.service.TeamService;

import java.util.List;

@RestController
@RequestMapping(
        value = "/api/teams",
        produces = {"application/json;charset=UTF-8"}
)
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class TeamController {

    private final TeamService service;

    @GetMapping
    public ResponseEntity<List<Team>> get(){
        return new ResponseEntity<>(service.get(), HttpStatus.OK);
    }

    @GetMapping("/me")
    public ResponseEntity<List<Team>> getMe(){
        return new ResponseEntity<>(service.getMe(), HttpStatus.OK);
    }

    /*@GetMapping("/{id}")
    public ResponseEntity<Team> getById(@PathVariable Long id){
        return new ResponseEntity<>(service.get(id), HttpStatus.OK);
    }*/

    @GetMapping("/{name}")
    public ResponseEntity<Team> getByName(@PathVariable String name){
        return new ResponseEntity<>(service.get(name), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Team> post(@RequestBody Team model){
        return new ResponseEntity<>(service.post(model), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseMessageDto> delete(@PathVariable Long id){
        service.delete(id);
        return new ResponseEntity<>(new ResponseMessageDto("Team deleted successfully"), HttpStatus.OK);
    }

}
