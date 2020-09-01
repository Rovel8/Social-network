import React from 'react';
import Post from "./Post/Post";
import {Formik, Form, Field, FormikHelpers} from 'formik';
import {InitialStateType} from "../../../redux/profile-reducer";

type PostsPropsType = {
    profilePage: InitialStateType
    addPostActionCreator: (value: string) => void
}

const Posts: React.FC<PostsPropsType> = (props) => {
    let postsElement = props.profilePage.posts.map(p => (<Post key={p.id} id={p.id} name={p.name} age={p.age} message={p.message} likeCounts={p.likeCounts}/>))

    return (
        <div>
            <NewPostForm addPostActionCreator={props.addPostActionCreator} />
            {postsElement}
        </div>
    );
}

type NewPostFormType = {
    addPostActionCreator: (value: string) => void

}

const NewPostForm: React.FC<NewPostFormType> = (props) => {
    type InitialValuesType = {
        newPostText: string
    }

    let initialValues = {newPostText: ''};

    let onSubmit = (values: InitialValuesType, toSubmitEvents: FormikHelpers<InitialValuesType>) => {
        props.addPostActionCreator(values.newPostText)
        toSubmitEvents.resetForm()
    }

    return (
        <div>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                <Form>
                    <Field as={'textarea'} placeholder={'tape new post text'} name={'newPostText'} id={'newPostText'} />
                    <button>Add comment</button>
                </Form>
            </Formik>
        </div>
    );
}

export default Posts