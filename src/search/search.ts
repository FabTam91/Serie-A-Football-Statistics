import { BarChart } from "../football/chart";
import { FootballService } from "../football/football";
import { TeamCard } from "../football/team-card";

export class SearchForm {

    form: HTMLFormElement;
    teamInput: HTMLInputElement;
    seasonSelect: HTMLSelectElement;
    submitButton: HTMLButtonElement;
    cardsContainer: HTMLElement;
    errorMessage: HTMLElement;

    constructor(private readonly footballService: FootballService) {
        this.form = document.getElementById('football-form')! as HTMLFormElement;
        this.teamInput = document.getElementById('team-input')! as HTMLInputElement;
        this.seasonSelect = document.getElementById('season-select')! as HTMLSelectElement;
        this.submitButton = document.getElementById('submit-button')! as HTMLButtonElement;
        this.cardsContainer = document.getElementById('team-container')!;
        this.errorMessage = document.getElementById('error-message')!;

        this.submitHandler();
    }

    private submitHandler() {
        this.form.addEventListener('submit', async e => {
            e.preventDefault();

            this.cardsContainer.insertAdjacentHTML('afterbegin', `
                <div id="loader-container" class="loader-container">
                    <span class="loader"></span>
                </div>
                `);

            this.submitButton.disabled = true;

            try {
                const teamData = await this.footballService.getTeamData(this.teamInput.value, this.seasonSelect.value);
                new TeamCard(this.seasonSelect.value, teamData);
                new BarChart(this.seasonSelect.value, teamData);
                this.form.reset(); 
            } catch(e) {
                this.errorMessage.style.display = 'block';
                setTimeout(() => (this.errorMessage.style.display = 'none'), 3000);
            } finally {
                this.submitButton.disabled = false;
                this.cardsContainer.removeChild(document.getElementById('loader-container')!);
            }
        })
    }
};