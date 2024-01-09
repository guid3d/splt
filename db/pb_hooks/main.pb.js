routerAdd("GET", "/api/splt/transactions", (c) => {
  // let name = c.pathParam("name");
  const groupId = c.queryParam("groupId");
  const page = c.queryParam("p");
  const limit = c.queryParam("l");
  // TODO: Implement pagination

  // const result = arrayOf(
  //   new DynamicModel({
  //     // describe the shape of the data (used also as initial values)
  //     id: "",
  //     avatar: { emoji: "", unified: "" },
  //     amount: 0,
  //     name: "", // serialized json db arrays are decoded as plain arrays
  //   })
  // );

  const expenses = $app.dao().findRecordsByFilter(
    "expenses",
    "groupInfo = {:groupId}",
    "-transactionDateTime",
    // 50,
    0,
    0,
    { groupId: groupId }
  );

  const paybacks = $app.dao().findRecordsByFilter(
    "paybacks",
    "groupInfo = {:groupId}",
    "-transactionDateTime",
    // 50,
    0,
    0,
    { groupId: groupId }
  );
  $app.dao().expandRecords(paybacks, ["fromPerson", "toPerson"]);

  const notSortedTransactions = [...expenses, ...paybacks];

  // const transactions = notSortedTransactions.sort((a, b) => {
  //   return Date.parse(b.transactionDateTime) - Date.parse(a.transactionDateTime);
  // });

  // const expenses = $app.dao().findRecordsByIds("expenses", []);
  console.log("expenses", expenses);
  return c.json(200, {
    transactions: notSortedTransactions,
    // expenses: expenses,
    // paybacks: paybacks,
  });
});

routerAdd("GET", "/api/splt/expense", (c) => {
  // let name = c.pathParam("name");
  const expenseId = c.queryParam("expenseId");

  const expenseOriginal = $app.dao().findRecordById("expenses", expenseId);
  $app
    .dao()
    .expandRecord(expenseOriginal, [
      "participants",
      "paidBy",
      "groupInfo",
      "groupInfo.participants",
    ]);

  const groupParticipants = $app
    .dao()
    .findRecordById("groups", expenseOriginal.get("groupInfo"));
  // const expense = expenseOriginal.publicExport();
  const totalAmount = expenseOriginal.get("amount");
  const numGroupParticipants = groupParticipants.get("participants").length;
  const numExpenseParticipants = expenseOriginal.get("participants").length;
  const everyoneIsParticipant = expenseOriginal.get("everyoneIsParticipant");
  let amountPerPerson = 0;
  if (everyoneIsParticipant) {
    amountPerPerson = totalAmount / numGroupParticipants;
    // const newExpense = {...expense, }
  } else {
    amountPerPerson = totalAmount / numExpenseParticipants;
  }
  const expense = expenseOriginal.publicExport();
  // const newParticipants = expense.expand.participants.map((participant) => {
  //   return {
  //     ...participant,
  //     amount: amountPerPerson,
  //   };
  // });
  // const selectedFieldExpense = {
  //   amount: expense.amount,
  //   avatar: expense.avatar,
  //   description: expense.description,
  //   everyoneIsParticipant: expense.everyoneIsParticipant,
  //   groupInfo: expense.expand.groupInfo,
  //   name: expense.name,
  //   id: expense.id,
  //   splitType: expense.splitType,
  //   paidBy: expense.expand.paidBy,
  //   participants: expense.expand.participants,
  //   transactionDateTime: expense.transactionDateTime,
  //   amountPerPerson: amountPerPerson,
  //   created: expense.created,
  //   updated: expense.updated,
  // };
  const selectedFieldExpense = { ...expense, amountPerPerson };
  return c.json(200, selectedFieldExpense);
});

routerAdd("GET", "/api/splt/payback", (c) => {
  // let name = c.pathParam("name");
  const paybackId = c.queryParam("paybackId");
  // TODO: Implement pagination

  const paybackOriginal = $app.dao().findRecordById("paybacks", paybackId);
  $app
    .dao()
    .expandRecord(paybackOriginal, ["fromPerson", "toPerson", "groupInfo"]);

  // const payback = paybackOriginal.publicExport();

  // const selectedFieldPayback = {
  //   id: payback.id,
  //   created: payback.created,
  //   updated: payback.updated,
  //   amount: payback.amount,
  //   fromPerson: payback.expand.fromPerson,
  //   toPerson: payback.expand.toPerson,
  //   groupInfo: payback.expand.groupInfo,
  //   transactionDateTime: payback.transactionDateTime,
  // };

  return c.json(200, paybackOriginal);
});

