package uj.norbertbaran.planningsystemapi.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import uj.norbertbaran.planningsystemapi.dto.ResponseMessageDto;

@RestController
@RequestMapping(
        value = "/api/hello",
        produces = {"application/json;charset=UTF-8"}
)
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class HelloController {
    @GetMapping
    public ResponseEntity<ResponseMessageDto> getHello(){
        return new ResponseEntity<>(new ResponseMessageDto("Hello"), HttpStatus.OK);
    }

    @GetMapping("/auth")
    public ResponseEntity<ResponseMessageDto> getHelloAuth(){
        return new ResponseEntity<>(new ResponseMessageDto("Hello Auth"), HttpStatus.OK);
    }
}
