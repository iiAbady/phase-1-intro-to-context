// Your code here
function createEmployeeRecord(row) {
	return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
	}	
}

function createEmployeeRecords(employeeRowData) {
	return employeeRowData.map(row => {
		return createEmployeeRecord(row);
	})
}

function createTimeInEvent(employee, dateStamp){
	const [date, hour] = dateStamp.split(' ');
	
	employee.timeInEvents.push({
		type: "TimeIn",
		hour: parseInt(hour),
		date
	})
	
	return employee;
}

function createTimeOutEvent(employee, dateStamp) {
	const [date, hour] = dateStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date,
    })

    return employee
}


function hoursWorkedOnDate(employee, soughtDate) {
	const inEvent = employee.timeInEvents.find(e => e.date === soughtDate);
	const outEvent = employee.timeOutEvents.find(e => e.date === soughtDate);
	return (outEvent.hour - inEvent.hour) / 100
}

function wagesEarnedOnDate(employee, dateSought) {
	const rawWage = hoursWorkedOnDate(employee, dateSought);
        * employee.payPerHour
    return parseFloat(rawWage.toString());
}

function allWagesFor(employee) {
	return employee.timeInEvents.map(e => e.date).reduce
	((acc, curr) => acc + wagesEarnedOnDate(employee, curr)
	, 0);
}

const findEmployeeByFirstName(srcArray, firstName) {
	return srcArray.find(rec => rec.firstName === firstName);
}

function calculatePayroll(arrayOfEmployeeRecords) {
	arrayOfEmployeeRecords.reduce((acc, curr) => acc + allWagesFor(curr), 0)
}