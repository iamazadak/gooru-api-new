const axios = require('axios');
const ExcelJS = require('exceljs');
const { classIds } = require('./classIds');
const { apiRequest } = require('./environment');

const params = {
    to: "2025-08-16",
    from: "2025-08-10"
};

const authToken = process.env.AUTH_TOKEN;

// Track success and failure counts
let successCount = 0;
let failureCount = 0;

// Get current timestamp in a readable format
function getTimestamp() {
    return new Date().toLocaleString('en-US', { timeZone: 'Asia/Kolkata' });
}

// Function to make the request and save to Excel
async function fetchClassTimespent() {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Class Timespent');

    // Define column headers
    worksheet.columns = [
        { header: 'Class ID', key: 'classId', width: 40 },
        { header: 'Member ID', key: 'memberId', width: 40 },
        { header: 'First Name', key: 'firstName', width: 20 },
        { header: 'Last Name', key: 'lastName', width: 20 },
        { header: 'Total Assessment Timespent', key: 'totalAssessmentTimespent', width: 25 },
        { header: 'Timestamp', key: 'timestamp', width: 30 }
    ];

    for (let i = 0; i < classIds.length; i++) {
        const classId = classIds[i];
        const url = `${apiRequest}?classId=${classId}&to=${params.to}&from=${params.from}`;

        try {
            const response = await axios.get(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `${authToken}`
                }
            });

            const data = response.data;
            successCount++;

            // Process each member in the response
            if (data.members && Array.isArray(data.members)) {
                data.members.forEach(member => {
                    worksheet.addRow({
                        classId: classId,
                        memberId: member.id || 'N/A',
                        firstName: member.first_name || 'N/A',
                        lastName: member.last_name || 'N/A',
                        totalAssessmentTimespent: member.total_assessment_timespent || 0,
                        timestamp: getTimestamp()
                    });
                });
            } else {
                worksheet.addRow({
                    classId: classId,
                    memberId: 'N/A',
                    firstName: 'N/A',
                    lastName: 'N/A',
                    totalAssessmentTimespent: 0,
                    timestamp: getTimestamp()
                });
            }
        } catch (error) {
            failureCount++;
            console.log(`Request Failed for classId ${classId}:`, {
                timestamp: getTimestamp(),
                classId: classId,
                requestUrl: url,
                status: 'Error',
                error: error.message || error,
                statusCode: error.response ? error.response.status : 'N/A'
            });
        }

        // Log summary when all requests are done
        if (i === classIds.length - 1) {
            const summary = {
                timestamp: getTimestamp(),
                totalRequests: classIds.length,
                successfulRequests: successCount,
                failedRequests: failureCount
            };
            console.log('Processing Complete ✅', JSON.stringify(summary, null, 2));

            // Save the workbook to a file
            await workbook.xlsx.writeFile('class_timespent.xlsx');
            console.log('Excel file saved as class_timespent.xlsx');
        }
    }
}

// Execute the function
fetchClassTimespent().catch(console.error);