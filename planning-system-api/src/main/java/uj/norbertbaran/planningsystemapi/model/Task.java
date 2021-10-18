package uj.norbertbaran.planningsystemapi.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Task implements ExpiringData<Task>{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @ManyToOne
    private Team team;
    private String description;
    /*@ManyToMany
    private List<Tool> tools;*/
    private Boolean notExpired;
    @ManyToOne
    private Company company;

    @Override
    public void modify(Task entity) {
        if(entity.notExpired != null)
            this.notExpired = entity.notExpired;
    }
}

