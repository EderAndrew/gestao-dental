'use client'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { formSchemaLogin } from "@/schemas/formschemaLogin"
import { formSchemaRegister } from "@/schemas/formSchemaRegister"

const FormLogin = () => {
    const formLogin = useForm<z.infer<typeof formSchemaLogin>>({
        resolver: zodResolver(formSchemaLogin),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    const formRegister = useForm<z.infer<typeof formSchemaRegister>>({
        resolver: zodResolver(formSchemaRegister),
        defaultValues: {
            email: "",
            password: "",
            repeatPassword: ""
        },
    })

    const onLoginSubmit = async (values: z.infer<typeof formSchemaLogin>) => {
        console.log(values)
    }

    const onRegisterSubmit = async (values: z.infer<typeof formSchemaLogin>) => {
        console.log(values)
    }

  return (
    <Tabs defaultValue="account" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2 h-11">
        <TabsTrigger value="account" className="data-[state=active]:bg-[#0597F2] data-[state=active]:text-white text-lg font-semibold text-slate-700">Login</TabsTrigger>
        <TabsTrigger value="register" className="data-[state=active]:bg-[#0597F2] data-[state=active]:text-white text-lg font-semibold text-slate-700">Registrar</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card className="w-full shadow-sm">
          <CardHeader>
            <CardDescription>
                <span className="text-lg">Acesse o sistema Gestão Dental.</span>
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
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input type="email" placeholder="email@example.com.br" {...field} />
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
                                <FormLabel>Senha</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="123456" {...field} />
                                </FormControl>
                                <FormMessage className="text-red-500"/>
                            </FormItem>
                        )}
                    />
                    <Button className="w-full bg-[#0597F2] text-lg text-white" type="submit">Acessar</Button>
                </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="register">
        <Card>
          <CardHeader>
            <CardDescription>
                <span className="text-lg">Registre a senha para o seu primeiro acesso.</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
          <Form {...formRegister}>
                <form onSubmit={formRegister.handleSubmit(onRegisterSubmit)} className="space-y-4">
                    <FormField
                        control={formRegister.control}
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
                        control={formRegister.control}
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
                    <FormField
                        control={formRegister.control}
                        name="repeatPassword"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Repetir Senha</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="123456" {...field} />
                                </FormControl>
                                <FormMessage className="text-red-500"/>
                            </FormItem>
                        )}
                    />
                    <Button className="w-full bg-[#0597F2] text-lg text-white" type="submit">Registrar</Button>
                </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

export default FormLogin