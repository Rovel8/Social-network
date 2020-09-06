import React from "react";
import {Formik, Field, Form, FormikHelpers} from "formik";
import {getUsersThunkCreator} from "../../../redux/findUser-reducer";
import {useDispatch} from "react-redux";

type PropsType = {
    currentPage: number
    pageSize: number
    isFetching: boolean
}

const SearchForm: React.FC<PropsType> = (props) => {

    const dispatch = useDispatch()

    const initialValues = {
        term: '',
        friend: ''
    }

    type initialValuesType = typeof initialValues

    const onSubmit = (values: initialValuesType, onSubmitProps: FormikHelpers<initialValuesType>) => {
        const friends = values.friend === 'true' ? true : values.friend === 'false' ? false : null
        dispatch(getUsersThunkCreator(1, props.pageSize, values.term, friends))
    }

    return (
        <div>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                {formik => {
                    console.log(formik)
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