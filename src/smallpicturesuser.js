import React from "react";
import axios from "./axios";
import { BrowserRouter, Route } from "react-router-dom";
import PicturesUser from "./picturesuser";

export default class SmallPicturesUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pictures: []
        };
    }

    componentDidMount() {
        console.log(
            "**********************componentDidMount() in smallpicturesuser"
        );
        console.log("this.props.id: ", this.props.id);

        axios
            .get("/allpicturesuser/" + this.props.id)
            .then(
                ({ data }) => {
                    console.log(
                        "************AXIOS IN componentDidMount GET/allpictursesuser in smallpicturesuser"
                    );
                    console.log("data.length:", data.length);

                    if (data.length == 0) {
                        this.setState({
                            nopictures: true
                        });
                    } else if (data.length > 0) {
                        // let newState = { ...this.state };
                        this.setState({
                            pictures: data.slice(0, 4)
                        });
                    }

                    // console.log("data.first:", data.first);
                    // console.log("data.last:", data.last);
                    // console.log("data.id:", data.bio);                    }
                    // console.log("data.id:", data.id);
                    // console.log("result in axios: ", data);
                } //wsadzam odp do state
            )
            .catch("err in axios GET/smallpicturesuser in smallpicturesuser");
    }

    render() {
        // console.log("this.state:", this.state.first);
        return (
            <React.Fragment>
                <div className="smallpicturescontainer">
                    {this.state.nopictures && (
                        <div className="nopictures">NO PICTURES IN ALBUM</div>
                    )}

                    {this.state.pictures.map((picture, index) => (
                        <img
                            key={index}
                            src={picture.picture}
                            className="smallpicture"
                        />
                    ))}
                    <div className="firstlastunderheader">Pictures</div>

                    <div className="bio">
                        <div className="biocontainer">
                            <div className="flexfullcolumn">
                                <div className="addbio">
                                    <div>
                                        <img
                                            src="/album.svg"
                                            className="biography"
                                        />
                                        <a
                                            href="#"
                                            className="edit"
                                            onClick={() =>
                                                location.replace(
                                                    "/picturesuser/" +
                                                        this.props.id
                                                )
                                            }
                                        >
                                            All Pictures
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
