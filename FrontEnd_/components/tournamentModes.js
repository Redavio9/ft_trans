import { urlHandler } from "../scripts/routes.js";
import { globalState, fetchProfile } from "../scripts/fetchData.js";

export async function firstModeComponent() {
    if (globalState.user === null)
        await fetchProfile();

    if (globalState.user === null)
        return (`cant fetch user data`)

    return (`
        <div class="first-mode">
            <h2>ping Pong masters</h2>
            <div class="tournament-info" w-tid="8">
                Tournament ID: <span id="tournamentId" w-tid="9">PPM2023</span>
                <button class="copy-button" onclick="copyTournamentId()" w-tid="10">Copy ID</button>
            </div>
            <div class="bracket" w-tid="11">
                <div class="round" id="round1" w-tid="12">
                    <div class="match in-progress" w-tid="13">
                        <div class="player winner" w-tid="14">
                            <span class="player-name" w-tid="15">Alice</span>
                            <span class="player-score" w-tid="16">11</span>
                        </div>
                        <div class="player" w-tid="17">
                            <span class="player-name" w-tid="18">Bob</span>
                            <span class="player-score" w-tid="19">4</span>
                        </div>
                        <div class="paddle paddle-left" w-tid="20"></div>
                        <div class="paddle paddle-right" w-tid="21"></div>
                        <div class="ball" w-tid="22"></div>
                    </div>
                    <div class="match in-progress" w-tid="23">
                        <div class="player winner" w-tid="24">
                            <span class="player-name" w-tid="25">Charlie</span>
                            <span class="player-score" w-tid="26">11</span>
                        </div>
                        <div class="player" w-tid="27">
                            <span class="player-name" w-tid="28">David</span>
                            <span class="player-score" w-tid="29">5</span>
                        </div>
                        <div class="paddle paddle-left" w-tid="30"></div>
                        <div class="paddle paddle-right" w-tid="31"></div>
                        <div class="ball" w-tid="32"></div>
                    </div>
                    <div class="match in-progress" w-tid="33">
                        <div class="player" w-tid="34">
                            <span class="player-name" w-tid="35">Eve</span>
                            <span class="player-score" w-tid="36">6</span>
                        </div>
                        <div class="player winner" w-tid="37">
                            <span class="player-name" w-tid="38">Frank</span>
                            <span class="player-score" w-tid="39">11</span>
                        </div>
                        <div class="paddle paddle-left" w-tid="40"></div>
                        <div class="paddle paddle-right" w-tid="41"></div>
                        <div class="ball" w-tid="42"></div>
                    </div>
                    <div class="match in-progress" w-tid="43">
                        <div class="player winner" w-tid="44">
                            <span class="player-name" w-tid="45">Grace</span>
                            <span class="player-score" w-tid="46">11</span>
                        </div>
                        <div class="player" w-tid="47">
                            <span class="player-name" w-tid="48">Henry</span>
                            <span class="player-score" w-tid="49">5</span>
                        </div>
                        <div class="paddle paddle-left" w-tid="50"></div>
                        <div class="paddle paddle-right" w-tid="51"></div>
                        <div class="ball" w-tid="52"></div>
                    </div>
                </div>
                <div class="round" id="round2" w-tid="53">
                    <div class="match in-progress" w-tid="54">
                        <div class="player" w-tid="55">
                            <span class="player-name advanced" w-tid="56">Alice</span>
                            <span class="player-score" w-tid="57">10</span>
                        </div>
                        <div class="player" w-tid="58">
                            <span class="player-name advanced" w-tid="59">Charlie</span>
                            <span class="player-score" w-tid="60">9</span>
                        </div>
                        <div class="paddle paddle-left" w-tid="61"></div>
                        <div class="paddle paddle-right" w-tid="62"></div>
                        <div class="ball" w-tid="63"></div>
                    </div>
                    <div class="match in-progress" w-tid="64">
                        <div class="player" w-tid="65">
                            <span class="player-name advanced" w-tid="66">Grace</span>
                            <span class="player-score" w-tid="67">10</span>
                        </div>
                        <div class="player" w-tid="68">
                            <span class="player-name advanced" w-tid="69">Frank</span>
                            <span class="player-score" w-tid="70">8</span>
                        </div>
                        <div class="paddle paddle-left" w-tid="71"></div>
                        <div class="paddle paddle-right" w-tid="72"></div>
                        <div class="ball" w-tid="73"></div>
                    </div>
                </div>
                <div class="round" id="round3" w-tid="74">
                    <div class="match" w-tid="75">
                        <div class="player" w-tid="76">
                            <span class="player-name" w-tid="77">TBD</span>
                            <span class="player-score" w-tid="78">0</span>
                        </div>
                        <div class="player" w-tid="79">
                            <span class="player-name" w-tid="80">TBD</span>
                            <span class="player-score" w-tid="81">0</span>
                        </div>
                        <div class="paddle paddle-left" w-tid="82"></div>
                        <div class="paddle paddle-right" w-tid="83"></div>
                        <div class="ball" w-tid="84"></div>
                    </div>
                </div>
            </div>
            <button class="bottom-leave-button" w-tid="86">Leave Tournament</button>
        </div>
    `)
}

