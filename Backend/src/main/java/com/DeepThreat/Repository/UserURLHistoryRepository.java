package com.DeepThreat.Repository;

import com.DeepThreat.Entity.UserURLHistoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserURLHistoryRepository extends JpaRepository<UserURLHistoryEntity,Long> {
    UserURLHistoryEntity findBy(){}
}
