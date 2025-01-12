package be.pxl.services.services;

import be.pxl.services.domain.Post;
import be.pxl.services.repository.PostRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QueueService {
    @Autowired
    private PostRepository postRepository;
    private ObjectMapper objectMapper;

    public QueueService(){
        this.objectMapper = new ObjectMapper();
        this.objectMapper.registerModule(new JavaTimeModule());
    }
    @RabbitListener(queues = "rejectQueue")
    public void listen(String message) throws JsonProcessingException {
        System.out.println("post rejected received in post service: " + message);
        Post post = objectMapper.readValue(message, Post.class);
        postRepository.save(post);
    }

    @RabbitListener(queues = "approvedQueue")
    public void listenApproved(String message) throws JsonProcessingException {
        System.out.println("post approved received in post service: " + message);
        Post post = objectMapper.readValue(message, Post.class);
        postRepository.save(post);
    }
}