export async function secondModeComponent() {
    if (globalState.user === null)
        await fetchProfile();

    if (globalState.user === null)
        return (`cant fetch user data`)

    return (`
        <div class="first-mode">
            <h2>ping Pong masters</h2>
            <div class="tournament-info" w-tid="8">
                Tournament ID: <span id="tournamentId" w-tid="9">PPM2023</span>
                <button class="copy-button" w-tid="10">Copy ID</button>
            </div>
            <div class="bracket" w-tid="11">
                <div class="round" id="round2" w-tid="53">
                    <div class="match in-progress" w-tid="54">
                        <div class="player" w-tid="55">
                            <span class="player-name advanced" w-tid="56">Alice</span>
                            <span class="player-score" w-tid="57">10</span>
                        </div>
                        <div class="player" w-tid="58">
                            <span class="player-name advanced" w-tid="59">Charlie</span>
                            <span class="player-score" w-tid="60">9</span>
                        </div>
                        <div class="paddle paddle-left" w-tid="61"></div>
                        <div class="paddle paddle-right" w-tid="62"></div>
                        <div class="ball" w-tid="63"></div>
                    </div>
                    <div class="match in-progress" w-tid="64">
                        <div class="player" w-tid="65">
                            <span class="player-name advanced" w-tid="66">Grace</span>
                            <span class="player-score" w-tid="67">10</span>
                        </div>
                        <div class="player" w-tid="68">
                            <span class="player-name advanced" w-tid="69">Frank</span>
                            <span class="player-score" w-tid="70">8</span>
                        </div>
                        <div class="paddle paddle-left" w-tid="71"></div>
                        <div class="paddle paddle-right" w-tid="72"></div>
                        <div class="ball" w-tid="73"></div>
                    </div>
                </div>
                <div class="round" id="round3" w-tid="74">
                    <div class="match" w-tid="75">
                        <div class="player" w-tid="76">
                            <span class="player-name" w-tid="77">TBD</span>
                            <span class="player-score" w-tid="78">0</span>
                        </div>
                        <div class="player" w-tid="79">
                            <span class="player-name" w-tid="80">TBD</span>
                            <span class="player-score" w-tid="81">0</span>
                        </div>
                        <div class="paddle paddle-left" w-tid="82"></div>
                        <div class="paddle paddle-right" w-tid="83"></div>
                        <div class="ball" w-tid="84"></div>
                    </div>
                </div>
            </div>
            <button class="bottom-leave-button" w-tid="86">Leave Tournament</button>
        </div>
    `)
}

async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
    } catch (err) {}
}

export function tournamentModesScript() {
    const leaveTournamentButton = document.querySelector('.first-mode .bottom-leave-button');
    if (leaveTournamentButton) {
        leaveTournamentButton.addEventListener('click', function () {
            history.pushState(null, null, '/tournament');
            urlHandler();
        })
    }

    const copyButton = document.querySelector('.first-mode .copy-button');
    if (copyButton) {
        copyButton.addEventListener('click', function () {
            const tournamentId = document.querySelector('.first-mode .tournament-info span').innerText;
            copyToClipboard(tournamentId);
        })
    }
}