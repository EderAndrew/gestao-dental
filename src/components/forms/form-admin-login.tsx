'use client'
import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { useForm } from "react-hook-form"
import { formSchemaLogin } from "@/schemas/formschemaLogin"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { cn } from "@/lib/utils"


const FormAdminLogin = () => {
    const formloginAdmin = useForm<z.infer<typeof formSchemaLogin>>({
        resolver: zodResolver(formSchemaLogin),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchemaLogin>) => {
        console.log(values)
    }
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription className={cn("text-slate-500")}>Acesso ao administrador do Sistema.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...formloginAdmin}>
            <form onSubmit={formloginAdmin.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={formloginAdmin.control}
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input type="email" placeholder="email@example.com.br" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-500"/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={formloginAdmin.control}
                    name="password"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Senha</FormLabel>
                            <FormControl>
                                <Input type="password" placeholder="123456" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-500"/>
                        </FormItem>
                    )}
                />
            <Button type="submit" className="w-full bg-slate-800 text-white">Acessar</Button>
            </form>
        </Form>
        
      </CardContent>
    </Card>
  )
}

export default FormAdminLogin
