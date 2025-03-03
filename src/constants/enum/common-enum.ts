export enum ERole {
  ADMIN = "admin",
  COMPANY_ADMIN = "company_admin",
  MANAGER = "manager",
  STAFF = "staff"
}

export enum EContactedAt {
  ANY_TIME = "any_time",
  NineToNine = 'nine_to_nine',
  OTHER_TIME = "other_time"
}

export enum EWorkType {
  SEASONAL_FULL_TIME = "seasonal_full_time",
  SEASONAL_PART_TIME = "seasonal_part_time"
}


export enum EPaymentType {
  HOURLY = "HOURLY",
  EVENT = "EVENT",
  DAILY = "DAILY"
}

export enum ENotificationStatus {
  SENT = "SENT",
  DELIVERED = "DELIVERED",
  READ = "READ"
}

export enum EMessageStatus {
  SENT = "SENT",
  DELIVERED = "DELIVERED",
  READ = "READ"
}

export enum EChatRoomType {
  USERANDMANAGER = "user_manager",
  USERANDCOMPANYADMIN = "user_company"
}

export enum NotificationType {
  MESSENGER = "messenger",
}

export enum SocketIOEvent {
  CONNECTION = 'connection',
  DISCONNECT = 'disconnect',
  MESSAGE = 'message'
}

export enum PushNotificationTypes {
  JOB_ACCEPTED = "job_accepted",
  CHATNOTIFICATION = "chat_notification",
}
export enum CollectionCounter {
  FILEUPLOAD = "file_upload",
  COMPANY_CODE = 'company_code'
}

export const CollectionCounterPrefix = {
  [CollectionCounter.COMPANY_CODE]: ""
}
export enum ELogType {
  DELETE_USER = 'delete_user',
  DELETE_MANAGER = 'delete manager',
  DELETE_EVENT = 'delete event',
  DELETE_COMPANY_ADMIN = 'delete company admin',
  DETELE_COMPANY = 'delete company'
}


export enum EventUserResponse {
  INVITED = 'invited',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected'
}

export enum EExpense {
  REQUESTED = 'requested',
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected'
}

export enum EExpenseType {
  PARKING = 'parking',
  EQUIPMENTS = 'equipments',
  TRAVEL = 'travel'
}

export enum ES3uploadType {
  PROFILEPIC = "profile_pic",
  ICONS = "icons",
  IMAGES = "images"
}
export enum EEventFiterType {
  PAST = "past",
  FUTURE = "future",
  ALL = "all"
}

export enum ELinkType {
  FACEBOOK = 'facebook',
  WATSAPP = 'watsapp',
  LINKEDIN = 'linkedin',
  EMAIL = 'email'
}

export enum EInviteStaff {
  ALL_STAFF = 'all_staff',
  STAFF_WITHIN_RANGE = 'staff_within_range',
  SPECIFIC_STAFF = 'specific_staff'
}

export enum ERegistartionType {
  COMPANY_INVITE = 'company_invite',
  NORMAL = 'normal'
}

export enum ENotification {
  BEFORE_72_HRS = 'before_72_hrs',
  BEFORE_24_HRS = 'before_24_hrs',
  BLAST_STAFF = 'blast_staff'
}

export enum EFeedback {
  STAFF_BASED = 'staff_based'
}
