package be.pxl.services.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class Post {
    @Id
    private Long id;
    private String title;
    @Lob
    private String content;
    @ManyToOne
    private Editor author;
    private LocalDateTime createdAt;
    @Enumerated(value = EnumType.STRING)
    private PostStatus status;
    @Lob
    private String remarks;
}