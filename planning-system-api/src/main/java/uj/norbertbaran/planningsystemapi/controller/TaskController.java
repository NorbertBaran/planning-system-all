package uj.norbertbaran.planningsystemapi.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uj.norbertbaran.planningsystemapi.dto.ResponseMessageDto;
import uj.norbertbaran.planningsystemapi.model.Task;
import uj.norbertbaran.planningsystemapi.service.TaskService;

import java.util.List;

@RestController
@RequestMapping(
        value = "/api/tasks",
        produces = {"application/json;charset=UTF-8"}
)
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class TaskController {

    private final TaskService service;

    @GetMapping
    public ResponseEntity<List<Task>> get(){
        return new ResponseEntity<>(service.get(), HttpStatus.OK);
    }

    @GetMapping("/me")
    public ResponseEntity<List<Task>> getMe(){
        return new ResponseEntity<>(service.getMe(), HttpStatus.OK);
    }

    /*@GetMapping("/{id}")
    public ResponseEntity<Task> getById(@PathVariable Long id){
        return new ResponseEntity<>(service.get(id), HttpStatus.OK);
    }*/

    @PostMapping
    public ResponseEntity<Task> post(@RequestBody Task model){
        return new ResponseEntity<>(service.post(model), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseMessageDto> delete(@PathVariable Long id){
        service.delete(id);
        return new ResponseEntity<>(new ResponseMessageDto("Task deleted successfully"), HttpStatus.OK);
    }

}
