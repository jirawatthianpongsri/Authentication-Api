const capitalizeFirstLetter = (string:string):string => {
    const [first, ...rest] = string;
    return first.toUpperCase()+rest.join("");
};

const fullName = (fname:string,lname:string,mname?:string) => {
    return `${capitalizeFirstLetter(fname)} ${capitalizeFirstLetter(mname || "")} ${capitalizeFirstLetter(lname)}`
};

export { capitalizeFirstLetter , fullName };
