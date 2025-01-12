package be.pxl.services.services;

import be.pxl.services.domain.Notification;
import be.pxl.services.repository.NotificationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class NotificationService {
    private final NotificationRepository notificationRepository;

    public void createNotification(Long editorId, String message){
        Notification notification = Notification.builder().message(message)
                        .editorId(editorId)
                                .build();

        notificationRepository.save(notification);
    }

    public List<String> getAllNotifications(Long editorId, String userRole){
        if (!userRole.equals("editor")) throw new IllegalArgumentException("Only editors can see their notifications");

        List<Notification> notifications = notificationRepository.findNotificationByEditorId(editorId);
        return notifications.stream().map(Notification::getMessage).toList();
    }
}
