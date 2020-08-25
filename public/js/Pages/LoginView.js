import UserIcon from '../Container/UserIcon.js';
import { el } from '../Core/helpers.js';


class LoginView {

    eventHandler() {
        
        el('#submitLogin').addEventListener('click', e => {
            location.hash = '!orders/history';
        });
    }

    render() {
        return /* html */`

            <div class="login">

                <h2 class="login__title">Sign In</h2>
                
                <form action="#" method="post">
                    <div class="imgcontainer">
                        <span class="avatar">
                         ${UserIcon(128, 128)}
                        </span>
                    </div>
                
                    <div>
                        <label for="uname">
                            <input class="rounded-border" type="text" placeholder="Enter Username" name="uname" required>
                        </label>
                        
                        <label for="psw">
                            <input class="rounded-border" type="password" placeholder="Enter Password" name="password" required>
                        </label>
                            
                        <button class="rounded-border" id="submitLogin" type="submit">Login</button>
                    </div>
                </form>
            </div>
        `;
    }
}

export default LoginView;