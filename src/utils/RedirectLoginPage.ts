import { useRouter } from "vue-router";

const RedirectLoginPage = async () => {
    const router = useRouter()
    router.push(`/auth/login?return=${router.currentRoute.value.path}`)
}

export default RedirectLoginPage