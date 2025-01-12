package be.pxl.services.controller;

import be.pxl.services.controller.request.ReviewRequest;
import be.pxl.services.controller.response.PostDTO;
import be.pxl.services.services.ReviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {
    private final ReviewService reviewService;

    @GetMapping("/pending")
    public ResponseEntity<List<PostDTO>> getPendingPostToReview(@RequestHeader("userId") Long editorId,
                                                                @RequestHeader("userRole") String userRole) {
        List<PostDTO> pendingPosts = reviewService.getAllPostsToReview(editorId, userRole);

        return ResponseEntity.ok(pendingPosts);
    }

    @PostMapping("/post/{postId}/reject")
    public ResponseEntity<Void> rejectPost(@RequestHeader("userId") Long editorId,
                                           @RequestHeader("userRole") String userRole,
                                           @PathVariable Long postId,
                                           @RequestBody ReviewRequest request) throws Exception {
        reviewService.rejectPost(editorId, userRole, postId, request);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/post/{postId}/approve")
    public ResponseEntity<Void> approvePost(@RequestHeader("userId") Long editorId,
                                           @RequestHeader("userRole") String userRole,
                                           @PathVariable Long postId) throws Exception {
        reviewService.approvePost(editorId, userRole, postId);
        return ResponseEntity.noContent().build();
    }
}
