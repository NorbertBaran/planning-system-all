package uj.norbertbaran.planningsystemapi.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import uj.norbertbaran.planningsystemapi.model.Company;
import uj.norbertbaran.planningsystemapi.model.Employer;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SignupDto {
    private Employer employer;
    private Company company;
}
