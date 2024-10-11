export interface ISuperAdminUpdateUserClientRequest {
    role_id: string;
    sectors: string[];
    is_mentor: string;
    is_alumni: string;
    is_preceptor: string;
    is_student: string;
    open_to_mentoring: string;
    open_to_precepting: string;
}