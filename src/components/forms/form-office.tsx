'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { formSchemaOffice } from "@/schemas/formSchemaOffice"



export const FormOffice = () => {
    const form = useForm<z.infer<typeof formSchemaOffice>>({
        resolver: zodResolver(formSchemaOffice),
        defaultValues: {
          cnpj: "",
          corporate: "",
          name: "",
          tel: "",
          identity: "",
          cep: "",
          street: "",
          complement: "",
          number: "",
          neighborhood: "",
          city: "",
          state: "",
        },
    })
    
    const handlerCEP = (value: string) => {
        alert(value)
    }
    function onSubmit(values: z.infer<typeof formSchemaOffice>) {
    console.log(values)
    }

    return(
        <Card className="w-[50%] mt-5">
            <CardHeader>
                <CardTitle>Dados do Consultório</CardTitle>
                <CardDescription>Preencha todos os campos para realizar o cadastro</CardDescription>
            </CardHeader>
            <CardContent>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="flex gap-4">
                        <FormField
                            control={form.control}
                            name="cnpj"
                            render={({ field }) => (
                                <FormItem className="w-full">
                                <FormLabel>CNPJ</FormLabel>
                                <FormControl >
                                    <Input placeholder="Ex: 000.000.000-00" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="tel"
                            render={({ field }) => (
                                <FormItem className="w-72">
                                <FormLabel>Telefone</FormLabel>
                                <FormControl>
                                    <Input placeholder="Ex: (11) 91122-3344" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    
                    <FormField
                    control={form.control}
                    name="corporate"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Razão Social</FormLabel>
                        <FormControl>
                            <Input placeholder="Ex: Consultório LTDA" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Nome Fantasia</FormLabel>
                        <FormControl>
                            <Input placeholder="Ex: Sorriso Dentario" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                    <div>
                    <CardHeader>
                        <CardTitle>Endereço</CardTitle>
                        <CardDescription>Preencha o endereço do seu consultório. *(Essas informações não são obrigatórias no momento)</CardDescription>
                    </CardHeader>
                    <div>
                        <FormField
                            control={form.control}
                            name="cep"
                            render={({ field }) => (
                                <FormItem className="w-72">
                                <FormLabel>CEP</FormLabel>
                                <FormControl>
                                    <div className="flex items-center gap-4">
                                        <Input placeholder="Ex: 01111222" {...field} />
                                        <Button onClick={()=>handlerCEP(field.value)}>Buscar</Button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    </div>
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
            </CardContent>
            <CardFooter>
                <p>Card Footer</p>
            </CardFooter>
        </Card>
    )
}