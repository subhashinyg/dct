export const bodyRequiredValidator = (body: any, fields: string[]): object | undefined => {
    let required: string[] = []
    fields.forEach((key) => {
        if ([undefined, '', null].includes(body[key])) {
            required.push(key)
        }
    })
    return required.length ? { "missing": required } : undefined
}

export const objectSanitizer = (obj: object | any) => {
    Object.keys(obj).forEach((key) => [undefined, '', null].includes(obj[key]) && delete obj[key])
    return obj
}

export const validatePassword = (password:string):boolean => {
    var regex = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[A-Z]).{6,}$/;
    return regex.test(password);
}

export const generateCompanyCode = (companyName: string): string=> {
    const prefix = companyName.split(" ")[0].toUpperCase().slice(0, 5); // First 5 characters of the name
    const randomNumber = Math.floor(10000 + Math.random() * 90000); // 5-digit random number
    return `${prefix}-${randomNumber}`;
}

export const PageNumberSanitizer = (page:any):number => {
    return isNaN(Number(page)) ? 1 : Number(page) 
}