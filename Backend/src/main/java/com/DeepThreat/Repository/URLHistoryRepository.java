package com.DeepThreat.Repository;

import com.DeepThreat.Entity.URLHistoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface URLHistoryRepository extends JpaRepository<URLHistoryEntity,Long> {
    @Query()
    URLHistoryEntity findByURL(@Param("url")String url);
}
