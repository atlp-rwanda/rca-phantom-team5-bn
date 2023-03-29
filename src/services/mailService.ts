import nodemailer from 'nodemailer'

const sendEmail = async (url:string, name:string, to:string, action:string,pass:string) => {
  const transporter = await nodemailer.createTransport(
    {
        auth: {user: 'transport.phantom5@gmail.com',pass: 'ufrzvinutlnmrdhr'},
        service: 'gmail',
        logger:false,
        debug:false,
    },
    {
        from: 'Phantom - 5 <transport.phantom5@gmail.com>',
    },
  );
    const messageObj = {
      to: `${name} <${to}>`,
      subject: `Phantom Transport ${action}`,
      text: `Hello`,
      html: `<table border='0' cellpadding='0' cellspacing='0' width='100%' style='border-collapse:collapse; padding:0; margin:0px;'>
              <tr valign='top'>
                <td align=''>
                  <table> <h2 style='color: #233862'> ${name} welcome to Phantom Transport</h2> </table>
                  <table> <p> We are happy that you decided to join phantom transport,
                    your account has been created successfully
                   </p> </table>
                  <table> <p>You can access your account using the following credentials:<br>
                       Email: ${to} <br>
                       password: ${pass} <br>
                  </p>
                  <p>Follow the link to get started with <a href='${url}'>phantom</a> </p>
                  </table>
                  <p>For security purposes, we recommend that you change your password upon
                   your first login.If you have any difficulty accessing your account or 
                   have any questions, please do not hesitate to contact our customer
                   support team at phantom5.transporrt@gmail.com </p>

                  <p>Best regards,<br>Phantom Transport</p>
                  
                                  </td>
              </tr>
            </table>`,
    };
    await transporter.sendMail(messageObj);

  };

  export default sendEmail;
