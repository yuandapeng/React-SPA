import React from 'react';
import {connect} from "react-redux";
import { Link } from 'react-router-dom'


@connect(({global})=>({global}))
export  default class App extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div style={{ width: 400, margin: '100px auto' }}>
                <Link to={"/"}>首页</Link>
            </div>
        );
    }
}




