package be.pxl.services.services;

import be.pxl.services.controllers.request.CommentRequest;
import be.pxl.services.domain.User;
import be.pxl.services.exceptions.InvalidCommentException;
import be.pxl.services.exceptions.UserNotFoundException;
import be.pxl.services.repository.CommentRepository;
import be.pxl.services.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CommentService {
    private final CommentRepository commentRepository;
    private final UserRepository userRepository;

    public void createComment(Long userId, String userRole ,CommentRequest request){
        Optional<User> user = userRepository.findById(userId);

        if (!userRole.equals("user")) throw new InvalidCommentException("Only users can place comments");
        if (user.isEmpty()) throw new UserNotFoundException("No user found with id: " + userId);

        //voor de comment service luister naar berichten van published posts, zodat je kan testen of iemand
        //probeert te commenten op post dat niet bestaat, dit kan alleen gedaan worden in de post service.
        //approved != published
    }
}
