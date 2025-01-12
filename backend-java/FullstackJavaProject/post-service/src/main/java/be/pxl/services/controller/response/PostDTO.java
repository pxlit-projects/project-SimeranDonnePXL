package be.pxl.services.controller.response;

import be.pxl.services.domain.Editor;
import be.pxl.services.domain.PostStatus;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class PostDTO {
    private Long id;
    private String title;
    private String content;
    private Editor author;
    private LocalDateTime createdAt;
    private PostStatus status;
    private String remarks;
}
