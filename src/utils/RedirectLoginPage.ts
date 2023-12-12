import { useRouter } from "vue-router";
const router = useRouter()

const RedirectLoginPage = () => {
    router.push(`/auth/login?return=${router.currentRoute.value.path}`)
}

export default RedirectLoginPage