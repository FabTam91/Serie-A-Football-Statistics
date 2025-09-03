import { data, updateBarChart } from "./chart";
import { TeamData } from "./team-data.model";

export class TeamCard {
    constructor(season: string, teamData: TeamData) {
        const cardsContainer = document.getElementById('team-container')!;
        const endOfSeason = parseInt(season, 10) + 1;
        const cardNumber = document.querySelectorAll('.team-card').length

        cardsContainer.insertAdjacentHTML('afterbegin', 
            `<div class="team-card" data-team="${teamData.name}" data-season="${season}-${endOfSeason}">
                <div class="card-header">
                    <img src="${teamData.logo}" alt="logo">
                    <div class="name-season">
                        <h2>${teamData.name}</h2>
                        <h3>${season}-${endOfSeason}</h3>
                    </div>
                </div>
                <div class="card-stats">
                    <div class="main-stats">
                        <p><b>Points:</b> ${teamData.points}</p>
                        <p><b>Matches:</b> ${teamData.matches}</p>
                        <p><b>Wins:</b> ${teamData.wins}</p>
                        <p><b>Draws:</b> ${teamData.draws}</p>
                        <p><b>Losses:</b> ${teamData.losses}</p>
                        <p><b>Goals for:</b> ${teamData.goalsScored}</p>
                        <p><b>Goals against:</b> ${teamData.goalsAgainst}</p>
                    </div>
                    <div class="rank-delete">
                        <h3 class="rank">Rank: ${teamData.rank}</h3>
                        <button id="delete-btn-${cardNumber}">X</button>
                    </div>
                </div>
            </div>`
        );

        const deleteButton = cardsContainer.querySelector(`#delete-btn-${cardNumber}`) as HTMLButtonElement;
        deleteButton.addEventListener('click', (e) => {
            const parent = (e.target as HTMLElement).parentElement!.parentElement!.parentElement as HTMLElement;
            const teamName = parent.getAttribute('data-team')!;
            const season = parent.getAttribute('data-season')!;

            parent.remove();

            const index = data.findIndex(row => row.team === teamName && row.season === season);
            data.splice(index, 1);

            updateBarChart();
        });
    }
}