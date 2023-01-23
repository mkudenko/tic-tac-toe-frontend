import Component from '@glimmer/component';

export default class ScoreBoardComponent extends Component {
  winCounts;

  constructor() {
    super(...arguments);

    this.winCounts = [1, 2].map((id) => {
      return {
        user_id: id,
        wins: this.args.games.filter((game) => game.winner_id === id).length,
      };
    });
    this.winCounts.sort((a, b) => {
      return a.wins > b.wins ? -1 : 1;
    });
  }
}
