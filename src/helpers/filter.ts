export const randomStringGenerator = async (length: number): Promise<string> => {
    let chars: string = 'QWERTYUIOPASDFGHJKLZXCVBNM1234567890!@#$%^&*()/{}qwertyuiopasdfghjklzxcvbnm'

    let str: string = ''

    for (let i = 0; i < length; i++) {
        str += chars.charAt(Math.floor(Math.random() * chars.length))
    }

    return str;
}