package uj.norbertbaran.planningsystemapi.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Material implements ExpiringData<Material> {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String category;
    private String name;
    private String supplier;
    private Integer count;
    private String measure;
    @ManyToOne
    private Task task;
    private Boolean notExpired;
    @ManyToOne
    private Company company;

    @Override
    public void modify(Material entity) {
        if(entity.notExpired != null)
            this.notExpired = entity.notExpired;
        if(entity.task != null){
            System.out.println("Test");
            if(entity.task.getId() == -1){
                System.out.println("Test2");
                this.task = null;
            }
            this.task = entity.task;
        }
    }
}
