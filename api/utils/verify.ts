import crypto from 'crypto';

export const generateVerifyCode = (length:number = 6) => {
    if(length <=0) throw new Error("Length must be greater than 0");

    const randomBytes = crypto.randomBytes(Math.ceil(length/2));

    let code = randomBytes.toString('hex').slice(0, length);

    if(code.length > length) code = code.slice(0, length);
    return code;
};
