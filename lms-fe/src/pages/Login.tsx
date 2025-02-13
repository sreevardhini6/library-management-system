import { ChangeEvent, FormEvent, useState } from "react"
import Input from "../components/Input"
import { Button } from "../components/Button"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useNavigate } from "react-router-dom"


export const Login = () => {
        const [email,setEmail] = useState("")
        const [password,setPassword] = useState("")
        const [error,setError] = useState("")
        const [emailError,setEmailError] = useState(false)
        const [passwordError,setPasswordError] = useState(false)

        const navigate = useNavigate()


            const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
                    setEmail(e.target.value);
                    setEmailError(false)
            }
            const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
                setPassword(e.target.value);
                setPasswordError(false)
        }


    const handleSubmit = async (e:FormEvent ) => {
        e.preventDefault()
        let isValid = true;
            if(email.length < 5) {
                setEmailError(true)
                isValid = false
            }
            if(password.length < 4) {
                setPasswordError(true)
                isValid = false
            }
            if(!isValid){
                setError("Please Fill all details correctly")
            }

            try {
                const response = await axios.post(`${BACKEND_URL}/api/v1/auth/login`, { email, password },
                {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });
                if(response.status === 200) {
                        const {token} = response.data;
                        console.log("tokeniiis",token)

                            if(token) {
                                localStorage.setItem("token",token)
                                navigate("/dashboard")
                            } else {
                                setError("Token not Found in response ")
                            }
                } else {
                    setError("An error occurred during login. Please try again.");
                }
            } catch (err)  {
                console.error(err);
                setError("An error occurred during registration. Please try again.");
            }


    }

    return <div className="flex justify-center items-center h-screen">
        <form  onSubmit={handleSubmit} className="border-2 rounded-lg p-8  w-80 bg-sky-200 drop-shadow-lg  shadow-md">
            {
                error && <p className="text-red-500 text-center mb-4" > {error} </p>
            }
            <h1 className="font-extrabold text-center" >LOGIN</h1>
            <Input  
                placeholder="enter your mail"
                type="email"
                value={email}
                name="email"
                label="Email id" 
                onChange={handleEmailChange}
                error={emailError}

            />
 <Input  
                placeholder="enter your password"
                type="password"
                value={password}
                name="password"
                label="password" 
                onChange={handlePasswordChange}
                error={passwordError}
            />

               <Button  size="lg" variant="secondary">      
                        Submit
                    </Button>
                    <p className="mt-2 p-2" >Don't have an  account?  <span  className="cursor-pointer text-sky-600" onClick={() => navigate("/register")}>Register</span>    </p>

        </form>

    </div>
}
