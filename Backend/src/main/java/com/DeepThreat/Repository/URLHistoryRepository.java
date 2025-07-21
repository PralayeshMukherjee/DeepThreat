package com.DeepThreat.Repository;

import com.DeepThreat.Entity.URLHistoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface URLHistoryRepository extends JpaRepository<URLHistoryEntity,Long> {
    List<URLHistoryEntity> findByUrl(String url);
}
