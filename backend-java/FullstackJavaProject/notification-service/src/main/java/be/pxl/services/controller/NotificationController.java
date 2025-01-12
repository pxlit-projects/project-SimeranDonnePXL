package be.pxl.services.controller;

import be.pxl.services.services.NotificationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notifications")
@RequiredArgsConstructor
public class NotificationController {
    private final NotificationService service;

    @GetMapping()
    public ResponseEntity<?> getNotifications(@RequestHeader("userId") Long editorId,
                                              @RequestHeader("userRole") String userRole) {
        List<String> notifications = service.getAllNotifications(editorId, userRole);

        return ResponseEntity.ok(notifications);
    }

    @PostMapping("/{editorId}")
    public ResponseEntity<Void> addNotification(@PathVariable Long editorId, @RequestBody String message) {
        service.createNotification(editorId, message);
        return new ResponseEntity<Void>(HttpStatus.CREATED);
    }
}