routerAdd("GET", "/api/splt/hasSpent", (c) => {
  // TODO: Calculate Payback

  const groupId = c.queryParam("groupId");
  const payBefore = $app.dao().findRecordsByFilter(
    "payBefore",
    "groupInfo = {:groupId}",
    "",
    // 50,
    0,
    0,
    { groupId: groupId }
  );
  $app.dao().expandRecords(payBefore, ["paidBy"]);
  let hashMap = {};

  payBefore.forEach((pay) => {
    const parsed = JSON.parse(JSON.stringify(pay));
    const participant = parsed.expand.paidBy;
    const sumAmount = parsed.sumAmount;
    hashMap[participant.id] = {
      amount: sumAmount,
      ...participant,
    };
  });

  const expensesOriginal = $app.dao().findRecordsByFilter(
    "expenses",
    "groupInfo = {:groupId}",
    "-transactionDateTime",
    // 50,
    0,
    0,
    { groupId: groupId }
  );
  $app.dao().expandRecords(expensesOriginal, [
    "participants",
    // "groupInfo",
    "groupInfo.participants",
  ]);

  if (expensesOriginal.length === 0) {
    return c.json(200, []);
  }

  expensesOriginal.forEach((expense) => {
    const parsed = JSON.parse(JSON.stringify(expense));
    const groupParticipants = parsed.expand.groupInfo.expand.participants;
    const numGroupParticipants = parsed.expand.groupInfo.participants.length;

    const expenseParticipants = parsed.expand.participants;
    const numExpenseParticipants = parsed.participants.length;
    const totalAmount = parsed.amount;
    const everyoneIsParticipant = parsed.everyoneIsParticipant;
    let amountPerPerson = 0;
    if (everyoneIsParticipant) {
      amountPerPerson = totalAmount / numGroupParticipants;
      // const newExpense = {...expense, }
      groupParticipants.forEach((participant) => {
        // console.log(participant.id)
        if (!hashMap[participant.id]) {
          hashMap[participant.id] = {
            amount: 0,
            ...participant,
          };
        }
        hashMap[participant.id].amount -= amountPerPerson;
      });
    } else {
      amountPerPerson = totalAmount / numExpenseParticipants;
      expenseParticipants.forEach((participant) => {
        // console.log(participant.id)
        if (!hashMap[participant.id]) {
          hashMap[participant.id] = {
            amount: 0,
            ...participant,
          };
        }
        hashMap[participant.id].amount -= amountPerPerson;
      });
    }
  });

  // const sortedHashMap = Object.fromEntries(
  //   Object.entries(hashMap).sort(([, a], [, b]) => b - a)
  // );
  let haveTopay = [];
  let sortedArray = Object.entries(hashMap).sort(
    (a, b) => a[1].amount - b[1].amount
  );
  while (true) {
    // const sortedObject = Object.fromEntries(sortedArray);
    const sortedObject = Object.fromEntries(sortedArray);
    sortedArray = Object.entries(sortedObject).sort(
      (a, b) => a[1].amount - b[1].amount
    );
    const highestDebtie = sortedArray[0];
    const highestGiver = sortedArray[sortedArray.length - 1];
    const rest = highestGiver[1].amount + highestDebtie[1].amount;
    console.log(highestGiver[1].amount);
    if (highestGiver[1].amount <= 0.01) {
      break;
    }
    if (rest < 0) {
      haveTopay.push({
        fromPerson: {
          id: highestDebtie[0],
          ...highestDebtie[1],
        },
        toPerson: {
          id: highestGiver[0],
          ...highestGiver[1],
        },
        amount: highestGiver[1].amount,
      });
      sortedArray[sortedArray.length - 1][1].amount = 0; // highest giver is done
      sortedArray[0][1].amount = rest; //
    } else {
      haveTopay.push({
        fromPerson: {
          id: highestDebtie[0],
          ...highestDebtie[1],
        },
        toPerson: {
          id: highestGiver[0],
          ...highestGiver[1],
        },
        amount: -highestDebtie[1].amount,
      });
      sortedArray[sortedArray.length - 1][1].amount = rest; // highest giver still needs money
      sortedArray[0][1].amount = 0; //
    }
  }

  const paybacks = $app.dao().findRecordsByFilter(
    "paybacks",
    "groupInfo = {:groupId}",
    "-transactionDateTime",
    // 50,
    0,
    0,
    { groupId: groupId }
  );

  paybacks.forEach((payback) => {
    const parsed = JSON.parse(JSON.stringify(payback));
    const fromPersonId = parsed.fromPerson;
    const toPersonId = parsed.toPerson;
    const amount = parsed.amount;
    haveTopay.forEach((pay) => {
      if (
        pay.fromPerson.id === fromPersonId &&
        pay.toPerson.id === toPersonId
      ) {
        pay.amount -= amount;
      }

      if (pay.amount < 0.01) {
        // pay.amount = 0;
        haveTopay.splice(haveTopay.indexOf(pay), 1);
      }
    });
  });

  // haveTopay.filter((pay) => pay.amount > 0);

  // haveTopay.filter((pay) => pay.amount > 0.009);

  return c.json(200, haveTopay);
});

onModelAfterUpdate((e) => {
  console.log("user updated...", e.model.get("email"));
}, "users");

onAfterBootstrap((e) => {
  console.log("App initialized!");
});
