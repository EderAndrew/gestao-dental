export const getAddressByCep = async (cep: string) => {
    try{
        const resp = await fetch(`https://viacep.com.br/ws/${cep}/json/`)

        if(!resp.ok){
            return { message: "Erro ao buscar CEP" }
        }

        const data = await resp.json()
        return data
    }catch(error){
        if(error instanceof Error){
            console.log(error.message)
        }
    }
}