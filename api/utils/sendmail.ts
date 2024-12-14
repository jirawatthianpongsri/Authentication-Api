import nodemailer from 'nodemailer';

//some bug i don't know
const transporter = nodemailer.createTransport({
    service:'gmail',
    secure:true,
    auth: {
        user: process.env.SENDERMAIL as string,
        pass: process.env.PASSWORDMAIL as string,
    }
});

const sendMail = (options:{to:string,subject:string,text:string,html?:string}) => transporter.sendMail({
    from:"Send Mail Service",
    ...options
}).catch(err=>console.error(err));

export  { sendMail };
