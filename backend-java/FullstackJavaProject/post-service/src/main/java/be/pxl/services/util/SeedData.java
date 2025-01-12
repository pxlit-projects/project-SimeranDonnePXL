package be.pxl.services.util;

import be.pxl.services.domain.Editor;
import be.pxl.services.domain.Post;
import be.pxl.services.domain.PostStatus;
import be.pxl.services.repository.EditorRepository;
import be.pxl.services.repository.PostRepository;
import jakarta.ws.rs.POST;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.*;

@Configuration
public class SeedData {
    public SeedData() throws IOException {
    }

    @Bean
    CommandLineRunner seedDatabase(PostRepository postRepository, EditorRepository editorRepository) {

        return args -> {
            Editor editor1 = Editor.builder().firstName("john")
                    .lastName("lemon")
                    .build();

            Editor editor2 = Editor.builder().firstName("george")
                    .lastName("clooney")
                    .build();


            Post post1 = Post.builder().title("post 1")
                    .content("some interesting content")
                    .author(editor1)
                    .createdAt(LocalDateTime.now().minusDays(4543))
                    .status(PostStatus.PUBLISHED)
                    .build();

            Post post2 = Post.builder().title("post 2")
                    .content("some less interesting content")
                    .author(editor2)
                    .createdAt(LocalDateTime.now().minusDays(245))
                    .status(PostStatus.PENDING)
                    .build();

            Post post4 = Post.builder().title("post 4")
                    .content("chicken burrito")
                    .author(editor2)
                    .createdAt(LocalDateTime.now().minusDays(1000))
                    .status(PostStatus.PUBLISHED)
                    .build();

            Post post5 = Post.builder().title("post 5")
                    .content("taco sauce")
                    .author(editor2)
                    .createdAt(LocalDateTime.now().minusDays(110))
                    .status(PostStatus.PUBLISHED)
                    .build();

            editorRepository.saveAll(Arrays.asList(editor1, editor2));
            postRepository.saveAll(Arrays.asList(post1, post2, post4, post5));
        };
    }
}
