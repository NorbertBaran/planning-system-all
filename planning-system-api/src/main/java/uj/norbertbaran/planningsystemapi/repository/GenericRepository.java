package uj.norbertbaran.planningsystemapi.repository;

import uj.norbertbaran.planningsystemapi.model.Company;

import java.util.List;

public interface GenericRepository<Type> {
    List<Type> findByNotExpiredAndCompany(boolean notExpired, Company company);
    List<Type> findByCompany(Company company);
}
