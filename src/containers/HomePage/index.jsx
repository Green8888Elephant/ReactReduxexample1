import React, {useEffect} from "react";
import { createSelector } from "reselect";
import {makeSelectUsers} from "./selectors";
import {useDispatch, useSelector} from "react-redux";
import Axios from 'axios';
import {setUsers} from "./actions";
import {UsersList} from "./userList";


const stateSelector = createSelector(makeSelectUsers, (users) => ({
    users,
}));

const actionDispatch =(dispatch) => ({
   setUser: (users) => dispatch(setUsers(users))
});

export function HomePage(props) {
    const { users } = useSelector(stateSelector);
    const  { setUser } = actionDispatch(useDispatch());

    const fetchUsers = async () => {
        const response = await Axios.get("https://reqres.in/api/users").catch(
            (err) => {
                console.log("Error: ", err)
            }
        );

        setUser(response.data.data);
    };

    useEffect(() => {
        fetchUsers();
    }, [])

    console.log("Users: ", users)

    return (
        <div>
            <UsersList />
        </div>
    )
}
