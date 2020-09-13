import React from "react";
import {Formik, Field, Form, FormikHelpers} from "formik";
import {getUsersThunkCreator} from "../../../redux/findUser-reducer";
import {useDispatch} from "react-redux";
import {useTypedSelector} from "../FindUsers";
import {getFriendSelector, getTermSelector} from "../../../redux/users-selectors";

type PropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
}

const SearchForm: React.FC<PropsType> = (props) => {

    const dispatch = useDispatch()

    const term = useTypedSelector(getTermSelector)
    const isFriend = useTypedSelector(getFriendSelector)

    debugger

    const initialValues = {
        term: term,
        friend: String(isFriend)
    }

    type initialValuesType = typeof initialValues

    const onSubmit = (values: initialValuesType, onSubmitProps: FormikHelpers<initialValuesType>) => {
        const friends = values.friend === 'true' ? true : values.friend === 'false' ? false : null
        dispatch(getUsersThunkCreator(1, props.pageSize, values.term, friends))
    }

    return (
        <div>
            <Formik enableReinitialize={true} initialValues={initialValues} onSubmit={onSubmit}>

                {formik => {
                    return (
                        <Form>
                            <Field name={'term'} id={'term'} placeholder={'search'} />
                            <Field as={'select'} type={'text'} name={'friend'} id={'friend'}>
                                <option value="null">All</option>
                                <option value="true">Followed</option>
                                <option value="false">Unfollowed</option>
                            </Field>
                            <button type={'submit'} disabled={props.isFetching}>Find</button>
                        </Form>
                    );
                }}
            </Formik>
        </div>
    );
}

export default SearchForm