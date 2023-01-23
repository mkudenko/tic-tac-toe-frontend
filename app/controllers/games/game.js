import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';

export default class GamesGameController extends Controller {
  @service store;

  @tracked board = A([]);
  @tracked nextMoveUserId;

  @action
  enteredRoute() {
    [...Array(9).keys()].forEach(() => {
      this.board.pushObject({ userId: null, isWinning: false });
    });

    this.nextMoveUserId = this.model.crosses_user_id;

    this.model.moves.forEach((move) => {
      this._fillCell({ cell: move.cell });
    });

    if (this.model.winner_id) {
      this._isGameWon();
    }
  }

  @action
  makeMove(cell) {
    if (this.model.winner_id) {
      return;
    }

    if (this._isCellFilled(cell)) {
      return;
    }

    const currentMoveUserId = this.nextMoveUserId;
    this._fillCell({ cell, save: true });
    if (this._isGameWon()) {
      this.model.winner_id = currentMoveUserId;
      this.model.save();
    }
  }

  _isCellFilled(cell) {
    return this.board[cell].userId !== null;
  }

  _fillCell({ cell, save }) {
    if (save) {
      const move = this.store.createRecord('move', {
        game: this.model,
        user_id: this.nextMoveUserId,
        cell,
      });
      move.save();
    }

    this.board[cell] = { userId: this.nextMoveUserId, isWinning: false };
    this.board = [...this.board];
    this.nextMoveUserId = this._getNextMoveUserId(this.nextMoveUserId);
  }

  _getNextMoveUserId(latestMoveUserId) {
    return latestMoveUserId === 1 ? 2 : 1;
  }

  _isGameWon() {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    const win = winningCombinations.find((c) => {
      const cellUser1 = this.board[c[0]].userId;
      const cellUser2 = this.board[c[1]].userId;
      const cellUser3 = this.board[c[2]].userId;

      const cellsNotEmpty =
        cellUser1 !== null && cellUser2 !== null && cellUser3 !== null;
      const cellsHaveSameValue =
        cellUser1 === cellUser2 && cellUser1 === cellUser3;

      return cellsNotEmpty && cellsHaveSameValue;
    });

    if (win) {
      win.forEach((cell) => {
        this.board[cell].isWinning = true;
      });
      this.board = [...this.board];
      return true;
    }

    return false;
  }
}
