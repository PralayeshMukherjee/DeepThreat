package com.DeepThreat.Repository;

import com.DeepThreat.Entity.DocumentScanned;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface DocumentRepository extends JpaRepository<DocumentScanned,Long> {
    @Query(value = "select count(serial_no) from document_scanned where email= :email",nativeQuery = true)
    int countTotalDocumentScanned(@Param("email")String email);
}
