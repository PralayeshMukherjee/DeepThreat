package com.DeepThreat.Repository;

import com.DeepThreat.Entity.UserURLHistoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserURLHistoryRepository extends JpaRepository<UserURLHistoryEntity,Long> {
    @Query(value =  "select * from (select * from userurlhistory_entity where email= :email order by date desc limit 3) as data order by serial_no",nativeQuery = true)
    List<UserURLHistoryEntity> findLastThreeURL(@Param("email")String email);
    @Query(value = "select * from userurlhistory_entity where email= :email",nativeQuery = true)
    List<UserURLHistoryEntity> findByEmail(@Param("email") String email);
}
