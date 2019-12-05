import React,{Component} from 'react'
import styled from 'styled-components'

const Cursor = styled.div`
    position: fixed;
    width: 30px;
    height: 30px;
    top: -50%;
    left: -50%;
    margin: -15px 0 0 -15px;
    border-radius: 50%;
    background-color: white;
    backface-visibility: hidden;
    transition: transform 0.2s ease-out;
    mix-blend-mode: difference;
    z-index: 1000;
    pointer-events: none;

    &.is-moving {
        transform: scale(0.8);
    }

    .content_cursor {
        position:relative;
        height:100%;
    }
		@media (pointer: coarse) {
			display: none;  
		}

`
export default class MovingCursor extends Component {

    constructor(props){
        super(props);
        this.state={
            mouseX : -50,
            mouseY : -50,

        }
    }

    componentDidMount(){
        window.addEventListener('mousemove', e => {
            this.updateCursorPosition(e)
        });

    }

    componentWillUnmount() {
        window.removeEventListener('mousemove', e => {
            this.updateCursorPosition(e)
        });
    }

    updateCursorPosition(event) {
        this.setState({ mouseX: event.clientX, mouseY: event.clientY });
        this.transformCursor();
    }

    transformCursor() {
        document.getElementById('cursor').classList.add('is-moving');

        setTimeout(function() {
            document.getElementById('cursor').classList.remove('is-moving');
        }, 300);


    }

    render(){
        
        return(
            <div>
                <Cursor 
                    style={{left: this.state.mouseX,top: this.state.mouseY}}
                    id='cursor'
                />
            </div>
        )
    }
}