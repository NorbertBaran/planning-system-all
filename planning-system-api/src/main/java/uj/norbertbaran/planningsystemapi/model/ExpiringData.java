package uj.norbertbaran.planningsystemapi.model;

public interface ExpiringData<Type> {
    public void setId(Long id);
    public Long getId();
    public void setNotExpired(Boolean notExpired);
    public Boolean getNotExpired();
    public void modify(Type type);
    public void setCompany(Company company);
}
