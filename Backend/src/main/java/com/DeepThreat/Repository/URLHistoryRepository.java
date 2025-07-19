package com.DeepThreat.Repository;

import com.DeepThreat.Entity.URLHistoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface URLHistoryRepository extends JpaRepository<URLHistoryEntity,Long> {
    @Query("SELECT * FROM urlhistory WHERE url = :url, nativeQuery=true")
    List<URLHistoryEntity> findByURL(@Param("url")String url);
}
