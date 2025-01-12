package be.pxl.services.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class PostInvalidArgumentException extends RuntimeException {
    public PostInvalidArgumentException(String message){
        super(message);
    }
}
