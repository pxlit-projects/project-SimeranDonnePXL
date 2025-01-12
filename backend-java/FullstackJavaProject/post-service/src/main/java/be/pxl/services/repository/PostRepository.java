package be.pxl.services.repository;

import be.pxl.services.controller.request.PostRequest;
import be.pxl.services.domain.Editor;
import be.pxl.services.domain.Post;
import be.pxl.services.domain.PostStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    public List<Post> findPostByStatus(PostStatus status);
    public List<Post> findPostByStatusAndAuthor(PostStatus status, Editor editor);
}
