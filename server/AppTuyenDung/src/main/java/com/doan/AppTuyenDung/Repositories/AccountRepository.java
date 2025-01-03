package com.doan.AppTuyenDung.Repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.doan.AppTuyenDung.entity.Account;
@Repository
public interface AccountRepository extends JpaRepository<Account, Integer>{
    Account findByUserId(Integer userId);
    boolean existsByPhonenumber(String phone);
    Account findByPhonenumber(String phone);
    // Optional<Account> findByUserIds(Integer userId);
    // Optional<Account> findByPhonenumberChangePass(String phonenumber);
}
