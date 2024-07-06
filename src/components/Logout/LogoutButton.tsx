import { toast } from 'sonner'
import axios from 'axios'

function LogoutButton() {

    function getLogout() {
        axios
            .post("/api/user/logout")
            .then((res) => toast.success(res.data.success))
            .catch(() => toast.error("Something went wrong logging out"))
            .finally(() => window.location.reload());
    }

    return (
        <button
            onClick={() => getLogout()}
            id="logout-button"
            className="h-[44px] rounded-[5px] bg-[#f6ce40] px-10 text-black font-semibold text-left text-base flex items-center justify-center"
        >
            Log out
        </button>
    );
}

export default LogoutButton;