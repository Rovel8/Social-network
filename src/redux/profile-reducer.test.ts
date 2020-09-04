import {PostsType, ProfileType} from "../Types/Types";
import {
    ADD_POST, changeUserStatusThunkCreator,
    GET_USER_STATUS, getUserStatusThunkCreator,
    InitialStateType, profileActions,
    profileReducer, saveProfileImage, SET_USER_DATA,
    SET_USER_IMAGE,
    SET_USER_PROFILE, setOwnUserProfileThunkCreator, submitUserDataThunkCreator
} from "./profile-reducer";
import {usersAPI} from "../API/API";
jest.mock('../API/API')

const profile = {
    userId: 4,
    lookingForAJob: true,
    lookingForAJobDescription: 'some job',
    fullName: 'Aleks',
    aboutMe: 'Funny',
    contacts: {
        github: 'http://www.example.com',
        vk: 'http://www.example.com',
        facebook: 'http://www.example.com',
        instagram: 'http://www.example.com',
        twitter: 'http://www.example.com',
        website: 'http://www.example.com',
        youtube: 'http://www.example.com',
        mainLink: 'http://www.example.com',
    },
    photos: {
        small: null,
        large: null
    }
}

describe('Profile thunks', () => {
    const dispatchMocked = jest.fn()
    const getStateMocked = jest.fn()
    const thunkMockFunc = usersAPI as jest.Mocked<typeof usersAPI>

    afterEach(() => {
        dispatchMocked.mockClear()
        getStateMocked.mockClear()
    })

    it('set user profile at the start', async () => {

        thunkMockFunc.getUserProfileAPI.mockReturnValue(Promise.resolve(profile))

        const thunk = setOwnUserProfileThunkCreator(4)

        await thunk(dispatchMocked, getStateMocked, {})

        expect(dispatchMocked).toBeCalledTimes(1)
    })

    it('get status from the server', async () => {
        const result = 'some status'

        thunkMockFunc.getUserStatusAPI.mockReturnValue(Promise.resolve(result))

        const thunk = getUserStatusThunkCreator(4)

        await thunk(dispatchMocked, getStateMocked, {})

        expect(dispatchMocked).toBeCalledTimes(1)
    })

    it('set new status to profile', async () => {
        const result = {
            resultCode: 0,
            messages: [],
            data: {}
        }

        thunkMockFunc.changeUserStatusAPI.mockReturnValue(Promise.resolve(result))

        const thunk = changeUserStatusThunkCreator('some status')

        await thunk(dispatchMocked, getStateMocked, {})

        expect(dispatchMocked).toBeCalledTimes(1)
    })

    it('should set profile image', async () => {

        const result = {
            resultCode: 0,
            messages: [],
            data: {
                photos: {
                    small: 'some file',
                    large: 'some file'
                }
            }
        }

        thunkMockFunc.setPhotoAPI.mockReturnValue(Promise.resolve(result))

        const thunk = saveProfileImage('some file')

        await thunk(dispatchMocked, getStateMocked, {})

        expect(dispatchMocked).toBeCalledTimes(1)
    })

    it('should set submitted data', async () => {
        const result = {
            resultCode: 0,
            messages: [],
            data: {}
        }
        thunkMockFunc.setUserDataAPI.mockReturnValue(Promise.resolve(result))

        const thunk = submitUserDataThunkCreator(profile, 3)

        await thunk(dispatchMocked, getStateMocked, {})

        expect(dispatchMocked).toBeCalledTimes(1)
    })
})

describe('Profile action creators', () => {
    it('should create an action to add a post', () => {
        const expectedAction = {
            type: ADD_POST,
            newPostText: 'hello'
        }
        expect(profileActions.addPostActionCreator('hello')).toEqual(expectedAction)
    })

    it('should create an action to set or get status', () => {
        const expectedAction = {
            type: GET_USER_STATUS,
            status: 'some status'
        }
        expect(profileActions.getUserStatus('some status')).toEqual(expectedAction)
    })

    it('should create an action to set user data', () => {
        const expectedAction = {
            type: SET_USER_DATA,
            data: profile
        }
        expect(profileActions.setUserDataActionCreator(profile)).toEqual(expectedAction)
    })

    it('should create an action to set user profile', () => {
        const expectedAction = {
            type: SET_USER_PROFILE,
            profile: profile
        }
        expect(profileActions.setUserProfile(profile)).toEqual(expectedAction)
    })

    it('should create an action to set user profile image', () => {
        const photos = {
            small: 'some url for photo',
            large: 'some url for photo'
        }
        const expectedAction = {
            type: SET_USER_IMAGE,
            payload: photos
        }
        expect(profileActions.setUserProfileImage(photos)).toEqual(expectedAction)
    })
})

describe('Profile reducer', () => {
    let state: InitialStateType;
    beforeEach(() => {
        state = {
            posts: [
                {id: 1, message: "Hello guys!", name: "Pasha", age: "22", likeCounts: "15"},
                {id: 2, message: "This is my first post", name: "Sasha", age: "13", likeCounts: "20"},
            ] as Array<PostsType>,
            profile: null as ProfileType | null,
            status: '' as string,
            newPostText: ''
        }
    })
    it('Should add new post', () => {
        expect(profileReducer(state, {type: ADD_POST, newPostText: 'hello world'}).posts.length).toEqual(3)
    })

    it('Should set user profile', () => {

        expect(profileReducer(state, {type: SET_USER_PROFILE, profile}).profile).toEqual(profile)
    })

    it('Set user status', () => {
        expect(profileReducer(state, {type: GET_USER_STATUS, status: 'status'}).status).toEqual('status')
    })

    it('Set user profile image', () => {
        const payload = {
            small: 'img url',
            large: 'img url'
        }
        expect(profileReducer(state, {type: SET_USER_IMAGE, payload}).profile?.photos).toEqual(payload)
    })

    it('Set user data', () => {
        expect(profileReducer(state, {type: SET_USER_DATA, data: profile}).profile).toEqual(profile)
    })
})