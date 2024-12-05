import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth: {
        user: process.env.SENDERMAIL,
        pass: process.env.PASSWORDMAIL
    }
});

const sendMail = (options:{to:string,subject:string,text:string,html?:string}) => transporter.sendMail({
    from:"Send Mail Service",
    ...options
});

export  { sendMail };
