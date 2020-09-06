import React from "react";
import FindUsers, {useTypedSelector} from "./FindUsers";
import preloaderGif from '../../assets/Loading-Image-1.gif'
import {getIsFetchingSelector} from "../../redux/users-selectors";

export const FindUsersContainer: React.FC = (props ) => {

    const isFetching = useTypedSelector(getIsFetchingSelector)

        return <>
            {isFetching ? <img src={preloaderGif} alt='somepage' /> : ''}
        <FindUsers />
                          </>

}
