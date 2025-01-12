package be.pxl.services.services;

import be.pxl.services.client.NotificationClient;
import be.pxl.services.controller.request.ReviewRequest;
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
import com.ctc.wstx.shaded.msv_core.util.LightStack;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.rabbitmq.client.MessageProperties;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ReviewService {
    private final PostRepository postRepository;
    private final EditorRepository editorRepository;
    private final RabbitTemplate rabbitTemplate;
    private final NotificationClient notificationClient;

    public List<PostDTO> getAllPostsToReview(Long editorId, String userRole){

        Optional<Editor> editor = editorRepository.findById(editorId);

        if (!userRole.equals("editor")) throw new EditorAuthorizationException("Users are not allowed to review posts");
        if (editor.isEmpty()) throw new EditorNotFoundException("No editor found with id " + editorId);

        List<Post> posts = postRepository.findPostByAuthorNot(editor.get());
        return posts.stream().map(this::mapToPostDTO).toList();
    }

    @Transactional
    public void rejectPost(Long editorId, String userRole, Long postId, ReviewRequest request) throws Exception {
        Optional<Editor> editor = editorRepository.findById(editorId);
        Optional<Post> post = postRepository.findById(postId);

        if (!userRole.equals("editor")) throw new EditorAuthorizationException("Users are not allowed to reject posts");
        if (editor.isEmpty()) throw new EditorNotFoundException("No editor found with id " + editorId);
        if (post.isEmpty()) throw new PostNotFoundException("No post found with id " + editorId);
        if (request.getRemark() == null || request.getRemark().isEmpty()) throw new PostInvalidArgumentException("Remark is required");

        Post foundPost = post.get();
        foundPost.setRemarks(request.getRemark());
        foundPost.setStatus(PostStatus.REJECTED);

        sendPost(foundPost);
        notificationClient.sendNotification(editorId, "Message with title '" + foundPost.getTitle() + "' has been rejected");

        postRepository.delete(foundPost);
    }

    public void approvePost(Long editorId, String userRole, Long postId) throws JsonProcessingException {
        Optional<Editor> editor = editorRepository.findById(editorId);
        Optional<Post> post = postRepository.findById(postId);

        if (!userRole.equals("editor")) throw new EditorAuthorizationException("Users are not allowed to approve posts");
        if (editor.isEmpty()) throw new EditorNotFoundException("No editor found with id " + editorId);
        if (post.isEmpty()) throw new PostNotFoundException("No post found with id " + editorId);

        Post foundPost = post.get();
        foundPost.setStatus(PostStatus.APPROVED);

        sendApprovedPost(foundPost);
        notificationClient.sendNotification(foundPost.getAuthor().getId(), "Message with title '" + foundPost.getTitle() + "' has been approved");
        postRepository.delete(foundPost);
    }

    public void sendPost(Post post) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        String postJson = objectMapper.writeValueAsString(post);
        rabbitTemplate.convertAndSend("rejectQueue", postJson);
    }

    public void sendApprovedPost(Post post) throws JsonProcessingException {
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        String postJson = objectMapper.writeValueAsString(post);
        rabbitTemplate.convertAndSend("approvedQueue", postJson);
    }

    private PostDTO mapToPostDTO(Post post){
        return PostDTO.builder().id(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .author(post.getAuthor())
                .createdAt(post.getCreatedAt())
                .remarks(post.getRemarks())
                .status(post.getStatus())
                .build();
    }
}
