import { globalState, fetchProfile } from "../scripts/fetchData.js";

export async function ticTacComponent() {
    if (!globalState.user) {
        await fetchProfile();
    }

    if (!globalState.user) {
        return (`cant fetch user data`)
    }

    return (`
        wait for the next update
    `)
}