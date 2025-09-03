import { ChartDataPoint } from "./chart.model";
import { TeamData } from "./team-data.model";
import Chart from 'chart.js/auto'

export const data: ChartDataPoint[] = [];
let barChart: Chart | null = null;
const barChartElement = document.getElementById("chart-container") as HTMLElement;

export class BarChart {
    constructor(season: string, teamData: TeamData) {
        const endOfSeason = parseInt(season, 10) + 1;

        (async function() {
        
            data.push({season: `${season}-${endOfSeason}`, team: teamData.name, points: teamData.points});

            if (barChart) {
                barChart.data.labels = data.map(row => row.team + " - " + row.season);
                barChart.data.datasets[0].data = data.map(row => row.points);
                barChart.update();

                barChartElement.style.display = data.length === 0 ? "none" : "block";

            } else {
                barChart = new Chart(
                    document.getElementById('team-points')! as HTMLCanvasElement,
                    {
                    type: 'bar',
                    data: {
                        labels: data.map(row => row.team + " - " + row.season),
                        datasets: [
                        {
                            label: 'Points',
                            data: data.map(row => row.points),
                            backgroundColor: 'rgba(23, 29, 141, 0.9)',
                            hoverBackgroundColor: 'rgba(0, 138, 207, 0.9)'
                        }
                        ]
                    }
                    }
                );
            }
        })();
    }
}

export function updateBarChart() {
    if (barChart) {
        barChart.data.labels = data.map(row => row.team + " - " + row.season);
        barChart.data.datasets[0].data = data.map(row => row.points);
        barChart.update();

        barChartElement.style.display = data.length === 0 ? "none" : "block";
    }
}