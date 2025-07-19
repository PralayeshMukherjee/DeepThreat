package com.DeepThreat.Repository;

import com.DeepThreat.Entity.URLHistoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface URLHistoryRepository extends JpaRepository<URLHistoryEntity,Long> {
    @Query("SELECT * FROM urlhistory WHERE url = :url, nativeQuery=true")
    List<URLHistoryEntity> findByURL(@Param("url")String url);
}
