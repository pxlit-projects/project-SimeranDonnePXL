package be.pxl.services.util;

import be.pxl.services.domain.Editor;
import be.pxl.services.domain.Post;
import be.pxl.services.domain.PostStatus;
import be.pxl.services.repository.EditorRepository;
import be.pxl.services.repository.PostRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Arrays;

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

            editorRepository.saveAll(Arrays.asList(editor1, editor2));
        };
    }
}
