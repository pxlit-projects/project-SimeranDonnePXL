package be.pxl.services.exceptions;

public class InvalidCommentException extends RuntimeException{
    public InvalidCommentException(String exception){
        super(exception);
    }
}
