import React, { Component } from 'react'
import NotFoundImg from './404.png'
import style from './style.css'
import animationStyle from './animate.css'

export default class NotFound extends Component {
    constructor(props) {
        super(props)
        this.state = {
            animationType: 'swing'
        }
        this.enter = this.enter.bind(this)
    }

    enter(){
        this.setState({
            animationType:'hinge'
        });

        setTimeout( ()=> {
            this.setState({
                animationType:'lightSpeedIn'
            })
        },5000)
    }

    render(){
        return(
            <div className={style.nf_container}>
                <img src={NotFoundImg} className={`${animationStyle.animated} ${animationStyle[this.state.animationType]}`} onMouseEnter={this.enter} alt=''/>
            </div>
        )
    }
}
