export interface ISuperAdminCreateUserClientRequest {
    client_id: string;
    role_id: string;
    user_id: number;
    sectors: string[];
    is_mentor: string;
    is_alumni: string;
    is_preceptor: string;
    is_student: string;
    open_to_mentoring: string;
    open_to_precepting: string;
}