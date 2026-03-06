export const API = {
    AUTH: {
        LOGIN: '/api/auth/login',
        REGISTER: '/api/auth/register',
        UPDATEPROFILE: '/api/auth/update',
        REQUEST_PASSWORD_RESET: '/api/auth/request-password-reset',
        RESET_PASSWORD: (token: string) => `/api/auth/reset-password/${token}`,
    },
    ADMIN:{
        USER:{
            CREATE: '/api/admin/users/',
            GETALL: "/api/admin",
            GET_ONE: (userId: string) => `/api/admin/${userId}`,
            UPDATE: (email: string) => `/api/admin/${email}`,
            DELETE: (userId: string) => `/api/admin/${userId}`,
        },BANQUETS:{
            GETALL: "/api/admin/banquets",
            DELETE: (id: string) => `/api/admin/banquets/${id}`}
    }
}