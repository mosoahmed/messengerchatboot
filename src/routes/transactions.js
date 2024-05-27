const transactions = require('../data/transactions');

// TASK  2, Find Duplicate Transactions
function findDuplicateTransactions(transactions) {
  // Step 1: Sort transactions by time
  transactions.sort((a, b) => new Date(a.time) - new Date(b.time));

  console.log(transactions);
  const duplicates = [];

  // Step 2: Iterate over the sorted transactions and find duplicates
  for (let i = 0; i < transactions.length - 1; i++) {
    const current = transactions[i];
    const next = transactions[i + 1];

    const timeDiff = Math.abs(new Date(next.time) - new Date(current.time));

    if (
      current.sourceAccount === next.sourceAccount &&
      current.targetAccount === next.targetAccount &&
      current.amount === next.amount &&
      current.category === next.category &&
      current.id !== next.id &&
      timeDiff < 60 * 1000 // time difference is less than 1 minute
    ) {
      // Ensure no duplicate addition of the same transaction
      if (!duplicates.includes(current)) {
        duplicates.push(current);
      }
      duplicates.push(next);
    }
  }

   console.log(duplicates)

  // Step 3: Group duplicates by category
  const groupedByCategory = duplicates.reduce((acc, transaction) => {
    if (!acc[transaction.category]) {
      acc[transaction.category] = [];
    }
    acc[transaction.category].push(transaction);
    return acc;
  }, {});

  // Step 4: Sort groups by the time of the first transaction in each group
  const sortedGroups = Object.entries(groupedByCategory).sort((a, b) => {
    return new Date(a[1][0].time) - new Date(b[1][0].time);
  });

  return sortedGroups;
}

module.exports = { transactions, findDuplicateTransactions };
