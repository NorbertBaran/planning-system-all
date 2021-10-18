package uj.norbertbaran.planningsystemapi.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Employer implements ExpiringData<Employer>{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String username;
    private String name;
    private String lastName;
    private Integer age;
    private String pessel;
    private String street;
    private String cityCode;
    private String city;
    private String phone;
    private String position;
    private Integer salary;
    @ManyToOne
    private Company company;
    private String password;
    private String role;
    private Boolean notExpired;
//    @ManyToOne(cascade = CascadeType.ALL)
    @ManyToOne
    @JsonIgnoreProperties("leader")
    private Team team;

    /*@Override
    public void modify(Employer entity) {
        System.out.println(entity.notExpired);
        if(entity.notExpired != null)
            this.notExpired = entity.notExpired;
    }*/

    @Override
    public void modify(Employer employer) {
        if(employer.username != null)
            this.username = employer.username;
        if(employer.name != null)
            this.name = employer.name;
        if(employer.lastName != null)
            this.lastName = employer.lastName;
        if(employer.age != null)
            this.age = employer.age;
        if(employer.pessel != null)
            this.pessel = employer.pessel;
        if(employer.street != null)
            this.street = employer.street;
        if(employer.cityCode != null)
            this.cityCode = employer.cityCode;
        if(employer.city!= null)
            this.city = employer.city;
        if(employer.phone != null)
            this.phone = employer.phone;
        if(employer.position != null)
            this.position = employer.position;
        if(employer.salary != null)
            this.salary = employer.salary;
        if(employer.company != null)
            this.company = employer.company;
        if(employer.password != null)
            this.password = employer.password;
        if(employer.role != null)
            this.role = employer.role;
        if(employer.notExpired != null)
            this.notExpired = employer.notExpired;
        if(employer.team != null){
            System.out.println("Test");
            if(employer.team.getId() == -1){
                System.out.println("Test2");
                this.team = null;
            }
            this.team = employer.team;
        }
    }
}
