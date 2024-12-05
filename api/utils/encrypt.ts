import bcrypt from 'bcryptjs';

const encrypt = async (password:string) => {
    const salt = await bcrypt.genSalt(11);
    return await bcrypt.hash(password,salt);
};

export { encrypt };
