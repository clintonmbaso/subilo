// Function to calculate total savings
function calculateSavings(data) {
    const totalShares = data.janShares + data.febShares + data.marShares + 
                       data.aprShares + data.mayShares + data.junShares + data.reg;
    return totalShares;
}

// Function to calculate total Loans
function calculateLoan(data) {
    const totalLoan = data.janLoans + data.febLoans + data.marLoans + 
                      data.aprLoans + data.mayLoans + data.junLoans;
    return totalLoan;
}

// Function to calculate simple interest
function calculateSimpleInterest(principal, rate, time) {
    return principal * rate * time + principal;
}

// Function to calculate all pending amounts with interest
function calculatePendingAmounts(data) {
    const interestRate = 0.2; // 20% interest rate
    const timePeriod = 1; // 1 year (or 1 month if you prefer)
    
    // Calculate pending for each month with cumulative interest
    const janPending = calculateSimpleInterest(data.janLoans, interestRate, timePeriod) - data.janReturns;
    const febPending = calculateSimpleInterest((janPending + data.febLoans), interestRate, timePeriod) - data.febReturms;
    const marPending = calculateSimpleInterest((febPending + data.marLoans), interestRate, timePeriod) - data.marReturns;
    const aprPending = calculateSimpleInterest((marPending + data.aprLoans), interestRate, timePeriod) - data.aprReturns;
    const mayPending = calculateSimpleInterest((aprPending + data.mayLoans), interestRate, timePeriod) - data.mayReturns;
    const junPending = calculateSimpleInterest((mayPending + data.junLoans), interestRate, timePeriod) - data.junReturns;
    
    return {
        janPending,
        febPending,
        marPending,
        aprPending,
        mayPending,
        junPending,
        totalPending: junPending // The final pending amount
    };
}

// Function to get member financial summary
function getMemberFinancialSummary(memberData) {
    const pendingAmounts = calculatePendingAmounts(memberData);
    const totalSavings = calculateSavings(memberData);
    const totalLoan = calculateLoan(memberData);
    const payOut = (memberData.Shares * 10428) - pendingAmounts.totalPending;
    
    return {
        totalSavings,
        totalLoan,
        totalPending: pendingAmounts.totalPending,
        payOut,
        monthlyPending: {
            janPending: pendingAmounts.janPending,
            febPending: pendingAmounts.febPending,
            marPending: pendingAmounts.marPending,
            aprPending: pendingAmounts.aprPending,
            mayPending: pendingAmounts.mayPending,
            junPending: pendingAmounts.junPending
        }
    };
}

// Function to get circle financial summary
function getCircleFinancialSummary() {
    const summaryData = getSummaryData();
    const pendingAmounts = calculatePendingAmounts(summaryData);
    
    return {
        totalShares: summaryData.Shares,
        totalMembers: getAllMembers().length,
        totalLoans: calculateLoan(summaryData),
        totalReturns: summaryData.janReturns + summaryData.febReturms + 
                     summaryData.marReturns + summaryData.aprReturns + 
                     summaryData.mayReturns + summaryData.junReturns,
        totalPending: pendingAmounts.totalPending,
        monthlyPending: pendingAmounts
    };
}