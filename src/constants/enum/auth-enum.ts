export enum ERole {
    ADMIN = "admin",
    USER = "user"
}

export enum EAvailability {
    SUNDAY = 'sunday',
    MONDAY = 'monday',
    TUESDAY = 'tuesday',
    WEDNESDAY = 'wednesday',
    THURSDAY = 'thursday',
    FRIDAY = 'friday',
    SATURDAY = 'saturday'

}

export enum EUserStatus {
    INVITED = 'invited',
    ACCEPTED = 'accepted',
    REJECTED = 'rejected'
}

export enum EOTPType {
    FORGET_PASSWORD = "forget_password",
    EMAIL_CHANGE = "email_change",
    COMPANY_INVITATION = 'company_invitation'
}

export enum EOTPIdentifier {
    EMAIL = 'email',
    PHONE = 'phone'
}

export enum IUserStatus {
    ENABLE = 'enable',
    DISABLE = 'disable'
}

export enum EEventStatus {
    INVITED = 'invited',
    ACCEPTED = 'accepted',
    REJECTED = 'rejected'
}