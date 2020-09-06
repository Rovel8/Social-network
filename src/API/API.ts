import axios from "axios";
import {LoginType} from "../redux/auth-reducer";
import {ProfilePhotosType, ProfileType} from "../Types/Types";
import {FormDataOmitType} from "../parts/Body/Info/ProfileProperties";

let instance = axios.create({
    withCredentials: true,
    headers: {'API-KEY': 'b38801d2-943e-4645-baf5-602d275331dd'},
    baseURL: 'https://social-network.samuraijs.com/api/1.0/'
})

type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    data: D
}

type AuthMeType = {
    id: number
    email: string | null
    login: string | null
}

export const authAPI = {
    authMe: () => {
        return instance.get<ResponseType<AuthMeType>>('auth/me').then(response => response.data)
    }
}

export type ItemsType = {
    name: string
    id: number
    photos: ProfilePhotosType
    status: string | null
    followed: boolean
}

type GetUsersType = {
    "items": Array<ItemsType>
    "totalCount": number
    "error": string | null
}

export const usersAPI = {
    getUsersAPI: (currentPage: number, pageSize: number, term: string, friend: boolean | null) => {
        return instance.get<GetUsersType>(`users?page=${currentPage}&count=${pageSize}&term=${term}` + (friend !== null ? `&friend=${friend}` : '')).then(response => response.data)
    },
    getUserProfileAPI: (userId: number | null) => {
        return instance.get<ProfileType>(`profile/${userId}`).then(response => response.data);
    },
    getUserStatusAPI: (userId: number | null) => {
        return instance.get<string>(`profile/status/${userId}`).then(response => response.data)
    },
    changeUserStatusAPI: (status: string) => {
        return instance.put<ResponseType>(`profile/status/`, {status: status}).then(response => response.data)
    },
    followUserAPI: (id: number) => {
        return instance.post<ResponseType>('follow/' + id, null).then(response => response.data)
    },
    unfollowUserAPI: (id: number) => {
        return instance.delete<ResponseType>('follow/' + id).then(response => response.data)
    },
    setPhotoAPI: (photo: File) => {
        let formData = new FormData();
        formData.append('image', photo)
        return instance.put<ResponseType<SetPhotoType>>('profile/photo', formData, {headers: {'Content-Type': 'multipart/form-data'}}).then(response => response.data)
    },
    setUserDataAPI: (data: FormDataOmitType) => {
        return instance.put<ResponseType>('profile/', data).then(response => response.data)
    }
}

type LoginUserType = {
    userId: number
}

export const loginAPI = {
    loginUserAPI: ({email, password, rememberMe, captcha}: LoginType) => {
        return instance.post<ResponseType<LoginUserType>>('auth/login', {
            email,
            password,
            rememberMe,
            captcha
        }).then(response => response.data)
    },
    logoutUserAPI: () => {
        return instance.delete<ResponseType>('auth/login').then(response => response.data)
    },
}

type SetPhotoType = {
    photos: {
        small: string
        large: string
    }
}

export type GetCaptchaType = {
    url: string | null
}

export const captchaAPI = {
    getCaptchaAPI: () => {
        return instance.get<GetCaptchaType>('/security/get-captcha-url').then(response => response.data)
    }
}