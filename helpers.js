let isPendingTicket = (comments) => {
    let sriTeamMembers = [
        'amannapur@uptycs.com',
        'ejanaki@uptycs.com',
        'kadirikumar@uptycs.com',
        'kwali@uptycs.com',
        'nkarthik@uptycs.com',
        'nvphalguni@uptycs.com',
        'psurya@uptycs.com',
        'psireesha@uptycs.com',
        'rsudhir@uptycs.com',
        'sabniveesukumar@uptycs.com',
        'sbirajdar@uptycs.com',
        'syenduri@uptycs.com',
        'srajasekaran@uptycs.com'
    ];
    if (!Array.isArray(comments)) {
        return false;
    }

    comments = comments.reverse();
    let totalComments = comments.length;
    let MAX_COMMENTS = 2;
    let index = 0;
    let count = 0;
    while (index < MAX_COMMENTS && index < totalComments) {
        try {
            let comment = comments[index];
            let userEmail = comment?.author?.emailAddress;
            if(comment?.author?.displayName?.includes('Automation')){
                index++;
                continue;
            };
            if (!sriTeamMembers.includes(userEmail)) {
                return false;
            }
            count++;
            index++;
        } catch (error) {
            console.log('Error while checking Pending Criteria', error);
            return false;
        }
    }
    return count >= MAX_COMMENTS;
}

module.exports = {
    isPendingTicket,
}