package com.DeepThreat.Repository;

import com.DeepThreat.Entity.URLHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface URLHistoryRepository extends JpaRepository<URLHistory,Long> {
}
