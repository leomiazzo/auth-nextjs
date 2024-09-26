'use client'

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {

  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const onHandleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const response = await signIn("credentials", {
      redirect: false,
      email: email,
      password: password
    })

    if (response?.error){
      alert("Falha na autenticação")
      return;
    }

    router.push("/")
  }

  return (
    
    <div>
      <form onSubmit={onHandleSubmit}  className="flex h-screen flex-col justify-start p-8 items-center gap-4">
        <h1>LOGIN</h1>
        <label>E-mail</label>
        <input type="text" className="bg-slate-200" required autoFocus onChange={(e) => setEmail(e?.target.value)} />
        <label>Password</label>
        <input type="password" className="bg-slate-200" onChange={(e) => setPassword(e?.target.value)} />
        <button type="submit" className="bg-green-400" >Login</button>
      </form>
    </div>
  );
}
