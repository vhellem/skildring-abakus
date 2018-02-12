package skildring;

import com.itextpdf.text.Image;
import com.itextpdf.text.pdf.*;
import com.itextpdf.text.pdf.codec.Base64;

import java.io.*;
import java.io.FileOutputStream;
import java.net.MalformedURLException;

import com.itextpdf.text.DocumentException;

import sun.misc.BASE64Decoder;


public class PDFFiller {



    public void handlePDFFill(Skildring data) throws DocumentException, MalformedURLException, IOException{

        //Decodes image into a byte array
        byte[] array ;

        BASE64Decoder decoder = new BASE64Decoder();
        array = decoder.decodeBuffer(data.signatur.split(",")[1]);

        //Gets template, add destination
        PdfReader reader = new PdfReader("/Users/vegardhellem/template-spring-boot-docker/src/main/resources/mal_skildring.pdf");
        PdfStamper stamper = new PdfStamper(reader, new FileOutputStream("test.pdf"));
        PdfContentByte content = stamper.getOverContent(1);

        AcroFields form = stamper.getAcroFields();
        form.setField("Navn", data.name);
        form.setField("Dato", data.date);
        form.setField("Komite", data.comittee);
        form.setField("Kontonummer", data.kontonummer);
        form.setField("Anledning", data.anledning);
        form.setField("Belop", data.belop);
        form.setField("Kommentar", data.comment);

        //Add signature to pdf
        Image image = Image.getInstance(array);

        image.scaleAbsoluteHeight(40);
        image.scaleAbsoluteWidth(160);

        image.setAbsolutePosition(130, 50);

        PdfReader kvittering = new PdfReader(Base64.decode(data.kvittering.split(",")[1]));

        content.addImage(image);

        //Add all pages of a pdf to the existing one
        for(int i=1; i<=kvittering.getNumberOfPages(); i++){
            stamper.insertPage(i+1, kvittering.getPageSizeWithRotation(i));
            PdfContentByte page1 = stamper.getOverContent(i+1);
            PdfImportedPage page = stamper.getImportedPage(kvittering, i);
            page1.addTemplate(page, 0, 0);

        }



        //Close
        stamper.close();
        reader.close();



    }

}
