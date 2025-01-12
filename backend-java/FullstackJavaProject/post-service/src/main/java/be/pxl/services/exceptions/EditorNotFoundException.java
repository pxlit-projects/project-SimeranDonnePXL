package be.pxl.services.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class EditorNotFoundException extends RuntimeException {
    public EditorNotFoundException(String message){
        super(message);
    }
}
