export const status_code: { [key: number]: string } = {
    400: "Bad request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not found",
    405: "Method not allowed",
    409: "Conflict request",
    500: "Internal server error"
}

const error_code = {
    auth:'100',
    user:'101',
    company:'102',
    event:'103',
    messenger:'104'
}

export const error_message = {

    company_already_exist:{
        message:"Company already exists",
        code:`${error_code?.user}_400`
    },
    user_already_exist:{
        message:"User already exist",
        code:`${error_code?.user}_400`
    },
    user_not_found:{
        message:"user not found",
        code:`${error_code?.user}_404`
    },
    user_disabled:{
        message:"your account is disabled. Please contact admin",
        code:`${error_code?.user}_403`
    },
    password_incorrect:{
        message:"Wrong password",
        code:`${error_code?.auth}_400`
    },
    not_found:{
        message:"not found",
        code:`${error_code?.user}_404`
    },
    start_date_must_be_earlier_than_end_date:{
        message:"Start date must be earlier than end date",
        code:`${error_code?.user}_400`
    },
    invalid_end_date:{
        message:"invalid end date",
        code:`${error_code?.user}_400`
    },
    invalid_otp_type:{
        message:"otp type is invalid",
        code:`${error_code?.auth}_400`
    },
    invalid_payment_type:{
        message:"invalid payment type",
        code:`${error_code?.event}_400`
    },
    invalid_otp:{
        message:"invalid otp",
        code:`${error_code?.auth}_400`
    },
    password_mismatch:{
        message:"password mismatch",
        code:`${error_code?.auth}_400`
    },
    incorrect_old_password:{
        message:"incorrect old password",
        code:`${error_code?.auth}_400`
    },
    end_date_can_not_be_earlier_than_start_date:{
        message:"end date cannot be earlier than start date",
        code:`${error_code?.event}_400`
    },
    company_not_found:{
        message:"company not found",
        code:`${error_code?.company}_401`
    },
    project_not_found:{
        message:"project  not found",
        code:`${error_code?.event}_401`
    },
    event_owner_not_in_company:{
        message:"event owner not in company",
        code:`${error_code?.event}_401`
    },
    required_fields:{
        message:"required fields",
        code:`${error_code?.messenger}_400`
    },
    blank_message_err:{
        message:"blank",
        code:`${error_code?.messenger}_400`
    },
    no_member:{
        message:"no member",
        code:`${error_code?.messenger}_400`
    },
    event_not_found:{
        message:"event not found",
        code:`${error_code?.event}_401`
    },
    not_a_valid_invitation:{
        message:" not a valid invitation",
        code:`${error_code?.event}_401`
    },
    user_not_in_company:{
        message:"user not in company",
        code:`${error_code?.event}_401`
    },
    event_does_not_belongs_to_users_company:{
        message:"event does not belongs to users company",
        code:`${error_code?.event}_401`
    },
    invalid_status:{
        message:"invalid status",
        code:`${error_code?.event}_401`
    },
    invalid_start_date:{
        message:"invalid start date",
        code:`${error_code?.event}_401`
    },
    expense_not_found:{
        message:"expense not found",
        code:`${error_code?.auth}_401`
    },
    invalid_expense_type:{
        message:"invalid expense type",
        code:`${error_code?.auth}_401`
    },
    invalid_file_type:{
        message:"invalid file type",
        code:`${error_code?.auth}_401`
    },
    user_already_registered:{
        message:"user already registered",
        code:`${error_code?.auth}_401`
    },
    category_not_found:{
        message:"category not found",
        code:`${error_code?.event}_401`
    },
    You_do_not_have_permission_to_disable_this_event:{
        message:"You do not have permission to disable this event.",
        code:`${error_code?.event}_401`
    },
    only_admin_can_disable_the_company:{
        message:"Only admins can enable or disable a company.",
        code:`${error_code?.company}_401`
    },
    data_not_found:{
        message:"Data not added",
        code:`${error_code?.auth}_401`
    },
    you_have_already_handle_the_event:{
        message:"You have already handle this event.",
        code:`${error_code?.event}_401`
    },
    you_have_already_reject_the_event:{
        message:"You have already rejected this event.",
        code:`${error_code?.event}_401`
    },
    invalid_staff_category:{
        message:"Invalid staff category",
        code:`${error_code?.event}_401`
    },
    staff_limit_exceeded:{
        message:"staff limit exceeded",
        code:`${error_code?.event}_401`
    },
    invalid_invite_status:{
        message:"invalid invite status",
        code:`${error_code?.event}_401`
    },
    invalid_date:{
        message:"invalid date",
        code:`${error_code?.event}_401`
    },
    you_are_not_in_the_event:{
        message:"you are not in the event",
        code:`${error_code?.event}_401`
    },
    user_already_have_schedule_on_same_date:{
        message:"user already have schedule on the same date",
        code:`${error_code?.event}_400`
    },
    invitation_already_exist:{
        message:"invitation already exist",
        code:`${error_code?.auth}_400`
    },
    you_are_not_allowed_to_review_the_user:{
        message:"you are not allowed to review the user",
        code:`${error_code?.auth}_400`
    },
    Chat_room_not_found:{
        message:"chat rook not found",
        code:`${error_code?.auth}_400`
    },
    phone_number_already_exist:{
         message:"phone number already exists",
        code:`${error_code?.auth}_400`
    },
    work_type_not_found:{
        message:"work type not found",
        code:`${error_code?.auth}_400`
    },
    can_not_be_disable_company_with_upcomming_events:{
        message:"can not be disable company with upcomming events",
        code:`${error_code?.event}_404`
    },
    company_already_disabled:{
        message:"company already disable",
        code:`${error_code?.event}_404`
    },
    you_are_not_in_the_company:{
        message:"you are not in the company",
        code:`${error_code?.event}_404`
    },
    already_accepted_category:{
        message:"already accepted the category",
        code:`${error_code?.event}_404`
    },
    user_not_in_accepted_staffs:{
        message:"user not in accepted staffs list",
        code:`${error_code?.event}_404`
    },
    you_have_not_accepted_this_staff_category:{
        message:"you have not in the ccepted staff list category",
        code:`${error_code?.event}_404`
    },
    feedback_already_exists:{
        message:"feedback is already exists",
        code:`${error_code?.event}_404`
    },
    future_events_can_not_be_deleted:{
        message:"future events can not be deleted",
        code:`${error_code?.event}_404`
    },
    can_not_be_update_staff_category:{
        message:"can not be edit the staff category",
        code:`${error_code?.event}_404`
    },
    you_are_not_allowed_to_remove_the_user:{
        message:"you are not allowd to remove the user",
        code:`${error_code?.event}_404`
    },
    task_detail_not_found:{
        message:"task detail not found",
        code:`${error_code?.event}_404`
    }
}