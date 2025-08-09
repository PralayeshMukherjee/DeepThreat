package com.DeepThreat.Repository;

import com.DeepThreat.Entity.UserURLHistoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserURLHistoryRepository extends JpaRepository<UserURLHistoryEntity,Long> {
    List<UserURLHistoryEntity> findLastThreeURL(@Param("email")String email);
}
