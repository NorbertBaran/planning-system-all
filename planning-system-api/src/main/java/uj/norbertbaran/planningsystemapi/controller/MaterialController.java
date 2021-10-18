package uj.norbertbaran.planningsystemapi.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uj.norbertbaran.planningsystemapi.dto.ResponseMessageDto;
import uj.norbertbaran.planningsystemapi.model.Material;
import uj.norbertbaran.planningsystemapi.service.MaterialService;

import java.util.List;

@RestController
@RequestMapping(
        value = "/api/materials",
        produces = {"application/json;charset=UTF-8"}
)
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class MaterialController {

    private final MaterialService service;

    @GetMapping("/{name}")
    public ResponseEntity<Material> getByName(@PathVariable String name){
        return new ResponseEntity<>(service.get(name), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Material>> get(@RequestParam(required = false) Long taskId){
        if(taskId != null)
            return new ResponseEntity<>(service.get(taskId), HttpStatus.OK);
        return new ResponseEntity<>(service.get(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Material> post(@RequestBody Material model){
        return new ResponseEntity<>(service.post(model), HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<ResponseMessageDto> put(@RequestBody Material model){
        service.put(model);
        return new ResponseEntity<>(new ResponseMessageDto("Model modified successfully"), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseMessageDto> delete(@PathVariable Long id){
        service.delete(id);
        return new ResponseEntity<>(new ResponseMessageDto("Material deleted successfully"), HttpStatus.OK);
    }

}
