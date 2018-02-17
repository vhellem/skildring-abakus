package skildring;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import javax.mail.MessagingException;

@SpringBootApplication
@ComponentScan
public class Application {



	public static void main(String[] args) {
	    /*
        ApplicationContext context =
                new ClassPathXmlApplicationContext("Spring-Mail.xml");

        MailService emailService = (MailService) context.getBean("mailMail");

        emailService.sendMail("Vegard");
        */
		SpringApplication.run(Application.class, args);
	}

}
