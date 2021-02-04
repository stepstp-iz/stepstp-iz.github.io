using System;
using System.Collections.Specialized;
using System.Configuration;
using System.IO;
using System.Net;
using System.Net.Mail;
using System.Web;
using System.Web.Script.Serialization;


public partial class php_sendEmail : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string request = Request.Params["params"];
        var param = request.Split(',');
      
        try
        {
            string fname = param[0];
            string email = param[1];
            string jobtitle = param[2];
            string company = param[3];
            string phone = param[4];
            string message = param[5];


            SmtpClient client = new SmtpClient();
            client.Port = 587;
            client.UseDefaultCredentials = true;
            client.DeliveryMethod = SmtpDeliveryMethod.Network;
            client.Host = "194.42.142.29";
            client.Credentials = new System.Net.NetworkCredential("wikitest@integration-online.net", "5t3p5t3p1MC");

            MailMessage mailAnnouncements = new MailMessage("noreply@brandexperience-group.com", "info@brandexperience-group.com");
            
            mailAnnouncements.Subject = "BXG Contact Message";
            string body = "Dears,<br/> <br/>The following user has requested to talk to a BXG representative:";
            body = body + "<br/>" + "Name: " + fname + "<br/>";

            if (company != "")
            {
                body = body + "Company: " + company + "<br/>";
            }
            if (jobtitle != "")
            {
                body = body + "Function: " + jobtitle + "<br/>";
            }
            if (email != "")
            {
                body = body + "Email: " + email + "<br/>";
            }
            if (phone != "")
            {
                body = body + "Phone: " + phone + "<br/>";
            }
            if (message != "")
            {
                body = body + "Message: " + message + "<br/>";
            }

            body = body + "<br/><br/><br/><a href=''></a>"
                + "Best Regards,"
                + "<br/>"
                + "BXG Team";
            mailAnnouncements.Body = body;
            mailAnnouncements.IsBodyHtml = true;
            client.Send(mailAnnouncements);
        }
        catch (Exception ex)
        {

        }
    }
}