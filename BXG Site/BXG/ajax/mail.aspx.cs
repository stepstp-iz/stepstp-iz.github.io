using System;
using System.Collections.Specialized;
using System.Configuration;
using System.Net.Mail;

public partial class ajax_mail : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        NameValueCollection form = Request.Form;

        if (form["hf"] == null)
        {
            Response.Write("Failed to send email");
            return;
        }
        string token = form["hf"];
        string requestToken = Request.QueryString["token"];
        if (string.IsNullOrEmpty(requestToken))
        {
            Response.Write("Failed to send email");
            return;
        }
        if (requestToken != token)
        {
            Response.Write("Failed to send email");
            return;
        }

        string name = form["name"];
        string email = form["email"];
        string interest = form["interest"];
        string hear = form["hear"];
        string msg = form["msg"];
        string file = form["file"];

        if (name.Trim() != "" && email.Trim() != "" && msg.Trim() != "")
        {
            string body = "<!DOCTYPE html><html><head></head>" +
               "<body style='background-color:#fff;font-family: Arial;font-size: 12px;'>" +
               "<p>Please find the below feedback from STeP Website</p>" +
                "<table style='background-color:#fff;font-family: Arial;font-size: 12px;'><tr><td colspan='2'>&nbsp;</td></tr>" +
                "<tr><td width='30%'><b>Name: </b></td><td>" + name + "</td></tr>" +
               "<tr><td width='30%'><b>Email: </b></td><td>" + email + "</td></tr>" +
               "<tr><td width='30%'><b>Interest: </b></td><td>" + interest + "</td></tr>" +
               "<tr><td width='30%'><b>Heard of us by: </b></td><td>" + hear + "</td></tr>" +
               "<tr><td width='30%'><b>Message: </b></td><td>" + msg + "</td></tr>" +
                "</table></body></html>";
            SendEmail("STeP Feedback", body, file);
        }
    }
    private void SendEmail(string subject, string body, string file)
    {
        MailMessage mail = new MailMessage();
        mail.To.Add(ConfigurationManager.AppSettings["MailTo"]);
        mail.From = new MailAddress(ConfigurationManager.AppSettings["MailFrom"]);
        mail.Subject = subject;
        mail.Body = body;
        if (Request.Files.Count > 0 && file != "")
        {
            mail.Attachments.Add(new Attachment(Request.Files[0].InputStream, System.IO.Path.GetFileName(Request.Files[0].FileName)));
        }
        mail.IsBodyHtml = true;
        SmtpClient smtp = new SmtpClient(ConfigurationManager.AppSettings["SMTP"]);
        smtp.Send(mail);
    }
}