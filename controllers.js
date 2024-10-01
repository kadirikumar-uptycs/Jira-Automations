const { getJiraIssueById, getJiraIssueFields, getOpenJiraIssuesByJQL, getJiraIssueComments } = require('./jira');
const { isPendingTicket } = require('./helpers');

async function fetchJiraIssue(req, res) {
    try {
        let issuekey = req?.params?.issuekey;
        let issueInfo = await getJiraIssueById(issuekey);
        return res.status(200).send(issueInfo);
    } catch (error) {
        console.error('Error: ', error);
        return res.status(500).send(error);
    }
}


async function fetchJiraFields(_, res) {
    try {
        let fieldsInfo = await getJiraIssueFields();
        return res.status(200).send(fieldsInfo);
    } catch (error) {
        console.error('Error: ', error);
        return res.status(500).send(error);
    }
}



async function fetchAllOpenJiraIssues(_, res) {
    try {
        let jql = 'project = CS AND issuetype = Bug AND status in ("To Do", "In Review", "IN TRIAGE") ORDER BY priority DESC, created DESC'
        let fields = [
            "issuekey",
            "comment"
        ]
        let results = await getOpenJiraIssuesByJQL(jql, fields);
        return res.status(200).send(results);
    } catch (error) {
        console.error('Error: ', error);
        return res.status(500).send(error);
    }
}


async function fetchAllPendingTickets(_, res) {
    try {
        let jql = 'project = CS AND issuetype = Bug AND status in ("To Do", "In Review", "IN TRIAGE") ORDER BY priority DESC, created DESC'
        let fields = [
            "issuekey",
            "comment"
        ]
        let results = await getOpenJiraIssuesByJQL(jql, fields);
        let allIssues = results?.issues;
        let pendingTickets = [];
        if (Array.isArray(allIssues)) {
            pendingTickets = allIssues.filter(issue => {
                let comments = issue?.fields?.comment?.comments;
                let flag = isPendingTicket(comments);
                if(flag) console.log(issue?.key);
                return flag;
            })
        } else {
            pendingTickets = results;
        }
        return res.status(200).send(pendingTickets);
    } catch (error) {
        console.error('Error: ', error);
        return res.status(500).send(error);
    }
}


async function fetchJiraIssueComments(req, res) {
    try {
        let issuekey = req?.params?.issuekey;
        let issueComments = await getJiraIssueComments(issuekey);
        return res.status(200).send(issueComments);
    } catch (error) {
        console.error('Error: ', error);
        return res.status(500).send(error);
    }
}

module.exports = {
    fetchJiraIssue,
    fetchJiraFields,
    fetchAllOpenJiraIssues,
    fetchJiraIssueComments,
    fetchAllPendingTickets,
}