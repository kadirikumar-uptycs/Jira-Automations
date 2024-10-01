let express = require('express');
let router = express.Router();
let controllers = require('./controllers');

router.get('/jiraIssue/:issuekey', controllers.fetchJiraIssue);
router.get('/jiraFields', controllers.fetchJiraFields);
router.get('/jiraComments/:issuekey', controllers.fetchJiraIssueComments);
router.get('/jiraIssues/open', controllers.fetchAllOpenJiraIssues);
router.get('/jiraIssues/pendingOnEngineering', controllers.fetchAllPendingTickets);



module.exports = router;

