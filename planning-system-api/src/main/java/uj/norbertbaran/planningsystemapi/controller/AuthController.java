package uj.norbertbaran.planningsystemapi.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uj.norbertbaran.planningsystemapi.dto.AuthToken;
import uj.norbertbaran.planningsystemapi.dto.ResponseMessageDto;
import uj.norbertbaran.planningsystemapi.dto.SignupDto;
import uj.norbertbaran.planningsystemapi.model.Employer;
import uj.norbertbaran.planningsystemapi.service.AuthService;

@RestController
@RequestMapping(
        value = "/api/auth",
        produces = {"application/json;charset=UTF-8"}
)
@AllArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/signup/add")
    public ResponseEntity<ResponseMessageDto> signupAdd(@RequestBody SignupDto signupDTO){
        authService.signupAdd(signupDTO.getEmployer(), signupDTO.getCompany());
        return new ResponseEntity<>(new ResponseMessageDto("User registration success"), HttpStatus.OK);
    }

    @PostMapping("/signup/create")
    public ResponseEntity<ResponseMessageDto> signupCreate(@RequestBody SignupDto signupDTO){
        authService.signupCreate(signupDTO.getEmployer(), signupDTO.getCompany());
        return new ResponseEntity<>(new ResponseMessageDto("User registration success"), HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthToken> login(@RequestBody Employer employer){
        return new ResponseEntity<>(authService.login(employer), HttpStatus.OK);
    }
}
