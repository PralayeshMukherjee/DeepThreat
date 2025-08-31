package com.DeepThreat.Repository;

import com.DeepThreat.Entity.DocumentScanned;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DocumentRepository extends JpaRepository<DocumentScanned,Long> {
    int countTotalDocumentScanned();
}
