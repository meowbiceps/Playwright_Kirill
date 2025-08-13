const { userGaragePage } = require('../fixtures/userGaragePage');

userGaragePage('Check garage page direct access ', async({ garagePage }) => {
    await garagePage.emptyMessageHasText('You don’t have any cars in your garage');

});

