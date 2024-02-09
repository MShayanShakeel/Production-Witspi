import { useState } from "react"
import styles from "./index.module.css"

const Signup = () => {
    const [isLoginForm, setIsLoginForm] = useState(false)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmpassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { name, email, password, confirmpassword } = formData;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    }

    return (
        <div className={styles.body}>
            <div className={styles.container}>

                <div className={styles.content_wrapper} style={{
                    right: isLoginForm ? 0 : "calc(100% - 450px)"
                }} />

                <div className={styles.content} style={{
                    left: !isLoginForm ? 0 : "-220px",
                    scale: !isLoginForm ? 1 : .5,
                    transformOrigin: "right center",
                    opacity: !isLoginForm ? 1 : 0,
                    pointerEvents: !isLoginForm ? "initial" : "none",
                }}>
                    <h2>Logo</h2>
                    <h2>Hello There!</h2>
                    <h3>Signup to Watspi And Random Text.</h3>
                    <div className={styles.content_bottom}>
                        <p>Already have an account?</p>
                        <button className={styles.btn} onClick={() => setIsLoginForm(true)}>Sign In</button>
                    </div>
                </div>

                <form className={`${styles.login_form} ${styles.form}`} style={{
                    left: isLoginForm ? 0 : "-220px",
                    scale: isLoginForm ? 1 : .5,
                    transformOrigin: "right center",
                    opacity: isLoginForm ? 1 : 0,
                    pointerEvents: isLoginForm ? "all" : "none"
                }}>
                    <div>
                        <h2>Sign in to your Watspi Account!</h2>
                        <input type="email" id="email_login" placeholder="Enter your email" />
                        <input type="password" id="password_login" placeholder="Enter your password" />
                        <div className={styles.form_links}>
                            <a href="/">Forgot password?</a>
                            <div className={styles.check_field}>
                                <input type="checkbox" id="remember_login" />
                                <label htmlFor="remember_login">Remember Me</label>
                            </div>
                        </div>
                        <button className={styles.btn}>Sign In</button>
                    </div>
                </form>

                <form className={`${styles.signup_form} ${styles.form}`} style={{
                    right: !isLoginForm ? 0 : "-220px",
                    scale: !isLoginForm ? 1 : .5,
                    transformOrigin: "right center",
                    opacity: !isLoginForm ? 1 : 0,
                    pointerEvents: !isLoginForm ? "initial" : "none",
                }}>
                    <div>
                        <h2>Create A Watspi Account!</h2>
                        <div className={styles.input_container}>
                            <input type="email" id="name_signup" placeholder="Enter your full name" />
                        </div>
                        <div className={styles.input_container}>
                            <input type="email" id="email_signup" placeholder="Enter your email" />
                        </div>
                        <div className={styles.input_container}>
                            <input type="password" id="password_signup" placeholder="Enter your password" />
                        </div>
                        <div className={styles.input_container}>
                            <input type="password" id="confirm_password_signup" placeholder="Re-enter your password" />
                        </div>
                        <button className={styles.btn}>Sign Up</button>
                    </div>
                </form>

                <div className={styles.content} style={{
                    right: isLoginForm ? 0 : "-220px",
                    scale: isLoginForm ? 1 : .5,
                    transformOrigin: "right center",
                    opacity: isLoginForm ? 1 : 0,
                    pointerEvents: isLoginForm ? "all" : "none"
                }}>
                    <h2>Logo</h2>
                    <h2>WELCOME!</h2>
                    <h3>Enter your details to continue.</h3>
                    <div className={styles.content_bottom}>
                        <p>Don't have an account?</p>
                        <button className={styles.btn} onClick={() => setIsLoginForm(false)}>Sign Up</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Signup