import moment, { Moment } from "moment-timezone"

export const getCurrentDateAndTime =():Moment=>{
    return moment().utc()
}

export const getCurrentDateandTimeinUnix = () => {
    return moment().utc().unix()
}