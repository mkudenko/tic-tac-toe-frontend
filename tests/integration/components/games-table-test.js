import { module, test } from 'qunit';
import { setupRenderingTest } from 'tic-tac-toe-frontend/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | games-table', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<GamesTable />`);

    assert.dom(this.element).hasText('');

    // Template block usage:
    await render(hbs`
      <GamesTable>
        template block text
      </GamesTable>
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
