package be.pxl.services.exceptions;

public class PostInvalidArgumentException extends RuntimeException{
    public PostInvalidArgumentException(String message){
        super(message);
    }
}
