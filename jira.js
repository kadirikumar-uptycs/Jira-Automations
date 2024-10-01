const axios = require('axios');



const getHeaders = () => {
    try {
        let headers = {
            'Authorization': `Basic ${Buffer.from(
                `${process.env.JIRA_EMAIL_ADDRESS}:${process.env.JIRA_API_TOKEN}`
            ).toString('base64')}`,
            'Accept': 'application/json'
        }
        return headers;
    }
    catch (error) {
        console.log("Error while generating headers", error?.message);
    }
}


const getJiraIssueById = async (JiraId) => {
    let URL = `${process.env.JIRA_BASE_URL}/rest/api/3/issue/${JiraId}`;
    let headers = getHeaders();
    try {
        let response = await axios.get(URL, { headers });
        return response?.data;
    } catch (error) {
        console.log(error?.response?.data);
        return error?.message;
    }
}


const getJiraIssueFields = async () => {
    let URL = `${process.env.JIRA_BASE_URL}/rest/api/3/field`;
    let headers = getHeaders();
    try {
        let response = await axios.get(URL, { headers });
        return response?.data;
    } catch (error) {
        console.log(error?.response?.data);
        return error?.message;
    }
}


const getJiraIssueComments = async (JiraId) => {
    let URL = `${process.env.JIRA_BASE_URL}/rest/api/3/issue/${JiraId}/comment`;
    let headers = getHeaders();
    try {
        let response = await axios.get(URL, { headers });
        return response?.data;
    } catch (error) {
        console.log(error?.response?.data);
        return error?.message;
    }
}

const getOpenJiraIssuesByJQL = async (jql, fields) => {
    let URL = `${process.env.JIRA_BASE_URL}/rest/api/3/search`;
    let headers = getHeaders();
    let payload = {
        fields, 
        jql,
        "startAt": 0,
        "maxResults": 100,
    };
    try {
        let response = await axios.post(URL, payload, { headers });
        return response?.data;
    } catch (error) {
        console.log(error?.response?.data);
        return error?.message;
    }
}


module.exports = {
    getJiraIssueById,
    getJiraIssueFields,
    getJiraIssueComments,
    getOpenJiraIssuesByJQL,
}