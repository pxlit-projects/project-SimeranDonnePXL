package be.pxl.services.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.UNAUTHORIZED)
public class EditorAuthorizationException extends RuntimeException {
    public EditorAuthorizationException(String message){
        super(message);
    }
}
