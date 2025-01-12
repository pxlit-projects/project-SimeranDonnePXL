package be.pxl.services.controller;

import be.pxl.services.controller.request.ConvertConceptToPostRequest;
import be.pxl.services.controller.request.PostRequest;
import be.pxl.services.controller.request.UpdatePostRequest;
import be.pxl.services.controller.response.PostDTO;
import be.pxl.services.services.PostService;
import com.fasterxml.jackson.core.JsonProcessingException;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostController {

    private final PostService postService;

    @PostMapping("/create")
    public ResponseEntity<Void> createPost(
            @RequestHeader("userId") Long editorId,
            @RequestHeader("userRole") String userRole,
            @RequestBody PostRequest postRequest) throws Exception {
        postService.createPost(editorId, userRole ,postRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/concept")
    public ResponseEntity<Void> createConceptPost(
            @RequestHeader("userId") Long editorId,
            @RequestHeader("userRole") String userRole,
            @RequestBody PostRequest postRequest) {
        postService.createConceptPost(editorId, userRole ,postRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PostMapping("/concept/create/post")
    public ResponseEntity<Void> UpdateConceptToPost(
            @RequestHeader("userId") Long editorId,
            @RequestHeader("userRole") String userRole,
            @RequestBody ConvertConceptToPostRequest postRequest) throws Exception {
        postService.createPostFromConcept(editorId, userRole, postRequest);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @PutMapping("/{postId}/post/update")
    public ResponseEntity<Void> updatePost(
            @RequestHeader("userId") Long editorId,
            @RequestHeader("userRole") String userRole,
            @PathVariable Long postId,
            @RequestBody UpdatePostRequest updatePostRequest) throws Exception {
        postService.updatePost(editorId, userRole ,postId, updatePostRequest);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PutMapping("/{postId}/post/publish")
    public ResponseEntity<Void> publishPost(
            @RequestHeader("userId") Long editorId,
            @RequestHeader("userRole") String userRole,
            @PathVariable Long postId) throws Exception {
        postService.publishPost(editorId, userRole ,postId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @GetMapping("/all")
    public ResponseEntity<List<PostDTO>> getAllPublishedPosts() {
        List<PostDTO> publishedPosts = postService.getAllPublishedPosts();
        return ResponseEntity.ok(publishedPosts);
    }

    @GetMapping("/approved")
    public ResponseEntity<List<PostDTO>> getAllApprovedPosts( @RequestHeader("userId") Long editorId,
                                                              @RequestHeader("userRole") String userRole) {
        List<PostDTO> approvedPosts = postService.getAllApprovedPosts(editorId, userRole);
        return ResponseEntity.ok(approvedPosts);
    }

    @GetMapping("/concepts")
    public ResponseEntity<List<PostDTO>> getAllConceptPostsOfAuthor(
            @RequestHeader("userId") Long editorId,
            @RequestHeader("userRole") String userRole) {
        List<PostDTO> conceptPosts = postService.getAllConceptPostsOfAuthor(editorId, userRole);
        return ResponseEntity.ok(conceptPosts);
    }
    @GetMapping("/pending")
    public ResponseEntity<List<PostDTO>> getAllPendingPostsOfAuthor(
            @RequestHeader("userId") Long editorId,
            @RequestHeader("userRole") String userRole) {
        List<PostDTO> pendingPosts = postService.getAllPendingPostsOfAuthor(editorId, userRole);
        return ResponseEntity.ok(pendingPosts);
    }

    @GetMapping("/rejected")
    public ResponseEntity<List<PostDTO>> getAllRejectedPostsOfAuthor(
            @RequestHeader("userId") Long editorId,
            @RequestHeader("userRole") String userRole) {
        List<PostDTO> rejectedPosts = postService.getAllRejectedPostsOfAuthor(editorId, userRole);
        return ResponseEntity.ok(rejectedPosts);
    }
}

