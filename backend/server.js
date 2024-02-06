const app = require('./index');
const logger = require('./logger.util');


app.listen(process.env.PORT || 3000, () => {
	logger("server running");
});
