import UserIcon from '../Container/UserIcon.js';


class LoginView {


    render() {
        return /* html */`
            <link rel="stylesheet" href="css/login.css"/>

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
                            
                        <button class="rounded-border" type="submit">Login</button>
                    </div>
                </form>
            </div>
        `;
    }
}

export default LoginView;