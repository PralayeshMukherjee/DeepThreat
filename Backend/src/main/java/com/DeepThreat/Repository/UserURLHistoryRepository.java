package com.DeepThreat.Repository;

import com.DeepThreat.Entity.UserURLHistoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserURLHistoryRepository extends JpaRepository<UserURLHistoryEntity,Long> {
}
