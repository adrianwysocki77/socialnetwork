import React, { useState, useEffect } from "react";
import axios from "./axios";

export default function Users() {
    // const [greetee, setGreetee] = useState("World");
    const [users, setUsers] = useState([]);
    const [user, setUser] = useState("");
    const [lastUsers, setLastUsers] = useState(true);
    const [userId, setUserId] = useState("");

    useEffect(() => {
        let ignore = false;
        (async () => {
            try {
                console.log("async in users!!! before axios", user);
                if (user !== "") {
                    const { data } = await axios.get(
                        "/users/" + user + ".json"
                    );

                    console.log("Data in axios: ", data);
                    if (!ignore) {
                        setUsers(data);
                        setLastUsers(false);
                    }
                } else {
                    setUsers([]);
                    const { data } = await axios.get("/users/newest.json");
                    console.log("newest users coming!!!: ", data);
                    setUsers(data);
                    setLastUsers(true);
                }
            } catch (e) {
                console.log(e);
            }
        })();
        return () => {
            ignore = true;
        };
    }, [user]);

    const showProfile = a => {
        console.log("target: ", a);
        location.replace("/user/" + a);
    };

    const onCountryChange = ({ target }) => {
        setUser(target.value);
    };

    // console.log("users: ", countries);
    return (
        <div className="usersmaincontainer">
            <input
                onChange={onCountryChange}
                type="text"
                placeholder="Search for people"
                className="usersinput"
            />
            <div className="lastadded">
                {lastUsers && <>Last registered users:</>}
            </div>
            <div className="userscontainer">
                {users.map((user, index) => {
                    return (
                        <>
                            <div
                                key={index}
                                className="usersmallbox"
                                onClick={() => showProfile(user.id)}
                            >
                                {user.picture_url && (
                                    <>
                                        <img
                                            src={user.picture_url}
                                            className="userpicture"
                                        />
                                    </>
                                )}
                                {!user.picture_url && (
                                    <>
                                        <img
                                            src="./default.jpg"
                                            className="userpicture"
                                        />
                                    </>
                                )}
                                <div className="usersfirstlast">
                                    {user.first} {user.last}
                                </div>
                            </div>
                        </>
                    );
                })}
            </div>
        </div>
    );
}
