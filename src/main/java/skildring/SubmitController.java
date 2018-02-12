package skildring;

import java.io.IOException;

import com.itextpdf.text.DocumentException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@RestController
public class SubmitController {

    PDFFiller filler = new PDFFiller();



    @PostMapping("/register")
    public ResponseEntity doRegister(@RequestBody Skildring form
    ) {
        System.out.println("Filling out pdf");
        try {
            filler.handlePDFFill(form);
            System.out.println("Successful");
            return new ResponseEntity(HttpStatus.OK);

        }
        catch(IOException e){
            System.out.println("Error happened");
            System.out.println(e.getMessage());
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        catch(DocumentException e){
            System.out.println("Document exception Error happened");
            System.out.println(e.getMessage());
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }


        }

}
