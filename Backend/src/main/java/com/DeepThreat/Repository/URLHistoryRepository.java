package com.DeepThreat.Repository;

import com.DeepThreat.Entity.URLHistoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface URLHistoryRepository extends JpaRepository<URLHistoryEntity,Long> {
    URLHistoryEntity findByURL();
}
