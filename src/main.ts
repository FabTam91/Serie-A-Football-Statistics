import { SearchForm } from './search/search';
import { FootballService } from './football/football';
import './style.scss';

document.addEventListener('DOMContentLoaded', () => {
    const footballService = new FootballService();
    const searchForm = new SearchForm(footballService);
})

