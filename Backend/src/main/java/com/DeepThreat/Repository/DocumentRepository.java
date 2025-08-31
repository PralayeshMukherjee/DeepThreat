package com.DeepThreat.Repository;

import com.DeepThreat.Entity.DocumentScanned;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface DocumentRepository extends JpaRepository<DocumentScanned,Long> {
    @Query()
    int countTotalDocumentScanned();
}
