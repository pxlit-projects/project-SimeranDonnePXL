package be.pxl.services.services;

import be.pxl.services.domain.Post;
import be.pxl.services.repository.PostRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.DependsOn;
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
    @RabbitListener(queues = "createQueue")
    public void listen(String message) throws JsonProcessingException {
        System.out.println("post added to review service: " + message);
        Post post = objectMapper.readValue(message, Post.class);
        postRepository.save(post);
    }
}
