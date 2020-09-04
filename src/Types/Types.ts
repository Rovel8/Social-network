export type PostsType = {
    id: number
    message: string | null
    name: string
    age: string
    likeCounts: string | null
}

export type ProfileContactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export type ProfileContactsKeyType = {
    [github: string]: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}

export type ProfilePhotosType = {
    small: string | null
    large: string | null
}

export type ProfileDataType = {
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    aboutMe: string
    contacts: ProfileContactsType
}

export type ProfileType = {
    userId: number
    lookingForAJob: boolean
    lookingForAJobDescription: string
    fullName: string
    aboutMe: string
    contacts: ProfileContactsKeyType
    photos: ProfilePhotosType
}

export type UsersType = {
    name: string
    id: number,
    photos: ProfilePhotosType
    status: string | null,
    followed: boolean
}