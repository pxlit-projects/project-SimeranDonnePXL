package be.pxl.services.config;

import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitAdmin;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class QueueConfiguration {
    @Bean
    public Queue createQueue() {
        return new Queue("createQueue", false);
    }

    //Als de services niet meer runnen doordat ze de queue niet meer kunnen vinden
    //komt dat door een fout bij het initializeren
    //om het op te lossen moet je de rabbitlisteners in de comments hieronder
    //uncommenten, hierdoor worden de queues direct gecreeerd bij het opstarten van deze service
    //eens deze service opgestart is, start je ook alle andere services op voor de zekerheid dat zij ook de
    //queues kennen, Daarna kun je de alle runnende services terug stoppen
    //en zet de rabbitlisteners terug in comment, als je dat niet doet
    //zullen de bestaande services alleen om de 2 verichten kunnen consumeren
    // dit betekent dat post met id 1 niet geconsumeert zal worden maar post met id 2 wel, id 3 niet en id 4 well,etc
/*
    @RabbitListener(queues = "createQueue")
    public void listenPostCreated(String in) {
        System.out.println("post created : " + in);
    }*/
    @Bean
    public Queue rejectQueue() {
        return new Queue("rejectQueue", false);
    }
/*
    @RabbitListener(queues = "rejectQueue")
    public void listenPostRejected(String in) {
        System.out.println("post rejected : " + in);
    }*/

    @Bean
    public Queue approvedQueue() {
        return new Queue("approvedQueue", false);
    }
    /*
    @RabbitListener(queues = "approvedQueue")
    public void listenPostRejected(String in) {
        System.out.println("post approved : " + in);
    }*/
}
