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
import { getAddressByCep } from "@/actions/cep-api"
import { ICep } from "@/interfaces/ICep"
import { useState } from "react"
import Link from "next/link"



export const FormOffice = () => {
    const [address, setAddress] = useState<ICep>()

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
          userName: "",
          email: "",
          password: "",
          repeatPassword: "",
        },
    })
    
    const handlerCEP = async(value: string) => {
        const infoAddress = await getAddressByCep(value)
        setAddress(infoAddress)
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
                        <FormMessage className="text-red-500"/>
                        </FormItem>
                    )}
                    />
                    <div>
                        <CardHeader>
                            <CardTitle>Endereço</CardTitle>
                            <CardDescription>Preencha o endereço do seu consultório. *(Essas informações não são obrigatórias no momento)</CardDescription>
                        </CardHeader>
                        <div className="">
                            <FormField
                                control={form.control}
                                name="cep"
                                render={({ field }) => (
                                    <FormItem className="w-72 mb-4">
                                    <FormLabel>CEP</FormLabel>
                                    <FormControl>
                                        <div className="flex items-center gap-4">
                                            <Input placeholder="Ex: 01111222" {...field} />
                                            <Button onClick={()=>handlerCEP(field.value)}>Buscar</Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage className="text-red-500"/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="street"
                                render={({  }) => (
                                    <FormItem className="w-full mb-4">
                                    <FormLabel>Endereço</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Rua Pio XI" defaultValue={address ? address.logradouro : ""}/>
                                    </FormControl>
                                    <FormMessage className="text-red-500"/>
                                    </FormItem>
                                )}
                            />
                            <div className="flex gap-4 mb-4">
                                <FormField
                                    control={form.control}
                                    name="complement"
                                    render={({  }) => (
                                        <FormItem className="w-full">
                                        <FormLabel>Complemento</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Ex: 01111222" defaultValue={address ? address.complemento : ""}/>
                                        </FormControl>
                                        <FormMessage className="text-red-500"/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="number"
                                    render={({ field }) => (
                                        <FormItem className="w-40">
                                        <FormLabel>Numero</FormLabel>
                                        <FormControl>
                                            <Input placeholder="111" { ...field }/>
                                        </FormControl>
                                        <FormMessage className="text-red-500"/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex gap-4">
                                <FormField
                                    control={form.control}
                                    name="neighborhood"
                                    render={({  }) => (
                                        <FormItem className="w-full">
                                        <FormLabel>Bairro</FormLabel>
                                        <FormControl>
                                            <Input placeholder="111" defaultValue={address ? address.bairro : ""}/>
                                        </FormControl>
                                        <FormMessage className="text-red-500"/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="city"
                                    render={({  }) => (
                                        <FormItem className="w-48">
                                        <FormLabel>Cidade</FormLabel>
                                        <FormControl>
                                            <Input placeholder="111" defaultValue={address ? address.localidade : ""}/>
                                        </FormControl>
                                        <FormMessage className="text-red-500"/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="state"
                                    render={({  }) => (
                                        <FormItem className="w-32">
                                        <FormLabel>Estado</FormLabel>
                                        <FormControl>
                                            <Input placeholder="111" value={address ? address.uf : ""}/>
                                        </FormControl>
                                        <FormMessage className="text-red-500"/>
                                        </FormItem>
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                    <div>
                        <CardHeader>
                            <CardTitle>Usuário Administrador</CardTitle>
                            <CardDescription>Insira seu nome, seu email e crie uma senha para acesso do administrador do sistema.</CardDescription>
                        </CardHeader>
                        <div>
                            <FormField
                                control={form.control}
                                name="userName"
                                render={({ field }) => (
                                    <FormItem className="w-full mb-4">
                                    <FormLabel>Nome Completo</FormLabel>
                                    <FormControl >
                                        <Input placeholder="Ex: Jhon Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="w-full mb-4">
                                    <FormLabel>Email</FormLabel>
                                    <FormControl >
                                        <Input placeholder="Ex: Jhon Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="w-full mb-4">
                                    <FormLabel>Senha</FormLabel>
                                    <FormControl >
                                        <Input type="password" placeholder="Ex: Jhon Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="repeatPassword"
                                render={({ field }) => (
                                    <FormItem className="w-full mb-4">
                                    <FormLabel>Repetir Senha</FormLabel>
                                    <FormControl >
                                        <Input type="password" placeholder="Ex: Jhon Doe" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <Button type="submit" className="w-full bg-green-500 text-white h-12">CADASTRAR</Button>
                </form>
            </Form>
            </CardContent>
            <CardFooter className="flex justify-center">
                <Link href="/login" className="text-orange-500 hover:cursor-pointer hover:underline">Voltar</Link>
            </CardFooter>
        </Card>
    )
}