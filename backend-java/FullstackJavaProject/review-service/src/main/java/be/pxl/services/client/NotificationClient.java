package be.pxl.services.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@FeignClient("notification-service")
public interface NotificationClient {

    @PostMapping("/api/notifications/{editorId}")
    void sendNotification(@PathVariable Long editorId, @RequestBody String message);
}
