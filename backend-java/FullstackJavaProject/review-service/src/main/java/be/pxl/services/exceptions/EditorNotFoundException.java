package be.pxl.services.exceptions;

public class EditorNotFoundException extends RuntimeException {
    public EditorNotFoundException(String message){
        super(message);
    }
}
