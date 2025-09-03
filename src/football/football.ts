export class FootballService {

    public async getTeamData(team: string, season: string) {
        try{
            const teamID = await this.getTeamID(team);
            const teamData = await this.fetchTeamData(teamID, season);
            return teamData
        } catch(e){
            console.log(e);
            throw e;
        }


    }

    private async getTeamID(team: string): Promise<number> {

        const response = await fetch(`https://v3.football.api-sports.io/teams?search=${team}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "v3.football.api-sports.io",
                "x-rapidapi-key": "b09fa592d24be30293b3b1f7380452f3"
            }
        })
        const body = await response.json();


        return new Promise((resolve, reject) => {
            const result = body.response[0].team.id;

            if(result) {
                resolve(result)
            } else {
                reject(new Error(`Couldn't search ${team}`))
            }
        });
    }

    private async fetchTeamData(teamID: number, season: string) {
        
        const response = await fetch(`https://v3.football.api-sports.io/teams/statistics?season=${season}&team=${teamID}&league=135`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "v3.football.api-sports.io",
                "x-rapidapi-key": "b09fa592d24be30293b3b1f7380452f3"
            }
        })
        const body = await response.json();

        const response_rank = await fetch(`https://v3.football.api-sports.io/standings?league=135&season=${season}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "v3.football.api-sports.io",
                "x-rapidapi-key": "b09fa592d24be30293b3b1f7380452f3"
            }
        }) 
        const body_rank = await response_rank.json();

        return {
            name: body.response.team.name,
            matches: body.response.fixtures.played.total,
            wins: body.response.fixtures.wins.total,
            draws:body.response.fixtures.draws.total,
            losses: body.response.fixtures.loses.total,
            points: body_rank.response[0].league.standings[0].find((item: any) => item.team.id === teamID).points,
            logo: body.response.team.logo,
            goalsScored: body.response.goals.for.total.total,
            goalsAgainst: body.response.goals.against.total.total,
            rank: body_rank.response[0].league.standings[0].find((item: any) => item.team.id === teamID).rank
        }

    }
}