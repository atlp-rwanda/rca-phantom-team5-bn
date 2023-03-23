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
        from: 'PHANTOM - 5 <transport.phantom5@gmail.com>',
    },
  );
    const messageObj = {
      to: `${name} <${to}>`,
      subject: `PHANTOM TRANSPORT ${action}`,
      text: `Hello ${name}`,
      html: `<table border='0' cellpadding='0' cellspacing='0' width='100%' style='border-collapse:collapse; padding:0; margin:0px;'>
              <tr valign='top'>
                <td align='center'>
                  <table> <h2 style='color: #50b5ff'> WELCOME TO PHANTOM - 5 </h2> </table>
                  <table> <p> Hello ${name}, Welcome to phantom 5 aplication !!.</p> </table>
                  <table> <p> Thank you for signing up,use this password below to sign in</p> </table>
                  <table> <p> ${url}</p> </table>
                  <table style='color: #ffff'> <div style='background-color: #50b5ff; color: #ffff; border: 0; padding: 5px 20px; text-decoration: none; display: inline-block; font-size: 25px; font-weight: 900;  margin: 20px 00px 20px 00px;'>${pass}</div> </table>
                </td>
              </tr>
            </table>`,
    };

    await transporter.sendMail(messageObj);

  };

  export default sendEmail;
