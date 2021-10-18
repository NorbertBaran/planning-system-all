package uj.norbertbaran.planningsystemapi.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Team implements ExpiringData<Team> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String place;
    @ManyToOne
    private Employer leader;
    @ManyToOne
    private Company company;
    private Boolean notExpired;

    @Override
    public void modify(Team entity) {
        if(entity.notExpired != null)
            this.notExpired = entity.notExpired;
    }
}
