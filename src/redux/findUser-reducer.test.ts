import {
    findUserActions,
    findUsersReducer,
    FOLLOW, FOLLOWING_PROGRESS, followUserThunkCreator, getUsersThunkCreator,
    InitialStateType,
    SET_CURRENT_PAGE, SET_TOTAL_USERS,
    SET_USERS,
    TOGGLE_IS_FETCHING,
    UNFOLLOW, unfollowUserThunkCreator
} from './findUser-reducer';
import {UsersType} from "../Types/Types";
import {usersAPI} from "../API/API";
jest.mock('../API/API')

let users: Array<UsersType>;
beforeEach(() => {
    users = [{name: 'Jack', followed: false, id: 0, photos: {large: null, small: null}, status: 'hey hey 0'},
        {name: 'John', followed: false, id: 1, photos: {large: null, small: null}, status: 'hey hey 1'},
        {name: 'Anna', followed: true, id: 2, photos: {large: null, small: null}, status: 'hey hey 2'},
        {name: 'Haily', followed: true, id: 3, photos: {large: null, small: null}, status: 'hey hey 3'}] as Array<UsersType>
})

describe('Thunk', () => {
    const dispatchMock = jest.fn()
    const getState = jest.fn()
    const thunkMockFunc = usersAPI as jest.Mocked<typeof usersAPI>
    const defaultResult = {
        resultCode: 0,
        messages: [],
        data: {}
    }

    afterEach(() => {
        dispatchMock.mockClear()
        getState.mockClear()
    })

    it('Should return users', async () => {
        let result = {
            items: users,
            totalCount: 120,
            error: ''
        }

        thunkMockFunc.getUsersAPI.mockReturnValue(Promise.resolve(result))

        let thunk = getUsersThunkCreator(3, 5)

        await thunk(dispatchMock, getState, {})

        expect(dispatchMock).toBeCalledTimes(5)

    })

    it('Successful unfollow', async () => {
        thunkMockFunc.unfollowUserAPI.mockReturnValue(Promise.resolve(defaultResult))

        const thunk = unfollowUserThunkCreator(4)

        await thunk(dispatchMock, getState, {})

        expect(dispatchMock).toBeCalledTimes(3)

    })

    it('Successful follow', async () => {

        thunkMockFunc.followUserAPI.mockReturnValue(Promise.resolve(defaultResult))

        const thunk = followUserThunkCreator(5)

        await thunk(dispatchMock, getState, {})

        expect(dispatchMock).toBeCalledTimes(3)
    })
})

describe('Action Creators', () => {
    it('Should return follow object', () => {
        let expectedAction = {
            type: FOLLOW,
            userId: 3
        }
        expect(findUserActions.toFollow(3)).toEqual(expectedAction)
    })

    it('Should return unfollow object', () => {
        let expectedAction = {
            type: UNFOLLOW,
            userId: 3
        }
        expect(findUserActions.toUnfollow(3)).toEqual(expectedAction)
    })

    it('Should return set users object', () => {
        let expectedAction = {
            type: SET_USERS,
            users: users
        }
        expect(findUserActions.setUsers(users)).toEqual(expectedAction)
    })

    it('Should return new current page', () => {
        let expectedAction = {
            type: SET_CURRENT_PAGE,
            pageNumber: 4
        }
        expect(findUserActions.setCurrentPage(4)).toEqual(expectedAction)
    })

    it('Should return falsy fetching', () => {
        let expectedAction = {
            type: TOGGLE_IS_FETCHING,
            fetching: false
        }
        expect(findUserActions.setIsFetching(false)).toEqual(expectedAction)
    })

    it('Should return total users', () => {
        let expectedAction = {
            type: SET_TOTAL_USERS,
            total: 120
        }
        expect(findUserActions.setTotalUsers(120)).toEqual(expectedAction)
    })

    it('following process to user', () => {
        let expectedAction = {
            type: FOLLOWING_PROGRESS,
            process: true,
            userId: 5
        }
        expect(findUserActions.followingProcess(true, 5)).toEqual(expectedAction)
    })
})

describe('FindUser reducer', () => {
    let state: InitialStateType;
    beforeEach(() => {
        state = {
            users: [{
                name: 'Jack', followed: false, id: 0, photos: {large: null, small: null}, status: 'hey hey 0'
            },
                {
                    name: 'John', followed: false, id: 1, photos: {large: null, small: null}, status: 'hey hey 1'
                },
                {
                    name: 'Anna', followed: true, id: 2, photos: {large: null, small: null}, status: 'hey hey 2'
                },
                {
                    name: 'Haily', followed: true, id: 3, photos: {large: null, small: null}, status: 'hey hey 3'
                }] as Array<UsersType>,
            pageSize: 5,
            totalUsersCount: 0,
            currentPage: 1,
            isFetching: true,
            followingInProcess: [] as Array<number>, // array of users id
        }
    })

    it('Follow success', () => {
        expect(findUsersReducer(state, {type: FOLLOW, userId: 1}).users[1].followed).toEqual(true)
    })

    it('Unfollow success', () => {
        expect(findUsersReducer(state, {type: UNFOLLOW, userId: 2}).users[2].followed).toEqual(false)
    })

    it('Should set users', () => {
        expect(findUsersReducer(state, {type: SET_USERS, users: users}).users).toEqual(users)
    })

    it('Should set current page', () => {
        expect(findUsersReducer(state, {type: SET_CURRENT_PAGE, pageNumber: 2}).currentPage).toEqual(2)
    })

    it('Should set fetching to true', () => {
        expect(findUsersReducer(state, {type: TOGGLE_IS_FETCHING, fetching: true}).isFetching).toEqual(true)
    })

    it('Should set total users', () => {
        expect(findUsersReducer(state, {type: SET_TOTAL_USERS, total: 100}).totalUsersCount).toEqual(100)
    })

    it('Should set users to follow or unfollow', () => {
        expect(findUsersReducer(state, {type: FOLLOWING_PROGRESS, userId: 3, process: true}).followingInProcess[0]).toEqual(3)
    })

})