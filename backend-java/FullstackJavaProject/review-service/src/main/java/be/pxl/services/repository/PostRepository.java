package be.pxl.services.repository;

import be.pxl.services.domain.Editor;
import be.pxl.services.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<Post, Long> {
    public List<Post> findPostByAuthorNot(Editor editor);
}
