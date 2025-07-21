package com.DeepThreat.Repository;

import com.DeepThreat.Entity.URLHistoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface URLHistoryRepository extends JpaRepository<URLHistoryEntity,Long> {
    @Query(value = "SELECT * FROM urlhistory WHERE url = ?1",nativeQuery = true)
    List<URLHistoryEntity> findByUrl(String url);
}
