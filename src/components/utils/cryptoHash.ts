import bcrypt from 'bcryptjs'
export const encrypt = async (pwd: string) => {
    const saltRounds = 10
    const salt = bcrypt.genSaltSync(saltRounds)
    const hash = bcrypt.hashSync(pwd, salt)
    
    return hash.replace("/", "")
}

export const compareCrypt = async(pwd: string, hash: string) => {
    return bcrypt.compareSync(pwd, hash)
}