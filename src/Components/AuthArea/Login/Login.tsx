import { useForm } from "react-hook-form";
import "./Login.css";
import CredentailsModel from "../../../Models/CredentailsModel";
import authService from "../../../Services/AuthService";
import notificationService from "../../../Services/NotificationService";

interface LoginFormData extends CredentailsModel {
    role: 'customer' | 'company' | 'admin';
}

function Login(): JSX.Element {

    const {register, handleSubmit} = useForm<LoginFormData>();
    
    async function send(credentials: LoginFormData) {
        try {
            await authService.login(credentials);
            notificationService.success(`Logged in as ${credentials.role}, it's good to have you again`);
        } catch (err) {
            if (err instanceof Error) {
                notificationService.error(err.message);
            } else {
                console.error(err);
            }
        }
    }

    return (
        <div className="Login Box">
            <form onSubmit={handleSubmit(send)}>
            <h3>welcome to our coupons site, please login</h3>

            <p>username:</p>
            <input type="text" {...register("username")} />

            <p>password: </p>
            <input type="password" {...register("password")}/>

            <p>role: </p>
            <select {...register("role")}>
                <option value="customer">Customer</option>
                <option value="company">Company</option>
                <option value="admin">Admin</option>
            </select>

            <button>Login</button>

            </form>
        </div>
    );
}

export default Login;
