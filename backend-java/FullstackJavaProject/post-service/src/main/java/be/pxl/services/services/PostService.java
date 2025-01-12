package be.pxl.services.services;

import be.pxl.services.controller.request.ConvertConceptToPostRequest;
import be.pxl.services.controller.request.PostRequest;
import be.pxl.services.controller.request.UpdatePostRequest;
import be.pxl.services.controller.response.PostDTO;
import be.pxl.services.domain.Editor;
import be.pxl.services.domain.Post;
import be.pxl.services.domain.PostStatus;
import be.pxl.services.exceptions.EditorAuthorizationException;
import be.pxl.services.exceptions.EditorNotFoundException;
import be.pxl.services.exceptions.PostInvalidArgumentException;
import be.pxl.services.exceptions.PostNotFoundException;
import be.pxl.services.repository.EditorRepository;
import be.pxl.services.repository.PostRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.POST;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class PostService {
    private final PostRepository postRepository;
    private final EditorRepository editorRepository;
    private final RabbitTemplate rabbitTemplate;

    public void createPost(Long editorId, String userRole ,PostRequest postRequest) throws Exception {
        Optional<Editor> editor = editorRepository.findById(editorId);

        if (!userRole.equals("editor")) throw new EditorAuthorizationException("Users are not allowed to create posts");
        if (editor.isEmpty()) throw new EditorNotFoundException("No editor found with id " + editorId);
        if (postRequest.getTitle() == null || postRequest.getTitle().isEmpty()) throw new PostInvalidArgumentException("Title cannot be null or empty");
        if (postRequest.getContent() == null || postRequest.getContent().isEmpty()) throw new PostInvalidArgumentException("Content cannot be null or empty");

        Editor author = editor.get();

        Post post = Post.builder().title(postRequest.getTitle())
                .content(postRequest.getContent())
                .createdAt(LocalDateTime.now())
                .status(PostStatus.PENDING)
                .author(author)
                .build();

        postRepository.save(post);
        sendPost(post);
    }

    public void createConceptPost(Long editorId, String userRole ,PostRequest postRequest){
        Optional<Editor> editor = editorRepository.findById(editorId);

        if (!userRole.equals("editor")) throw new EditorAuthorizationException("Users are not allowed to create posts");
        if (editor.isEmpty()) throw new EditorNotFoundException("No editor found with id " + editorId);
        if (postRequest.getTitle() == null || postRequest.getTitle().isEmpty()) throw new PostInvalidArgumentException("Title cannot be null or empty");
        if (postRequest.getContent() == null || postRequest.getContent().isEmpty()) throw new PostInvalidArgumentException("Content cannot be null or empty");

        Editor author = editor.get();

        Post post = Post.builder().title(postRequest.getTitle())
                .content(postRequest.getContent())
                .status(PostStatus.CONCEPT)
                .createdAt(LocalDateTime.now())
                .author(author)
                .build();

        postRepository.save(post);
    }

    public void updatePost(Long editorId, String userRole ,Long postId, UpdatePostRequest request) throws Exception {
        Optional<Editor> editor = editorRepository.findById(editorId);
        Optional<Post> post = postRepository.findById(postId);

        if (!userRole.equals("editor")) throw new EditorAuthorizationException("Users are not allowed to create posts");
        if (editor.isEmpty()) throw new EditorNotFoundException("No editor found with id " + editorId);
        if (post.isEmpty()) throw new PostNotFoundException("No post found with id " + editorId);
        if (request.getTitle() == null || request.getTitle().isEmpty()) throw new PostInvalidArgumentException("Updated title cannot be null or empty");
        if (request.getContent() == null || request.getContent().isEmpty()) throw new PostInvalidArgumentException("Updated content cannot be null or empty");

        Editor author = editor.get();
        Post foundPost = post.get();

        if (foundPost.getAuthor() != author) throw new PostInvalidArgumentException("Only the author of the post can edit the post");

        foundPost.setTitle(request.getTitle());
        foundPost.setContent(request.getContent());
        foundPost.setStatus(PostStatus.PENDING);
        foundPost.setRemarks(null);

        postRepository.save(foundPost);
        sendPost(foundPost);
    }

    public List<PostDTO> getAllPublishedPosts() {
        List<Post> posts = postRepository.findPostByStatus(PostStatus.PUBLISHED);
        return posts.stream().map(this::mapToPostDTO).toList();
    }

    public List<PostDTO> getAllApprovedPosts(Long editorId, String userRole){
        Optional<Editor> editor = editorRepository.findById(editorId);

        if (!userRole.equals("editor")) throw new EditorAuthorizationException("Users are not allowed to create posts");
        if (editor.isEmpty()) throw new EditorNotFoundException("No editor found with id " + editorId);


        List<Post> posts = postRepository.findPostByStatusAndAuthor(PostStatus.APPROVED, editor.get());
        return posts.stream().map(this::mapToPostDTO).toList();
    }

    public List<PostDTO> getAllConceptPostsOfAuthor(Long editorId, String userRole){
        Optional<Editor> editor = editorRepository.findById(editorId);

        if (!userRole.equals("editor")) throw new EditorAuthorizationException("Users are not allowed to create posts");
        if (editor.isEmpty()) throw new EditorNotFoundException("No editor found with id " + editorId);

        List<Post> posts = postRepository.findPostByStatusAndAuthor(PostStatus.CONCEPT,editor.get());
        return posts.stream().map(this::mapToPostDTO)
                .toList();
    }

    public void createPostFromConcept(Long editorId, String userRole , ConvertConceptToPostRequest request) throws Exception {
        Optional<Post> findPost = postRepository.findById(request.getId());
        Optional<Editor> editor = editorRepository.findById(editorId);

        if (findPost.isEmpty()) throw new PostNotFoundException("No post found with id :" + request.getId());

        if (!userRole.equals("editor")) throw new EditorAuthorizationException("Users are not allowed to create posts");
        if (editor.isEmpty()) throw new EditorNotFoundException("No editor found with id " + editorId);
        if (request.getTitle() == null || request.getTitle().isEmpty()) throw new PostInvalidArgumentException("Title cannot be null or empty");
        if (request.getContent() == null || request.getContent().isEmpty()) throw new PostInvalidArgumentException("Content cannot be null or empty");

        Post post = findPost.get();
        post.setTitle(request.getTitle());
        post.setContent(request.getContent());
        post.setStatus(PostStatus.PENDING);
        post.setCreatedAt(LocalDateTime.now());

        postRepository.save(post);
        sendPost(post);
    }

    public List<PostDTO> getAllPendingPostsOfAuthor(Long editorId, String userRole) {
        Optional<Editor> editor = editorRepository.findById(editorId);

        if (!userRole.equals("editor")) throw new EditorAuthorizationException("Users are not allowed to create posts");
        if (editor.isEmpty()) throw new EditorNotFoundException("No editor found with id " + editorId);

        List<Post> posts = postRepository.findPostByStatusAndAuthor(PostStatus.PENDING,editor.get());
        return posts.stream().map(this::mapToPostDTO)
                .toList();
    }

    public List<PostDTO> getAllRejectedPostsOfAuthor(Long editorId, String userRole) {
        Optional<Editor> editor = editorRepository.findById(editorId);

        if (!userRole.equals("editor")) throw new EditorAuthorizationException("Users are not allowed to create posts");
        if (editor.isEmpty()) throw new EditorNotFoundException("No editor found with id " + editorId);

        List<Post> posts = postRepository.findPostByStatusAndAuthor(PostStatus.REJECTED,editor.get());
        return posts.stream().map(this::mapToPostDTO)
                .toList();
    }

    public void sendPost(Post post) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        String postJson = objectMapper.writeValueAsString(post);
        rabbitTemplate.convertAndSend("createQueue", postJson);
    }

    private PostDTO mapToPostDTO(Post post){
        return PostDTO.builder().id(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .author(post.getAuthor())
                .createdAt(post.getCreatedAt())
                .status(post.getStatus())
                .remarks(post.getRemarks())
                .build();
    }

    public void publishPost(Long editorId, String userRole, Long postId) {
        Optional<Post> findPost = postRepository.findById(postId);
        Optional<Editor> editor = editorRepository.findById(editorId);

        if (findPost.isEmpty()) throw new PostNotFoundException("No post found with id :" + postId);
        if (!userRole.equals("editor")) throw new EditorAuthorizationException("Users are not allowed to create posts");
        if (editor.isEmpty()) throw new EditorNotFoundException("No editor found with id " + editorId);

        Post post = findPost.get();
        post.setStatus(PostStatus.PUBLISHED);

        postRepository.save(post);
    }
}
