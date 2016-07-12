// import JSONAPIAdapter from 'ember-data/adapters/json-api';
//
// export default JSONAPIAdapter.extend({
// });

import DS from 'ember-data';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
    authorizer: 'authorizer:application'
});
