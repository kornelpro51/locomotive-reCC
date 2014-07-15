module.exports = {
  up: function(migration, DataTypes, done) {
      'use strict';
      migration.addColumn('Buy', 'last4', {
          type: DataTypes.STRING,
          allowNull: true
      });
      migration.addColumn('Buy', 'cardType', {
          type: DataTypes.STRING,
          allowNull: true
      });
      done();
  },
    down: function (migration, DataTypes, done) {
        'use strict';
        migration.removeColumn('Buy', 'last4');
        migration.removeColumn('Buy', 'cardType');
        done();
    }
}
