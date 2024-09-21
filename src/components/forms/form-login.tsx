'use client'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { formSchemaLogin } from "@/schemas/formschemaLogin"
import { signin } from "@/actions/auth"
import Link from "next/link"
import { cn } from "@/lib/utils"
import IconUser from "../../../public/assets/icons/IconUser"
import IconLockPasswordLine from "../../../public/assets/icons/IconLock"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { IUser } from "@/interfaces/IUseradmin"
import { createSessionStorage } from "@/utils/createSessionStorage"

const iconUser = <IconUser width={20} height={20} className="text-gray-500 ml-2"/>
const iconPassword = <IconLockPasswordLine width={20} height={20} className="text-gray-500 ml-2"/>
const FormLogin = () => {
    const { toast } = useToast()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const formLogin = useForm<z.infer<typeof formSchemaLogin>>({
        resolver: zodResolver(formSchemaLogin),
        defaultValues: {
            email: "",
            password: ""
        },
    })


    const onLoginSubmit = async (values: z.infer<typeof formSchemaLogin>) => {
        setIsLoading(true)
        try{
            const data = await signin(values)

            if(data?.status === 404){
                setIsLoading(false)
                return toast({
                    description: `${data.message}`,
                    style:{
                        color: "white",
                        backgroundColor: 'red'
                    }
                })
            }

            if(data?.status === 200 && data?.user?.role === "ADMIN" || data?.user?.role === "USER"){
                const user = data.user as IUser
                await createSessionStorage(data.user as IUser, `/offices/${user.officeId}/home`, router)
                toast({
                    description: `Login efetuado com sucesso.`,
                    variant: 'success'
                })
                return
            }

            const user = data?.user as IUser
            await createSessionStorage(user, `/dashboard/${user.id}/home`, router)
            toast({
                description: `Login efetuado com sucesso.`,
                variant: 'success'
            })

        }catch(error){
            console.log(error)
        }
    }


  return (
    <Card className="w-[500px] shadow-sm">
        <CardHeader>
            <CardTitle className="text-2xl font-semibold">Login</CardTitle>
            <CardDescription>
                <span className="text-base text-slate-700">Acesse o sistema Gestão Dental.</span>
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
        <Form {...formLogin}>
            <form onSubmit={formLogin.handleSubmit(onLoginSubmit)} className="space-y-4">
                <FormField
                    control={formLogin.control}
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="email@example.com.br"
                                    icon={iconUser}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="text-red-500"/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={formLogin.control}
                    name="password"
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    type="password"
                                    placeholder="Abc_@123"
                                    icon={iconPassword}
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="text-red-500"/>
                        </FormItem>
                    )}
                />
                <div className={cn("w-full flex justify-end")}>
                    <Link href="/" className={cn("text-sm font-semibold text-orange-500 hover:underline hover:cursor-pointer hover:text-orange-600")}>Esqueci minha senha.</Link>
                </div>
                <Button className={cn("w-full bg-[#0597F2] text-lg text-white h-12")} type="submit" disabled={isLoading}>{isLoading ? "Carregando..." : "Acessar"}</Button>
            </form>
        </Form>
        
        </CardContent>
        <CardFooter>
            <div className="w-full flex justify-center flex-col border-t-2 pt-3">
                <span className={cn("text-sm font-semibold text-slate-500 m-auto")}>Caso ainda não tenha um cadastro, cadastre seu consultório <Link href="/register" className={cn("text-orange-500 italic hover:underline hover:cursor-pointer")}>aqui</Link></span>
            </div>
        </CardFooter>
    </Card>
  )
}

export default FormLogin