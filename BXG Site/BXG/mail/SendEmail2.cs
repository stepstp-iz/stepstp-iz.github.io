using System;
using System.Collections.Specialized;
using System.Configuration;
using System.IO;
using System.Net;
using System.Net.Mail;
using System.Web;
using System.Web.Script.Serialization;


public partial class php_sendEmail2 : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string request = Request.Params["params"];
        var param = request.Split(',');

        try
        {
            string fname = param[0];
            string lname = param[1];
            string email = param[2];
            string company = param[3];
            string jobtitle = param[4];
            string message = param[5];

            SmtpClient client = new SmtpClient();
            client.Port = 587;
            client.UseDefaultCredentials = true;
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.Host = "194.42.142.29";
            client.Credentials = new System.Net.NetworkCredential("wikitest@integration-online.net", "5t3p5t3p1MC");


            MailMessage mailAnnouncements = new MailMessage("noreply@brandexperience-group.com", "info@brandexperience-group.com");
            mailAnnouncements.Subject = "BXG Contact Message";
            string body = "Dears,<br/> <br/>This user downloaded this paper Building Enterprise Value Through Sustainable Brands from BXG Site.<br/><br/>";
            body = body + "User Information: <br/>";
            body = body + "Job Title: " + jobtitle + "<br/>";
            body = body + "Name : " + fname + " " + lname + "<br/>";
            body = body + "Company: " + company + "<br/>";
            body = body + "Email: " + email + "<br/>";
            body = body + "Message: " + message + "<br/>";
            body = body + "<br/><br/><br/><a href=''></a>"
                + "Best Regards,"
                + "<br/>"
                + "BXG Team";
            mailAnnouncements.Body = body;
            mailAnnouncements.IsBodyHtml = true;
            client.Send(mailAnnouncements);

            mailAnnouncements = new MailMessage("noreply@brandexperience-group.com", email); // "noreply@brandexperience-group.com", "info@brandexperience-group.com");
            mailAnnouncements.Subject = "BXG Contact Message";
            body = "Dear " + fname + ",<br/> <br/>Thank you for your interest in our company.<br/> <br/>As per your request, we are glad to share with you the paper <b>Building Enterprise Value Through Sustainable Brands</b>.";
            body = body + "<br/><br/>For more information, please contact:<br/><br/>";
            body = body + "EMEA - Mike Bambrick: <a href='mailto:mbambrick@brandexperience-group.com'>mbambrick@brandexperience-group.com.</a><br/><br/>";
            body = body + "North America - Will Sarni: <a href='mailto:wsarni@brandexperience-group.com'>wsarni@brandexperience-group.com.</a><br/><br/>";
            body = body + "Latin America - Eric Dherte: <a href='mailto:edherte@brandexperience-group.com'>edherte@brandexperience-group.com.</a><br/><br/>";
            body = body + "Asia - Sumit Arora: <a href='mailto:sarora@brandexperience-group.com'>sarora @brandexperience-group.com.</a><br/><br/>";

            body = body + "<br/><br/><br/><a href=''></a>"
                + "Regards,"
                + "<br/>"
                + "The BXG Team"
                + "<br/>"
                + "<a href='https://brandexperience-group.com/#'><img src='http://shadow.brandexperience-group.com/mail/tagline.png' alt='tagline'></a>";
            mailAnnouncements.Body = body;
            mailAnnouncements.IsBodyHtml = true;

            Attachment attach = new Attachment("C:/App/shadow-brandxp/papers/Manifesto.pdf");
            attach.Name = "Manifesto.pdf";
            mailAnnouncements.Attachments.Add(attach);
            client.Send(mailAnnouncements);

        }
        catch (Exception ex)
        {

        }
    }
}