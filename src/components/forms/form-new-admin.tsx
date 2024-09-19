'use client'
import React, { useState } from 'react'
import { Card, CardContent } from '../ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { formSchemaCreateAdmin } from '@/schemas/formSchemaCreateAdmin'
import { useForm } from 'react-hook-form'
import { createUserAdmin } from '@/actions/userAdmin'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'

const FormNewAdmin = () => {
    const { toast } = useToast()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchemaCreateAdmin>>({
        resolver: zodResolver(formSchemaCreateAdmin),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        },
    })

    const onSubmit = async (values: z.infer<typeof formSchemaCreateAdmin>) => {
        try{
            setIsLoading(true)
            const data = await createUserAdmin(values)
        
            if(data?.status === 500){
                toast({
                    description: `${data.message}`,
                    variant: 'destructive'
                })
                setIsLoading(false)
                return
            }
            toast({
                description: `${data?.message}`,
                style: {
                    color: "white",
                    backgroundColor: 'green'
                }
            })

            router.push("/new-admin-user")
            setIsLoading(false)
        }catch(error){
            if(error instanceof Error){
                console.log(error)
                setIsLoading(false)
            }
        }
    }
  return (
    <Card className="w-[500px]">
      <CardContent>
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Nome</FormLabel>
                            <FormControl>
                                <Input placeholder="Jhon Doe" {...field} />
                            </FormControl>
                            <FormMessage className="text-red-500"/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
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
                    control={form.control}
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
            <Button type="submit" className="w-full bg-slate-800 text-white">{isLoading ? "Carregando..." : "Cadastrar"}</Button>
            </form>
        </Form>
        
      </CardContent>
    </Card>
  )
}

export default FormNewAdmin