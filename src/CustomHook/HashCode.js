import { sha1, sha256, sha384, sha512 } from 'crypto-hash';
const useHashCode = () => {
    let HashCode = null
    const HashPass = async (value) => {
        HashCode = sha1(value);
        return HashCode
    }
    return { HashPass }
}
export default useHashCode